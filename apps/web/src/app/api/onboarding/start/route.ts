import { withAuthAndJson } from '@/lib/api/route-handler';
import { startOnboarding } from '@/server/services/onboarding';
import { StartOnboardingRequestSchema } from '@speakwise/schemas';

export async function POST(req: Request) {
  return withAuthAndJson(StartOnboardingRequestSchema, req, ({ userId }, body) =>
    startOnboarding(userId, body.mode),
  );
}
