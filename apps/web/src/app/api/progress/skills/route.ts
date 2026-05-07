import { withAuth } from '@/lib/api/route-handler';
import { prisma } from '@speakwise/db';

export async function GET() {
  return withAuth(({ userId }) =>
    prisma.userSkillProgress.findMany({
      where: { userId },
      include: { skill: true },
      orderBy: { masteryScore: 'desc' },
    }),
  );
}
