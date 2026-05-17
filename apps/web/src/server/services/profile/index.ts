import { prisma } from '@speakwise/db';
import type { Prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';

export async function getProfile(userId: string) {
  return prisma.learnerProfile.findUnique({ where: { userId } });
}

export async function ensureProfile(userId: string) {
  const existing = await getProfile(userId);
  if (existing) return existing;
  const created = await prisma.learnerProfile.create({
    data: { userId },
  });
  await emitUserEvent(userId, 'LearnerProfileCreated', { profileId: created.id });
  return created;
}

export async function updateProfile(userId: string, patch: Prisma.LearnerProfileUpdateInput) {
  return prisma.learnerProfile.update({ where: { userId }, data: patch });
}

export interface WiseProfileSummary {
  name: string;
  level: string;
  goals: string[];
  interests: string[];
  preferredCorrectionStyle: string;
  preferredWisePersonality: string;
  /** 0.0–1.0 share of Wise's spoken output that should be Italian. */
  languageRatio: number;
  /** When true, Italian-only output is forced. */
  immersionMode: boolean;
  /**
   * Whether the languageRatio is a manual override (`true`) or
   * auto-computed from level + mastery (`false`). Surfaced so the
   * profile page can show "Wise is auto-tuning" vs "You set this".
   */
  languageRatioOverridden: boolean;
  /** What the auto-compute WOULD return — useful for the "Reset to auto" affordance. */
  autoLanguageRatio: number;
}

/**
 * Sensible default Italian share by CEFR level. Beginners get 10% per
 * product spec — Italian only on already-covered material — and the
 * share scales up to immersion at C1+.
 */
export function defaultLanguageRatio(level: string): number {
  switch (level) {
    case 'complete_beginner':
      return 0.05;
    case 'beginner':
      return 0.1;
    case 'lower_intermediate':
      return 0.3;
    case 'intermediate':
      return 0.55;
    case 'upper_intermediate':
      return 0.8;
    case 'advanced':
      return 0.95;
    default:
      return 0.1;
  }
}

/**
 * Auto-determined ratio: the level default PLUS a mastery boost worth
 * up to +0.10. The boost scales with what share of the learner's
 * current-level skills are mastered. So a beginner who's mastered 60%
 * of beginner skills bumps from 0.10 → 0.16, naturally easing them
 * into more Italian as they prove they can handle it. The cap of +0.10
 * keeps the bump from spilling into the next level's band before
 * they've actually advanced.
 */
export async function computeAutoLanguageRatio(
  userId: string,
  level: string,
): Promise<number> {
  const base = defaultLanguageRatio(level);
  // Skills at the learner's CURRENT level
  const skillsAtLevel = await prisma.curriculumSkill.findMany({
    where: { level: level as Prisma.EnumCEFRLevelFilter['equals'], isActive: true },
    select: { id: true },
  });
  if (skillsAtLevel.length === 0) return base;
  const skillIds = skillsAtLevel.map((s) => s.id);
  const progress = await prisma.userSkillProgress.findMany({
    where: { userId, skillId: { in: skillIds } },
    select: { masteryScore: true },
  });
  // Treat masteryScore ≥ 0.85 as "mastered" — matches the lesson
  // generator's mastery threshold.
  const mastered = progress.filter((p) => Number(p.masteryScore) >= 0.85).length;
  const masteryFraction = mastered / skillsAtLevel.length;
  const boost = Math.min(0.1, masteryFraction * 0.1);
  return Math.min(1, base + boost);
}

export async function getWiseProfileSummary(userId: string): Promise<WiseProfileSummary | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
  if (!user || !user.profile) return null;
  const level = user.profile.currentLevel;
  const autoLanguageRatio = await computeAutoLanguageRatio(userId, level);
  // If the user manually overrode the ratio on /profile, honor the
  // stored value. Otherwise serve the auto-computed value — so the
  // ratio adapts as they progress without needing any UI interaction.
  const overridden = Boolean(user.profile.languageRatioOverridden);
  const stored = Number(user.profile.languageRatio ?? 0);
  const languageRatio = overridden && stored > 0 ? stored : autoLanguageRatio;
  return {
    name: user.name,
    level,
    goals: user.profile.goals,
    interests: user.profile.interests,
    preferredCorrectionStyle: user.profile.preferredCorrectionStyle,
    preferredWisePersonality: user.profile.preferredWisePersonality,
    languageRatio,
    immersionMode: user.profile.immersionMode,
    languageRatioOverridden: overridden,
    autoLanguageRatio,
  };
}
