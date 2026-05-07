import type { CEFRLevel, Decimal, ISODateTime, UUID } from './primitives';

export const LEARNING_STYLES = [
  'mission',
  'tutor',
  'conversation',
  'drill',
  'balanced',
] as const;
export type LearningStyle = (typeof LEARNING_STYLES)[number];

export const CORRECTION_STYLES = [
  'gentle',
  'direct',
  'strict',
  'end_of_task',
  'major_mistakes_only',
  'adaptive',
] as const;
export type CorrectionStyle = (typeof CORRECTION_STYLES)[number];

export const WISE_PERSONALITIES = [
  'default',
  'friendly_tutor',
  'direct_coach',
  'game_master',
  'premium_assistant',
  'strict_grammar_coach',
  'casual_companion',
] as const;
export type WisePersonality = (typeof WISE_PERSONALITIES)[number];

export interface LearnerProfile {
  id: UUID;
  userId: UUID;
  currentLevel: CEFRLevel;
  levelConfidence: Decimal | null;
  goals: string[];
  interests: string[];
  preferredLearningStyle: LearningStyle;
  preferredCorrectionStyle: CorrectionStyle;
  preferredWisePersonality: WisePersonality;
  preferredSessionLengthMinutes: number | null;
  preferredFrequency: string | null;
  motivationNotes: string | null;
  /** ElevenLabs voice ID; null = app default. */
  wiseVoiceId: string | null;
  onboardingCompleted: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
