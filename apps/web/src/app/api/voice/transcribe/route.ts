import { getOrCreateUser } from '@/lib/auth/current-user';
import { transcribeAudio } from '@speakwise/ai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await getOrCreateUser();
    const form = await req.formData();
    const file = form.get('audio');
    // Language hint:
    //   - 'en' / 'it' force a specific language (caller already knows what
    //     they expect, e.g. forced-Italian roleplay tasks).
    //   - 'auto' or null tells Whisper to auto-detect — used in mixed
    //     contexts where the learner might reply in either language.
    const langRaw = form.get('language');
    const language: 'en' | 'it' | undefined =
      langRaw === 'en' || langRaw === 'it' ? langRaw : undefined;
    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: 'audio file required' }, { status: 400 });
    }
    const buf = await file.arrayBuffer();
    const result = await transcribeAudio({
      audio: buf,
      language,
      filename: 'audio.webm',
    });
    return NextResponse.json(result);
  } catch (e) {
    console.error('transcribe error', e);
    return NextResponse.json(
      { error: 'transcribe_failed', message: e instanceof Error ? e.message : 'unknown' },
      { status: 500 },
    );
  }
}
