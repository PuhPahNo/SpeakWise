import { prisma, type SkillStatus } from '@speakwise/db';

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
      OR: [
        { nextReviewAt: { lte: new Date() } },
        { status: 'needs_review' as SkillStatus },
      ],
    },
    include: { skill: true },
    orderBy: { nextReviewAt: 'asc' },
    take: limit,
  });
}
