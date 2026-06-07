import { withAdminAuth, withAdminAuthAndJson } from '@/lib/api/route-handler';
import { createUser, listUsers } from '@/server/services/admin/users';
import { AdminCreateUserRequestSchema, AdminUserListQuerySchema } from '@speakwise/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET(req: Request) {
  return withAdminAuth(async () => {
    const { searchParams } = new URL(req.url);
    const parsed = AdminUserListQuerySchema.safeParse({
      q: searchParams.get('q') ?? undefined,
      role: searchParams.get('role') ?? undefined,
    });
    return { users: await listUsers(parsed.success ? parsed.data : {}) };
  });
}

export function POST(req: Request) {
  return withAdminAuthAndJson(AdminCreateUserRequestSchema, req, ({ userId }, body) =>
    createUser(body, userId),
  );
}
