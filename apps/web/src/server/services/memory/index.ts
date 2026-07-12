import { ConflictError } from '@/lib/api/errors';
import { Models, chatStructured, embed } from '@speakwise/ai';
import { Prisma, prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';
import { MemoryExtractionOutputSchema } from '@speakwise/schemas';
import type { MemoryCandidate } from '@speakwise/types';
import { updateProfile } from '../profile';
import { recordSkillEvidence } from '../progress';
import { reviewVocabulary } from '../vocabulary';

const MIN_CONFIDENCE_TO_PERSIST = 0.5;

async function memoryDedupeKey(type: string, content: string) {
  const normalized = `${type}:${content.trim().toLowerCase()}`;
  const [row] = await prisma.$queryRaw<Array<{ key: string }>>`SELECT md5(${normalized}) AS key`;
  if (!row) throw new Error('Unable to compute memory dedupe key');
  return row.key;
}

export async function applyMemoryCandidates(
  userId: string,
  candidates: MemoryCandidate[],
  opts: { sourceSessionId?: string | null; sourceResponseId?: string | null } = {},
) {
  for (const c of candidates) {
    if (c.confidence < MIN_CONFIDENCE_TO_PERSIST) continue;

    let embedding: number[] | null = null;
    try {
      embedding = await embed(c.content);
    } catch {
      // embedding optional — memory still useful without
    }

    const dedupeKey = await memoryDedupeKey(c.type, c.content);
    const note = await prisma.memoryNote.upsert({
      where: { userId_dedupeKey: { userId, dedupeKey } },
      create: {
        userId,
        type: c.type,
        content: c.content,
        dedupeKey,
        confidence: c.confidence,
        visibility: c.visibility,
        structuredData: c.structuredData
          ? (JSON.parse(JSON.stringify(c.structuredData)) as Prisma.InputJsonValue)
          : Prisma.JsonNull,
        sourceSessionId: opts.sourceSessionId ?? null,
        sourceResponseId: opts.sourceResponseId ?? null,
        isActive: true,
      },
      update: {
        content: c.content,
        visibility: c.visibility,
        structuredData: c.structuredData
          ? (JSON.parse(JSON.stringify(c.structuredData)) as Prisma.InputJsonValue)
          : Prisma.JsonNull,
        sourceSessionId: opts.sourceSessionId ?? undefined,
        sourceResponseId: opts.sourceResponseId ?? undefined,
        isActive: true,
      },
    });

    await prisma.$executeRaw`
      UPDATE memory_notes
      SET confidence = GREATEST(confidence, ${c.confidence})
      WHERE id = ${note.id}::uuid
    `;

    if (embedding) {
      await prisma.$executeRawUnsafe(
        'UPDATE memory_notes SET embedding = $1::vector WHERE id = $2::uuid',
        `[${embedding.join(',')}]`,
        note.id,
      );
    }

    await emitUserEvent(userId, 'MemoryUpdated', {
      memoryId: note.id,
      type: note.type,
      visibility: note.visibility,
      sourceSessionId: opts.sourceSessionId ?? null,
    });
  }
}

export async function listMemory(
  userId: string,
  opts?: { visibility?: 'user_visible' | 'internal' },
) {
  return prisma.memoryNote.findMany({
    where: {
      userId,
      isActive: true,
      ...(opts?.visibility ? { visibility: opts.visibility } : { visibility: 'user_visible' }),
    },
    orderBy: { updatedAt: 'desc' },
  });
}

const MEMORY_GROUPS = {
  goals: ['goal', 'motivation'] as string[],
  interests: ['interest', 'content_preference'] as string[],
  strengths: ['strength'] as string[],
  weaknesses: ['weakness', 'recurring_mistake', 'pronunciation_note'] as string[],
  preferences: ['preference', 'correction_preference'] as string[],
};

export interface GroupedMemory {
  groups: {
    key: keyof typeof MEMORY_GROUPS;
    label: string;
    notes: Array<{ id: string; content: string; confidence: number; updatedAt: string }>;
  }[];
  totalActive: number;
}

const GROUP_LABELS: Record<keyof typeof MEMORY_GROUPS, string> = {
  goals: 'Your goals',
  interests: 'What you love',
  strengths: 'Your strengths',
  weaknesses: 'Where Wise is helping',
  preferences: 'How you learn',
};

export async function listGroupedMemory(userId: string): Promise<GroupedMemory> {
  const all = await prisma.memoryNote.findMany({
    where: { userId, isActive: true, visibility: 'user_visible' },
    orderBy: { updatedAt: 'desc' },
  });

  const groups = (Object.keys(MEMORY_GROUPS) as Array<keyof typeof MEMORY_GROUPS>).map((key) => {
    const types = MEMORY_GROUPS[key];
    const notes = all
      .filter((n) => types.includes(n.type))
      .map((n) => ({
        id: n.id,
        content: n.content,
        confidence: Number(n.confidence),
        updatedAt: n.updatedAt.toISOString(),
      }));
    return { key, label: GROUP_LABELS[key], notes };
  });

  return { groups, totalActive: all.length };
}

export async function retrieveRelevantMemories(userId: string, query: string, k = 5) {
  let queryEmbedding: number[] | null = null;
  try {
    queryEmbedding = await embed(query);
  } catch {
    // fall back to recent active memories
  }

  if (!queryEmbedding) {
    return prisma.memoryNote.findMany({
      where: { userId, isActive: true },
      orderBy: { updatedAt: 'desc' },
      take: k,
    });
  }

  // pgvector cosine distance search
  const rows: Array<{
    id: string;
    type: string;
    content: string;
    visibility: string;
    confidence: number;
  }> = await prisma.$queryRawUnsafe(
    `SELECT id, type, content, visibility, confidence
       FROM memory_notes
       WHERE user_id = $1::uuid AND is_active = true AND embedding IS NOT NULL
       ORDER BY embedding <=> $2::vector
       LIMIT $3`,
    userId,
    `[${queryEmbedding.join(',')}]`,
    k,
  );
  return rows;
}

export async function extractFromSession(userId: string, sessionId: string) {
  const session = await prisma.session.findFirst({
    where: { id: sessionId, userId },
    include: { responses: { include: { corrections: true } } },
  });
  if (!session) throw new Error('Session not found');
  if (session.status !== 'completed') {
    throw new ConflictError('Memory can only be extracted from a completed session');
  }
  if (session.memoryUpdatesApplied) {
    return { memoryCandidates: [], profileUpdates: {}, skillSignals: [], vocabularySignals: [] };
  }

  const profile = await prisma.learnerProfile.findUnique({ where: { userId } });

  const transcript =
    session.transcript ??
    session.responses.map((r) => ({
      role: 'user',
      text: r.userAnswer,
      correction: r.corrections[0]?.explanation,
    }));

  const result = await chatStructured({
    promptKey: 'memory.extract',
    purpose: 'memory.extract',
    schema: MemoryExtractionOutputSchema,
    model: Models.fast,
    temperature: 0.3,
    vars: {
      TRANSCRIPT_JSON: JSON.stringify(transcript),
      PROFILE_JSON: JSON.stringify(profile ?? {}),
    },
  });
  const ai = result.data;

  await applyMemoryCandidates(userId, ai.memoryCandidates, { sourceSessionId: sessionId });

  const profileUpdates = ai.profileUpdates;
  const allowedCorrectionStyles = new Set([
    'gentle',
    'direct',
    'strict',
    'end_of_task',
    'major_mistakes_only',
    'adaptive',
  ]);
  const correctionStyle =
    profileUpdates.preferred_correction_style ?? profileUpdates.preferredCorrectionStyle;
  const allowedLevels = new Set([
    'complete_beginner',
    'beginner',
    'lower_intermediate',
    'intermediate',
    'upper_intermediate',
    'advanced',
  ]);
  const currentLevel = profileUpdates.current_level ?? profileUpdates.currentLevel;
  const allowedLearningStyles = new Set(['mission', 'tutor', 'conversation', 'drill', 'balanced']);
  const learningStyle =
    profileUpdates.preferred_learning_style ?? profileUpdates.preferredLearningStyle;
  const allowedPersonalities = new Set([
    'default',
    'friendly_tutor',
    'direct_coach',
    'game_master',
    'premium_assistant',
    'strict_grammar_coach',
    'casual_companion',
  ]);
  const personality =
    profileUpdates.preferred_wise_personality ?? profileUpdates.preferredWisePersonality;
  const sessionLength =
    profileUpdates.preferred_session_length_minutes ?? profileUpdates.preferredSessionLengthMinutes;
  const preferredFrequency =
    profileUpdates.preferred_frequency ?? profileUpdates.preferredFrequency;
  const motivationNotes = profileUpdates.motivation_notes ?? profileUpdates.motivationNotes;
  const goals = profileUpdates.goals;
  const interests = profileUpdates.interests;

  const safeProfilePatch: Prisma.LearnerProfileUpdateInput = {};
  if (typeof correctionStyle === 'string' && allowedCorrectionStyles.has(correctionStyle)) {
    safeProfilePatch.preferredCorrectionStyle = correctionStyle as never;
  }
  if (typeof currentLevel === 'string' && allowedLevels.has(currentLevel)) {
    safeProfilePatch.currentLevel = currentLevel as never;
  }
  if (typeof learningStyle === 'string' && allowedLearningStyles.has(learningStyle)) {
    safeProfilePatch.preferredLearningStyle = learningStyle as never;
  }
  if (typeof personality === 'string' && allowedPersonalities.has(personality)) {
    safeProfilePatch.preferredWisePersonality = personality as never;
  }
  if (typeof sessionLength === 'number' && Number.isInteger(sessionLength)) {
    safeProfilePatch.preferredSessionLengthMinutes = Math.max(2, Math.min(120, sessionLength));
  }
  if (typeof preferredFrequency === 'string') {
    safeProfilePatch.preferredFrequency = preferredFrequency.slice(0, 120);
  }
  if (typeof motivationNotes === 'string') {
    safeProfilePatch.motivationNotes = motivationNotes.slice(0, 2000);
  }
  if (Array.isArray(goals)) {
    const safeGoals = goals
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.trim().slice(0, 200))
      .filter(Boolean)
      .slice(0, 10);
    if (safeGoals.length > 0) safeProfilePatch.goals = safeGoals;
  }
  if (Array.isArray(interests)) {
    const safeInterests = interests
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.trim().slice(0, 200))
      .filter(Boolean)
      .slice(0, 20);
    if (safeInterests.length > 0) safeProfilePatch.interests = safeInterests;
  }
  if (Object.keys(safeProfilePatch).length > 0) {
    await updateProfile(userId, safeProfilePatch);
  }

  // Lesson responses already update learning state during correction.
  // Conversation sessions do not, so extraction is their bridge to SRS.
  if (session.sessionType === 'conversation' && session.responses.length === 0) {
    const skillSlugs = [...new Set(ai.skillSignals.map((signal) => signal.skillSlug))];
    const skills = skillSlugs.length
      ? await prisma.curriculumSkill.findMany({
          where: { slug: { in: skillSlugs }, isActive: true },
          select: { id: true, slug: true },
        })
      : [];
    const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill.id]));
    for (const signal of ai.skillSignals) {
      const skillId = skillBySlug.get(signal.skillSlug);
      if (!skillId) continue;
      await recordSkillEvidence({
        userId,
        skillId,
        correct: signal.outcome === 'correct',
        weight: signal.weight,
      });
    }

    for (const signal of ai.vocabularySignals) {
      const item = await prisma.vocabularyItem.findFirst({
        where: {
          userId,
          targetText: { equals: signal.targetText.trim(), mode: 'insensitive' },
        },
        select: { id: true },
      });
      if (item) await reviewVocabulary(userId, item.id, signal.outcome);
    }
  }

  const summary = ai.memoryCandidates.find((candidate) => candidate.type === 'session_summary');
  const strengths = ai.memoryCandidates
    .filter((candidate) => candidate.type === 'strength')
    .map((candidate) => candidate.content)
    .slice(0, 5);
  const weaknesses = ai.memoryCandidates
    .filter((candidate) => candidate.type === 'weakness' || candidate.type === 'recurring_mistake')
    .map((candidate) => candidate.content)
    .slice(0, 5);

  await prisma.session.update({
    where: { id: sessionId },
    data: {
      memoryUpdatesApplied: true,
      summary: summary?.content ?? session.summary,
      strengthsObserved: strengths.length > 0 ? strengths : session.strengthsObserved,
      weaknessesObserved: weaknesses.length > 0 ? weaknesses : session.weaknessesObserved,
    },
  });

  await emitUserEvent(userId, 'AICall', {
    provider: 'openai',
    model: result.usage.model,
    purpose: 'memory.extract',
    tokensIn: result.usage.promptTokens,
    tokensOut: result.usage.completionTokens,
    latencyMs: result.usage.latencyMs,
    ok: true,
  });

  return ai;
}
