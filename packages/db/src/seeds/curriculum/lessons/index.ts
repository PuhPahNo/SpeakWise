// Aggregates the additional (expansion) lesson templates, one file per chapter
// under `./cap-NN-lessons.ts`, each default-exporting `{ unitCode, lessons }`.
//
// To add more lessons to a chapter: create/extend its `cap-NN-lessons.ts` and
// add one import + one entry to `modules` below. The main curriculum index
// merges `extraLessonsByUnit` into each unit's lessonTemplates.

import type { SeedLessonTemplate } from '../types';

import cap00 from './cap-00-lessons';
import cap01 from './cap-01-lessons';
import cap02 from './cap-02-lessons';
import cap03 from './cap-03-lessons';
import cap04 from './cap-04-lessons';
import cap05 from './cap-05-lessons';
import cap06 from './cap-06-lessons';
import cap07 from './cap-07-lessons';
import cap08 from './cap-08-lessons';
import cap09 from './cap-09-lessons';
import cap10 from './cap-10-lessons';
import cap11 from './cap-11-lessons';
import cap12 from './cap-12-lessons';
import cap13 from './cap-13-lessons';
import cap14 from './cap-14-lessons';
import cap15 from './cap-15-lessons';
import cap16 from './cap-16-lessons';
import cap17 from './cap-17-lessons';
import cap18 from './cap-18-lessons';
import cap19 from './cap-19-lessons';

const modules: Array<{ unitCode: string; lessons: SeedLessonTemplate[] }> = [
  cap00,
  cap01,
  cap02,
  cap03,
  cap04,
  cap05,
  cap06,
  cap07,
  cap08,
  cap09,
  cap10,
  cap11,
  cap12,
  cap13,
  cap14,
  cap15,
  cap16,
  cap17,
  cap18,
  cap19,
];

export const extraLessonsByUnit: Record<string, SeedLessonTemplate[]> = {};
for (const m of modules) {
  extraLessonsByUnit[m.unitCode] = [...(extraLessonsByUnit[m.unitCode] ?? []), ...m.lessons];
}
