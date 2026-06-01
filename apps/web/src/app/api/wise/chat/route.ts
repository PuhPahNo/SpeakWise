import { UnauthenticatedError, requireUserId } from '@/lib/auth/current-user';
import { getWiseProfileSummary } from '@/server/services/profile';
import { streamChat } from '@speakwise/ai';
import { prisma } from '@speakwise/db';
import { WiseChatRequestSchema } from '@speakwise/schemas';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Streaming, conversational chat with Wise (the text-first experience).
 * Returns the reply as a plain-text stream so the client renders tokens live —
 * no TTS in the path, so it feels instant. The client keeps the history and
 * sends it each turn (stateless server).
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
        })) {
          controller.enqueue(encoder.encode(delta));
        }
      } catch (e) {
        console.error('wise.chat stream failed', e);
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
