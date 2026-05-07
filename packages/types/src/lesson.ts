import type { CEFRLevel, ISODateTime, UUID } from './primitives.js';

export const LESSON_TYPES = [
  'daily_mission',
  'recovery',
  'freestyle',
  'grammar',
  'vocabulary_review',
  'speaking_challenge',
  'listening_challenge',
  'media',
  'scenario_roleplay',
  'progress_check',
  'placement',
] as const;
export type LessonType = (typeof LESSON_TYPES)[number];

export const LESSON_STATUSES = [
  'draft',
  'recommended',
  'active',
  'completed',
  'skipped',
  'archived',
] as const;
export type LessonStatus = (typeof LESSON_STATUSES)[number];

export const LESSON_AUTHORS = ['wise', 'user', 'admin', 'tutor'] as const;
export type LessonAuthor = (typeof LESSON_AUTHORS)[number];

export const TASK_TYPES = [
  'briefing',
  'explanation',
  'multiple_choice',
  'fill_blank',
  'translation',
  'conjugation',
  'pronoun_replacement',
  'tense_selection',
  'error_correction',
  'speaking_prompt',
  'listening_comprehension',
  'roleplay',
  'recap',
  'media_clip',
  'reflection',
] as const;
export type TaskType = (typeof TASK_TYPES)[number];

export interface LessonGenerationContext {
  userRequest?: string;
  durationMinutes?: number;
  interestTheme?: string;
  recentMistakeSkillIds?: UUID[];
  vocabularyDueIds?: UUID[];
  promptVersion?: string;
}

export interface LessonContent {
  briefing: string;
  recapPlan: string;
  notesForWise?: string;
}

export interface Lesson {
  id: UUID;
  userId: UUID;
  title: string;
  lessonType: LessonType;
  status: LessonStatus;
  targetSkillIds: UUID[];
  interestTheme: string | null;
  estimatedDurationMinutes: number | null;
  difficultyLevel: CEFRLevel;
  generationContext: LessonGenerationContext;
  content: LessonContent;
  createdBy: LessonAuthor;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  completedAt: ISODateTime | null;
}

export interface MultipleChoiceOption {
  value: string;
  label: string;
}

export interface LessonTask {
  id: UUID;
  lessonId: UUID;
  taskType: TaskType;
  orderIndex: number;
  prompt: string;
  targetSkillIds: UUID[];
  vocabularyItemIds: UUID[];
  expectedAnswer: unknown | null;
  options: MultipleChoiceOption[] | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
