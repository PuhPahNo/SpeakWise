import { withAuth } from '@/lib/api/route-handler';
import { ensureProfile } from '@/server/services/profile';
import { generateLesson } from '@/server/services/lesson';

export async function POST() {
  return withAuth(async ({ userId }) => {
    const profile = await ensureProfile(userId);
    const recommended = await generateLesson({
      userId,
      lessonType: 'daily_mission',
      durationMinutes: profile.preferredSessionLengthMinutes ?? 10,
    });
    return { learnerProfile: profile, recommendedFirstLesson: recommended };
  });
}
