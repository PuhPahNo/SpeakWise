import { prisma, type LessonType, type LessonAuthor, type CEFRLevel } from '@speakwise/db';
import { Models, chatStructured } from '@speakwise/ai';
import { LessonGenerationOutputSchema } from '@speakwise/schemas';
import { emitUserEvent } from '@speakwise/events';
import { getWiseProfileSummary } from '../profile';
import { getActiveSkills, getSkillsBySlugs, getSkillsDueForReview } from '../curriculum';

export interface GenerateLessonInput {
  userId: string;
  lessonType: LessonType;
  durationMinutes?: number;
  targetSkillIds?: string[];
  interestTheme?: string;
  userRequest?: string;
  createdBy?: LessonAuthor;
}

export async function generateLesson(input: GenerateLessonInput) {
  const profile = await getWiseProfileSummary(input.userId);
  if (!profile) throw new Error('Learner profile not found — onboarding required first.');

  let targetSkills = input.targetSkillIds
    ? await prisma.curriculumSkill.findMany({ where: { id: { in: input.targetSkillIds } } })
    : (await getActiveSkills(input.userId)).slice(0, 5);

  if (targetSkills.length === 0) {
    // First-ever lesson: pick any skill at the learner's level
    targetSkills = await prisma.curriculumSkill.findMany({
      where: { level: profile.level as CEFRLevel, isActive: true },
      take: 5,
    });
  }

  const dueSkills = await getSkillsDueForReview(input.userId, 3);

  const context = {
    learner: profile,
    targetSkills: targetSkills.map((s) => ({
      slug: s.slug,
      name: s.name,
      level: s.level,
      category: s.category,
    })),
    dueForReview: dueSkills.map((d) => ({ slug: d.skill.slug, name: d.skill.name })),
  };

  const request = {
    lessonType: input.lessonType,
    durationMinutes: input.durationMinutes ?? profile.level === 'complete_beginner' ? 8 : 12,
    interestTheme: input.interestTheme ?? null,
    userRequest: input.userRequest ?? null,
  };

  const result = await chatStructured({
    promptKey: 'lesson.generate',
    purpose: 'lesson.generate',
    schema: LessonGenerationOutputSchema,
    model: Models.reasoning,
    temperature: 0.7,
    maxOutputTokens: 3500,
    vars: {
      CONTEXT_JSON: JSON.stringify(context),
      REQUEST_JSON: JSON.stringify(request),
    },
  });

  const ai = result.data;

  const aiSlugToId = new Map(targetSkills.map((s) => [s.slug, s.id]));
  // Allow tasks to reference skills by slug; resolve any missing ones
  const referencedSlugs = new Set(ai.tasks.flatMap((t) => t.skillTags));
  const missing = [...referencedSlugs].filter((slug) => !aiSlugToId.has(slug));
  if (missing.length > 0) {
    const extra = await getSkillsBySlugs(missing);
    for (const s of extra) aiSlugToId.set(s.slug, s.id);
  }

  const lesson = await prisma.lesson.create({
    data: {
      userId: input.userId,
      title: ai.title,
      lessonType: input.lessonType,
      status: 'recommended',
      targetSkillIds: targetSkills.map((s) => s.id),
      interestTheme: ai.interestTheme,
      estimatedDurationMinutes: ai.estimatedDurationMinutes,
      difficultyLevel: profile.level as CEFRLevel,
      generationContext: {
        userRequest: input.userRequest ?? undefined,
        durationMinutes: input.durationMinutes,
        interestTheme: input.interestTheme ?? undefined,
        promptVersion: String(result.usage.promptVersion),
      },
      content: { briefing: ai.briefing, recapPlan: ai.recapPlan },
      createdBy: input.createdBy ?? 'wise',
      tasks: {
        create: ai.tasks.map((t, i) => ({
          taskType: t.taskType,
          orderIndex: i,
          prompt: t.prompt,
          targetSkillIds: t.skillTags
            .map((slug) => aiSlugToId.get(slug))
            .filter((v): v is string => Boolean(v)),
          vocabularyItemIds: [],
          expectedAnswer: (t.expectedAnswer ?? null) as object | null,
          options: (t.options ?? null) as object | null,
          metadata: { explanation: t.explanation, vocabularyTargets: t.vocabularyTargets },
        })),
      },
    },
    include: { tasks: { orderBy: { orderIndex: 'asc' } } },
  });

  await emitUserEvent(input.userId, 'LessonGenerated', {
    lessonId: lesson.id,
    lessonType: lesson.lessonType,
    targetSkillIds: lesson.targetSkillIds,
    interestTheme: lesson.interestTheme,
  });

  await emitUserEvent(input.userId, 'AICall', {
    provider: 'openai',
    model: result.usage.model,
    purpose: 'lesson.generate',
    tokensIn: result.usage.promptTokens,
    tokensOut: result.usage.completionTokens,
    latencyMs: result.usage.latencyMs,
    ok: true,
  });

  return lesson;
}

export async function getLesson(userId: string, lessonId: string) {
  return prisma.lesson.findFirst({
    where: { id: lessonId, userId },
    include: { tasks: { orderBy: { orderIndex: 'asc' } } },
  });
}

export async function startLessonSession(userId: string, lessonId: string, mode: 'voice' | 'text' | 'mixed') {
  const lesson = await getLesson(userId, lessonId);
  if (!lesson) throw new Error('Lesson not found');

  const session = await prisma.session.create({
    data: { userId, lessonId, sessionType: 'lesson', mode, status: 'active' },
  });
  await prisma.lesson.update({ where: { id: lessonId }, data: { status: 'active' } });
  await emitUserEvent(userId, 'LessonStarted', { lessonId, sessionId: session.id, mode });
  return { session, currentTask: lesson.tasks[0] ?? null };
}

export async function completeLessonSession(userId: string, sessionId: string) {
  const session = await prisma.session.findFirst({
    where: { id: sessionId, userId },
    include: { responses: true, lesson: true },
  });
  if (!session) throw new Error('Session not found');

  const completedAt = new Date();
  const durationSeconds = Math.round((completedAt.getTime() - session.startedAt.getTime()) / 1000);
  const mistakesDetected = session.responses.filter((r) => r.isCorrect === false).length;

  await prisma.session.update({
    where: { id: sessionId },
    data: { status: 'completed', completedAt },
  });

  if (session.lessonId) {
    await prisma.lesson.update({
      where: { id: session.lessonId },
      data: { status: 'completed', completedAt },
    });
  }

  await emitUserEvent(userId, 'LessonCompleted', {
    sessionId,
    lessonId: session.lessonId,
    durationSeconds,
    tasksCompleted: session.responses.length,
    mistakesDetected,
  });
  await emitUserEvent(userId, 'SessionCompleted', {
    sessionId,
    lessonId: session.lessonId,
    durationSeconds,
    tasksCompleted: session.responses.length,
    mistakesDetected,
  });

  return { sessionId, durationSeconds, mistakesDetected };
}
