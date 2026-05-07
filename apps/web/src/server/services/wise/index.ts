import { prisma } from '@speakwise/db';
import { Models, chatStructured } from '@speakwise/ai';
import { WiseTurnOutputSchema, type WiseMessageRequest } from '@speakwise/schemas';
import { emitUserEvent } from '@speakwise/events';
import { getWiseProfileSummary } from '../profile';
import { getActiveSkills, getSkillsDueForReview } from '../curriculum';
import { listVocabulary } from '../vocabulary';
import { applyMemoryCandidates, retrieveRelevantMemories } from '../memory';

export async function wiseTurn(userId: string, req: WiseMessageRequest) {
  const [profile, activeSkills, dueSkills, dueVocab, memories] = await Promise.all([
    getWiseProfileSummary(userId),
    getActiveSkills(userId),
    getSkillsDueForReview(userId, 3),
    listVocabulary(userId, { dueForReview: true }),
    retrieveRelevantMemories(userId, req.message, 5),
  ]);

  const recentSessions = await prisma.session.findMany({
    where: { userId, status: 'completed' },
    orderBy: { completedAt: 'desc' },
    take: 3,
    select: { id: true, sessionType: true, summary: true, completedAt: true },
  });

  const context = {
    learner: profile,
    activeSkills: activeSkills.slice(0, 8).map((s) => ({ slug: s.slug, name: s.name })),
    skillsDueForReview: dueSkills.map((d) => ({ slug: d.skill.slug, name: d.skill.name })),
    vocabularyDueCount: dueVocab.length,
    recentSessions,
    relevantMemories: memories.map((m) => ({ type: m.type, content: m.content })),
    currentScreen: req.context?.screen ?? null,
    currentLessonId: req.context?.lessonId ?? null,
  };

  const result = await chatStructured({
    promptKey: 'wise.turn',
    purpose: 'wise.turn',
    schema: WiseTurnOutputSchema,
    model: Models.fast,
    temperature: 0.6,
    vars: {
      CONTEXT_JSON: JSON.stringify(context),
      USER_MESSAGE: req.message,
    },
  });
  const ai = result.data;

  // Persist memory candidates inline (high-confidence, non-trivial only)
  await applyMemoryCandidates(userId, ai.memoryCandidates, { sourceSessionId: req.sessionId ?? null });

  await emitUserEvent(userId, 'AICall', {
    provider: 'openai',
    model: result.usage.model,
    purpose: 'wise.turn',
    tokensIn: result.usage.promptTokens,
    tokensOut: result.usage.completionTokens,
    latencyMs: result.usage.latencyMs,
    ok: true,
  });

  return ai;
}

export async function recommendNext(userId: string) {
  const [dueSkills, dueVocab] = await Promise.all([
    getSkillsDueForReview(userId, 5),
    listVocabulary(userId, { dueForReview: true }),
  ]);

  if (dueSkills.length > 0 || dueVocab.length > 5) {
    return {
      recommendationType: 'recovery' as const,
      reason:
        dueSkills.length > 0
          ? `You have ${dueSkills.length} skill(s) due for review.`
          : `You have ${dueVocab.length} vocabulary words due for review.`,
      lesson: null,
    };
  }

  return {
    recommendationType: 'daily_mission' as const,
    reason: 'Time for today’s mission.',
    lesson: null,
  };
}
