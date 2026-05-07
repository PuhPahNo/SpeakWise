// Centralized model identifiers. Override per-environment via env vars
// (see packages/schemas/src/env.ts).

export const Models = {
  // OpenAI chat
  fast: process.env.OPENAI_MODEL_FAST ?? 'gpt-4o-mini',
  reasoning: process.env.OPENAI_MODEL_REASONING ?? 'gpt-4o',
  // OpenAI embeddings
  embedding: process.env.OPENAI_MODEL_EMBEDDING ?? 'text-embedding-3-small',
  // OpenAI speech-to-text
  stt: process.env.OPENAI_MODEL_STT ?? 'whisper-1',
  // ElevenLabs TTS model
  ttsModel: process.env.ELEVENLABS_MODEL_ID ?? 'eleven_turbo_v2_5',
} as const;

export const Voices = {
  italian: process.env.ELEVENLABS_VOICE_ID_IT ?? '',
  english: process.env.ELEVENLABS_VOICE_ID_EN ?? '',
} as const;
