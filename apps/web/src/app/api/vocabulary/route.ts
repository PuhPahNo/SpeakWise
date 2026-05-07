import { withAuth, withAuthAndJson } from '@/lib/api/route-handler';
import { VocabularyCreateSchema, VocabularyQuerySchema } from '@speakwise/schemas';
import { createVocabulary, listVocabulary } from '@/server/services/vocabulary';

export async function GET(req: Request) {
  return withAuth(async ({ userId }) => {
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const parsed = VocabularyQuerySchema.safeParse(params);
    if (!parsed.success) throw new Error('invalid query');
    return listVocabulary(userId, parsed.data);
  });
}

export async function POST(req: Request) {
  return withAuthAndJson(VocabularyCreateSchema, req, ({ userId }, body) =>
    createVocabulary(userId, body),
  );
}
