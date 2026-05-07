import { withAuth } from '@/lib/api/route-handler';
import { getGamificationSummary } from '@/server/services/gamification';

export const dynamic = 'force-dynamic';

export async function GET() {
  return withAuth(({ userId }) => getGamificationSummary(userId));
}
