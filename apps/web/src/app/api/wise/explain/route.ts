import { withAuthAndJson } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { explainConcept } from '@/server/services/wise';
import { WiseExplainRequestSchema } from '@speakwise/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The floating "Ask Wise" helper. A learner mid-lesson asks a question
 * ("why is this wrong?") and gets a grounded, level-appropriate explanation
 * without leaving or re-grading the task.
 */
export async function POST(req: Request) {
  return withAuthAndJson(WiseExplainRequestSchema, req, async ({ userId }, body) => {
    const limited = userRateLimitResponse('wise-explain', userId, 30, 15 * 60_000);
    if (limited) return limited;
    return explainConcept(userId, body);
  });
}
