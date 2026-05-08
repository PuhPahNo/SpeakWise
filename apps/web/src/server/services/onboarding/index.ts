import { Models, chatStructured } from '@speakwise/ai';
import { type CEFRLevel, type SessionMode, prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';
import { PlacementAssessmentOutputSchema } from '@speakwise/schemas';
import { z } from 'zod';
import { ensureProfile, updateProfile } from '../profile';

const ONBOARDING_FIELDS = [
  'goals',
  'interests',
  'currentLevel',
  'preferredSessionLengthMinutes',
  'preferredCorrectionStyle',
  'preferredWisePersonality',
] as const;

const OnboardingTurnSchema = z.object({
  wiseMessage: z.string().min(2).max(500),
  // Whatever the model extracted from this turn
  extracted: z.object({
    goals: z.array(z.string().min(1).max(200)).max(8).optional(),
    interests: z.array(z.string().min(1).max(80)).max(12).optional(),
    currentLevel: z
      .enum([
        'complete_beginner',
        'beginner',
        'lower_intermediate',
        'intermediate',
        'upper_intermediate',
        'advanced',
      ])
      .optional(),
    preferredSessionLengthMinutes: z.number().int().min(2).max(60).optional(),
    preferredCorrectionStyle: z
      .enum(['gentle', 'direct', 'strict', 'end_of_task', 'major_mistakes_only', 'adaptive'])
      .optional(),
    preferredWisePersonality: z
      .enum([
        'default',
        'friendly_tutor',
        'direct_coach',
        'game_master',
        'premium_assistant',
        'strict_grammar_coach',
        'casual_companion',
      ])
      .optional(),
    motivationNotes: z.string().max(2000).optional(),
  }),
  /** Whether the conversation should keep going. */
  done: z.boolean(),
});

export async function startOnboarding(userId: string, mode: SessionMode) {
  await ensureProfile(userId);
  const session = await prisma.session.create({
    data: { userId, sessionType: 'onboarding', mode, status: 'active' },
  });
  await emitUserEvent(userId, 'OnboardingStarted', {
    mode: mode === 'voice' ? 'voice' : 'text',
  });
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const firstName = user.name.split(' ')[0] ?? user.name;
  return {
    sessionId: session.id,
    wiseMessage: `Ciao ${firstName}, I'm Wise. I'll be your Italian tutor. In a minute or two I'll learn enough about you to build a plan that fits — let's start: what's drawing you to Italian?`,
  };
}

export async function respondOnboarding(userId: string, sessionId: string, text: string) {
  const session = await prisma.session.findFirst({
    where: { id: sessionId, userId, sessionType: 'onboarding' },
  });
  if (!session) throw new Error('Onboarding session not found');

  const transcript = (session.transcript as Array<{ role: string; text: string }> | null) ?? [];
  transcript.push({ role: 'user', text });

  const profile = await prisma.learnerProfile.findUniqueOrThrow({
    where: { userId },
  });

  // Snapshot of what we already know — used to avoid re-asking what's filled.
  const known = {
    goals: profile.goals ?? [],
    interests: profile.interests ?? [],
    currentLevel: profile.currentLevel,
    preferredSessionLengthMinutes: profile.preferredSessionLengthMinutes,
    preferredCorrectionStyle: profile.preferredCorrectionStyle,
    preferredWisePersonality: profile.preferredWisePersonality,
  };

  const missing = ONBOARDING_FIELDS.filter((f) => {
    const v = known[f as keyof typeof known];
    if (Array.isArray(v)) return v.length === 0;
    if (typeof v === 'number') return v == null;
    if (typeof v === 'string')
      // The schema defaults; treat the literal default as "not yet asked"
      return v === 'beginner' || v === 'adaptive' || v === 'default';
    return v == null;
  });

  const result = await chatStructured({
    promptKey: 'wise.onboarding',
    purpose: 'wise.onboarding',
    schema: OnboardingTurnSchema,
    model: Models.fast,
    temperature: 0.5,
    maxOutputTokens: 600,
    vars: {
      KNOWN_JSON: JSON.stringify(known),
      MISSING_FIELDS: JSON.stringify(missing),
      TRANSCRIPT_JSON: JSON.stringify(transcript.slice(-10)),
      LAST_USER_TURN: text,
    },
  });
  const ai = result.data;

  // Apply extracted profile updates (only what's present)
  const updates: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(ai.extracted)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    updates[k] = v;
  }
  if (Object.keys(updates).length > 0) {
    await updateProfile(userId, updates);
  }

  transcript.push({ role: 'wise', text: ai.wiseMessage });

  // Determine done state — both AI judgment AND a hard backstop:
  // require at least goals + interests + currentLevel + sessionLength.
  const refreshed = await prisma.learnerProfile.findUniqueOrThrow({ where: { userId } });
  const hasMinimum =
    refreshed.goals.length > 0 &&
    refreshed.interests.length > 0 &&
    refreshed.preferredSessionLengthMinutes != null;
  const isComplete = ai.done && hasMinimum;

  if (isComplete) {
    await updateProfile(userId, { onboardingCompleted: true });
    await prisma.session.update({
      where: { id: sessionId },
      data: { status: 'completed', transcript, completedAt: new Date() },
    });
    await emitUserEvent(userId, 'OnboardingCompleted', {
      profileId: refreshed.id,
      nativeLanguage: 'en',
      targetLanguage: 'it',
      level: refreshed.currentLevel as CEFRLevel,
      goals: refreshed.goals,
      interests: refreshed.interests,
    });
  } else {
    await prisma.session.update({
      where: { id: sessionId },
      data: { transcript },
    });
  }

  await emitUserEvent(userId, 'AICall', {
    provider: 'openai',
    model: result.usage.model,
    purpose: 'wise.onboarding',
    tokensIn: result.usage.promptTokens,
    tokensOut: result.usage.completionTokens,
    latencyMs: result.usage.latencyMs,
    ok: true,
  });

  return {
    wiseMessage: ai.wiseMessage,
    extractedProfileUpdates: updates,
    nextStep: isComplete ? 'complete' : 'continue',
  };
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
