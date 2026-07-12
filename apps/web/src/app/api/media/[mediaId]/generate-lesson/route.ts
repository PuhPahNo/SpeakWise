import { withAuth } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { generateLesson } from '@/server/services/lesson';
import { prisma } from '@speakwise/db';

export async function POST(_req: Request, { params }: { params: Promise<{ mediaId: string }> }) {
  const { mediaId } = await params;
  return withAuth(async ({ userId }) => {
    const limited = userRateLimitResponse('media-generate-lesson', userId, 10, 15 * 60_000);
    if (limited) return limited;
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
