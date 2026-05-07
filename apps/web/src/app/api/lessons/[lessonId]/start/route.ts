import { withAuthAndJson } from '@/lib/api/route-handler';
import { z } from 'zod';
import { startLessonSession } from '@/server/services/lesson';
import { bumpStreak } from '@/server/services/gamification';

const Schema = z.object({ mode: z.enum(['voice', 'text', 'mixed']).default('text') });

export async function POST(req: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return withAuthAndJson(Schema, req, async ({ userId }, body) => {
    const result = await startLessonSession(userId, lessonId, body.mode);
    await bumpStreak(userId);
    return result;
  });
}
