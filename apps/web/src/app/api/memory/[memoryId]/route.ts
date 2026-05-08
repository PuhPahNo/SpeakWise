import { withAuthAndJson } from '@/lib/api/route-handler';
import { prisma } from '@speakwise/db';
import { z } from 'zod';

const Schema = z.object({ isActive: z.boolean().optional(), content: z.string().optional() });

export async function PATCH(req: Request, { params }: { params: Promise<{ memoryId: string }> }) {
  const { memoryId } = await params;
  return withAuthAndJson(Schema, req, async ({ userId }, body) => {
    return prisma.memoryNote.update({
      where: { id: memoryId, userId },
      data: { isActive: body.isActive, content: body.content },
    });
  });
}
