import type { Decimal, ISODateTime, UUID } from './primitives.js';

export const VOCAB_STATUSES = ['new', 'learning', 'review', 'mastered', 'archived'] as const;
export type VocabStatus = (typeof VOCAB_STATUSES)[number];

export interface VocabularyItem {
  id: UUID;
  userId: UUID;
  targetText: string;
  nativeText: string;
  partOfSpeech: string | null;
  exampleSentence: string | null;
  exampleTranslation: string | null;
  status: VocabStatus;
  tags: string[];
  sourceLessonId: UUID | null;
  sourceSessionId: UUID | null;
  masteryScore: Decimal;
  exposureCount: number;
  correctCount: number;
  incorrectCount: number;
  lastReviewedAt: ISODateTime | null;
  nextReviewAt: ISODateTime | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
