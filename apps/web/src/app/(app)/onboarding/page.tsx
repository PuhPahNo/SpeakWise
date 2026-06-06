'use client';

import { VoiceOrb } from '@/components/voice/voice-orb';
import { useVoiceTutor } from '@/hooks/use-voice-tutor';
import { Loader2, MessageSquareText, Mic, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Phase = 'intro' | 'conversing' | 'done';
type Mode = 'voice' | 'text';
interface Turn {
  role: 'user' | 'wise';
  text: string;
  ts: number;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('voice');
  // Optimistically voice; flipped to chat on mount if TTS can't run server-side.
  const [voiceAvailable, setVoiceAvailable] = useState(true);
  const [phase, setPhase] = useState<Phase>('intro');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [wiseLine, setWiseLine] = useState<string>('');
  const [userLine, setUserLine] = useState<string>('');
  const [textInput, setTextInput] = useState('');
  const [pending, setPending] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const beginningRef = useRef(false);
  const convoRef = useRef<HTMLDivElement>(null);

  // Read the latest mode inside async callbacks, so a hung voice begin()
  // doesn't suddenly start talking after the user has switched to Chat.
  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const tutor = useVoiceTutor({
    // Onboarding is mostly English. Auto-detect on STT in case the
    // learner spontaneously replies with Italian ("Sì, va bene"). TTS
    // 'auto' lets Italian fragments in Wise's reply be pronounced with
    // proper phonetics while the rest stays warm English.
    sttLanguage: 'auto',
    ttsLanguage: 'auto',
    onUserSpeech: async (text) => {
      setUserLine(text);
      addTurn('user', text);
      await sendResponse(text, 'voice');
    },
  });

  const addTurn = (role: 'user' | 'wise', text: string) =>
    setTurns((t) => [...t, { role, text, ts: Date.now() }]);

  // Keep the chat transcript pinned to the latest turn.
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new turns
  useEffect(() => {
    convoRef.current?.scrollTo({ top: convoRef.current.scrollHeight, behavior: 'smooth' });
  }, [turns]);

  // Pre-warm the slow routes on mount so the first interaction doesn't wait
  // for cold compilation. We fire /api/onboarding/start once immediately —
  // its response is cached and reused whether the user starts by voice or
  // by chat.
  const prewarmedStartRef = useRef<{ sessionId: string; wiseMessage: string } | null>(null);
  const prewarmStartedRef = useRef(false);
  useEffect(() => {
    if (prewarmStartedRef.current) return;
    prewarmStartedRef.current = true;
    void (async () => {
      try {
        const res = await fetch('/api/onboarding/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'voice' }),
        });
        if (res.ok) {
          prewarmedStartRef.current = (await res.json()) as {
            sessionId: string;
            wiseMessage: string;
          };
        }
      } catch {
        /* non-fatal — ensureStarted() will fetch fresh */
      }
    })();
  }, []);

  // Resolve (or create) the onboarding session. Returns the opener so the
  // caller can render/speak it. Reuses the prewarmed session when present so
  // we never spin up two sessions.
  async function ensureStarted(): Promise<{ sessionId: string; wiseMessage: string } | null> {
    if (sessionId) return { sessionId, wiseMessage: wiseLine };
    let startData = prewarmedStartRef.current;
    if (!startData) {
      const res = await fetch('/api/onboarding/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: modeRef.current }),
      });
      if (!res.ok) return null;
      startData = (await res.json()) as { sessionId: string; wiseMessage: string };
    }
    setSessionId(startData.sessionId);
    return startData;
  }

  // ── Voice: begin from a real user gesture (orb tap) so audio is unlocked ──
  async function begin() {
    if (beginningRef.current) return;
    beginningRef.current = true;
    setPending(true);
    try {
      const startData = await ensureStarted();
      if (!startData) throw new Error('onboarding start failed');
      await tutor.primeAudio();
      setWiseLine(startData.wiseMessage);
      setTurns((prev) =>
        prev.length ? prev : [{ role: 'wise', text: startData.wiseMessage, ts: Date.now() }],
      );
      setPhase('conversing');
      if (modeRef.current === 'voice') await tutor.speak(startData.wiseMessage);
    } catch (e) {
      console.error('onboarding start failed', e);
      beginningRef.current = false;
    } finally {
      setPending(false);
    }
  }

  // ── Chat: start a text-only onboarding (no orb, no TTS — can't hang) ──
  const textStartedRef = useRef(false);
  async function startText() {
    if (textStartedRef.current) return;
    textStartedRef.current = true;
    setPending(true);
    try {
      const startData = await ensureStarted();
      if (!startData) throw new Error('onboarding start failed');
      setWiseLine(startData.wiseMessage);
      setPhase('conversing');
      setTurns((prev) =>
        prev.length ? prev : [{ role: 'wise', text: startData.wiseMessage, ts: Date.now() }],
      );
    } catch (e) {
      console.error('onboarding text start failed', e);
      textStartedRef.current = false;
    } finally {
      setPending(false);
    }
  }

  function switchMode(m: Mode) {
    if (m === 'voice' && !voiceAvailable) return; // voice disabled — no-op
    setMode(m);
    if (m === 'text') {
      // Silence any in-flight audio and make sure a session exists so the
      // user can start typing immediately.
      tutor.interrupt();
      void startText();
    }
  }

  // On mount, check whether voice actually works from the server (paid
  // ElevenLabs). If not, disable voice and start onboarding in chat — the
  // free-tier orb would otherwise hang silently.
  const availCheckedRef = useRef(false);
  useEffect(() => {
    if (availCheckedRef.current) return;
    availCheckedRef.current = true;
    void (async () => {
      try {
        const res = await fetch('/api/voice/availability');
        if (!res.ok) return;
        const { available } = (await res.json()) as { available: boolean };
        if (!available) {
          setVoiceAvailable(false);
          switchMode('text');
        }
      } catch {
        /* leave voice optimistic on a network blip */
      }
    })();
  }, []);

  async function sendResponse(text: string, via: Mode, sid: string | null = sessionId) {
    if (!sid) return;
    setPending(true);
    try {
      const res = await fetch('/api/onboarding/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid, inputType: via, text }),
      });
      const data = (await res.json()) as { wiseMessage: string; nextStep: string };
      setWiseLine(data.wiseMessage);
      setUserLine('');
      addTurn('wise', data.wiseMessage);

      if (data.nextStep === 'complete') {
        await fetch('/api/onboarding/complete', { method: 'POST' });
        setPhase('done');
      }
      if (modeRef.current === 'voice') await tutor.speak(data.wiseMessage);
    } catch (e) {
      console.error('onboarding respond failed', e);
      addTurn('wise', 'Sorry — try that again?');
    } finally {
      setPending(false);
    }
  }

  async function submitText() {
    const t = textInput.trim();
    if (!t || pending) return;
    setTextInput('');
    setUserLine(t);
    addTurn('user', t);
    if (phase === 'intro') setPhase('conversing');
    const started = sessionId ? { sessionId } : await ensureStarted();
    if (!started) {
      addTurn('wise', 'Sorry — I couldn’t get started. Refresh and try again?');
      return;
    }
    await sendResponse(t, 'text', started.sessionId);
  }

  function statusText(): string {
    if (phase === 'done') return "All set — let's go.";
    if (phase === 'intro') {
      return pending ? 'Wise is warming up…' : 'Tap the orb to begin';
    }
    if (pending) return 'Wise is thinking…';
    switch (tutor.state) {
      case 'speaking':
        return 'Wise is speaking… (tap to interrupt)';
      case 'listening':
        return 'Listening — auto-stops on silence';
      case 'processing_transcription':
        return 'Got it — transcribing…';
      case 'thinking':
        return 'Wise is thinking…';
      case 'awaiting_user_response':
        return 'Tap the orb to reply';
      case 'error':
        return 'Microphone error — try again or switch to Chat';
      default:
        return 'Tap the orb to reply';
    }
  }

  function onOrbTap() {
    if (phase === 'intro') {
      void begin();
      return;
    }
    if (phase === 'done') {
      router.push('/command-center');
      return;
    }
    if (tutor.state === 'speaking') {
      tutor.interrupt();
      return;
    }
    void tutor.toggleListen();
  }

  const orbAriaLabel =
    phase === 'intro'
      ? 'Tap to begin'
      : phase === 'done'
        ? 'Onboarding complete — tap to continue'
        : tutor.state === 'listening'
          ? 'Stop listening'
          : tutor.state === 'speaking'
            ? 'Interrupt Wise'
            : 'Tap to speak';

  const segBtn = (active: boolean, disabled = false) =>
    `inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
      active ? 'bg-wise-500 text-ink-900' : 'text-ink-200 hover:text-ink-50'
    } ${disabled ? 'cursor-not-allowed opacity-40 hover:text-ink-200' : ''}`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col px-4 py-6 sm:py-10 max-w-2xl mx-auto">
      {/* Header: phase label + Voice/Chat toggle (hidden once we're done). */}
      <div className="flex items-center justify-between w-full">
        <div className="text-xs uppercase tracking-[0.2em] text-ink-200">
          {phase === 'done' ? 'Done' : 'Getting to know you'}
        </div>
        {phase !== 'done' && (
          <div className="inline-flex items-center rounded-full surface p-0.5 text-xs">
            <button
              type="button"
              onClick={() => switchMode('voice')}
              disabled={!voiceAvailable}
              aria-pressed={mode === 'voice'}
              title={voiceAvailable ? undefined : 'Voice needs an ElevenLabs plan upgrade'}
              className={segBtn(mode === 'voice', !voiceAvailable)}
            >
              <Mic size={13} aria-hidden /> Voice
            </button>
            <button
              type="button"
              onClick={() => switchMode('text')}
              aria-pressed={mode === 'text'}
              className={segBtn(mode === 'text')}
            >
              <MessageSquareText size={13} aria-hidden /> Chat
            </button>
          </div>
        )}
      </div>

      {phase === 'done' ? (
        // ── Shared "done" screen ──────────────────────────────────────────
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          <VoiceOrb
            state="idle"
            size="xl"
            amplitude={0}
            onTap={() => router.push('/command-center')}
            ariaLabel={orbAriaLabel}
          />
          <p className="font-display text-2xl sm:text-3xl text-ink-50">{wiseLine || 'All set!'}</p>
          <button
            type="button"
            onClick={() => router.push('/command-center')}
            className="rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-6 py-3 transition"
          >
            Take me to my first lesson →
          </button>
        </div>
      ) : mode === 'text' ? (
        // ── Chat onboarding (no audio — never stalls on "warming up") ──────
        <div className="flex-1 min-h-0 flex flex-col mt-4">
          <div ref={convoRef} className="flex-1 min-h-0 overflow-y-auto space-y-3 py-2">
            {turns.length === 0 ? (
              <p className="text-ink-200 text-sm py-8 text-center">
                {pending ? 'Wise is getting ready…' : 'Say hi to get started.'}
              </p>
            ) : (
              turns.map((t) => (
                <div
                  key={t.ts}
                  className={t.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${
                      t.role === 'user'
                        ? 'rounded-br-sm bg-wise-500 text-ink-900'
                        : 'rounded-bl-sm border hairline bg-ink-800/60 text-ink-50'
                    }`}
                  >
                    {t.text}
                  </div>
                </div>
              ))
            )}
            {pending && turns.length > 0 && (
              <div className="flex justify-start">
                <span className="inline-flex items-center gap-1 text-ink-300 text-sm">
                  <Loader2 size={14} className="animate-spin" /> Wise is thinking…
                </span>
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submitText();
            }}
            className="flex items-end gap-2 pt-2 pb-[88px] md:pb-2"
          >
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your answer…"
              enterKeyHint="send"
              autoCapitalize="sentences"
              className="flex-1 min-w-0 rounded-2xl border hairline bg-ink-800/60 px-4 py-3 text-[15px] text-ink-50 placeholder:text-ink-400 focus:outline-none focus:ring-1 focus:ring-wise-500"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || pending}
              aria-label="Send"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-wise-500 text-ink-900 transition hover:bg-wise-400 disabled:opacity-50"
            >
              {pending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      ) : (
        // ── Voice onboarding (the orb experience) ─────────────────────────
        <div className="flex-1 flex flex-col items-center justify-between py-8 sm:py-12">
          <div className="flex flex-col items-center gap-8 sm:gap-10 my-8 sm:my-12">
            <VoiceOrb
              state={pending ? 'thinking' : tutor.state}
              size="xl"
              amplitude={tutor.amplitude}
              onTap={onOrbTap}
              ariaLabel={orbAriaLabel}
            />
            <div className="text-center min-h-[5rem]">
              {phase === 'intro' ? (
                <p className="font-display text-2xl sm:text-3xl text-ink-50 leading-snug">
                  Ciao. I&apos;m Wise.
                  <br />
                  <span className="text-ink-200 text-lg sm:text-xl">
                    Tap the orb when you&apos;re ready — or switch to Chat to type.
                  </span>
                </p>
              ) : (
                <>
                  <p
                    key={wiseLine}
                    className="font-display text-2xl sm:text-3xl text-ink-50 leading-snug animate-fade-up"
                  >
                    {wiseLine || ' '}
                  </p>
                  {userLine && (
                    <p className="mt-3 text-sm sm:text-base text-ink-200 italic animate-fade-up">
                      you: &ldquo;{userLine}&rdquo;
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <p className="text-sm text-ink-200 text-center">{statusText()}</p>
        </div>
      )}
    </div>
  );
}
