'use client';

import type { VoiceState } from '@speakwise/types';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  /** Called with the user's transcribed speech once they finish recording. */
  onUserSpeech: (text: string) => void | Promise<void>;
  /** Language hint passed to Whisper for STT. */
  sttLanguage?: 'it' | 'en';
  /** Language hint for TTS playback. */
  ttsLanguage?: 'it' | 'en';
  /**
   * If true, after Wise finishes speaking we automatically begin listening
   * for the user's reply. This is the Jarvis turn-taking pattern.
   */
  autoListenAfterSpeak?: boolean;
  /**
   * If true, recording auto-stops after a sustained silence so the user
   * doesn't have to tap to end their turn. Defaults to true.
   */
  autoStopOnSilence?: boolean;
  /**
   * Minimum ms of speech the user must produce before silence-stop arms.
   * Prevents instant cutoff. Default 600ms.
   */
  minSpeechMs?: number;
  /**
   * Trailing silence ms after which we auto-stop recording. Default 1500ms.
   */
  silenceStopMs?: number;
}

export interface SpeakOptions {
  /** Override autoListenAfterSpeak for this single utterance. */
  autoListenAfter?: boolean;
}

export interface VoiceTutor {
  state: VoiceState;
  amplitude: number;
  /**
   * True once the user has done at least one gesture that unlocked
   * audio playback. Until then, speak() may be silently blocked by
   * the browser's autoplay policy.
   */
  audioPrimed: boolean;
  /**
   * Call from a click/tap handler to unlock audio playback. Plays a
   * silent buffer so subsequent .play() calls don't get rejected.
   * Safe to call repeatedly.
   */
  primeAudio: () => Promise<void>;
  /** Toggle between idle and listening. */
  toggleListen: () => Promise<void>;
  /** Stop listening + transcribe what was captured. */
  stopAndTranscribe: () => Promise<void>;
  /**
   * Speak a string out loud. Resolves when playback ends OR when the
   * browser refused to play. Returns whether audio actually started.
   */
  speak: (text: string, opts?: SpeakOptions) => Promise<boolean>;
  /** Stop Wise mid-sentence (interruption). */
  interrupt: () => void;
  /** Cancel anything in flight (TTS playback, recording). */
  cancel: () => void;
}

export function useVoiceTutor(opts: Options): VoiceTutor {
  const [state, setState] = useState<VoiceState>('idle');
  const [amplitude, setAmplitude] = useState(0);
  const [audioPrimed, setAudioPrimed] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const playerRef = useRef<HTMLAudioElement | null>(null);
  // Forward ref so the VAD loop in startListening can call stopAndTranscribe
  // without a circular dependency in useCallback ordering.
  const stopAndTranscribeRef = useRef<(() => Promise<void>) | null>(null);
  // Monotonic counter — each speak() call gets an ID; if a newer speak()
  // starts mid-flight, older ones bail out cleanly so we never overlap.
  const speakIdRef = useRef(0);
  // AbortController for the in-flight TTS fetch so we can cancel network
  // work when superseded.
  const ttsAbortRef = useRef<AbortController | null>(null);

  // Single tiny silent WAV — playing it on the first user gesture unlocks
  // the audio context for the rest of the session, so subsequent speak()
  // calls don't get blocked by browsers' autoplay policy even when there's
  // a long async gap (record → transcribe → LLM → TTS) before playback.
  const SILENT_WAV =
    'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

  const primeAudio = useCallback(async () => {
    if (audioPrimed) return;
    try {
      const a = new Audio(SILENT_WAV);
      a.volume = 0.01;
      await a.play();
      a.pause();
      setAudioPrimed(true);
    } catch (e) {
      // If even the silent prime fails, the browser will keep blocking us;
      // the consumer can retry on subsequent gestures.
      console.warn('voice tutor: audio context prime rejected', e);
    }
  }, [audioPrimed]);

  const cleanupRecording = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    analyserRef.current?.disconnect();
    analyserRef.current = null;
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
    }
    audioCtxRef.current = null;
    for (const t of streamRef.current?.getTracks() ?? []) t.stop();
    streamRef.current = null;
    recorderRef.current = null;
    setAmplitude(0);
  }, []);

  const cancel = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      try {
        recorderRef.current.stop();
      } catch {}
    }
    cleanupRecording();
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.src = '';
      playerRef.current = null;
    }
    setState('idle');
  }, [cleanupRecording]);

  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  // ── Recording / STT ──────────────────────────────────────────────────
  // VAD knobs
  const SPEECH_THRESHOLD = 0.06; // RMS that counts as "speaking"
  const minSpeechMs = opts.minSpeechMs ?? 600;
  const silenceStopMs = opts.silenceStopMs ?? 1500;
  const autoStopOnSilence = opts.autoStopOnSilence ?? true;

  const startListening = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
      throw new Error('Microphone API not available');
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    streamRef.current = stream;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    analyserRef.current = analyser;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const startedAt = performance.now();
    let lastSpeechAt = startedAt;
    let everSpoke = false;

    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i]! - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length);
      setAmplitude(Math.min(1, rms * 4));

      const now = performance.now();
      if (rms > SPEECH_THRESHOLD) {
        lastSpeechAt = now;
        if (now - startedAt > minSpeechMs) everSpoke = true;
      }

      // Auto-stop on trailing silence — only after we've heard at least
      // some real speech, so we don't cut off the moment they tap.
      if (
        autoStopOnSilence &&
        everSpoke &&
        now - lastSpeechAt > silenceStopMs &&
        recorderRef.current &&
        recorderRef.current.state === 'recording'
      ) {
        // Fire-and-forget; transcription advances state.
        void stopAndTranscribeRef.current?.();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    chunksRef.current = [];
    const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : '';
    const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    recorder.ondataavailable = (e) => {
      if (e.data?.size) chunksRef.current.push(e.data);
    };
    recorder.start();
    recorderRef.current = recorder;
    setState('listening');
  }, [autoStopOnSilence, minSpeechMs, silenceStopMs]);

  const stopAndTranscribe = useCallback(async () => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === 'inactive') return;

    setState('processing_transcription');
    const stoppedChunks: Blob[] = await new Promise((resolve) => {
      recorder.onstop = () => resolve(chunksRef.current);
      try {
        recorder.stop();
      } catch {
        resolve(chunksRef.current);
      }
    });
    cleanupRecording();

    if (stoppedChunks.length === 0) {
      setState('idle');
      return;
    }

    const blob = new Blob(stoppedChunks, { type: stoppedChunks[0]?.type ?? 'audio/webm' });
    const fd = new FormData();
    fd.append('audio', blob, 'speech.webm');
    fd.append('language', opts.sttLanguage ?? 'it');

    try {
      const res = await fetch('/api/voice/transcribe', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(`transcribe failed: ${res.status}`);
      const data = (await res.json()) as { text?: string };
      const text = (data.text ?? '').trim();
      if (text) {
        setState('thinking');
        await opts.onUserSpeech(text);
      }
      setState('idle');
    } catch (e) {
      console.error('voice tutor: transcription failed', e);
      setState('error');
      setTimeout(() => setState('idle'), 1500);
    }
  }, [cleanupRecording, opts]);

  // Wire the forward ref so VAD can call into us.
  stopAndTranscribeRef.current = stopAndTranscribe;

  const toggleListen = useCallback(async () => {
    if (state === 'listening') {
      await stopAndTranscribe();
      return;
    }
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current = null;
    }
    try {
      await startListening();
    } catch (e) {
      console.error('voice tutor: mic start failed', e);
      setState('error');
      setTimeout(() => setState('idle'), 1500);
    }
  }, [state, startListening, stopAndTranscribe]);

  const interrupt = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current = null;
    }
    setState('idle');
  }, []);

  // ── Speech synthesis playback ────────────────────────────────────────
  const speak = useCallback(
    async (text: string, speakOpts?: SpeakOptions): Promise<boolean> => {
      if (!text.trim()) return false;
      // Bump the ID — any older in-flight speak() will see its ID is stale
      // and bail. This is what kills double-tap echoes.
      const myId = ++speakIdRef.current;
      // Cancel any in-flight TTS fetch from a previous speak()
      ttsAbortRef.current?.abort();
      // Stop any currently playing audio
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current = null;
      }
      // Show the spinning "thinking" state while we wait for TTS to come
      // back — gives the user immediate visual feedback that something
      // is happening, instead of an idle orb during a 1-3s round-trip.
      setState('thinking');
      let played = false;
      const abort = new AbortController();
      ttsAbortRef.current = abort;
      try {
        const res = await fetch('/api/voice/speak', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, language: opts.ttsLanguage ?? 'en' }),
          signal: abort.signal,
        });
        // If a newer speak() came along, drop this one quietly.
        if (myId !== speakIdRef.current) return false;
        if (!res.ok) throw new Error(`tts failed: ${res.status}`);
        const blob = await res.blob();
        if (myId !== speakIdRef.current) return false;
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        playerRef.current = audio;
        // Now actually playing — switch to the breathing 'speaking' state.
        setState('speaking');
        await new Promise<void>((resolve) => {
          audio.onended = () => {
            URL.revokeObjectURL(url);
            resolve();
          };
          audio.onerror = () => {
            URL.revokeObjectURL(url);
            resolve();
          };
          audio
            .play()
            .then(() => {
              played = true;
              // Mark primed if we successfully played — useful for
              // consumers that want to know the audio context is unlocked.
              setAudioPrimed(true);
            })
            .catch((err) => {
              // Most common cause: autoplay policy. Surface it.
              console.warn(
                'voice tutor: audio.play() rejected (likely autoplay policy):',
                err?.message ?? err,
              );
              URL.revokeObjectURL(url);
              resolve();
            });
        });
        const wasInterrupted = playerRef.current !== audio || myId !== speakIdRef.current;
        if (!wasInterrupted) playerRef.current = null;

        const shouldAutoListen =
          played &&
          !wasInterrupted &&
          (speakOpts?.autoListenAfter ?? opts.autoListenAfterSpeak ?? false);
        if (shouldAutoListen) {
          try {
            await startListening();
          } catch (e) {
            console.error('voice tutor: auto-listen failed', e);
            setState('awaiting_user_response');
          }
        } else if (!wasInterrupted) {
          setState('awaiting_user_response');
        }
      } catch (e) {
        // AbortError on supersession is expected — drop quietly.
        if ((e as { name?: string })?.name === 'AbortError') return false;
        console.error('voice tutor: TTS failed', e);
        setState('awaiting_user_response');
      } finally {
        if (ttsAbortRef.current === abort) ttsAbortRef.current = null;
      }
      return played;
    },
    [opts.ttsLanguage, opts.autoListenAfterSpeak, startListening],
  );

  return {
    state,
    amplitude,
    audioPrimed,
    primeAudio,
    toggleListen,
    stopAndTranscribe,
    speak,
    interrupt,
    cancel,
  };
}
