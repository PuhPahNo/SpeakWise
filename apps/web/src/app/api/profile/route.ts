import { withAuth, withAuthAndJson } from '@/lib/api/route-handler';
import { ensureProfile, updateProfile } from '@/server/services/profile';
import { PatchProfileRequestSchema } from '@speakwise/schemas';

export async function GET() {
  return withAuth(async ({ userId }) => ensureProfile(userId));
}

export async function PATCH(req: Request) {
  return withAuthAndJson(PatchProfileRequestSchema, req, async ({ userId }, body) => {
    return updateProfile(userId, {
      goals: body.goals,
      interests: body.interests,
      currentLevel: body.currentLevel,
      preferredLearningStyle: body.preferredLearningStyle,
      preferredCorrectionStyle: body.preferredCorrectionStyle,
      preferredWisePersonality: body.preferredWisePersonality,
      preferredSessionLengthMinutes: body.preferredSessionLengthMinutes,
      preferredFrequency: body.preferredFrequency,
      motivationNotes: body.motivationNotes,
      wiseVoiceId: body.wiseVoiceId,
      languageRatio: body.languageRatio,
      languageRatioOverridden: body.languageRatioOverridden,
      immersionMode: body.immersionMode,
      preferredInteractionMode: body.preferredInteractionMode,
    });
  });
}
