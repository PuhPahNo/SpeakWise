import { offerComebackIfNeeded } from '@/server/services/gamification';
import { prisma } from '@speakwise/db';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function checkCronAuth(req: Request) {
  const auth = req.headers.get('authorization') ?? '';
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

export async function POST(req: Request) {
  if (!checkCronAuth(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const users = await prisma.user.findMany({
    select: { id: true },
    where: { role: 'learner' },
  });

  const offers: Array<{ userId: string; offer: unknown }> = [];
  for (const u of users) {
    const offer = await offerComebackIfNeeded(u.id);
    if (offer) offers.push({ userId: u.id, offer });
  }

  return NextResponse.json({ ok: true, processed: users.length, offers: offers.length });
}
