import { withTutorAuth } from '@/lib/api/route-handler';
import { rotateInviteCode } from '@/server/services/classroom';

export async function POST() {
  return withTutorAuth(async ({ userId }) => {
    const profile = await rotateInviteCode(userId);
    return { inviteCode: profile.inviteCode };
  });
}
