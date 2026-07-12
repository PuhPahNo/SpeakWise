import { withAuth } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { generateGreeting } from '@/server/services/wise';

export const dynamic = 'force-dynamic';

export async function GET() {
  return withAuth(async ({ userId }) => {
    const limited = userRateLimitResponse('wise-greeting', userId, 20, 15 * 60_000);
    if (limited) return limited;
    return generateGreeting(userId);
  });
}
