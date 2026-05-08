import { DEFAULT_VOICE_ID, WISE_VOICES } from '@speakwise/ai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    voices: WISE_VOICES,
    defaultVoiceId: DEFAULT_VOICE_ID,
  });
}
