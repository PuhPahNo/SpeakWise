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
}

/**
 * Sensible default Italian share by CEFR level. The user's explicit
 * `languageRatio` always wins; this only fires for new profiles or as a
 * sanity ceiling. Beginners get 10% per product spec — Italian only on
 * already-covered material — and the share scales up to immersion at C1+.
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

export async function getWiseProfileSummary(userId: string): Promise<WiseProfileSummary | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
  if (!user || !user.profile) return null;
  // Stored ratio overrides the level default; defaultLanguageRatio is the
  // floor when the stored value is suspiciously zero (cold-start profile).
  const stored = Number(user.profile.languageRatio ?? 0);
  const level = user.profile.currentLevel;
  const languageRatio = stored > 0 ? stored : defaultLanguageRatio(level);
  return {
    name: user.name,
    level,
    goals: user.profile.goals,
    interests: user.profile.interests,
    preferredCorrectionStyle: user.profile.preferredCorrectionStyle,
    preferredWisePersonality: user.profile.preferredWisePersonality,
    languageRatio,
    immersionMode: user.profile.immersionMode,
  };
}
