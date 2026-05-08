import { withAuthAndJson } from '@/lib/api/route-handler';
import { generateLesson } from '@/server/services/lesson';
import { GenerateLessonRequestSchema } from '@speakwise/schemas';

export async function POST(req: Request) {
  return withAuthAndJson(GenerateLessonRequestSchema, req, async ({ userId }, body) => {
    const lesson = await generateLesson({
      userId,
      lessonType: body.lessonType,
      durationMinutes: body.durationMinutes,
      targetSkillIds: body.targetSkillIds,
      interestTheme: body.interestTheme,
      userRequest: body.userRequest,
    });
    return { lesson, tasks: lesson.tasks };
  });
}
