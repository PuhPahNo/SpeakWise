import { type SkillStatus, prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';

interface RecordResultOpts {
  userId: string;
  skillId: string;
  correct: boolean;
  weight?: number;
  /**
   * Which dimension this evidence is moving:
   *  - 'production'    learner generated Italian (speaking_prompt,
   *                    translation, roleplay, scenario_roleplay).
   *  - 'comprehension' learner recognized / understood Italian
   *                    (multiple_choice, fill_blank, listening,
   *                    error_correction picking the right one, etc.).
   *  - 'both'          fallback when we can't tell — bumps both halves.
   */
  dimension?: 'production' | 'comprehension' | 'both';
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
  dimension = 'both',
}: RecordResultOpts) {
  const prev = await prisma.userSkillProgress.upsert({
    where: { userId_skillId: { userId, skillId } },
    update: {},
    create: { userId, skillId, status: 'introduced' },
  });

  const oldScore = Number(prev.masteryScore);
  const delta = correct ? weight : -weight * 0.7;
  const newScore = Math.max(0, Math.min(1, oldScore + delta));

  // Per-dimension scores let Wise stretch the learner safely — speak a
  // structure to them when comprehension is high but production is low,
  // and only ask them to produce it once comprehension lands.
  const oldComp = Number(prev.comprehensionScore);
  const oldProd = Number(prev.productionScore);
  const compDelta =
    dimension === 'comprehension' || dimension === 'both' ? delta : delta * 0.3;
  const prodDelta =
    dimension === 'production' || dimension === 'both' ? delta : delta * 0.2;
  const newComp = Math.max(0, Math.min(1, oldComp + compDelta));
  const newProd = Math.max(0, Math.min(1, oldProd + prodDelta));

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
      comprehensionScore: newComp,
      productionScore: newProd,
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
