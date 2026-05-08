import { withAuthAndJson } from '@/lib/api/route-handler';
import { XP_REWARDS, awardXp } from '@/server/services/gamification';
import { submitResponse } from '@/server/services/practice';
import { PracticeRespondRequestSchema } from '@speakwise/schemas';

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
