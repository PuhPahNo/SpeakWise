import { NextResponse } from 'next/server';
import { z } from 'zod';
import { synthesizeSpeech } from '@speakwise/ai';
import { getOrCreateUser } from '@/lib/auth/current-user';

const Schema = z.object({
  text: z.string().min(1).max(2000),
  language: z.enum(['en', 'it']).default('it'),
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await getOrCreateUser();
    const body = Schema.parse(await req.json());
    const result = await synthesizeSpeech({ text: body.text, language: body.language });
    return new Response(result.audio, {
      headers: {
        'Content-Type': result.contentType,
        'Cache-Control': 'private, max-age=0, must-revalidate',
      },
    });
  } catch (e) {
    console.error('tts error', e);
    return NextResponse.json(
      { error: 'tts_failed', message: e instanceof Error ? e.message : 'unknown' },
      { status: 500 },
    );
  }
}
