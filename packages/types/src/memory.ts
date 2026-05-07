import type { Decimal, ISODateTime, UUID } from './primitives';

export const MEMORY_TYPES = [
  'preference',
  'goal',
  'interest',
  'strength',
  'weakness',
  'recurring_mistake',
  'tutor_observation',
  'motivation',
  'content_preference',
  'correction_preference',
  'pronunciation_note',
  'session_summary',
] as const;
export type MemoryType = (typeof MEMORY_TYPES)[number];

export const MEMORY_VISIBILITIES = ['user_visible', 'internal'] as const;
export type MemoryVisibility = (typeof MEMORY_VISIBILITIES)[number];

export interface MemoryNote {
  id: UUID;
  userId: UUID;
  type: MemoryType;
  content: string;
  structuredData: Record<string, unknown> | null;
  confidence: Decimal;
  visibility: MemoryVisibility;
  sourceSessionId: UUID | null;
  sourceResponseId: UUID | null;
  embeddingId: string | null;
  isActive: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
