import { withAuthAndJson } from '@/lib/api/route-handler';
import { z } from 'zod';
import { completeLessonSession } from '@/server/services/lesson';
import { extractFromSession } from '@/server/services/memory';
import { awardXp, XP_REWARDS } from '@/server/services/gamification';
import { recommendNext } from '@/server/services/wise';

const Schema = z.object({ sessionId: z.string().uuid() });

export async function POST(req: Request) {
  return withAuthAndJson(Schema, req, async ({ userId }, body) => {
    const summary = await completeLessonSession(userId, body.sessionId);
    await awardXp(userId, XP_REWARDS.lesson_completed, 'lesson_completed', body.sessionId);
    const memoryUpdates = await extractFromSession(userId, body.sessionId).catch((e) => {
      console.warn('memory extraction failed', e);
      return null;
    });
    const next = await recommendNext(userId);
    return {
      sessionSummary: summary,
      memoryUpdates,
      nextRecommendation: next,
    };
  });
}
