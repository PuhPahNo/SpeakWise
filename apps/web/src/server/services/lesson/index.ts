import { ConflictError, NotFoundError } from '@/lib/api/errors';
import { Models, chatStructured } from '@speakwise/ai';
import { type CEFRLevel, type LessonAuthor, type LessonType, Prisma, prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';
import { LessonGenerationOutputSchema } from '@speakwise/schemas';
import { getActiveDirectiveForStudent } from '../classroom';
import {
  getActiveSkills,
  getSkillsBySlugs,
  getSkillsDueForReview,
  materializeUnitVocabularyForUser,
} from '../curriculum';
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
  /** Authored curriculum shape to personalize, rather than an unstructured lesson request. */
  lessonTemplateSlug?: string;
  /** Internal retry key for flows that must produce exactly one lesson. */
  idempotencyKey?: string;
}

export async function generateLesson(input: GenerateLessonInput) {
  if (input.idempotencyKey) {
    const existing = await prisma.lesson.findFirst({
      where: {
        userId: input.userId,
        generationContext: { path: ['idempotencyKey'], equals: input.idempotencyKey },
      },
      include: { tasks: { orderBy: { orderIndex: 'asc' } } },
    });
    if (existing) return existing;
  }
  const profile = await getWiseProfileSummary(input.userId);
  if (!profile) throw new Error('Learner profile not found — onboarding required first.');

  const lessonTemplate = input.lessonTemplateSlug
    ? await prisma.curriculumLessonTemplate.findFirst({
        where: { slug: input.lessonTemplateSlug, isActive: true },
        include: { unit: true },
      })
    : null;
  if (input.lessonTemplateSlug && !lessonTemplate) {
    throw new NotFoundError('Lesson template not found');
  }
  if (lessonTemplate && lessonTemplate.lessonType !== input.lessonType) {
    throw new ConflictError('Lesson type does not match the selected curriculum template');
  }

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

  if (lessonTemplate?.objectiveSkillSlugs.length) {
    targetSkills = await getSkillsBySlugs(lessonTemplate.objectiveSkillSlugs);
  }

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

  // Pull the chapter (unit) the target skills belong to so the generator can
  // anchor the lesson in the book's thematic frame. The "primary" unit is the
  // one the most target skills come from.
  const unitIds = [
    ...new Set(targetSkills.map((s) => s.unitId).filter((v): v is string => Boolean(v))),
  ];
  const units = unitIds.length
    ? await prisma.curriculumUnit.findMany({
        where: { id: { in: unitIds } },
        select: { id: true, code: true, title: true, theme: true, canDo: true },
      })
    : [];
  const primaryUnit = lessonTemplate
    ? lessonTemplate.unit
    : units.length > 0
      ? (units
          .map((u) => ({ u, n: targetSkills.filter((s) => s.unitId === u.id).length }))
          .sort((a, b) => b.n - a.n)[0]?.u ?? null)
      : null;

  // The lesson generator needs the learner's languageRatio so the
  // briefing + task prompts blend Italian and English at the right
  // proportion (matches what Wise speaks elsewhere).
  const context = {
    learner: profile,
    languageRatio: profile.languageRatio,
    immersionMode: profile.immersionMode,
    // Rich per-skill pedagogy from the Prego!-aligned curriculum. commonMistakes
    // tells the generator what errors to deliberately probe; teachingNotes is
    // how to explain it; compatibleThemes are the interests this skill themes
    // into well (the generator intersects these with the learner's interests).
    targetSkills: targetSkills.map((s) => ({
      slug: s.slug,
      name: s.name,
      level: s.level,
      category: s.category,
      description: s.description,
      commonMistakes: s.commonMistakes,
      teachingNotes: s.teachingNotes,
      compatibleThemes: s.compatibleThemes,
    })),
    // The chapter this lesson sits in — gives Wise a coherent thematic anchor
    // (e.g. "Caffè e cappuccino" / food) and the unit's can-do outcomes.
    unit: primaryUnit
      ? { title: primaryUnit.title, theme: primaryUnit.theme, canDo: primaryUnit.canDo }
      : null,
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
    lessonTemplate: lessonTemplate
      ? {
          slug: lessonTemplate.slug,
          title: lessonTemplate.title,
          summary: lessonTemplate.summary,
          objectiveSkillSlugs: lessonTemplate.objectiveSkillSlugs,
          taskBlueprint: lessonTemplate.taskBlueprint,
        }
      : null,
  };

  const request = {
    lessonType: input.lessonType,
    // Prefer the explicit duration; otherwise warm-up beginners with shorter
    // lessons. The previous form had a precedence bug — the ?? was binding
    // before the comparison and forcing a boolean → 8.
    durationMinutes:
      input.durationMinutes ??
      lessonTemplate?.defaultDurationMinutes ??
      (profile.level === 'complete_beginner' ? 8 : 12),
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

  if (primaryUnit) {
    await materializeUnitVocabularyForUser(input.userId, primaryUnit.code);
  }

  const vocabularyTargets = [
    ...new Set(ai.tasks.flatMap((task) => task.vocabularyTargets).map((text) => text.trim())),
  ].filter(Boolean);
  const vocabularyItems = vocabularyTargets.length
    ? await prisma.vocabularyItem.findMany({
        where: { userId: input.userId },
        select: { id: true, targetText: true },
      })
    : [];
  const vocabularyIdByText = new Map(
    vocabularyItems.map((item) => [item.targetText.trim().toLowerCase(), item.id]),
  );

  const aiSlugToId = new Map(targetSkills.map((s) => [s.slug, s.id]));
  // Allow tasks to reference skills by slug; resolve any missing ones
  const referencedSlugs = new Set(ai.tasks.flatMap((t) => t.skillTags));
  const missing = [...referencedSlugs].filter((slug) => !aiSlugToId.has(slug));
  if (missing.length > 0) {
    const extra = await getSkillsBySlugs(missing);
    for (const s of extra) aiSlugToId.set(s.slug, s.id);
  }

  let lessonCreated = true;
  const lesson = await prisma.lesson
    .create({
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
          lessonTemplateSlug: lessonTemplate?.slug,
          idempotencyKey: input.idempotencyKey,
          promptVersion: String(result.usage.promptVersion),
        },
        content: { briefing: ai.briefing, recapPlan: ai.recapPlan },
        // Lessons that came from a tutor directive are attributed to the
        // tutor, even though Wise actually generated the content. The
        // tutorDirectiveId provides the audit link back to the directive.
        createdBy: input.createdBy ?? (directive ? 'tutor' : 'wise'),
        tutorDirectiveId: directive?.directiveId ?? null,
        tasks: {
          create: ai.tasks.map(
            (t, i): Prisma.LessonTaskCreateWithoutLessonInput => ({
              taskType: t.taskType,
              orderIndex: i,
              prompt: t.prompt,
              targetSkillIds: t.skillTags
                .map((slug) => aiSlugToId.get(slug))
                .filter((v): v is string => Boolean(v)),
              vocabularyItemIds: t.vocabularyTargets
                .map((text) => vocabularyIdByText.get(text.trim().toLowerCase()))
                .filter((value): value is string => Boolean(value)),
              expectedAnswer:
                t.expectedAnswer == null
                  ? Prisma.JsonNull
                  : (JSON.parse(JSON.stringify(t.expectedAnswer)) as Prisma.InputJsonValue),
              options:
                t.options == null
                  ? Prisma.JsonNull
                  : (JSON.parse(JSON.stringify(t.options)) as Prisma.InputJsonValue),
              metadata: {
                explanation: t.explanation,
                vocabularyTargets: t.vocabularyTargets,
                // Multi-turn dialogue script for listening_comprehension tasks
                // (undefined for everything else). The lesson player reads
                // this and plays each line with a different voice.
                script: t.script ?? undefined,
              } as Prisma.InputJsonValue,
            }),
          ),
        },
      },
      include: { tasks: { orderBy: { orderIndex: 'asc' } } },
    })
    .catch(async (error) => {
      if (input.idempotencyKey && (error as { code?: string }).code === 'P2002') {
        const concurrent = await prisma.lesson.findFirst({
          where: {
            userId: input.userId,
            generationContext: { path: ['idempotencyKey'], equals: input.idempotencyKey },
          },
          include: { tasks: { orderBy: { orderIndex: 'asc' } } },
        });
        if (concurrent) {
          lessonCreated = false;
          return concurrent;
        }
      }
      throw error;
    });

  if (lessonCreated) {
    await emitUserEvent(input.userId, 'LessonGenerated', {
      lessonId: lesson.id,
      lessonType: lesson.lessonType,
      targetSkillIds: lesson.targetSkillIds,
      interestTheme: lesson.interestTheme,
    });
  }

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
  if (!lesson) throw new NotFoundError('Lesson not found');

  const existing = await prisma.session.findFirst({
    where: { userId, lessonId, status: 'active' },
    orderBy: { startedAt: 'desc' },
  });
  if (existing) {
    const answered = await prisma.userResponse.findMany({
      where: { sessionId: existing.id },
      select: { lessonTaskId: true },
    });
    const answeredIds = new Set(answered.flatMap((response) => response.lessonTaskId ?? []));
    return {
      session: existing,
      currentTask: lesson.tasks.find((task) => !answeredIds.has(task.id)) ?? null,
    };
  }

  let session: Prisma.SessionGetPayload<Record<string, never>>;
  try {
    session = await prisma.session.create({
      data: { userId, lessonId, sessionType: 'lesson', mode, status: 'active' },
    });
  } catch (error) {
    const concurrent = await prisma.session.findFirst({
      where: { userId, lessonId, status: 'active' },
      orderBy: { startedAt: 'desc' },
    });
    if (!concurrent) throw error;
    session = concurrent;
  }
  await prisma.lesson.update({ where: { id: lessonId }, data: { status: 'active' } });
  await emitUserEvent(userId, 'LessonStarted', { lessonId, sessionId: session.id, mode });
  return { session, currentTask: lesson.tasks[0] ?? null };
}

const ANSWERABLE_TASK_TYPES = new Set([
  'multiple_choice',
  'fill_blank',
  'translation',
  'conjugation',
  'pronoun_replacement',
  'tense_selection',
  'error_correction',
  'speaking_prompt',
  'listening_comprehension',
  'roleplay',
  'reflection',
]);

export async function completeLessonSession(
  userId: string,
  sessionId: string,
  expectedLessonId: string,
) {
  const session = await prisma.session.findFirst({
    where: { id: sessionId, userId, lessonId: expectedLessonId },
    include: { responses: true, lesson: { include: { tasks: true } } },
  });
  if (!session) throw new NotFoundError('Session not found for this lesson');

  const completedAt = session.completedAt ?? new Date();
  const durationSeconds = Math.round((completedAt.getTime() - session.startedAt.getTime()) / 1000);
  const mistakesDetected = session.responses.filter((r) => r.isCorrect === false).length;
  const answerableTaskIds =
    session.lesson?.tasks
      .filter((task) => ANSWERABLE_TASK_TYPES.has(task.taskType))
      .map((task) => task.id) ?? [];
  const completedTaskIds = new Set(
    session.responses.flatMap((response) => response.lessonTaskId ?? []),
  );
  const tasksCompleted = answerableTaskIds.filter((taskId) => completedTaskIds.has(taskId)).length;

  if (session.status === 'completed') {
    return {
      sessionId,
      durationSeconds,
      tasksCompleted,
      mistakesDetected,
      alreadyCompleted: true,
    };
  }
  if (session.status !== 'active') throw new ConflictError('Session is not active');
  if (answerableTaskIds.some((taskId) => !completedTaskIds.has(taskId))) {
    throw new ConflictError('Complete all lesson questions before finishing');
  }

  const claimed = await prisma.session.updateMany({
    where: { id: sessionId, userId, status: 'active' },
    data: { status: 'completed', completedAt },
  });

  if (claimed.count === 0) {
    const completed = await prisma.session.findFirst({
      where: { id: sessionId, userId, status: 'completed' },
    });
    if (completed) {
      return {
        sessionId,
        durationSeconds,
        tasksCompleted,
        mistakesDetected,
        alreadyCompleted: true,
      };
    }
    throw new ConflictError('Session could not be completed');
  }

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
    tasksCompleted,
    mistakesDetected,
  });
  await emitUserEvent(userId, 'SessionCompleted', {
    sessionId,
    lessonId: session.lessonId,
    durationSeconds,
    tasksCompleted,
    mistakesDetected,
  });

  return {
    sessionId,
    durationSeconds,
    tasksCompleted,
    mistakesDetected,
    alreadyCompleted: false,
  };
}
