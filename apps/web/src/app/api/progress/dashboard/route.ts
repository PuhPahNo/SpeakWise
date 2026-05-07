import { withAuth } from '@/lib/api/route-handler';
import { getDashboard } from '@/server/services/progress';

export async function GET() {
  return withAuth(({ userId }) => getDashboard(userId));
}
