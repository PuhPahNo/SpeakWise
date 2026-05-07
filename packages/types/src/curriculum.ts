import type { CEFRLevel, ISODateTime, Language, UUID } from './primitives.js';

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
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
