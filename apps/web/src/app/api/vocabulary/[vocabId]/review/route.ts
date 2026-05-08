import { withAuthAndJson } from '@/lib/api/route-handler';
import { reviewVocabulary } from '@/server/services/vocabulary';
import { VocabularyReviewResultSchema } from '@speakwise/schemas';

export async function POST(req: Request, { params }: { params: Promise<{ vocabId: string }> }) {
  const { vocabId } = await params;
  return withAuthAndJson(VocabularyReviewResultSchema, req, ({ userId }, body) =>
    reviewVocabulary(userId, vocabId, body.result),
  );
}
