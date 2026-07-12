import { runMemoryExtract } from '@/server/services/cron/jobs';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Scheduled in-process (see src/instrumentation.ts). Kept for manual/forced
// runs; runs the same logic without the scheduler's dedup guard.
export async function POST(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const result = await runMemoryExtract();
  return NextResponse.json({ ok: true, ...result });
}
