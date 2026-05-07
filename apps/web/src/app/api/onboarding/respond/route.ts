import { withAuthAndJson } from '@/lib/api/route-handler';
import { RespondOnboardingRequestSchema } from '@speakwise/schemas';
import { respondOnboarding } from '@/server/services/onboarding';

export async function POST(req: Request) {
  return withAuthAndJson(RespondOnboardingRequestSchema, req, ({ userId }, body) =>
    respondOnboarding(userId, body.sessionId, body.text),
  );
}
