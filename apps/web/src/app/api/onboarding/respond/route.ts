import { withAuthAndJson } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { respondOnboarding } from '@/server/services/onboarding';
import { RespondOnboardingRequestSchema } from '@speakwise/schemas';

export async function POST(req: Request) {
  return withAuthAndJson(RespondOnboardingRequestSchema, req, async ({ userId }, body) => {
    const limited = userRateLimitResponse('onboarding-respond', userId, 30, 15 * 60_000);
    if (limited) return limited;
    return respondOnboarding(userId, body.sessionId, body.text);
  });
}
