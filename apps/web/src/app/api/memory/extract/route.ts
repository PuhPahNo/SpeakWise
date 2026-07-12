import { withAuthAndJson } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { extractFromSession } from '@/server/services/memory';
import { z } from 'zod';

const Schema = z.object({ sessionId: z.string().uuid() });

export async function POST(req: Request) {
  return withAuthAndJson(Schema, req, async ({ userId }, body) => {
    const limited = userRateLimitResponse('memory-extract', userId, 20, 15 * 60_000);
    if (limited) return limited;
    return extractFromSession(userId, body.sessionId);
  });
}
