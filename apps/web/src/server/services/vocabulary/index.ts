import { type VocabStatus, prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';

const REVIEW_DAYS_CORRECT = [1, 3, 7, 14, 30];

export async function listVocabulary(
  userId: string,
  opts?: { status?: VocabStatus; tag?: string; dueForReview?: boolean },
) {
  return prisma.vocabularyItem.findMany({
    where: {
      userId,
      ...(opts?.status ? { status: opts.status } : {}),
      ...(opts?.tag ? { tags: { has: opts.tag } } : {}),
      ...(opts?.dueForReview ? { nextReviewAt: { lte: new Date() } } : {}),
    },
    orderBy: { updatedAt: 'desc' },
    take: 200,
  });
}

export async function createVocabulary(
  userId: string,
  input: {
    targetText: string;
    nativeText: string;
    partOfSpeech?: string;
    exampleSentence?: string;
    exampleTranslation?: string;
    tags?: string[];
    sourceLessonId?: string;
    sourceSessionId?: string;
  },
) {
  const item = await prisma.vocabularyItem.create({
    data: {
      userId,
      targetText: input.targetText,
      nativeText: input.nativeText,
      partOfSpeech: input.partOfSpeech,
      exampleSentence: input.exampleSentence,
      exampleTranslation: input.exampleTranslation,
      tags: input.tags ?? [],
      sourceLessonId: input.sourceLessonId,
      sourceSessionId: input.sourceSessionId,
      status: 'new',
      nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
  await emitUserEvent(userId, 'VocabularyIntroduced', {
    vocabId: item.id,
    sourceLessonId: input.sourceLessonId ?? null,
  });
  return item;
}

export async function reviewVocabulary(
  userId: string,
  vocabId: string,
  result: 'correct' | 'incorrect',
  reviewToken?: string,
) {
  const prev = await prisma.vocabularyItem.findFirst({ where: { id: vocabId, userId } });
  if (!prev) throw new Error('Vocabulary item not found');
  if (reviewToken && prev.lastReviewToken === reviewToken) return prev;

  const oldScore = Number(prev.masteryScore);
  const delta = result === 'correct' ? 0.15 : -0.1;
  const newScore = Math.max(0, Math.min(1, oldScore + delta));

  const correctCount = prev.correctCount + (result === 'correct' ? 1 : 0);
  const reviewDays =
    result === 'correct'
      ? (REVIEW_DAYS_CORRECT[Math.min(correctCount, REVIEW_DAYS_CORRECT.length - 1)] ?? 30)
      : 1;
  const nextReviewAt = new Date(Date.now() + reviewDays * 24 * 60 * 60 * 1000);

  let status: VocabStatus = prev.status;
  if (newScore >= 0.85) status = 'mastered';
  else if (newScore >= 0.4) status = 'review';
  else status = 'learning';

  const claimed = await prisma.vocabularyItem.updateMany({
    where: {
      id: vocabId,
      userId,
      ...(reviewToken
        ? { OR: [{ lastReviewToken: null }, { lastReviewToken: { not: reviewToken } }] }
        : {}),
    },
    data: {
      masteryScore: newScore,
      correctCount,
      incorrectCount: prev.incorrectCount + (result === 'incorrect' ? 1 : 0),
      exposureCount: { increment: 1 },
      lastReviewedAt: new Date(),
      nextReviewAt,
      status,
      lastReviewToken: reviewToken,
    },
  });
  if (claimed.count === 0) {
    return prisma.vocabularyItem.findFirstOrThrow({ where: { id: vocabId, userId } });
  }
  const updated = await prisma.vocabularyItem.findUniqueOrThrow({ where: { id: vocabId } });

  await emitUserEvent(userId, 'VocabularyReviewed', {
    vocabId,
    result,
    oldMasteryScore: oldScore,
    newMasteryScore: newScore,
    nextReviewAt: nextReviewAt.toISOString(),
  });

  if (prev.status !== 'mastered' && status === 'mastered') {
    await emitUserEvent(userId, 'VocabularyMastered', { vocabId });
  }

  return updated;
}
