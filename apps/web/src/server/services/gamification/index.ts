import { prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';

export const XP_REWARDS = {
  lesson_completed: 50,
  task_correct: 5,
  vocabulary_mastered: 10,
  comeback_lesson: 30,
  streak_milestone: 100,
};

export async function awardXp(userId: string, amount: number, reason: string, sourceId?: string) {
  if (!sourceId) {
    return prisma.xpEntry.create({ data: { userId, amount, reason } });
  }
  return prisma.xpEntry.upsert({
    where: { userId_reason_sourceId: { userId, reason, sourceId } },
    update: {},
    create: { userId, amount, reason, sourceId },
  });
}

export async function getXpTotal(userId: string) {
  const result = await prisma.xpEntry.aggregate({
    where: { userId },
    _sum: { amount: true },
  });
  return result._sum.amount ?? 0;
}

export interface GamificationSummary {
  xpTotal: number;
  streakDays: number;
  longestStreakDays: number;
  lastActiveDate: string | null;
}

function calendarDateInTimezone(timezone: string, now = new Date()) {
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(now);
  } catch {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(now);
  }
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  return new Date(Date.UTC(value('year'), value('month') - 1, value('day')));
}

export async function getGamificationSummary(userId: string): Promise<GamificationSummary> {
  const [xp, streak] = await Promise.all([
    getXpTotal(userId),
    prisma.userStreak.findUnique({ where: { userId } }),
  ]);
  return {
    xpTotal: xp,
    streakDays: streak?.currentDays ?? 0,
    longestStreakDays: streak?.longestDays ?? 0,
    lastActiveDate: streak?.lastActiveDate?.toISOString() ?? null,
  };
}

/** XP attributable to one lesson attempt, excluding unrelated activity. */
export async function getLessonSessionXp(userId: string, sessionId: string): Promise<number> {
  const responses = await prisma.userResponse.findMany({
    where: { sessionId, session: { userId } },
    select: { lessonTaskId: true },
  });
  const sourceIds = [sessionId, ...responses.flatMap((response) => response.lessonTaskId ?? [])];
  const result = await prisma.xpEntry.aggregate({
    where: { userId, sourceId: { in: sourceIds } },
    _sum: { amount: true },
  });
  return result._sum.amount ?? 0;
}

export async function bumpStreak(userId: string) {
  const [existing, user] = await Promise.all([
    prisma.userStreak.findUnique({ where: { userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { timezone: true } }),
  ]);
  const today = calendarDateInTimezone(user?.timezone ?? 'UTC');

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
    await awardXp(userId, XP_REWARDS.streak_milestone, `streak_${newCurrent}`, userId);
  }

  return prisma.userStreak.update({
    where: { userId },
    data: { currentDays: newCurrent, longestDays: newLongest, lastActiveDate: today },
  });
}

export async function offerComebackIfNeeded(userId: string, emitEvent = false) {
  const [streak, user] = await Promise.all([
    prisma.userStreak.findUnique({ where: { userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { timezone: true } }),
  ]);
  if (!streak?.lastActiveDate) return null;
  const today = calendarDateInTimezone(user?.timezone ?? 'UTC');
  const lastDay = new Date(streak.lastActiveDate);
  const daysMissed = Math.floor((today.getTime() - lastDay.getTime()) / (24 * 60 * 60 * 1000));
  if (daysMissed < 1) return null;

  const offer = {
    daysMissed,
    recommendedDurationMinutes: daysMissed === 1 ? 4 : 6,
    reason: 'missed_planned_session',
  };
  if (emitEvent) {
    const alreadyEmitted = await prisma.userEvent.findFirst({
      where: { userId, eventType: 'ComebackLessonOffered', createdAt: { gte: today } },
      select: { id: true },
    });
    if (!alreadyEmitted) await emitUserEvent(userId, 'ComebackLessonOffered', offer);
  }
  return offer;
}
