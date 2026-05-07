import { withAuth } from '@/lib/api/route-handler';
import { offerComebackIfNeeded } from '@/server/services/gamification';

export const dynamic = 'force-dynamic';

export async function GET() {
  return withAuth(async ({ userId }) => {
    const offer = await offerComebackIfNeeded(userId);
    return { offer };
  });
}
