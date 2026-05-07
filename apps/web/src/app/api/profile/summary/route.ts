import { withAuth } from '@/lib/api/route-handler';
import { getWiseProfileSummary } from '@/server/services/profile';

export async function GET() {
  return withAuth(({ userId }) => getWiseProfileSummary(userId).then((s) => ({ summary: s })));
}
