import type { ISODateTime, Language, UUID } from './primitives';

export const MEDIA_SOURCE_TYPES = [
  'youtube',
  'uploaded',
  'licensed',
  'ai_generated',
  'article',
  'transcript',
  'other',
] as const;
export type MediaSourceType = (typeof MEDIA_SOURCE_TYPES)[number];

export const RIGHTS_STATUSES = [
  'unknown',
  'user_provided',
  'public',
  'licensed',
  'ai_generated',
  'restricted',
] as const;
export type RightsStatus = (typeof RIGHTS_STATUSES)[number];

export interface MediaItem {
  id: UUID;
  sourceType: MediaSourceType;
  sourceUrl: string | null;
  title: string;
  language: Language;
  transcript: string | null;
  durationSeconds: number | null;
  tags: string[];
  rightsStatus: RightsStatus;
  metadata: Record<string, unknown>;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
