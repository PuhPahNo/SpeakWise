import { withAuthAndJson } from '@/lib/api/route-handler';
import { z } from 'zod';
import { extractFromSession } from '@/server/services/memory';

const Schema = z.object({ sessionId: z.string().uuid() });

export async function POST(req: Request) {
  return withAuthAndJson(Schema, req, ({ userId }, body) =>
    extractFromSession(userId, body.sessionId),
  );
}
