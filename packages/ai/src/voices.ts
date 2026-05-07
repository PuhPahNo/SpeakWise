// Curated ElevenLabs voice catalog for Wise.
//
// All voice IDs below are from ElevenLabs' "premade" library — accessible on
// every plan including the free tier (verified against /v1/voices on Anthony's
// account on 2026-05-06). The `eleven_turbo_v2_5` model used elsewhere is
// multilingual, so a single voice handles both Italian and English well —
// the model picks up the language from the text.
//
// To add or replace a voice:
//   1. Visit https://elevenlabs.io/app/voice-library and audition the voice
//   2. Confirm it appears under category=premade in `GET /v1/voices`
//      (run: pnpm smoke or node --env-file=.env -e '...' — see scripts/smoke-test.ts)
//   3. Append to WISE_VOICES below
// Avoid "library voices" (category!=premade) — those require a paid plan.

export interface WiseVoice {
  id: string;
  name: string;
  shortDescription: string;
  gender: 'female' | 'male' | 'neutral';
  /** Whether this is the default if the user hasn't picked one. */
  isDefault?: boolean;
}

export const WISE_VOICES: WiseVoice[] = [
  {
    id: 'pqHfZKP75CvOlQylNhV4', // Bill
    name: 'Bill',
    shortDescription: 'Wise, mature, balanced — the namesake voice for Wise.',
    gender: 'male',
    isDefault: true,
  },
  {
    id: 'Xb7hH8MSUJpSbSDYk0k2', // Alice
    name: 'Alice',
    shortDescription: 'Clear, engaging educator — sounds like a great teacher.',
    gender: 'female',
  },
  {
    id: 'XrExE9yKIg1WjnnlVkGX', // Matilda
    name: 'Matilda',
    shortDescription: 'Knowledgeable, professional, calm.',
    gender: 'female',
  },
  {
    id: 'EXAVITQu4vr4xnSDxMaL', // Sarah
    name: 'Sarah',
    shortDescription: 'Mature, reassuring, confident.',
    gender: 'female',
  },
  {
    id: 'JBFqnCBsd6RMkjVDRZzb', // George
    name: 'George',
    shortDescription: 'Warm, captivating storyteller.',
    gender: 'male',
  },
  {
    id: 'pFZP5JQG7iQjIQuC4Bku', // Lily
    name: 'Lily',
    shortDescription: 'Bright, expressive, velvety.',
    gender: 'female',
  },
];

export const DEFAULT_VOICE_ID =
  WISE_VOICES.find((v) => v.isDefault)?.id ?? WISE_VOICES[0]?.id ?? '';

export function getVoiceById(id: string | null | undefined): WiseVoice | null {
  if (!id) return null;
  return WISE_VOICES.find((v) => v.id === id) ?? null;
}

export function resolveVoiceId(userVoiceId: string | null | undefined): string {
  if (userVoiceId && getVoiceById(userVoiceId)) return userVoiceId;
  return DEFAULT_VOICE_ID;
}
