import type { Decimal, ISODateTime, UUID } from './primitives.js';

export const INPUT_TYPES = ['voice', 'text', 'multiple_choice', 'selection'] as const;
export type InputType = (typeof INPUT_TYPES)[number];

export interface UserResponse {
  id: UUID;
  sessionId: UUID;
  lessonTaskId: UUID | null;
  inputType: InputType;
  userAnswer: string;
  transcription: string | null;
  correctedAnswer: string | null;
  isCorrect: boolean | null;
  score: Decimal | null;
  feedback: string | null;
  grammarTags: string[];
  vocabularyItemIds: UUID[];
  skillIds: UUID[];
  createdAt: ISODateTime;
}
