import type { ISODateTime, UUID } from './primitives';

export const CORRECTION_TYPES = [
  'grammar',
  'vocabulary',
  'pronunciation',
  'spelling',
  'word_order',
  'tone',
  'comprehension',
  'fluency',
  'other',
] as const;
export type CorrectionType = (typeof CORRECTION_TYPES)[number];

export const CORRECTION_SEVERITIES = ['minor', 'moderate', 'major'] as const;
export type CorrectionSeverity = (typeof CORRECTION_SEVERITIES)[number];

export interface Correction {
  id: UUID;
  userResponseId: UUID;
  correctionType: CorrectionType;
  severity: CorrectionSeverity;
  originalText: string;
  correctedText: string;
  explanation: string;
  encouragement: string | null;
  retryPrompt: string | null;
  skillIds: UUID[];
  createdAt: ISODateTime;
}
