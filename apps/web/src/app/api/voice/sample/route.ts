import { getOrCreateUser } from '@/lib/auth/current-user';
import { getVoiceById, synthesizeSpeech } from '@speakwise/ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  voiceId: z.string().min(8).max(64),
  text: z.string().min(1).max(300).optional(),
  language: z.enum(['it', 'en']).default('it'),
});

const DEFAULT_SAMPLE_IT =
  'Ciao! Sono Wise, il tuo tutor di italiano. Iniziamo con una breve presentazione.';
const DEFAULT_SAMPLE_EN = "Hi, I'm Wise, your Italian tutor. Let's start with a quick warm-up.";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await getOrCreateUser();
    const body = Schema.parse(await req.json());
    if (!getVoiceById(body.voiceId)) {
      return NextResponse.json({ error: 'unknown_voice_id' }, { status: 400 });
    }
    const text = body.text ?? (body.language === 'en' ? DEFAULT_SAMPLE_EN : DEFAULT_SAMPLE_IT);
    const result = await synthesizeSpeech({
      text,
      language: body.language,
      voiceId: body.voiceId,
    });
    return new Response(result.audio, {
      headers: {
        'Content-Type': result.contentType,
        // Cache the same sample for an hour per voice — cheap and they rarely change
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (e) {
    console.error('voice sample error', e);
    return NextResponse.json(
      { error: 'sample_failed', message: e instanceof Error ? e.message : 'unknown' },
      { status: 500 },
    );
  }
}
