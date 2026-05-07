import { withAuth } from '@/lib/api/route-handler';
import { listMemory } from '@/server/services/memory';

export async function GET() {
  return withAuth(({ userId }) => listMemory(userId, { visibility: 'user_visible' }));
}
