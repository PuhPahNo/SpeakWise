export const VOICE_STATES = [
  'idle',
  'listening',
  'processing_transcription',
  'thinking',
  'speaking',
  'awaiting_user_response',
  'paused',
  'error',
] as const;
export type VoiceState = (typeof VOICE_STATES)[number];

export type VoiceTransition =
  | 'USER_STARTED_SPEAKING'
  | 'USER_STOPPED_SPEAKING'
  | 'TRANSCRIPTION_COMPLETE'
  | 'WISE_RESPONSE_READY'
  | 'WISE_FINISHED_SPEAKING'
  | 'USER_INTERRUPT'
  | 'ERROR'
  | 'RECOVER'
  | 'PAUSE'
  | 'RESUME';
