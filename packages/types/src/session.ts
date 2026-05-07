import type { ISODateTime, UUID } from './primitives.js';

export const SESSION_TYPES = [
  'onboarding',
  'placement',
  'lesson',
  'freestyle',
  'review',
  'conversation',
  'media',
  'progress_report',
] as const;
export type SessionType = (typeof SESSION_TYPES)[number];

export const SESSION_MODES = ['voice', 'text', 'mixed'] as const;
export type SessionMode = (typeof SESSION_MODES)[number];

export const SESSION_STATUSES = ['active', 'completed', 'abandoned', 'errored'] as const;
export type SessionStatus = (typeof SESSION_STATUSES)[number];

export interface TranscriptTurn {
  role: 'user' | 'wise' | 'system';
  text: string;
  audioUrl?: string;
  at: ISODateTime;
}

export interface Session {
  id: UUID;
  userId: UUID;
  lessonId: UUID | null;
  sessionType: SessionType;
  mode: SessionMode;
  status: SessionStatus;
  transcript: TranscriptTurn[] | null;
  summary: string | null;
  strengthsObserved: string[];
  weaknessesObserved: string[];
  memoryUpdatesApplied: boolean;
  startedAt: ISODateTime;
  completedAt: ISODateTime | null;
}
