import { withAuth } from '@/lib/api/route-handler';
import { getFluencyDashboard } from '@/server/services/dashboard';

export async function GET() {
  return withAuth(async ({ userId }) => getFluencyDashboard(userId));
}
