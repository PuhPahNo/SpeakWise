// In-process scheduler — runs the cron jobs inside the web service instead of
// as separate Render cron services. Started once at server boot (see
// apps/web/src/instrumentation.ts), production only.
//
// Each tick claims its time window in the cron_runs table first; the unique
// (job, windowKey) constraint guarantees that a restart, an overlapping deploy,
// or a second instance can't double-fire the same window. The HTTP /api/cron/*
// endpoints still exist and run the same job functions WITHOUT the guard, so a
// human can force a run for testing.

import { prisma } from '@speakwise/db';
import { runMemoryExtract, runNightly } from './jobs';

const DAILY_HOUR_UTC = 7;
const DAILY_MIN_UTC = 15;

// ── window keys (UTC) ──────────────────────────────────────────────────────
const dailyKey = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const hourKey = () => new Date().toISOString().slice(0, 13); // YYYY-MM-DDTHH

// ── dedup guard ────────────────────────────────────────────────────────────
/**
 * Claim a job's time window. Returns the new row id if we won the claim, or
 * null if another runner already owns this window (unique-constraint clash).
 */
export async function claimCronWindow(
  job: string,
  windowKey: string,
): Promise<{ id: string } | null> {
  try {
    return await prisma.cronRun.create({ data: { job, windowKey }, select: { id: true } });
  } catch (e) {
    if ((e as { code?: string }).code === 'P2002') return null; // already claimed
    throw e;
  }
}

async function runGuarded(job: string, windowKey: string, fn: () => Promise<unknown>) {
  let claim: { id: string } | null;
  try {
    claim = await claimCronWindow(job, windowKey);
  } catch (e) {
    console.error(`[cron] claim error for ${job} ${windowKey}`, e);
    return;
  }
  if (!claim) return; // another runner owns this window
  try {
    const result = await fn();
    await prisma.cronRun.update({
      where: { id: claim.id },
      data: { result: JSON.parse(JSON.stringify(result)) },
    });
    console.log(`[cron] ${job} ${windowKey} done`, result);
  } catch (e) {
    console.error(`[cron] ${job} ${windowKey} failed`, e);
  }
}

// ── timing ─────────────────────────────────────────────────────────────────
function msUntilDailyUtc(): number {
  const now = new Date();
  const next = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      DAILY_HOUR_UTC,
      DAILY_MIN_UTC,
      0,
      0,
    ),
  );
  if (next.getTime() <= now.getTime()) next.setUTCDate(next.getUTCDate() + 1);
  return next.getTime() - now.getTime();
}

function msUntilNextHour(): number {
  const now = new Date();
  const next = new Date(now);
  next.setUTCMinutes(0, 0, 0);
  next.setUTCHours(next.getUTCHours() + 1);
  return next.getTime() - now.getTime();
}

function arm(delayMs: number, tick: () => void) {
  const t = setTimeout(tick, delayMs);
  // Don't let the timer keep the process alive on its own; the HTTP server does.
  if (typeof (t as { unref?: () => void }).unref === 'function') {
    (t as { unref: () => void }).unref();
  }
}

let started = false;

/** Start the schedulers. Idempotent — safe to call more than once. */
export function startCronScheduler() {
  if (started) return;
  started = true;
  console.log('[cron] in-process scheduler started — nightly 07:15 UTC, memory-extract hourly');

  const dailyTick = () => {
    void runGuarded('nightly', dailyKey(), runNightly);
    arm(msUntilDailyUtc(), dailyTick);
  };
  arm(msUntilDailyUtc(), dailyTick);

  const hourlyTick = () => {
    void runGuarded('memory-extract', hourKey(), runMemoryExtract);
    arm(msUntilNextHour(), hourlyTick);
  };
  arm(msUntilNextHour(), hourlyTick);
}
