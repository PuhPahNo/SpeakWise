import { runNightly } from '@/server/services/cron/jobs';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Scheduled in-process (see src/instrumentation.ts). This endpoint stays for
// manual/forced runs and external triggers; it runs the same logic WITHOUT the
// scheduler's dedup guard, so a human can re-run a window on demand.
export async function POST(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const result = await runNightly();
  return NextResponse.json({ ok: true, ...result });
}
