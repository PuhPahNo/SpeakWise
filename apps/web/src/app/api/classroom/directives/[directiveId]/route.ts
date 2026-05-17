import { withTutorAuthAndJson } from '@/lib/api/route-handler';
import { archiveDirective } from '@/server/services/classroom';
import { getTutorProfile } from '@/server/services/classroom';
import { prisma } from '@speakwise/db';
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
    const tutor = await getTutorProfile(userId);
    const dir = await prisma.tutorDirective.findUnique({ where: { id: directiveId } });
    if (!dir || dir.tutorId !== tutor.id) throw new Error('Directive not found');
    const updated = await prisma.tutorDirective.update({
      where: { id: directiveId },
      data: {
        body: body.body,
        pinnedSkillIds: body.pinnedSkillIds,
        expiresAt:
          body.expiresAt === undefined
            ? undefined
            : body.expiresAt
              ? new Date(body.expiresAt)
              : null,
        status: body.status,
      },
    });
    return { directive: updated };
  });
}
