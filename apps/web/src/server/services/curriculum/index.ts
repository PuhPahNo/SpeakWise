import { type SkillStatus, prisma } from '@speakwise/db';

export async function listSkills(opts?: { level?: string; category?: string }) {
  return prisma.curriculumSkill.findMany({
    where: {
      isActive: true,
      ...(opts?.level ? { level: opts.level as never } : {}),
      ...(opts?.category ? { category: opts.category as never } : {}),
    },
    orderBy: [{ level: 'asc' }, { name: 'asc' }],
  });
}

export async function getSkillBySlug(slug: string) {
  return prisma.curriculumSkill.findUnique({ where: { slug } });
}

export async function getSkillsBySlugs(slugs: string[]) {
  if (slugs.length === 0) return [];
  return prisma.curriculumSkill.findMany({ where: { slug: { in: slugs } } });
}

export async function getOrInitProgress(userId: string, skillId: string) {
  const existing = await prisma.userSkillProgress.findUnique({
    where: { userId_skillId: { userId, skillId } },
  });
  if (existing) return existing;
  return prisma.userSkillProgress.create({
    data: { userId, skillId, status: 'introduced' },
  });
}

/**
 * Skills the learner has at least started. For new users falls back to
 * "skills available at their current level."
 */
export async function getActiveSkills(userId: string) {
  const started = await prisma.userSkillProgress.findMany({
    where: { userId, status: { not: 'mastered' } },
    include: { skill: true },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  });
  return started.map((p) => p.skill);
}

export async function getSkillsDueForReview(userId: string, limit = 10) {
  return prisma.userSkillProgress.findMany({
    where: {
      userId,
      OR: [{ nextReviewAt: { lte: new Date() } }, { status: 'needs_review' as SkillStatus }],
    },
    include: { skill: true },
    orderBy: { nextReviewAt: 'asc' },
    take: limit,
  });
}

// ─── Book-aligned units (chapters), lesson templates, canonical vocab ───────

/** The course path: every active unit (chapter) in order, light fields only. */
export async function listUnits() {
  return prisma.curriculumUnit.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    select: {
      id: true,
      code: true,
      order: true,
      title: true,
      subtitle: true,
      theme: true,
      level: true,
      summary: true,
      canDo: true,
    },
  });
}

/**
 * The course path with the learner's progress per chapter: how many of the
 * unit's skills they've started and how many they've reached proficiency on.
 * Drives the /course overview.
 */
export async function getCourseProgress(userId: string) {
  const units = await prisma.curriculumUnit.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    select: {
      id: true,
      code: true,
      order: true,
      title: true,
      subtitle: true,
      theme: true,
      level: true,
      summary: true,
      canDo: true,
      skills: { select: { id: true } },
    },
  });
  const progress = await prisma.userSkillProgress.findMany({
    where: { userId },
    select: { skillId: true, status: true },
  });
  const statusBySkill = new Map(progress.map((p) => [p.skillId, p.status]));

  return units.map(({ skills, ...rest }) => {
    let started = 0;
    let mastered = 0;
    for (const s of skills) {
      const st = statusBySkill.get(s.id);
      if (!st || st === 'not_started') continue;
      started++;
      if (st === 'proficient' || st === 'mastered') mastered++;
    }
    return { ...rest, total: skills.length, started, mastered };
  });
}

/** One chapter with its skills, lesson templates, and thematic vocabulary. */
export async function getUnitDetail(code: string) {
  return prisma.curriculumUnit.findUnique({
    where: { code },
    include: {
      skills: { orderBy: { orderInUnit: 'asc' } },
      lessonTemplates: { where: { isActive: true }, orderBy: { order: 'asc' } },
      vocabulary: { orderBy: { order: 'asc' } },
    },
  });
}

export async function getLessonTemplate(slug: string) {
  return prisma.curriculumLessonTemplate.findUnique({ where: { slug } });
}

export async function getLessonTemplatesForUnit(unitId: string) {
  return prisma.curriculumLessonTemplate.findMany({
    where: { unitId, isActive: true },
    orderBy: { order: 'asc' },
  });
}

export async function getCanonicalVocabForUnit(unitId: string) {
  return prisma.curriculumVocabulary.findMany({
    where: { unitId },
    orderBy: { order: 'asc' },
  });
}

/**
 * Materialize a chapter's canonical vocabulary into the learner's personal
 * deck (VocabularyItem) so it enters SRS review. Idempotent: skips words the
 * learner already has. Called when a learner starts/reaches a unit.
 */
export async function materializeUnitVocabularyForUser(userId: string, unitCode: string) {
  const unit = await prisma.curriculumUnit.findUnique({
    where: { code: unitCode },
    include: { vocabulary: { orderBy: { order: 'asc' } } },
  });
  if (!unit || unit.vocabulary.length === 0) return { created: 0 };

  const existing = await prisma.vocabularyItem.findMany({
    where: { userId },
    select: { targetText: true },
  });
  const have = new Set(existing.map((e) => e.targetText.trim().toLowerCase()));
  const toCreate = unit.vocabulary.filter((v) => !have.has(v.targetText.trim().toLowerCase()));
  if (toCreate.length === 0) return { created: 0 };

  await prisma.vocabularyItem.createMany({
    data: toCreate.map((v) => ({
      userId,
      targetText: v.targetText,
      nativeText: v.nativeText,
      partOfSpeech: v.partOfSpeech,
      exampleSentence: v.exampleSentence,
      exampleTranslation: v.exampleTranslation,
      // status defaults to `new`; tag with the chapter + sub-theme for filtering
      tags: [unit.code, ...(v.theme ? [v.theme] : [])],
    })),
    skipDuplicates: true,
  });
  return { created: toCreate.length };
}
