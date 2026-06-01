// Shared shapes for the book-aligned Italian curriculum seed.
//
// The curriculum is authored one file per unit (Prego! chapter) under
// `./units/`. Each unit file default-exports a `SeedUnit`. `./index.ts`
// assembles them into the flat arrays the seeder upserts.
//
// IMPORTANT (copyright): content here is ORIGINAL. The Prego! textbook informs
// the pedagogical SEQUENCE, SCOPE, and theme of each chapter — never its exact
// wording, example sentences, or exercises. Write fresh explanations + examples.

import type { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';

export interface SkillExample {
  /** The Italian. */
  target: string;
  /** The English gloss. */
  native: string;
  /** Optional teaching aside shown with the example. */
  note?: string;
}

export interface SeedSkill {
  /** Globally unique, kebab-case, `it-…` prefixed. NEVER reuse across units. */
  slug: string;
  name: string;
  category: SkillCategory;
  level: CEFRLevel;
  /** Learner-facing one-to-three sentence explanation of the skill. */
  description: string;
  /** Slugs of skills that should be learned first (resolved to ids at seed). */
  prerequisiteSlugs: string[];
  /** 2–5 original examples. Listening/speaking skills may have none. */
  examples: SkillExample[];
  /** Classic learner errors, e.g. "uses essere instead of avere". */
  commonMistakes?: string[];
  /** Task types that best drill this skill (steers the lesson generator). */
  recommendedPracticeTypes?: TaskType[];
  /** Interest themes this skill personalizes well into. */
  compatibleThemes?: string[];
  /** Generation guidance for Wise — never shown raw to the learner. */
  teachingNotes?: string;
}

export interface SeedLessonTask {
  taskType: TaskType;
  /** What this step drills, in plain language. */
  focus: string;
  /** An exemplar prompt. The engine re-themes this to the learner's interests. */
  prompt: string;
  /** Optional model answer for the exemplar prompt. */
  exampleAnswer?: string;
  /** Personalization guidance for the engine. */
  notes?: string;
}

export interface SeedLessonTemplate {
  /** Globally unique, kebab-case. */
  slug: string;
  title: string;
  lessonType: LessonType;
  level: CEFRLevel;
  summary: string;
  /** Skills this lesson teaches/practices (by slug). */
  objectiveSkillSlugs: string[];
  /** Ordered task arc the engine expands + personalizes. */
  taskBlueprint: SeedLessonTask[];
  defaultDurationMinutes?: number;
  compatibleThemes?: string[];
}

export interface SeedVocab {
  /** Globally unique, kebab-case, unit-prefixed e.g. `cap01-la-stazione`. */
  slug: string;
  targetText: string;
  nativeText: string;
  partOfSpeech?: string;
  /** "m" | "f" | "m/f" | null. */
  gender?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  /** Sub-theme within the chapter, e.g. "luoghi". */
  theme?: string;
  /** "neutral" | "formal" | "informal" | "colloquial". */
  register?: string;
}

export interface SeedCulturalNote {
  title: string;
  body: string;
}

export interface SeedUnit {
  /** "cap-00" (Preliminare), "cap-01" … "cap-18", "appendix". */
  code: string;
  /** 0 = Preliminare, then chapter number; appendix is last. */
  order: number;
  title: string;
  subtitle?: string;
  /** Primary interest theme (maps to learner interest themes). */
  theme: string;
  level: CEFRLevel;
  summary: string;
  /** CEFR-style can-do statements completed by the end of the unit. */
  canDo: string[];
  culturalNotes: SeedCulturalNote[];
  skills: SeedSkill[];
  lessonTemplates: SeedLessonTemplate[];
  vocabulary: SeedVocab[];
}
