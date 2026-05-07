import { prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';

export const XP_REWARDS = {
  lesson_completed: 50,
  task_correct: 5,
  vocabulary_mastered: 10,
  comeback_lesson: 30,
  streak_milestone: 100,
};

export async function awardXp(
  userId: string,
  amount: number,
  reason: string,
  sourceId?: string,
) {
  await prisma.xpEntry.create({ data: { userId, amount, reason, sourceId } });
}

export async function getXpTotal(userId: string) {
  const result = await prisma.xpEntry.aggregate({
    where: { userId },
    _sum: { amount: true },
  });
  return result._sum.amount ?? 0;
}

export async function bumpStreak(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const existing = await prisma.userStreak.findUnique({ where: { userId } });

  if (!existing) {
    return prisma.userStreak.create({
      data: { userId, currentDays: 1, longestDays: 1, lastActiveDate: today },
    });
  }

  const lastDay = existing.lastActiveDate ? new Date(existing.lastActiveDate) : null;
  if (lastDay && lastDay.getTime() === today.getTime()) {
    return existing;
  }

  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const isContinuation = lastDay && lastDay.getTime() === yesterday.getTime();

  const newCurrent = isContinuation ? existing.currentDays + 1 : 1;
  const newLongest = Math.max(existing.longestDays, newCurrent);

  if (newCurrent > 0 && newCurrent % 7 === 0) {
    await awardXp(userId, XP_REWARDS.streak_milestone, `streak_${newCurrent}`);
  }

  return prisma.userStreak.update({
    where: { userId },
    data: { currentDays: newCurrent, longestDays: newLongest, lastActiveDate: today },
  });
}

export async function offerComebackIfNeeded(userId: string) {
  const streak = await prisma.userStreak.findUnique({ where: { userId } });
  if (!streak?.lastActiveDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastDay = new Date(streak.lastActiveDate);
  const daysMissed = Math.floor((today.getTime() - lastDay.getTime()) / (24 * 60 * 60 * 1000));
  if (daysMissed < 1) return null;

  const offer = {
    daysMissed,
    recommendedDurationMinutes: daysMissed === 1 ? 4 : 6,
    reason: 'missed_planned_session',
  };
  await emitUserEvent(userId, 'ComebackLessonOffered', offer);
  return offer;
}
