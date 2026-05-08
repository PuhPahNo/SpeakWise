import { withAuthAndJson } from '@/lib/api/route-handler';
import { wiseTurn } from '@/server/services/wise';
import { WiseMessageRequestSchema } from '@speakwise/schemas';

export async function POST(req: Request) {
  return withAuthAndJson(WiseMessageRequestSchema, req, ({ userId }, body) =>
    wiseTurn(userId, body),
  );
}
