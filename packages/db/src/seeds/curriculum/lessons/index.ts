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

const modules: Array<{ unitCode: string; lessons: SeedLessonTemplate[] }> = [
  cap00,
  cap01,
  cap02,
  cap03,
  cap04,
  cap05,
  cap06,
];

export const extraLessonsByUnit: Record<string, SeedLessonTemplate[]> = {};
for (const m of modules) {
  extraLessonsByUnit[m.unitCode] = [...(extraLessonsByUnit[m.unitCode] ?? []), ...m.lessons];
}
