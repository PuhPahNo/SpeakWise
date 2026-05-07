import { withAuthAndJson } from '@/lib/api/route-handler';
import { WiseMessageRequestSchema } from '@speakwise/schemas';
import { wiseTurn } from '@/server/services/wise';

export async function POST(req: Request) {
  return withAuthAndJson(WiseMessageRequestSchema, req, ({ userId }, body) =>
    wiseTurn(userId, body),
  );
}
