// The scheduled-job logic, factored out of the /api/cron/* route handlers so
// the in-process scheduler and the (still-present) HTTP endpoints run exactly
// the same code. These are plain async functions — no request/auth concerns.

import { offerComebackIfNeeded } from '@/server/services/gamification';
import { extractFromSession } from '@/server/services/memory';
import { prisma } from '@speakwise/db';

/**
 * Nightly: scan learners and surface a "comeback" offer to anyone who's gone
 * quiet. Idempotent — offerComebackIfNeeded decides per user.
 */
export async function runNightly(): Promise<{ processed: number; offers: number }> {
  const users = await prisma.user.findMany({ where: { role: 'learner' }, select: { id: true } });
  let offers = 0;
  for (const u of users) {
    const offer = await offerComebackIfNeeded(u.id);
    if (offer) offers++;
  }
  return { processed: users.length, offers };
}

/**
 * Hourly: extract memory from recently-completed sessions that haven't been
 * processed yet (bounded batch so a backlog can't blow up one run).
 */
export async function runMemoryExtract(): Promise<{
  processed: number;
  errored: number;
  total: number;
}> {
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const sessions = await prisma.session.findMany({
    where: { status: 'completed', memoryUpdatesApplied: false, completedAt: { gte: since } },
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
  return { processed, errored, total: sessions.length };
}
