import { UnauthenticatedError, getOrCreateUser } from '@/lib/auth/current-user';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { transcribeAudio } from '@speakwise/ai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    const limited = userRateLimitResponse('voice-transcribe', user.id, 30, 15 * 60_000);
    if (limited) return limited;
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
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'audio_too_large' }, { status: 413 });
    }
    if (file.type && !file.type.startsWith('audio/')) {
      return NextResponse.json({ error: 'invalid_audio_type' }, { status: 415 });
    }
    const buf = await file.arrayBuffer();
    const result = await transcribeAudio({
      audio: buf,
      language,
      filename: 'audio.webm',
    });
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof UnauthenticatedError) {
      return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }
    console.error('transcribe error', e);
    return NextResponse.json(
      { error: 'transcribe_failed', message: 'Transcription failed. Please retry.' },
      { status: 500 },
    );
  }
}
