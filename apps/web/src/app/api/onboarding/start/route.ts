import { withAuthAndJson } from '@/lib/api/route-handler';
import { StartOnboardingRequestSchema } from '@speakwise/schemas';
import { startOnboarding } from '@/server/services/onboarding';

export async function POST(req: Request) {
  return withAuthAndJson(StartOnboardingRequestSchema, req, ({ userId }, body) =>
    startOnboarding(userId, body.mode),
  );
}
