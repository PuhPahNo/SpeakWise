import { withTutorAuthAndJson } from '@/lib/api/route-handler';
import { createDirective } from '@/server/services/classroom';
import { CreateTutorDirectiveRequestSchema } from '@speakwise/schemas';

export async function POST(req: Request) {
  return withTutorAuthAndJson(CreateTutorDirectiveRequestSchema, req, async ({ userId }, body) => {
    const directive = await createDirective(userId, body.studentId, {
      body: body.body,
      pinnedSkillIds: body.pinnedSkillIds,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      replaceExisting: body.replaceExisting,
    });
    return { directive };
  });
}
