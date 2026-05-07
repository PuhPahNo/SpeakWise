import { withAuthAndJson } from '@/lib/api/route-handler';
import { PracticeRespondRequestSchema } from '@speakwise/schemas';
import { submitResponse } from '@/server/services/practice';
import { awardXp, XP_REWARDS } from '@/server/services/gamification';

export async function POST(req: Request) {
  return withAuthAndJson(PracticeRespondRequestSchema, req, async ({ userId }, body) => {
    const result = await submitResponse({
      userId,
      sessionId: body.sessionId,
      lessonTaskId: body.lessonTaskId,
      inputType: body.inputType,
      answer: body.answer,
      audioUrl: body.audioUrl,
    });
    if (result.correctionAi.isCorrect) {
      await awardXp(userId, XP_REWARDS.task_correct, 'task_correct', body.lessonTaskId);
    }
    return {
      userResponse: result.userResponse,
      correction: result.correction,
      nextTask: result.nextTask,
      progressSignals: result.userResponse.skillIds,
    };
  });
}
