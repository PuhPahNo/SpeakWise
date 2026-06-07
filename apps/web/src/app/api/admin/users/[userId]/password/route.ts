import { withAdminAuthAndJson } from '@/lib/api/route-handler';
import { resetUserPassword } from '@/server/services/admin/users';
import { AdminResetPasswordRequestSchema } from '@speakwise/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return withAdminAuthAndJson(AdminResetPasswordRequestSchema, req, ({ userId: actorId }, body) =>
    resetUserPassword(userId, body.password, actorId),
  );
}
