import { withAuthAndJson } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import {
  XP_REWARDS,
  awardXp,
  bumpStreak,
  getLessonSessionXp,
} from '@/server/services/gamification';
import { completeLessonSession } from '@/server/services/lesson';
import { extractFromSession } from '@/server/services/memory';
import { recommendNext } from '@/server/services/wise';
import { z } from 'zod';

const Schema = z.object({ sessionId: z.string().uuid() });

export async function POST(req: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return withAuthAndJson(Schema, req, async ({ userId }, body) => {
    const limited = userRateLimitResponse('lesson-complete', userId, 20, 15 * 60_000);
    if (limited) return limited;
    const summary = await completeLessonSession(userId, body.sessionId, lessonId);
    await awardXp(userId, XP_REWARDS.lesson_completed, 'lesson_completed', body.sessionId);
    const streak = await bumpStreak(userId);

    const memoryUpdates = await extractFromSession(userId, body.sessionId).catch((e) => {
      console.warn('memory extraction failed', e);
      return null;
    });

    const xpEarned = await getLessonSessionXp(userId, body.sessionId);
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
