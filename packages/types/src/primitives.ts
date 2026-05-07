export type UUID = string;
export type ISODateTime = string;
export type Decimal = number;

export type Language = 'en' | 'it';

export const CEFR_LEVELS = [
  'complete_beginner',
  'beginner',
  'lower_intermediate',
  'intermediate',
  'upper_intermediate',
  'advanced',
] as const;
export type CEFRLevel = (typeof CEFR_LEVELS)[number];

export interface Timestamps {
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
