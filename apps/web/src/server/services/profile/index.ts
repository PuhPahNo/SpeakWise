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
}

export async function getWiseProfileSummary(userId: string): Promise<WiseProfileSummary | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
  if (!user || !user.profile) return null;
  return {
    name: user.name,
    level: user.profile.currentLevel,
    goals: user.profile.goals,
    interests: user.profile.interests,
    preferredCorrectionStyle: user.profile.preferredCorrectionStyle,
    preferredWisePersonality: user.profile.preferredWisePersonality,
  };
}
