import { withAdminAuthAndJson } from '@/lib/api/route-handler';
import { updateUserProfile } from '@/server/services/admin/users';
import type { Prisma } from '@speakwise/db';
import { AdminUpdateProfileRequestSchema } from '@speakwise/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return withAdminAuthAndJson(AdminUpdateProfileRequestSchema, req, ({ userId: actorId }, body) =>
    updateUserProfile(userId, body as Prisma.LearnerProfileUpdateInput, actorId),
  );
}
