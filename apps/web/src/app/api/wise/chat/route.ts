import { UnauthenticatedError, requireUserId } from '@/lib/auth/current-user';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { getWiseProfileSummary } from '@/server/services/profile';
import { streamChat } from '@speakwise/ai';
import type { ChatStreamUsage } from '@speakwise/ai';
import { prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';
import { WiseChatRequestSchema } from '@speakwise/schemas';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Streaming, conversational chat with Wise (the text-first experience).
 * Returns the reply as a plain-text stream so the client renders tokens live —
 * no TTS in the path, so it feels instant. The client keeps the running history;
 * the server persists each completed turn so memory extraction can learn from it.
 */
export async function POST(req: Request) {
  let userId: string;
  try {
    userId = await requireUserId();
  } catch (e) {
    if (e instanceof UnauthenticatedError) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    throw e;
  }

  const limited = userRateLimitResponse('wise-chat', userId, 30, 15 * 60_000);
  if (limited) return limited;

  const json = await req.json().catch(() => ({}));
  const parsed = WiseChatRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }

  const [user, profile] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
    getWiseProfileSummary(userId),
  ]);
  const firstName = user?.name.split(' ')[0] ?? 'there';
  const context = {
    level: profile?.level ?? 'beginner',
    languageRatio: profile?.languageRatio ?? 0.1,
    immersionMode: profile?.immersionMode ?? false,
    interests: profile?.interests ?? [],
    goals: profile?.goals ?? [],
  };

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let reply = '';
      const telemetry: { usage?: ChatStreamUsage } = {};
      const startedAt = Date.now();
      try {
        for await (const delta of streamChat({
          promptKey: 'wise.chat',
          vars: {
            FIRST_NAME: firstName,
            LEVEL: String(context.level),
            LANGUAGE_RATIO: String(context.languageRatio),
            CONTEXT_JSON: JSON.stringify(context),
          },
          messages: parsed.data.messages,
          temperature: 0.6,
          maxOutputTokens: 700,
          onUsage: (value) => {
            telemetry.usage = value;
          },
        })) {
          reply += delta;
          controller.enqueue(encoder.encode(delta));
        }
        const lastUserMessage = [...parsed.data.messages]
          .reverse()
          .find((message) => message.role === 'user');
        try {
          if (reply.trim() && lastUserMessage) {
            await prisma.session.create({
              data: {
                userId,
                sessionType: 'conversation',
                mode: 'text',
                status: 'completed',
                transcript: [
                  { role: 'user', text: lastUserMessage.content },
                  { role: 'wise', text: reply },
                ],
                summary: 'Wise chat turn',
                completedAt: new Date(),
              },
            });
          }
          await emitUserEvent(userId, 'AICall', {
            provider: 'openai',
            model: telemetry.usage?.model ?? 'unknown',
            purpose: 'wise.chat',
            tokensIn: telemetry.usage?.promptTokens ?? 0,
            tokensOut: telemetry.usage?.completionTokens ?? 0,
            latencyMs: telemetry.usage?.latencyMs ?? Date.now() - startedAt,
            ok: true,
          });
        } catch (persistenceError) {
          console.error('wise.chat persistence failed', persistenceError);
        }
      } catch (e) {
        console.error('wise.chat stream failed', e);
        await emitUserEvent(userId, 'AICall', {
          provider: 'openai',
          model: telemetry.usage?.model ?? 'unknown',
          purpose: 'wise.chat',
          latencyMs: Date.now() - startedAt,
          ok: false,
          errorMessage: e instanceof Error ? e.message.slice(0, 300) : 'unknown error',
        }).catch(() => undefined);
        controller.enqueue(
          encoder.encode('\n\n_(Sorry — I lost my train of thought there. Try again?)_'),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      // Disable proxy buffering so tokens flush immediately (Render/Nginx).
      'X-Accel-Buffering': 'no',
    },
  });
}
