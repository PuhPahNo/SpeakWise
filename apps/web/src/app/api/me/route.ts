import { withAuth, withAuthAndJson } from '@/lib/api/route-handler';
import { ensureProfile } from '@/server/services/profile';
import { PatchMeRequestSchema } from '@speakwise/schemas';
import { prisma } from '@speakwise/db';

export async function GET() {
  return withAuth(async ({ user }) => {
    const profile = await ensureProfile(user.id);
    return { user, learnerProfile: profile, onboardingCompleted: profile.onboardingCompleted };
  });
}

export async function PATCH(req: Request) {
  return withAuthAndJson(PatchMeRequestSchema, req, async ({ user }, body) => {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: body.name ?? undefined,
        timezone: body.timezone ?? undefined,
        nativeLanguage: body.nativeLanguage ?? undefined,
        targetLanguage: body.targetLanguage ?? undefined,
      },
    });
    return { user: updated };
  });
}
