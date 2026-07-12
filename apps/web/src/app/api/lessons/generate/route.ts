import { withAuthAndJson } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { generateLesson } from '@/server/services/lesson';
import { GenerateLessonRequestSchema } from '@speakwise/schemas';

export async function POST(req: Request) {
  return withAuthAndJson(GenerateLessonRequestSchema, req, async ({ userId }, body) => {
    const limited = userRateLimitResponse('lesson-generate', userId, 10, 15 * 60_000);
    if (limited) return limited;
    const lesson = await generateLesson({
      userId,
      lessonType: body.lessonType,
      durationMinutes: body.durationMinutes,
      targetSkillIds: body.targetSkillIds,
      interestTheme: body.interestTheme,
      userRequest: body.userRequest,
      lessonTemplateSlug: body.lessonTemplateSlug,
    });
    return { lesson, tasks: lesson.tasks };
  });
}
