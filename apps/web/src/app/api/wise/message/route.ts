import { withAuthAndJson } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { wiseTurn } from '@/server/services/wise';
import { WiseMessageRequestSchema } from '@speakwise/schemas';

export async function POST(req: Request) {
  return withAuthAndJson(WiseMessageRequestSchema, req, async ({ userId }, body) => {
    const limited = userRateLimitResponse('wise-message', userId, 30, 15 * 60_000);
    if (limited) return limited;
    return wiseTurn(userId, body);
  });
}
