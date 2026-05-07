import { prisma } from '@speakwise/db';
import { embed, chatStructured, Models } from '@speakwise/ai';
import { MemoryExtractionOutputSchema, type MemoryCandidate } from '@speakwise/schemas';
import { emitUserEvent } from '@speakwise/events';

const MIN_CONFIDENCE_TO_PERSIST = 0.5;

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

    const note = await prisma.memoryNote.create({
      data: {
        userId,
        type: c.type,
        content: c.content,
        confidence: c.confidence,
        visibility: c.visibility,
        structuredData: (c.structuredData ?? null) as object | null,
        sourceSessionId: opts.sourceSessionId ?? null,
        sourceResponseId: opts.sourceResponseId ?? null,
        embeddingId: null,
        isActive: true,
      },
    });

    if (embedding) {
      await prisma.$executeRawUnsafe(
        `UPDATE memory_notes SET embedding = $1::vector WHERE id = $2::uuid`,
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

export async function listMemory(userId: string, opts?: { visibility?: 'user_visible' | 'internal' }) {
  return prisma.memoryNote.findMany({
    where: {
      userId,
      isActive: true,
      ...(opts?.visibility ? { visibility: opts.visibility } : { visibility: 'user_visible' }),
    },
    orderBy: { updatedAt: 'desc' },
  });
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
  const rows: Array<{ id: string; type: string; content: string; visibility: string; confidence: number }> =
    await prisma.$queryRawUnsafe(
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

  const profile = await prisma.learnerProfile.findUnique({ where: { userId } });

  const transcript = session.transcript ?? session.responses.map((r) => ({
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

  await prisma.session.update({ where: { id: sessionId }, data: { memoryUpdatesApplied: true } });

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
