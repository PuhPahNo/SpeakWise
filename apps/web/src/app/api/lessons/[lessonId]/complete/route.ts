import { withAuthAndJson } from '@/lib/api/route-handler';
import { z } from 'zod';
import { completeLessonSession } from '@/server/services/lesson';
import { extractFromSession } from '@/server/services/memory';
import {
  awardXp,
  bumpStreak,
  XP_REWARDS,
  getXpEarnedSince,
} from '@/server/services/gamification';
import { recommendNext } from '@/server/services/wise';

const Schema = z.object({ sessionId: z.string().uuid() });

export async function POST(req: Request) {
  return withAuthAndJson(Schema, req, async ({ userId }, body) => {
    const sessionStart = new Date(Date.now() - 60 * 60 * 1000); // generous window

    const summary = await completeLessonSession(userId, body.sessionId);
    await awardXp(userId, XP_REWARDS.lesson_completed, 'lesson_completed', body.sessionId);
    const streak = await bumpStreak(userId);

    const memoryUpdates = await extractFromSession(userId, body.sessionId).catch((e) => {
      console.warn('memory extraction failed', e);
      return null;
    });

    const xpEarned = await getXpEarnedSince(userId, sessionStart);
    const next = await recommendNext(userId);

    // Surface what Wise learned so the player can show it as a "Wise just
    // remembered…" beat. We only forward NEW user-visible high-confidence
    // candidates — keep it short.
    const newMemory = (memoryUpdates?.memoryCandidates ?? [])
      .filter((m) => m.visibility === 'user_visible' && m.confidence >= 0.7)
      .map((m) => ({ type: m.type, content: m.content }))
      .slice(0, 3);

    return {
      sessionSummary: summary,
      xpEarned,
      streakDays: streak.currentDays,
      newMemory,
      nextRecommendation: next,
    };
  });
}
