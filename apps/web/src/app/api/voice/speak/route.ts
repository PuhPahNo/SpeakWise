import { getOrCreateUser } from '@/lib/auth/current-user';
import { ensureProfile } from '@/server/services/profile';
import { synthesizeSpeech } from '@speakwise/ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  text: z.string().min(1).max(2000),
  language: z.enum(['en', 'it']).default('it'),
  /** Optional override for one-off previews. Falls back to profile default. */
  voiceId: z.string().min(8).max(64).optional(),
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    const body = Schema.parse(await req.json());
    const profile = await ensureProfile(user.id);
    const result = await synthesizeSpeech({
      text: body.text,
      language: body.language,
      voiceId: body.voiceId ?? profile.wiseVoiceId ?? undefined,
    });
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
