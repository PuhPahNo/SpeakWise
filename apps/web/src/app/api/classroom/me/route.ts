import { withTutorAuth, withTutorAuthAndJson } from '@/lib/api/route-handler';
import { getTutorProfile } from '@/server/services/classroom';
import { prisma } from '@speakwise/db';
import { PatchTutorProfileRequestSchema } from '@speakwise/schemas';

export async function GET() {
  return withTutorAuth(async ({ userId }) => {
    const profile = await getTutorProfile(userId);
    return {
      id: profile.id,
      userId: profile.userId,
      displayName: profile.displayName,
      bio: profile.bio,
      specialties: profile.specialties,
      inviteCode: profile.inviteCode,
      createdAt: profile.createdAt,
    };
  });
}

export async function PATCH(req: Request) {
  return withTutorAuthAndJson(PatchTutorProfileRequestSchema, req, async ({ userId }, body) => {
    const profile = await getTutorProfile(userId);
    const updated = await prisma.tutorProfile.update({
      where: { id: profile.id },
      data: {
        displayName: body.displayName,
        bio: body.bio,
        specialties: body.specialties,
      },
    });
    return {
      id: updated.id,
      displayName: updated.displayName,
      bio: updated.bio,
      specialties: updated.specialties,
      inviteCode: updated.inviteCode,
    };
  });
}
