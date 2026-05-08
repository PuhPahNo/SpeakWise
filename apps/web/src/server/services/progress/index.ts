import { type SkillStatus, prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';

interface RecordResultOpts {
  userId: string;
  skillId: string;
  correct: boolean;
  weight?: number;
}

const NEXT_REVIEW_DAYS_CORRECT = [1, 3, 7, 14, 30];

function nextStatus(prev: SkillStatus, correct: boolean, masteryScore: number): SkillStatus {
  if (!correct) {
    return masteryScore < 0.3 ? 'practicing' : 'needs_review';
  }
  if (masteryScore >= 0.85) return 'mastered';
  if (masteryScore >= 0.7) return 'proficient';
  if (masteryScore >= 0.4) return 'practicing';
  if (prev === 'not_started') return 'introduced';
  return prev;
}

export async function recordSkillEvidence({
  userId,
  skillId,
  correct,
  weight = 0.1,
}: RecordResultOpts) {
  const prev = await prisma.userSkillProgress.upsert({
    where: { userId_skillId: { userId, skillId } },
    update: {},
    create: { userId, skillId, status: 'introduced' },
  });

  const oldScore = Number(prev.masteryScore);
  const delta = correct ? weight : -weight * 0.7;
  const newScore = Math.max(0, Math.min(1, oldScore + delta));

  const correctCount = prev.correctCount + (correct ? 1 : 0);
  const incorrectCount = prev.incorrectCount + (correct ? 0 : 1);
  const newStatus = nextStatus(prev.status, correct, newScore);

  // Spaced review window
  const reviewDays = correct
    ? (NEXT_REVIEW_DAYS_CORRECT[Math.min(correctCount, NEXT_REVIEW_DAYS_CORRECT.length - 1)] ?? 30)
    : 1;
  const nextReviewAt = new Date(Date.now() + reviewDays * 24 * 60 * 60 * 1000);

  const updated = await prisma.userSkillProgress.update({
    where: { userId_skillId: { userId, skillId } },
    data: {
      status: newStatus,
      masteryScore: newScore,
      exposureCount: { increment: 1 },
      correctCount,
      incorrectCount,
      mistakeCount: incorrectCount,
      lastPracticedAt: new Date(),
      nextReviewAt,
    },
  });

  await emitUserEvent(userId, 'SkillEvidenceObserved', {
    skillId,
    userResponseId: '00000000-0000-0000-0000-000000000000',
    outcome: correct ? 'correct' : 'incorrect',
  });

  if (prev.status !== updated.status) {
    await emitUserEvent(userId, 'SkillMasteryChanged', {
      skillId,
      oldStatus: prev.status,
      newStatus: updated.status,
      oldMasteryScore: oldScore,
      newMasteryScore: newScore,
    });
  }

  return updated;
}

export async function getDashboard(userId: string) {
  const [progress, recentSessions, vocabCounts] = await Promise.all([
    prisma.userSkillProgress.findMany({
      where: { userId },
      include: { skill: true },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.session.findMany({
      where: { userId, status: 'completed' },
      orderBy: { completedAt: 'desc' },
      take: 7,
    }),
    prisma.vocabularyItem.groupBy({
      by: ['status'],
      where: { userId },
      _count: { _all: true },
    }),
  ]);

  return {
    skills: progress.map((p) => ({
      slug: p.skill.slug,
      name: p.skill.name,
      status: p.status,
      masteryScore: Number(p.masteryScore),
      lastPracticedAt: p.lastPracticedAt,
      nextReviewAt: p.nextReviewAt,
    })),
    recentSessions: recentSessions.map((s) => ({
      id: s.id,
      sessionType: s.sessionType,
      completedAt: s.completedAt,
      summary: s.summary,
    })),
    vocabularyCounts: Object.fromEntries(vocabCounts.map((v) => [v.status, v._count._all])),
  };
}
