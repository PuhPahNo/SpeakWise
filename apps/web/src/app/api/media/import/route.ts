import { withAuthAndJson } from '@/lib/api/route-handler';
import { ImportMediaRequestSchema } from '@speakwise/schemas';
import { importMedia } from '@/server/services/media';

export async function POST(req: Request) {
  return withAuthAndJson(ImportMediaRequestSchema, req, async (_ctx, body) =>
    importMedia({
      sourceType: body.sourceType,
      sourceUrl: body.sourceUrl,
      title: body.title,
      language: body.language,
      transcript: body.transcript,
      userIntent: body.userIntent,
    }),
  );
}
