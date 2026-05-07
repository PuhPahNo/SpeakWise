import { NextResponse } from 'next/server';
import { transcribeAudio } from '@speakwise/ai';
import { getOrCreateUser } from '@/lib/auth/current-user';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await getOrCreateUser();
    const form = await req.formData();
    const file = form.get('audio');
    const language = (form.get('language') as 'en' | 'it' | null) ?? 'it';
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
