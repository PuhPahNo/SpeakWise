import { withAuthAndJson } from '@/lib/api/route-handler';
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
    return explainConcept(userId, body);
  });
}
