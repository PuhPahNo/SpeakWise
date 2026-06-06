import { getOrCreateUser } from '@/lib/auth/current-user';
import { getTtsAvailability } from '@speakwise/ai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Reports whether voice (ElevenLabs TTS) will actually work from the server.
 * Free-tier keys are blocked from datacenter IPs, so the UI uses this to
 * default to Chat instead of leaving users stuck on a silent orb.
 */
export async function GET() {
  try {
    await getOrCreateUser(); // auth-gate; result doesn't leak secrets
    const avail = await getTtsAvailability();
    return NextResponse.json(
      { available: avail.available, tier: avail.tier },
      { headers: { 'Cache-Control': 'private, max-age=60' } },
    );
  } catch {
    // On any error, report unavailable so the client falls back to Chat.
    return NextResponse.json({ available: false, tier: null });
  }
}
