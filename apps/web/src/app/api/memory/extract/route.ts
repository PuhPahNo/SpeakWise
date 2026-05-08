import { withAuthAndJson } from '@/lib/api/route-handler';
import { extractFromSession } from '@/server/services/memory';
import { z } from 'zod';

const Schema = z.object({ sessionId: z.string().uuid() });

export async function POST(req: Request) {
  return withAuthAndJson(Schema, req, ({ userId }, body) =>
    extractFromSession(userId, body.sessionId),
  );
}
