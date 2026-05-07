import { prisma, type SessionMode, type CEFRLevel } from '@speakwise/db';
import { Models, chatStructured } from '@speakwise/ai';
import { PlacementAssessmentOutputSchema } from '@speakwise/schemas';
import { emitUserEvent } from '@speakwise/events';
import { ensureProfile, updateProfile } from '../profile';

export async function startOnboarding(userId: string, mode: SessionMode) {
  await ensureProfile(userId);
  const session = await prisma.session.create({
    data: { userId, sessionType: 'onboarding', mode, status: 'active' },
  });
  await emitUserEvent(userId, 'OnboardingStarted', { mode: mode === 'voice' ? 'voice' : 'text' });
  return {
    sessionId: session.id,
    wiseMessage:
      "Welcome to Speakwise. I’m Wise, your Italian tutor. " +
      "Tell me — what brings you to Italian? Any specific reason or goal?",
  };
}

export async function respondOnboarding(
  userId: string,
  sessionId: string,
  text: string,
) {
  const session = await prisma.session.findFirst({
    where: { id: sessionId, userId, sessionType: 'onboarding' },
  });
  if (!session) throw new Error('Onboarding session not found');

  const transcript = (session.transcript as Array<{ role: string; text: string }> | null) ?? [];
  transcript.push({ role: 'user', text });

  // Simple state-machine over the transcript length (4 prompts, then placement)
  const turn = transcript.filter((t) => t.role === 'user').length;
  let nextStep: string;
  let wiseMessage: string;
  let extractedProfileUpdates: Record<string, unknown> = {};

  switch (turn) {
    case 1: {
      // After "what brings you" — ask interests
      wiseMessage =
        "Great. What topics actually interest you? Food, travel, music, family, sports, business — any of those?";
      nextStep = 'interests';
      const goals = [text.slice(0, 200)];
      await updateProfile(userId, { goals });
      extractedProfileUpdates = { goals };
      break;
    }
    case 2: {
      const interests = text.split(/[,;]/).map((s) => s.trim()).filter(Boolean).slice(0, 8);
      await updateProfile(userId, { interests });
      wiseMessage =
        "Got it. How would you describe your Italian level today: complete beginner, beginner, intermediate, or advanced?";
      nextStep = 'level';
      extractedProfileUpdates = { interests };
      break;
    }
    case 3: {
      const level = mapLevelText(text);
      await updateProfile(userId, { currentLevel: level });
      wiseMessage =
        "Perfect. Last one: how many minutes per session works for you — 5, 10, 15, or 20?";
      nextStep = 'session_length';
      extractedProfileUpdates = { currentLevel: level };
      break;
    }
    case 4: {
      const minutes = Number(text.replace(/\D/g, '')) || 10;
      await updateProfile(userId, {
        preferredSessionLengthMinutes: minutes,
        onboardingCompleted: true,
      });
      const profile = await prisma.learnerProfile.findUnique({ where: { userId } });
      await prisma.session.update({
        where: { id: sessionId },
        data: { status: 'completed', transcript, completedAt: new Date() },
      });
      await emitUserEvent(userId, 'OnboardingCompleted', {
        profileId: profile?.id ?? '',
        nativeLanguage: 'en',
        targetLanguage: 'it',
        level: (profile?.currentLevel ?? 'beginner') as CEFRLevel,
        goals: profile?.goals ?? [],
        interests: profile?.interests ?? [],
      });
      wiseMessage =
        "Wonderful — I’ve got everything I need to build your first mission. Ready when you are.";
      nextStep = 'complete';
      extractedProfileUpdates = { preferredSessionLengthMinutes: minutes, onboardingCompleted: true };
      break;
    }
    default:
      wiseMessage = "We’re all set. Let’s start your first lesson.";
      nextStep = 'complete';
  }

  transcript.push({ role: 'wise', text: wiseMessage });
  await prisma.session.update({ where: { id: sessionId }, data: { transcript } });

  return { wiseMessage, extractedProfileUpdates, nextStep };
}

function mapLevelText(text: string): CEFRLevel {
  const t = text.toLowerCase();
  if (t.includes('complete') || t.includes('zero') || t.includes('never')) return 'complete_beginner';
  if (t.includes('advanc') || t.includes('fluent')) return 'advanced';
  if (t.includes('upper')) return 'upper_intermediate';
  if (t.includes('lower')) return 'lower_intermediate';
  if (t.includes('intermediate')) return 'intermediate';
  return 'beginner';
}

export async function placementAssess(userId: string, responses: string[], skillSlugs: string[]) {
  const result = await chatStructured({
    promptKey: 'placement.assess',
    purpose: 'placement.assess',
    schema: PlacementAssessmentOutputSchema,
    model: Models.fast,
    temperature: 0.2,
    vars: {
      RESPONSES_JSON: JSON.stringify(responses),
      SKILL_SLUGS: JSON.stringify(skillSlugs),
    },
  });

  await updateProfile(userId, {
    currentLevel: result.data.estimatedLevel,
    levelConfidence: result.data.confidence,
  });

  return result.data;
}
