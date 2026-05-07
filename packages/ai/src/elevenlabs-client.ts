import { Models, Voices } from './models.js';
import { AIError } from './errors.js';

export type SpeakLanguage = 'it' | 'en';

export interface SpeakInput {
  text: string;
  language: SpeakLanguage;
  voiceId?: string;
  outputFormat?: 'mp3_44100_128' | 'mp3_22050_32' | 'pcm_16000';
}

export interface SpeakResult {
  audio: ArrayBuffer;
  contentType: string;
  durationEstimateSeconds: number;
}

export async function synthesizeSpeech(input: SpeakInput): Promise<SpeakResult> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new AIError({ provider: 'elevenlabs', purpose: 'tts', message: 'ELEVENLABS_API_KEY missing' });

  const voiceId = input.voiceId ?? (input.language === 'it' ? Voices.italian : Voices.english);
  if (!voiceId) {
    throw new AIError({
      provider: 'elevenlabs',
      purpose: 'tts',
      message: `No ElevenLabs voice configured for language ${input.language}`,
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
  };
}
