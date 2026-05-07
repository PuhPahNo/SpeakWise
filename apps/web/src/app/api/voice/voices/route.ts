import { NextResponse } from 'next/server';
import { WISE_VOICES, DEFAULT_VOICE_ID } from '@speakwise/ai';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    voices: WISE_VOICES,
    defaultVoiceId: DEFAULT_VOICE_ID,
  });
}
