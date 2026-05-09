import { AIError } from './errors';
import { Models } from './models';
import { type Span, segmentMixedText } from './text-segmenter';
import { resolveVoiceId } from './voices';

export type SpeakLanguage = 'it' | 'en';

export interface SpeakInput {
  text: string;
  /**
   * Optional language hint for the multilingual model.
   *  - 'it' / 'en': force a single language for the whole utterance.
   *  - 'auto' (default): segment the text and synthesize each phrase with
   *    the right `language_code`, then stitch. This is what makes
   *    "Ciao Anthony, welcome back" pronounce "Ciao" in correct Italian
   *    phonetics while keeping the rest natural English.
   */
  language?: SpeakLanguage | 'auto';
  /** Specific voice ID to use. Falls back to the user's choice or app default. */
  voiceId?: string;
  outputFormat?: 'mp3_44100_128' | 'mp3_22050_32' | 'pcm_16000' | 'pcm_22050' | 'pcm_44100';
}

export interface SpeakResult {
  audio: ArrayBuffer;
  contentType: string;
  durationEstimateSeconds: number;
  voiceId: string;
  /** The actual spans synthesized — useful for client-side debug + tests. */
  spans: Array<{ lang: SpeakLanguage; text: string }>;
}

/**
 * Top-level synthesis entry point. Auto-segments mixed-language text and
 * stitches the resulting PCM into one seamless WAV. For pure single-language
 * utterances (or when the caller wants to enforce English), pass
 * `language: 'en'` / `'it'` to bypass segmentation entirely.
 */
export async function synthesizeSpeech(input: SpeakInput): Promise<SpeakResult> {
  const voiceId = resolveVoiceId(input.voiceId);
  if (!voiceId) {
    throw new AIError({
      provider: 'elevenlabs',
      purpose: 'tts',
      message: 'No ElevenLabs voice resolved (curated list is empty)',
    });
  }

  const lang = input.language ?? 'auto';

  // Build spans. Single-language mode is just a one-element span list.
  const spans: Span[] =
    lang === 'auto'
      ? segmentMixedText(input.text)
      : [{ lang, text: input.text }];

  // Fast path: single span with single language → one mp3, no stitching.
  if (spans.length === 1 && spans[0]) {
    const only = spans[0];
    const outputFormat = input.outputFormat ?? 'mp3_44100_128';
    const audio = await ttsRaw({
      voiceId,
      text: only.text,
      languageCode: only.lang,
      outputFormat,
    });
    return {
      audio,
      contentType: outputFormat.startsWith('mp3') ? 'audio/mpeg' : 'audio/wav',
      durationEstimateSeconds: estimateDuration(input.text),
      voiceId,
      spans: spans.map((s) => ({ lang: s.lang, text: s.text })),
    };
  }

  // Multi-span path: synthesize each in PCM 22050 mono, cross-fade
  // adjacent spans, wrap as WAV. PCM avoids audible mp3 frame artifacts
  // at boundaries; the cross-fade kills the tiny step-discontinuity at
  // each splice that you'd otherwise hear as a faint click.
  const sampleRate = 22050;
  const pcmChunks: Buffer[] = [];
  for (const span of spans) {
    const pcm = await ttsRaw({
      voiceId,
      text: span.text,
      languageCode: span.lang,
      outputFormat: 'pcm_22050',
    });
    pcmChunks.push(Buffer.from(pcm));
  }
  const pcmTotal = crossfadeMonoPcm16(pcmChunks, sampleRate, 30 /* ms */);
  const wav = wrapPcmAsWav(pcmTotal, sampleRate);
  // Copy into a fresh ArrayBuffer so the return type is unambiguous
  // (Node's Buffer can be backed by a SharedArrayBuffer in some envs).
  const out = new ArrayBuffer(wav.byteLength);
  new Uint8Array(out).set(wav);

  return {
    audio: out,
    contentType: 'audio/wav',
    durationEstimateSeconds: estimateDuration(input.text),
    voiceId,
    spans: spans.map((s) => ({ lang: s.lang, text: s.text })),
  };
}

function estimateDuration(text: string): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round((wordCount / 150) * 60));
}

interface TtsRawInput {
  voiceId: string;
  text: string;
  languageCode?: SpeakLanguage;
  outputFormat: NonNullable<SpeakInput['outputFormat']>;
}

async function ttsRaw(input: TtsRawInput): Promise<ArrayBuffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new AIError({
      provider: 'elevenlabs',
      purpose: 'tts',
      message: 'ELEVENLABS_API_KEY missing',
    });
  }
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${input.voiceId}?output_format=${input.outputFormat}`;

  // language_code is only honored by Turbo v2.5 / Flash v2.5 / v3 alpha.
  // For the Turbo model we always use, supplying it for short Italian
  // phrases dramatically improves accent correctness.
  const body: Record<string, unknown> = {
    text: input.text,
    model_id: Models.ttsModel,
    voice_settings: {
      stability: 0.45,
      similarity_boost: 0.75,
      style: 0.2,
      use_speaker_boost: true,
    },
  };
  if (input.languageCode) body.language_code = input.languageCode;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: input.outputFormat.startsWith('mp3') ? 'audio/mpeg' : 'audio/wav',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new AIError({
      provider: 'elevenlabs',
      purpose: 'tts',
      message: `ElevenLabs TTS failed (${res.status}): ${errBody.slice(0, 200)}`,
    });
  }
  return res.arrayBuffer();
}

/**
 * Cross-fade adjacent mono 16-bit-LE PCM chunks with a linear ramp of
 * `fadeMs` milliseconds. The output length is shorter than the sum of
 * inputs by `(N-1) * fadeMs` worth of samples — overlapping regions
 * blend into one continuous stream so language switches sound fluid
 * instead of stitched.
 *
 * If a chunk is shorter than the fade region, the fade clamps to that
 * chunk's length to stay safe (no buffer overruns).
 */
function crossfadeMonoPcm16(chunks: Buffer[], sampleRate: number, fadeMs: number): Buffer {
  if (chunks.length === 0) return Buffer.alloc(0);
  if (chunks.length === 1) return chunks[0]!;

  const fadeSamples = Math.max(1, Math.floor((fadeMs / 1000) * sampleRate));
  // 16-bit mono → 2 bytes per sample
  const out: Buffer[] = [];
  let prev = chunks[0]!;
  for (let i = 1; i < chunks.length; i++) {
    const curr = chunks[i]!;
    const safeFade = Math.min(
      fadeSamples,
      Math.floor(prev.length / 2),
      Math.floor(curr.length / 2),
    );
    if (safeFade <= 1) {
      // Either chunk is too tiny — just concatenate.
      out.push(prev);
      prev = curr;
      continue;
    }
    // Emit prev's body up to (but not including) its fade-out region.
    const prevBody = prev.subarray(0, prev.length - safeFade * 2);
    out.push(prevBody);

    // Mix prev's tail with curr's head sample-by-sample.
    const blended = Buffer.alloc(safeFade * 2);
    const prevTail = prev.subarray(prev.length - safeFade * 2);
    const currHead = curr.subarray(0, safeFade * 2);
    for (let s = 0; s < safeFade; s++) {
      const t = s / (safeFade - 1); // 0..1
      const a = prevTail.readInt16LE(s * 2);
      const b = currHead.readInt16LE(s * 2);
      // Equal-power-ish linear blend; clamp to int16 range.
      let mixed = Math.round(a * (1 - t) + b * t);
      if (mixed > 32767) mixed = 32767;
      if (mixed < -32768) mixed = -32768;
      blended.writeInt16LE(mixed, s * 2);
    }
    out.push(blended);

    // Curr's tail (post-fade-in) becomes the new prev.
    prev = curr.subarray(safeFade * 2);
  }
  out.push(prev);
  return Buffer.concat(out);
}

/**
 * Wrap raw mono 16-bit-LE PCM into a minimal WAV (RIFF) container. We do
 * this in-process rather than shelling out to ffmpeg so synthesis stays
 * a single network request from the caller's perspective.
 */
function wrapPcmAsWav(pcm: Buffer, sampleRate: number): Buffer {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcm.length;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // PCM chunk size
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);
  return Buffer.concat([header, pcm]);
}

/** Cheap probe — checks the key works without burning audio quota. */
export async function elevenLabsAccountInfo(): Promise<{ subscription: unknown }> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new AIError({
      provider: 'elevenlabs',
      purpose: 'account',
      message: 'ELEVENLABS_API_KEY missing',
    });
  }
  const res = await fetch('https://api.elevenlabs.io/v1/user', {
    headers: { 'xi-api-key': apiKey },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new AIError({
      provider: 'elevenlabs',
      purpose: 'account',
      message: `ElevenLabs probe failed (${res.status}): ${body.slice(0, 200)}`,
    });
  }
  return res.json() as Promise<{ subscription: unknown }>;
}
