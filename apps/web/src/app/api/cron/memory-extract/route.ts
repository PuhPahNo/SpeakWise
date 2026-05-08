import { extractFromSession } from '@/server/services/memory';
import { prisma } from '@speakwise/db';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const since = new Date(Date.now() - 60 * 60 * 1000);
  const sessions = await prisma.session.findMany({
    where: {
      status: 'completed',
      memoryUpdatesApplied: false,
      completedAt: { gte: since },
    },
    take: 50,
  });

  let processed = 0;
  let errored = 0;
  for (const s of sessions) {
    try {
      await extractFromSession(s.userId, s.id);
      processed++;
    } catch (e) {
      console.error('memory extract failed for session', s.id, e);
      errored++;
    }
  }

  return NextResponse.json({ ok: true, processed, errored, total: sessions.length });
}
