import { withAuthAndJson } from '@/lib/api/route-handler';
import { evaluateUserResponse } from '@/server/services/correction';
import { EvaluateCorrectionRequestSchema } from '@speakwise/schemas';

export async function POST(req: Request) {
  return withAuthAndJson(EvaluateCorrectionRequestSchema, req, async ({ userId }, body) => {
    const { correction, ai } = await evaluateUserResponse({
      userId,
      userResponseId: body.userResponseId,
      correctionMode: body.correctionMode,
    });
    return {
      isCorrect: ai.isCorrect,
      score: ai.score,
      corrections: [correction],
      feedback: ai.explanation,
    };
  });
}
