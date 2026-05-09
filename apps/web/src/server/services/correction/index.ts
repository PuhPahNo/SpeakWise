import { Models, chatStructured } from '@speakwise/ai';
import { prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';
import { CorrectionOutputSchema } from '@speakwise/schemas';
import { recordSkillEvidence } from '../progress';

export interface EvaluateInput {
  userId: string;
  userResponseId: string;
  /** Optional override; defaults to the learner's profile preference. */
  correctionMode?: string;
}

export async function evaluateUserResponse({
  userId,
  userResponseId,
  correctionMode,
}: EvaluateInput) {
  const ur = await prisma.userResponse.findFirst({
    where: { id: userResponseId, session: { userId } },
    include: {
      lessonTask: true,
      session: { include: { lesson: true, user: { include: { profile: true } } } },
    },
  });
  if (!ur) throw new Error('UserResponse not found');

  const profile = ur.session.user.profile;
  const level = profile?.currentLevel ?? 'beginner';
  // Honor learner's correction-style preference (Master PRD §correction);
  // explicit override wins, then profile, then a sensible default.
  const effectiveMode = correctionMode ?? profile?.preferredCorrectionStyle ?? 'adaptive';

  // Resolve skill names so the prompt can be skill-specific in its
  // explanation (e.g. "passato prossimo agreement" instead of generic).
  const skillNames =
    ur.lessonTask && ur.lessonTask.targetSkillIds.length > 0
      ? (
          await prisma.curriculumSkill.findMany({
            where: { id: { in: ur.lessonTask.targetSkillIds } },
            select: { name: true, slug: true },
          })
        ).map((s) => s.name)
      : [];

  const taskJson = ur.lessonTask
    ? {
        taskType: ur.lessonTask.taskType,
        prompt: ur.lessonTask.prompt,
        expectedAnswer: ur.lessonTask.expectedAnswer,
        options: ur.lessonTask.options,
        skillIds: ur.lessonTask.targetSkillIds,
        skillNames,
      }
    : { taskType: 'freestyle', prompt: '(freestyle)', expectedAnswer: null, skillNames: [] };

  const result = await chatStructured({
    promptKey: 'correction.evaluate',
    purpose: 'correction.evaluate',
    schema: CorrectionOutputSchema,
    model: Models.fast,
    temperature: 0.2,
    vars: {
      TASK_JSON: JSON.stringify(taskJson),
      ANSWER: ur.userAnswer,
      CORRECTION_MODE: effectiveMode,
      LEVEL: level,
    },
  });
  const ai = result.data;

  // When the answer is correct, the model returns null for mistakeType /
  // severity (no mistake to classify). The Correction row still anchors
  // the explanation + encouragement we want to surface, so default the
  // non-nullable Prisma fields to harmless values for correct answers.
  const correction = await prisma.correction.create({
    data: {
      userResponseId: ur.id,
      correctionType: ai.mistakeType ?? 'other',
      severity: ai.severity ?? 'minor',
      originalText: ur.userAnswer,
      correctedText: ai.correctedAnswer,
      explanation: ai.explanation,
      encouragement: ai.encouragement,
      retryPrompt: ai.retryPrompt ?? undefined,
      skillIds: ur.lessonTask?.targetSkillIds ?? [],
    },
  });

  await prisma.userResponse.update({
    where: { id: ur.id },
    data: {
      isCorrect: ai.isCorrect,
      score: ai.score,
      feedback: ai.explanation,
      correctedAnswer: ai.correctedAnswer,
    },
  });

  // Update progress for each tagged skill. The dimension we move
  // (production vs comprehension) depends on the task type:
  //   - Active production: speaking_prompt, translation, roleplay,
  //     scenario_roleplay — learner generated Italian.
  //   - Passive comprehension: multiple_choice, fill_blank,
  //     listening_comprehension, error_correction — learner recognized
  //     Italian.
  //   - 'both' for anything else (briefing/recap/explanation).
  const taskType = ur.lessonTask?.taskType ?? '';
  const dimension: 'production' | 'comprehension' | 'both' =
    taskType === 'speaking_prompt' ||
    taskType === 'translation' ||
    taskType === 'roleplay' ||
    taskType === 'conjugation'
      ? 'production'
      : taskType === 'multiple_choice' ||
          taskType === 'fill_blank' ||
          taskType === 'listening_comprehension' ||
          taskType === 'error_correction'
        ? 'comprehension'
        : 'both';
  for (const skillId of ur.lessonTask?.targetSkillIds ?? []) {
    await recordSkillEvidence({ userId, skillId, correct: ai.isCorrect, dimension });
  }

  await emitUserEvent(userId, 'UserCorrected', {
    userResponseId: ur.id,
    correctionId: correction.id,
  });

  if (!ai.isCorrect) {
    // When the answer is wrong the model fills both, but defend against the
    // edge case where it returns null while flagging incorrect (the event
    // schema does not allow null).
    await emitUserEvent(userId, 'MistakeDetected', {
      userResponseId: ur.id,
      correctionId: correction.id,
      skillIds: ur.lessonTask?.targetSkillIds ?? [],
      severity: ai.severity ?? 'minor',
      mistakeType: ai.mistakeType ?? 'other',
    });
  }

  await emitUserEvent(userId, 'AICall', {
    provider: 'openai',
    model: result.usage.model,
    purpose: 'correction.evaluate',
    tokensIn: result.usage.promptTokens,
    tokensOut: result.usage.completionTokens,
    latencyMs: result.usage.latencyMs,
    ok: true,
  });

  return { correction, ai };
}
