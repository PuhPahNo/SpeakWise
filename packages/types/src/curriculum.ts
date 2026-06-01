import type { CEFRLevel, ISODateTime, Language, UUID } from './primitives';

export const SKILL_CATEGORIES = [
  'pronunciation',
  'vocabulary',
  'grammar',
  'speaking',
  'listening',
  'reading',
  'writing',
  'culture',
  'fluency',
] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export interface SkillExample {
  target: string;
  native: string;
  note?: string;
}

export interface CurriculumSkill {
  id: UUID;
  language: Language;
  name: string;
  slug: string;
  category: SkillCategory;
  level: CEFRLevel;
  description: string;
  prerequisites: UUID[];
  examples: SkillExample[];
  isActive: boolean;
  // Book-aligned content layer (Prego!-derived curriculum).
  unitId: UUID | null;
  orderInUnit: number | null;
  commonMistakes: string[];
  recommendedPracticeTypes: string[];
  compatibleThemes: string[];
  teachingNotes: string | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface CulturalNote {
  title: string;
  body: string;
}

/** A book-aligned unit (Prego! chapter) grouping skills, lessons, and vocab. */
export interface CurriculumUnit {
  id: UUID;
  language: Language;
  code: string;
  order: number;
  title: string;
  subtitle: string | null;
  theme: string;
  level: CEFRLevel;
  summary: string;
  canDo: string[];
  culturalNotes: CulturalNote[];
  isActive: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface LessonTaskBlueprint {
  taskType: string;
  focus: string;
  prompt: string;
  exampleAnswer?: string;
  notes?: string;
}

/** A reusable, authored lesson blueprint the engine personalizes per learner. */
export interface CurriculumLessonTemplate {
  id: UUID;
  unitId: UUID;
  slug: string;
  title: string;
  lessonType: string;
  order: number;
  level: CEFRLevel;
  summary: string;
  objectiveSkillSlugs: string[];
  taskBlueprint: LessonTaskBlueprint[];
  defaultDurationMinutes: number;
  compatibleThemes: string[];
  isActive: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/** Canonical thematic vocabulary for a unit (materialized into VocabularyItem). */
export interface CurriculumVocabulary {
  id: UUID;
  unitId: UUID;
  slug: string;
  targetText: string;
  nativeText: string;
  partOfSpeech: string | null;
  gender: string | null;
  exampleSentence: string | null;
  exampleTranslation: string | null;
  theme: string | null;
  register: string | null;
  order: number;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
