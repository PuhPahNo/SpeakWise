import { withAuth } from '@/lib/api/route-handler';
import { recommendNext } from '@/server/services/wise';

export async function POST() {
  return withAuth(({ userId }) => recommendNext(userId));
}
