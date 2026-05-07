import { withAuth } from '@/lib/api/route-handler';
import { generateGreeting } from '@/server/services/wise';

export const dynamic = 'force-dynamic';

export async function GET() {
  return withAuth(({ userId }) => generateGreeting(userId));
}
