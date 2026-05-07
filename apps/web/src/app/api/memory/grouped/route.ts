import { withAuth } from '@/lib/api/route-handler';
import { listGroupedMemory } from '@/server/services/memory';

export const dynamic = 'force-dynamic';

export async function GET() {
  return withAuth(({ userId }) => listGroupedMemory(userId));
}
