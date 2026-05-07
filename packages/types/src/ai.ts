import type { CEFRLevel } from './primitives';
import type { CorrectionSeverity, CorrectionType } from './correction';
import type { LessonType, TaskType } from './lesson';
import type { MemoryType, MemoryVisibility } from './memory';

export interface LessonGenerationOutput {
  title: string;
  lessonType: LessonType;
  estimatedDurationMinutes: number;
  targetSkills: string[];
  interestTheme: string | null;
  briefing: string;
  tasks: Array<{
    taskType: TaskType;
    prompt: string;
    options?: Array<{ value: string; label: string }>;
    expectedAnswer?: unknown;
    explanation?: string;
    skillTags: string[];
    vocabularyTargets: string[];
  }>;
  recapPlan: string;
}

export interface CorrectionOutput {
  isCorrect: boolean;
  score: number;
  encouragement: string;
  correctedAnswer: string;
  explanation: string;
  mistakeType: CorrectionType;
  severity: CorrectionSeverity;
  skillTags: string[];
  retryPrompt: string | null;
  shouldUpdateMemory: boolean;
}

export interface MemoryCandidate {
  type: MemoryType;
  content: string;
  visibility: MemoryVisibility;
  confidence: number;
  structuredData?: Record<string, unknown>;
}

export interface MemoryExtractionOutput {
  memoryCandidates: MemoryCandidate[];
  profileUpdates: Record<string, unknown>;
  skillSignals: Array<{ skillSlug: string; outcome: 'correct' | 'incorrect'; weight: number }>;
  vocabularySignals: Array<{ targetText: string; outcome: 'correct' | 'incorrect' }>;
}

export interface ProgressReportOutput {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skillsMastered: string[];
  skillsNeedingReview: string[];
  vocabularySummary: {
    learning: number;
    review: number;
    mastered: number;
  };
  recommendedNextSteps: string[];
}

export type WiseIntent =
  | 'greet'
  | 'recommend_next'
  | 'start_lesson'
  | 'continue_lesson'
  | 'submit_practice_response'
  | 'explain_concept'
  | 'update_preference'
  | 'request_progress_report'
  | 'freestyle_conversation'
  | 'request_media_lesson'
  | 'unknown';

export interface WiseAction {
  type:
    | 'START_LESSON'
    | 'GENERATE_LESSON'
    | 'CONTINUE_LESSON'
    | 'OPEN_PROFILE'
    | 'UPDATE_PROFILE'
    | 'OPEN_PROGRESS'
    | 'OPEN_VOCAB'
    | 'NONE';
  lessonId?: string;
  payload?: Record<string, unknown>;
}

export interface WiseTurnOutput {
  intent: WiseIntent;
  wiseMessage: string;
  actions: WiseAction[];
  memoryCandidates: MemoryCandidate[];
  audioUrl?: string;
}

export interface PlacementAssessmentOutput {
  estimatedLevel: CEFRLevel;
  confidence: number;
  reasoning: string;
  suggestedFirstSkillSlugs: string[];
}
