import type { Decimal, ISODateTime, UUID } from './primitives';

export const SKILL_STATUSES = [
  'not_started',
  'introduced',
  'practicing',
  'needs_review',
  'proficient',
  'mastered',
] as const;
export type SkillStatus = (typeof SKILL_STATUSES)[number];

export interface UserSkillProgress {
  id: UUID;
  userId: UUID;
  skillId: UUID;
  status: SkillStatus;
  masteryScore: Decimal;
  exposureCount: number;
  correctCount: number;
  incorrectCount: number;
  lastPracticedAt: ISODateTime | null;
  nextReviewAt: ISODateTime | null;
  mistakeCount: number;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
