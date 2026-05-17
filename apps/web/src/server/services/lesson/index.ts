import { Models, chatStructured } from '@speakwise/ai';
import { type CEFRLevel, type LessonAuthor, type LessonType, prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';
import { LessonGenerationOutputSchema } from '@speakwise/schemas';
import { getActiveDirectiveForStudent } from '../classroom';
import { getActiveSkills, getSkillsBySlugs, getSkillsDueForReview } from '../curriculum';
import { listMemory } from '../memory';
import { getWiseProfileSummary } from '../profile';

export interface GenerateLessonInput {
  userId: string;
  lessonType: LessonType;
  durationMinutes?: number;
  targetSkillIds?: string[];
  interestTheme?: string;
  userRequest?: string;
  createdBy?: LessonAuthor;
  /**
   * If passed, the generator will pull this specific directive instead
   * of looking up the student's active one. Used by the harness/admin.
   */
  tutorDirectiveId?: string;
}

export async function generateLesson(input: GenerateLessonInput) {
  const profile = await getWiseProfileSummary(input.userId);
  if (!profile) throw new Error('Learner profile not found — onboarding required first.');

  // Pull the student's active tutor directive (if any). When present
  // AND the directive has pinned skills, those override the default
  // "what's active or due" picker — the tutor's focus wins.
  // An explicit `tutorDirectiveId` skips the lookup and uses that one
  // (lets the harness or admin force a specific directive).
  const directive = input.tutorDirectiveId
    ? await prisma.tutorDirective
        .findUnique({
          where: { id: input.tutorDirectiveId },
          include: { tutor: { select: { userId: true } } },
        })
        .then(async (d) =>
          d
            ? {
                directiveId: d.id,
                body: d.body,
                pinnedSkillIds: d.pinnedSkillIds,
                pinnedSkills:
                  d.pinnedSkillIds.length > 0
                    ? await prisma.curriculumSkill.findMany({
                        where: { id: { in: d.pinnedSkillIds } },
                        select: { id: true, slug: true, name: true },
                      })
                    : [],
                expiresAt: d.expiresAt,
              }
            : null,
        )
    : await getActiveDirectiveForStudent(input.userId);

  let targetSkills = input.targetSkillIds
    ? await prisma.curriculumSkill.findMany({ where: { id: { in: input.targetSkillIds } } })
    : directive && directive.pinnedSkillIds.length > 0
      ? // Tutor-pinned skills take precedence over the default pick.
        await prisma.curriculumSkill.findMany({
          where: { id: { in: directive.pinnedSkillIds } },
        })
      : (await getActiveSkills(input.userId)).slice(0, 5);

  if (targetSkills.length === 0) {
    // First-ever lesson: pick any skill at the learner's level
    targetSkills = await prisma.curriculumSkill.findMany({
      where: { level: profile.level as CEFRLevel, isActive: true },
      take: 5,
    });
  }

  const dueSkills = await getSkillsDueForReview(input.userId, 3);

  // Closing the memory loop: feed Wise the skills the learner has been
  // missing and the most relevant memory notes.
  const recentMistakeResponses = await prisma.userResponse.findMany({
    where: { session: { userId: input.userId }, isCorrect: false },
    orderBy: { createdAt: 'desc' },
    take: 8,
    select: { skillIds: true },
  });
  const recentMistakeSkillIds = [
    ...new Set(recentMistakeResponses.flatMap((r) => r.skillIds)),
  ].slice(0, 5);
  const recentMistakeSkills = recentMistakeSkillIds.length
    ? await prisma.curriculumSkill.findMany({
        where: { id: { in: recentMistakeSkillIds } },
        select: { slug: true, name: true },
      })
    : [];

  const memoryNotes = await listMemory(input.userId);

  // The lesson generator needs the learner's languageRatio so the
  // briefing + task prompts blend Italian and English at the right
  // proportion (matches what Wise speaks elsewhere).
  const context = {
    learner: profile,
    languageRatio: profile.languageRatio,
    immersionMode: profile.immersionMode,
    targetSkills: targetSkills.map((s) => ({
      slug: s.slug,
      name: s.name,
      level: s.level,
      category: s.category,
    })),
    dueForReview: dueSkills.map((d) => ({ slug: d.skill.slug, name: d.skill.name })),
    recentMistakeSkills: recentMistakeSkills.map((s) => ({ slug: s.slug, name: s.name })),
    relevantMemory: memoryNotes.slice(0, 6).map((m) => ({
      type: m.type,
      content: m.content,
    })),
    // Tutor directive — when present, the prompt is instructed to lead
    // with the tutor's focus area and ensure pinned skills dominate the
    // task mix. Null when no tutor or no active directive.
    tutorDirective: directive
      ? {
          body: directive.body,
          pinnedSkills: directive.pinnedSkills.map((s) => ({ slug: s.slug, name: s.name })),
        }
      : null,
  };

  const request = {
    lessonType: input.lessonType,
    // Prefer the explicit duration; otherwise warm-up beginners with shorter
    // lessons. The previous form had a precedence bug — the ?? was binding
    // before the comparison and forcing a boolean → 8.
    durationMinutes: input.durationMinutes ?? (profile.level === 'complete_beginner' ? 8 : 12),
    interestTheme: input.interestTheme ?? null,
    userRequest: input.userRequest ?? null,
  };

  const result = await chatStructured({
    promptKey: 'lesson.generate',
    purpose: 'lesson.generate',
    schema: LessonGenerationOutputSchema,
    model: Models.reasoning,
    temperature: 0.7,
    // 3500 was getting clipped mid-tasks for 8-12 minute lessons — the
    // model returned a structurally-valid JSON without the tasks key
    // because the response was forcibly closed. 6000 leaves enough headroom
    // for ~6-8 detailed tasks plus the framing fields.
    maxOutputTokens: 6000,
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
      // Lessons that came from a tutor directive are attributed to the
      // tutor, even though Wise actually generated the content. The
      // tutorDirectiveId provides the audit link back to the directive.
      createdBy: input.createdBy ?? (directive ? 'tutor' : 'wise'),
      tutorDirectiveId: directive?.directiveId ?? null,
      tasks: {
        // biome-ignore lint/suspicious/noExplicitAny: Prisma's Json input type
        // is structurally narrower than what Zod-validated AI output produces;
        // cast through any to bridge the two.
        create: ai.tasks.map((t, i): any => ({
          taskType: t.taskType,
          orderIndex: i,
          prompt: t.prompt,
          targetSkillIds: t.skillTags
            .map((slug) => aiSlugToId.get(slug))
            .filter((v): v is string => Boolean(v)),
          vocabularyItemIds: [],
          expectedAnswer: t.expectedAnswer ?? null,
          options: t.options ?? null,
          metadata: {
            explanation: t.explanation,
            vocabularyTargets: t.vocabularyTargets,
            // Multi-turn dialogue script for listening_comprehension tasks
            // (undefined for everything else). The lesson player reads
            // this and plays each line with a different voice.
            script: t.script ?? undefined,
          },
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

export async function listLessons(userId: string, opts?: { limit?: number }) {
  return prisma.lesson.findMany({
    where: { userId },
    orderBy: [{ completedAt: 'desc' }, { createdAt: 'desc' }],
    take: opts?.limit ?? 50,
    select: {
      id: true,
      title: true,
      lessonType: true,
      status: true,
      interestTheme: true,
      estimatedDurationMinutes: true,
      createdAt: true,
      completedAt: true,
    },
  });
}

export async function startLessonSession(
  userId: string,
  lessonId: string,
  mode: 'voice' | 'text' | 'mixed',
) {
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
