import { Models, chatStructured } from '@speakwise/ai';
import { prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';
import {
  WiseExplainOutputSchema,
  type WiseMessageRequest,
  WiseTurnOutputSchema,
} from '@speakwise/schemas';
import { z } from 'zod';
import { getActiveDirectiveForStudent } from '../classroom';
import { getActiveSkills, getSkillsDueForReview } from '../curriculum';
import { applyMemoryCandidates, listMemory, retrieveRelevantMemories } from '../memory';
import { getWiseProfileSummary } from '../profile';
import { listVocabulary } from '../vocabulary';

export async function wiseTurn(userId: string, req: WiseMessageRequest) {
  const [profile, activeSkills, dueSkills, dueVocab, memories, directive] = await Promise.all([
    getWiseProfileSummary(userId),
    getActiveSkills(userId),
    getSkillsDueForReview(userId, 3),
    listVocabulary(userId, { dueForReview: true }),
    retrieveRelevantMemories(userId, req.message, 5),
    getActiveDirectiveForStudent(userId),
  ]);

  const recentSessions = await prisma.session.findMany({
    where: { userId, status: 'completed' },
    orderBy: { completedAt: 'desc' },
    take: 3,
    select: { id: true, sessionType: true, summary: true, completedAt: true },
  });

  // Surface up to ~30 vocab items the learner has actually covered, so
  // beginner-ratio prompts can sprinkle Italian *they recognize* rather
  // than throwing new words at them mid-sentence.
  const coveredVocab = await prisma.vocabularyItem.findMany({
    where: { userId },
    orderBy: [{ lastReviewedAt: 'desc' }, { createdAt: 'desc' }],
    take: 30,
    select: { targetText: true },
  });

  const context = {
    learner: profile,
    languageRatio: profile?.languageRatio ?? 0.1,
    immersionMode: profile?.immersionMode ?? false,
    activeSkills: activeSkills.slice(0, 8).map((s) => ({ slug: s.slug, name: s.name })),
    skillsDueForReview: dueSkills.map((d) => ({ slug: d.skill.slug, name: d.skill.name })),
    vocabularyDueCount: dueVocab.length,
    coveredVocabulary: coveredVocab.map((v) => v.targetText),
    recentSessions,
    relevantMemories: memories.map((m) => ({ type: m.type, content: m.content })),
    currentScreen: req.context?.screen ?? null,
    currentLessonId: req.context?.lessonId ?? null,
    // Tutor's active directive. Wise weaves the focus into the turn when
    // relevant — the learner feels Wise and their tutor are coordinated.
    tutorDirective: directive
      ? {
          body: directive.body,
          pinnedSkills: directive.pinnedSkills.map((s) => ({ slug: s.slug, name: s.name })),
        }
      : null,
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
  await applyMemoryCandidates(userId, ai.memoryCandidates, {
    sourceSessionId: req.sessionId ?? null,
  });

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

// ── Personalized greeting ─────────────────────────────────────────────────
//
// Generates a 1-2 sentence first line that references something specific:
// last session, weak spot, due reviews, streak, current goal. This is the
// promise from Master PRD §5 ("Welcome back, Anthony. Yesterday you struggled
// a little with direct object pronoun agreement…").

const GreetingOutputSchema = z.object({
  greeting: z.string().min(8).max(400),
  toneNotes: z.array(z.string()).optional(),
});

export interface GreetingResult {
  greeting: string;
  context: {
    lastSessionAgoDays: number | null;
    streakDays: number;
    dueSkillCount: number;
    dueVocabCount: number;
    recentMistakeSkillNames: string[];
  };
}

export async function generateGreeting(userId: string): Promise<GreetingResult> {
  const [
    user,
    profile,
    recentSessions,
    dueSkills,
    dueVocab,
    streak,
    recentMistakes,
    visibleMemories,
    directive,
  ] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId } }),
    getWiseProfileSummary(userId),
    prisma.session.findMany({
      where: { userId, status: 'completed' },
      orderBy: { completedAt: 'desc' },
      take: 3,
      select: {
        id: true,
        sessionType: true,
        summary: true,
        completedAt: true,
        weaknessesObserved: true,
        strengthsObserved: true,
      },
    }),
    getSkillsDueForReview(userId, 5),
    listVocabulary(userId, { dueForReview: true }),
    prisma.userStreak.findUnique({ where: { userId } }),
    prisma.userResponse.findMany({
      where: { session: { userId }, isCorrect: false },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { skillIds: true, createdAt: true },
    }),
    listMemory(userId, { visibility: 'user_visible' }),
    getActiveDirectiveForStudent(userId),
  ]);

  const lastCompleted = recentSessions[0]?.completedAt ?? null;
  const lastSessionAgoDays = lastCompleted
    ? Math.floor((Date.now() - lastCompleted.getTime()) / (24 * 60 * 60 * 1000))
    : null;

  const mistakeSkillIds = [...new Set(recentMistakes.flatMap((r) => r.skillIds))].slice(0, 5);
  const mistakeSkills = mistakeSkillIds.length
    ? await prisma.curriculumSkill.findMany({
        where: { id: { in: mistakeSkillIds } },
        select: { name: true },
      })
    : [];
  const recentMistakeSkillNames = mistakeSkills.map((s) => s.name);

  const firstName = user.name.split(' ')[0] ?? user.name;

  // Pull learner's covered vocab so beginner-ratio greetings only sprinkle
  // Italian the learner actually knows.
  const coveredVocab = await prisma.vocabularyItem.findMany({
    where: { userId },
    orderBy: [{ lastReviewedAt: 'desc' }, { createdAt: 'desc' }],
    take: 30,
    select: { targetText: true },
  });

  const ctx = {
    learner: {
      name: firstName,
      level: profile?.level ?? 'beginner',
      goals: profile?.goals ?? [],
      interests: profile?.interests ?? [],
      preferredPersonality: profile?.preferredWisePersonality ?? 'default',
    },
    languageRatio: profile?.languageRatio ?? 0.1,
    immersionMode: profile?.immersionMode ?? false,
    coveredVocabulary: coveredVocab.map((v) => v.targetText),
    lastSessionAgoDays,
    lastSessionSummary: recentSessions[0]?.summary ?? null,
    lastSessionWeaknesses: recentSessions[0]?.weaknessesObserved ?? [],
    lastSessionStrengths: recentSessions[0]?.strengthsObserved ?? [],
    streakDays: streak?.currentDays ?? 0,
    dueSkills: dueSkills.slice(0, 3).map((d) => d.skill.name),
    dueVocabCount: dueVocab.length,
    recentMistakeSkillNames,
    recentVisibleMemories: visibleMemories.slice(0, 3).map((m) => m.content),
    isFirstSession: recentSessions.length === 0,
    // Tutor's current focus area. If present, the greeting should mention
    // it ("your tutor wants you on past tense this week, andiamo!").
    tutorDirective: directive
      ? {
          body: directive.body,
          pinnedSkills: directive.pinnedSkills.map((s) => ({ slug: s.slug, name: s.name })),
        }
      : null,
  };

  const result = await chatStructured({
    promptKey: 'wise.greeting',
    purpose: 'wise.greeting',
    schema: GreetingOutputSchema,
    model: Models.fast,
    temperature: 0.5,
    maxOutputTokens: 250,
    vars: { CONTEXT_JSON: JSON.stringify(ctx) },
  });

  await emitUserEvent(userId, 'AICall', {
    provider: 'openai',
    model: result.usage.model,
    purpose: 'wise.greeting',
    tokensIn: result.usage.promptTokens,
    tokensOut: result.usage.completionTokens,
    latencyMs: result.usage.latencyMs,
    ok: true,
  });

  return {
    greeting: result.data.greeting,
    context: {
      lastSessionAgoDays,
      streakDays: ctx.streakDays,
      dueSkillCount: dueSkills.length,
      dueVocabCount: dueVocab.length,
      recentMistakeSkillNames,
    },
  };
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

export interface ExplainInput {
  question: string;
  context?: {
    lessonId?: string;
    lessonTaskId?: string;
    userResponseId?: string;
    taskPrompt?: string;
    lastAnswer?: string;
  };
}

/**
 * Answer a learner's mid-lesson "why?" question (the floating Ask Wise helper).
 * Pulls the current task + the learner's last answer/correction so "why is this
 * wrong?" is grounded in their actual sentence. Read-only: it does not change,
 * advance, or re-grade the lesson.
 */
export async function explainConcept(userId: string, input: ExplainInput) {
  const profile = await getWiseProfileSummary(userId);
  const ctx = input.context ?? {};

  // Resolve the current task (if the client passed its id) for grounded context.
  let task: {
    taskType: string;
    prompt: string;
    expectedAnswer: unknown;
    skillNames: string[];
  } | null = null;
  if (ctx.lessonTaskId) {
    const t = await prisma.lessonTask.findFirst({
      where: { id: ctx.lessonTaskId, lesson: { userId } },
    });
    if (t) {
      const skillNames =
        t.targetSkillIds.length > 0
          ? (
              await prisma.curriculumSkill.findMany({
                where: { id: { in: t.targetSkillIds } },
                select: { name: true },
              })
            ).map((s) => s.name)
          : [];
      task = {
        taskType: t.taskType,
        prompt: t.prompt,
        expectedAnswer: t.expectedAnswer,
        skillNames,
      };
    }
  }

  // Resolve the learner's last answer + correction so "why was I wrong?" works.
  let lastAttempt: {
    answer: string;
    isCorrect: boolean | null;
    correctedAnswer: string | null;
    correctionExplanation: string | null;
  } | null = null;
  if (ctx.userResponseId) {
    const ur = await prisma.userResponse.findFirst({
      where: { id: ctx.userResponseId, session: { userId } },
      include: { corrections: true },
    });
    if (ur) {
      const corr = ur.corrections[0];
      lastAttempt = {
        answer: ur.userAnswer,
        isCorrect: ur.isCorrect,
        correctedAnswer: ur.correctedAnswer ?? corr?.correctedText ?? null,
        correctionExplanation: corr?.explanation ?? ur.feedback ?? null,
      };
    }
  }

  const context = {
    // Fall back to the lighter on-screen context the client always has.
    task:
      task ??
      (ctx.taskPrompt
        ? { taskType: 'unknown', prompt: ctx.taskPrompt, expectedAnswer: null, skillNames: [] }
        : null),
    lastAttempt:
      lastAttempt ??
      (ctx.lastAnswer
        ? {
            answer: ctx.lastAnswer,
            isCorrect: null,
            correctedAnswer: null,
            correctionExplanation: null,
          }
        : null),
  };

  const result = await chatStructured({
    promptKey: 'wise.explain',
    purpose: 'wise.explain',
    schema: WiseExplainOutputSchema,
    model: Models.fast,
    temperature: 0.4,
    maxOutputTokens: 600,
    vars: {
      QUESTION: input.question,
      CONTEXT_JSON: JSON.stringify(context),
      LEVEL: String(profile?.level ?? 'beginner'),
      LANGUAGE_RATIO: String(profile?.languageRatio ?? 0.1),
    },
  });

  await emitUserEvent(userId, 'AICall', {
    provider: 'openai',
    model: result.usage.model,
    purpose: 'wise.explain',
    tokensIn: result.usage.promptTokens,
    tokensOut: result.usage.completionTokens,
    latencyMs: result.usage.latencyMs,
    ok: true,
  });

  return result.data;
}
