// Assembles the book-aligned Italian curriculum from per-unit files.
//
// To add a chapter: create `./units/cap-NN-…ts` (default-exporting a SeedUnit),
// then add one import + one entry to `units` below. Everything downstream
// (flat skill/template/vocab arrays, integrity checks, the seeder) updates
// automatically.

import { extraLessonsByUnit } from './lessons';
import type { SeedLessonTemplate, SeedSkill, SeedUnit, SeedVocab } from './types';

import capPreliminare from './units/cap-00-preliminare';
import cap01 from './units/cap-01-una-citta-italiana';
import cap02 from './units/cap-02-come-siamo';
import cap03 from './units/cap-03-studiare-in-italia';
import cap04 from './units/cap-04-sport-e-passatempi';
import cap05 from './units/cap-05-caffe-e-cappuccino';
import cap06 from './units/cap-06-buon-appetito';
import cap07 from './units/cap-07-la-vita-di-tutti-i-giorni';
import cap08 from './units/cap-08-cinema-stampa-tv';
import cap09 from './units/cap-09-sentirsi-bene';
import cap10 from './units/cap-10-buon-viaggio';
import cap11 from './units/cap-11-spesa-e-spese';
import cap12 from './units/cap-12-cercare-casa';
import cap13 from './units/cap-13-difesa-dell-ambiente';
import cap14 from './units/cap-14-musica-e-teatro';
import cap15 from './units/cap-15-le-belle-arti';
import cap16 from './units/cap-16-politica-e-societa';
import cap17 from './units/cap-17-mondo-del-lavoro';
import cap18 from './units/cap-18-societa-multiculturale';
import cap19 from './units/cap-19-appendice';

/** Every unit, in course order. Order is enforced by the `order` field, not array position. */
export const italianCurriculumUnits: SeedUnit[] = [
  capPreliminare,
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
].sort((a, b) => a.order - b.order);

// Merge in the additional lesson templates authored under ./lessons/ (the
// lesson-expansion pass). Each unit's inline templates come first, then its
// extras — `order` is recomputed contiguously when the flat list is built.
for (const u of italianCurriculumUnits) {
  const extra = extraLessonsByUnit[u.code];
  if (extra && extra.length > 0) {
    u.lessonTemplates = [...u.lessonTemplates, ...extra];
  }
}

/** Flat skill list across all units (back-compat with the original seed export). */
export const italianCurriculumSeed: Array<SeedSkill & { unitCode: string; orderInUnit: number }> =
  italianCurriculumUnits.flatMap((u) =>
    u.skills.map((s, i) => ({ ...s, unitCode: u.code, orderInUnit: i })),
  );

/** Flat lesson-template list, each tagged with its unit code. */
export const italianLessonTemplates: Array<
  SeedLessonTemplate & { unitCode: string; order: number }
> = italianCurriculumUnits.flatMap((u) =>
  u.lessonTemplates.map((t, i) => ({ ...t, unitCode: u.code, order: i })),
);

/** Flat canonical-vocabulary list, each tagged with its unit code. */
export const italianCurriculumVocabulary: Array<SeedVocab & { unitCode: string; order: number }> =
  italianCurriculumUnits.flatMap((u) =>
    u.vocabulary.map((v, i) => ({ ...v, unitCode: u.code, order: i })),
  );

/**
 * Dev-time integrity check. Catches the mistakes that are easy to make when
 * authoring many units by hand: duplicate slugs, prerequisite/objective slugs
 * that point at nothing, duplicate unit codes/orders. Throws with a readable
 * list so the seeder fails fast instead of writing inconsistent data.
 */
export function assertCurriculumIntegrity(): void {
  const errors: string[] = [];

  const seen = <T>(items: T[], key: (t: T) => string, label: string) => {
    const counts = new Map<string, number>();
    for (const it of items) counts.set(key(it), (counts.get(key(it)) ?? 0) + 1);
    for (const [k, n] of counts) if (n > 1) errors.push(`${label}: duplicate "${k}" (${n}×)`);
  };

  seen(italianCurriculumUnits, (u) => u.code, 'unit code');
  seen(italianCurriculumUnits, (u) => String(u.order), 'unit order');
  seen(italianCurriculumSeed, (s) => s.slug, 'skill slug');
  seen(italianLessonTemplates, (t) => t.slug, 'lesson-template slug');
  seen(italianCurriculumVocabulary, (v) => v.slug, 'vocabulary slug');

  const skillSlugs = new Set(italianCurriculumSeed.map((s) => s.slug));
  for (const s of italianCurriculumSeed) {
    for (const p of s.prerequisiteSlugs) {
      if (!skillSlugs.has(p)) errors.push(`skill "${s.slug}": prerequisite "${p}" not found`);
    }
  }
  for (const t of italianLessonTemplates) {
    for (const o of t.objectiveSkillSlugs) {
      if (!skillSlugs.has(o)) errors.push(`lesson "${t.slug}": objective skill "${o}" not found`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Curriculum integrity check failed:\n  - ${errors.join('\n  - ')}`);
  }
}

export type { SeedUnit, SeedSkill, SeedLessonTemplate, SeedVocab } from './types';
