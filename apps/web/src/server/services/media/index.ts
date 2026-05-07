import { prisma, type MediaSourceType, type RightsStatus } from '@speakwise/db';

export async function importMedia(input: {
  sourceType: MediaSourceType;
  sourceUrl?: string;
  title: string;
  language?: string;
  transcript?: string;
  userIntent?: string;
}) {
  const rightsStatus: RightsStatus =
    input.sourceType === 'ai_generated'
      ? 'ai_generated'
      : input.sourceType === 'uploaded'
      ? 'user_provided'
      : input.sourceType === 'licensed'
      ? 'licensed'
      : 'unknown';

  return prisma.mediaItem.create({
    data: {
      sourceType: input.sourceType,
      sourceUrl: input.sourceUrl ?? null,
      title: input.title,
      language: input.language ?? 'it',
      transcript: input.transcript ?? null,
      tags: [],
      rightsStatus,
      metadata: { userIntent: input.userIntent },
    },
  });
}

export async function listMedia() {
  return prisma.mediaItem.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
}
