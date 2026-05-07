import { Models } from './models.js';
import { resolveVoiceId } from './voices.js';
import { AIError } from './errors.js';

export type SpeakLanguage = 'it' | 'en';

export interface SpeakInput {
  text: string;
  /** Optional — used as a hint for the multilingual model. */
  language?: SpeakLanguage;
  /** Specific voice ID to use. Falls back to the user's choice or app default. */
  voiceId?: string;
  outputFormat?: 'mp3_44100_128' | 'mp3_22050_32' | 'pcm_16000';
}

export interface SpeakResult {
  audio: ArrayBuffer;
  contentType: string;
  durationEstimateSeconds: number;
  voiceId: string;
}

export async function synthesizeSpeech(input: SpeakInput): Promise<SpeakResult> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new AIError({ provider: 'elevenlabs', purpose: 'tts', message: 'ELEVENLABS_API_KEY missing' });
  }

  const voiceId = resolveVoiceId(input.voiceId);
  if (!voiceId) {
    throw new AIError({
      provider: 'elevenlabs',
      purpose: 'tts',
      message: 'No ElevenLabs voice resolved (curated list is empty)',
    });
  }

  const outputFormat = input.outputFormat ?? 'mp3_44100_128';
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${outputFormat}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: input.text,
      model_id: Models.ttsModel,
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.75,
        style: 0.2,
        use_speaker_boost: true,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new AIError({
      provider: 'elevenlabs',
      purpose: 'tts',
      message: `ElevenLabs TTS failed (${res.status}): ${body.slice(0, 200)}`,
    });
  }

  const audio = await res.arrayBuffer();
  const wordCount = input.text.split(/\s+/).filter(Boolean).length;
  const durationEstimateSeconds = Math.max(1, Math.round((wordCount / 150) * 60));

  return {
    audio,
    contentType: outputFormat.startsWith('mp3') ? 'audio/mpeg' : 'audio/wav',
    durationEstimateSeconds,
    voiceId,
  };
}

/** Cheap probe — checks the key works without burning audio quota. */
export async function elevenLabsAccountInfo(): Promise<{ subscription: unknown }> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new AIError({ provider: 'elevenlabs', purpose: 'account', message: 'ELEVENLABS_API_KEY missing' });
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
