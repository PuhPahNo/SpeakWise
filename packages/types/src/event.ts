import type { CorrectionSeverity, CorrectionType } from './correction';
import type { LessonType } from './lesson';
import type { MemoryType, MemoryVisibility } from './memory';
import type { ISODateTime, UUID } from './primitives';
import type { CEFRLevel, Language } from './primitives';
import type { SkillStatus } from './progress';

export const USER_EVENT_TYPES = [
  'OnboardingStarted',
  'OnboardingCompleted',
  'LearnerProfileCreated',
  'PlacementAssessmentRequested',
  'LessonGenerated',
  'LessonStarted',
  'LessonCompleted',
  'LessonSkipped',
  'PracticeAnswered',
  'MistakeDetected',
  'UserCorrected',
  'SkillEvidenceObserved',
  'SkillMasteryChanged',
  'VocabularyIntroduced',
  'VocabularyReviewed',
  'VocabularyMastered',
  'MemoryUpdated',
  'SessionCompleted',
  'UserMissedPlannedSession',
  'ComebackLessonOffered',
  'AICall',
  // Tutor / Classroom audit events. Student-scoped (the userId is the
  // student) so the existing per-user event timeline shows tutor activity
  // alongside the learner's own actions.
  'TutorLinked',
  'TutorUnlinked',
  'TutorDirectiveIssued',
  'TutorDirectiveArchived',
] as const;
export type UserEventType = (typeof USER_EVENT_TYPES)[number];

export interface UserEvent<T extends UserEventType = UserEventType> {
  id: UUID;
  userId: UUID | null;
  eventType: T;
  payload: UserEventPayloadMap[T];
  createdAt: ISODateTime;
}

export interface OnboardingCompletedPayload {
  profileId: UUID;
  nativeLanguage: Language;
  targetLanguage: Language;
  level: CEFRLevel;
  goals: string[];
  interests: string[];
}

export interface LessonGeneratedPayload {
  lessonId: UUID;
  lessonType: LessonType;
  targetSkillIds: UUID[];
  interestTheme: string | null;
}

export interface LessonStartedPayload {
  lessonId: UUID;
  sessionId: UUID;
  mode: 'voice' | 'text' | 'mixed';
}

export interface PracticeAnsweredPayload {
  sessionId: UUID;
  lessonTaskId: UUID;
  userResponseId: UUID;
  inputType: 'voice' | 'text' | 'multiple_choice' | 'selection';
  skillIds: UUID[];
  vocabularyItemIds: UUID[];
}

export interface MistakeDetectedPayload {
  userResponseId: UUID;
  correctionId: UUID;
  skillIds: UUID[];
  severity: CorrectionSeverity;
  mistakeType: CorrectionType;
}

export interface SkillMasteryChangedPayload {
  skillId: UUID;
  oldStatus: SkillStatus;
  newStatus: SkillStatus;
  oldMasteryScore: number;
  newMasteryScore: number;
}

export interface VocabularyReviewedPayload {
  vocabId: UUID;
  result: 'correct' | 'incorrect';
  oldMasteryScore: number;
  newMasteryScore: number;
  nextReviewAt: ISODateTime;
}

export interface MemoryUpdatedPayload {
  memoryId: UUID;
  type: MemoryType;
  visibility: MemoryVisibility;
  sourceSessionId: UUID | null;
}

export interface SessionCompletedPayload {
  sessionId: UUID;
  lessonId: UUID | null;
  durationSeconds: number;
  tasksCompleted: number;
  mistakesDetected: number;
}

export interface ComebackLessonOfferedPayload {
  daysMissed: number;
  recommendedDurationMinutes: number;
  reason: string;
}

export interface AICallPayload {
  provider: 'openai' | 'elevenlabs';
  model: string;
  purpose: string;
  tokensIn?: number;
  tokensOut?: number;
  audioSeconds?: number;
  latencyMs: number;
  costUsd?: number;
  ok: boolean;
  errorMessage?: string;
}

export interface UserEventPayloadMap {
  OnboardingStarted: { mode: 'voice' | 'text' };
  OnboardingCompleted: OnboardingCompletedPayload;
  LearnerProfileCreated: { profileId: UUID };
  PlacementAssessmentRequested: { profileId: UUID };
  LessonGenerated: LessonGeneratedPayload;
  LessonStarted: LessonStartedPayload;
  LessonCompleted: SessionCompletedPayload;
  LessonSkipped: { lessonId: UUID; reason: string };
  PracticeAnswered: PracticeAnsweredPayload;
  MistakeDetected: MistakeDetectedPayload;
  UserCorrected: { userResponseId: UUID; correctionId: UUID };
  SkillEvidenceObserved: { skillId: UUID; userResponseId: UUID; outcome: 'correct' | 'incorrect' };
  SkillMasteryChanged: SkillMasteryChangedPayload;
  VocabularyIntroduced: { vocabId: UUID; sourceLessonId: UUID | null };
  VocabularyReviewed: VocabularyReviewedPayload;
  VocabularyMastered: { vocabId: UUID };
  MemoryUpdated: MemoryUpdatedPayload;
  SessionCompleted: SessionCompletedPayload;
  UserMissedPlannedSession: { plannedAt: ISODateTime };
  ComebackLessonOffered: ComebackLessonOfferedPayload;
  AICall: AICallPayload;
  TutorLinked: { tutorUserId: UUID; tutorName: string };
  TutorUnlinked: { tutorUserId: UUID | null };
  TutorDirectiveIssued: {
    directiveId: UUID;
    tutorUserId: UUID;
    body: string;
    pinnedSkillIds: UUID[];
  };
  TutorDirectiveArchived: { directiveId: UUID; tutorUserId: UUID };
}
