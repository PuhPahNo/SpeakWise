import { withAuthAndJson } from '@/lib/api/route-handler';
import { respondOnboarding } from '@/server/services/onboarding';
import { RespondOnboardingRequestSchema } from '@speakwise/schemas';

export async function POST(req: Request) {
  return withAuthAndJson(RespondOnboardingRequestSchema, req, ({ userId }, body) =>
    respondOnboarding(userId, body.sessionId, body.text),
  );
}
