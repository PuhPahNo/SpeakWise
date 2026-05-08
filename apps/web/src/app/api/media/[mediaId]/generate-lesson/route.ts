import { withAuth } from '@/lib/api/route-handler';
import { generateLesson } from '@/server/services/lesson';
import { prisma } from '@speakwise/db';

export async function POST(_req: Request, { params }: { params: Promise<{ mediaId: string }> }) {
  const { mediaId } = await params;
  return withAuth(async ({ userId }) => {
    const media = await prisma.mediaItem.findUnique({ where: { id: mediaId } });
    if (!media) throw new Error('Media not found');
    return generateLesson({
      userId,
      lessonType: 'media',
      userRequest: `Use this media as the basis: ${media.title}. ${
        media.transcript ? `Transcript: ${media.transcript.slice(0, 1500)}` : ''
      }`,
    });
  });
}
