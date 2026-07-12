import { withAuth } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { generateLesson } from '@/server/services/lesson';
import { ensureProfile } from '@/server/services/profile';

export async function POST() {
  return withAuth(async ({ userId }) => {
    const limited = userRateLimitResponse('onboarding-complete', userId, 5, 15 * 60_000);
    if (limited) return limited;
    const profile = await ensureProfile(userId);
    const recommended = await generateLesson({
      userId,
      lessonType: 'daily_mission',
      durationMinutes: profile.preferredSessionLengthMinutes ?? 10,
      idempotencyKey: 'onboarding-first-lesson',
    });
    return { learnerProfile: profile, recommendedFirstLesson: recommended };
  });
}
