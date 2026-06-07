import { withAdminAuth, withAdminAuthAndJson } from '@/lib/api/route-handler';
import { deleteUser, getUserDetail, updateUser } from '@/server/services/admin/users';
import { AdminUpdateUserRequestSchema } from '@speakwise/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ userId: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { userId } = await params;
  return withAdminAuth(() => getUserDetail(userId));
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { userId } = await params;
  return withAdminAuthAndJson(AdminUpdateUserRequestSchema, req, ({ userId: actorId }, body) =>
    updateUser(userId, body, actorId),
  );
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { userId } = await params;
  return withAdminAuth(({ userId: actorId }) => deleteUser(userId, actorId));
}
