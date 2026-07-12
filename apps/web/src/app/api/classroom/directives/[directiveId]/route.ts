import { withTutorAuthAndJson } from '@/lib/api/route-handler';
import { archiveDirective, updateDirective } from '@/server/services/classroom';
import { PatchTutorDirectiveRequestSchema } from '@speakwise/schemas';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ directiveId: string }> },
) {
  const { directiveId } = await params;
  return withTutorAuthAndJson(PatchTutorDirectiveRequestSchema, req, async ({ userId }, body) => {
    // Fast-path archive
    if (body.status === 'archived') {
      const archived = await archiveDirective(userId, directiveId);
      return { directive: archived };
    }
    const updated = await updateDirective(userId, directiveId, {
      body: body.body,
      pinnedSkillIds: body.pinnedSkillIds,
      expiresAt:
        body.expiresAt === undefined ? undefined : body.expiresAt ? new Date(body.expiresAt) : null,
      status: body.status,
    });
    return { directive: updated };
  });
}
