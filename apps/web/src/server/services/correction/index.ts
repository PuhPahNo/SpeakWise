import { prisma } from '@speakwise/db';
import { Models, chatStructured } from '@speakwise/ai';
import { CorrectionOutputSchema } from '@speakwise/schemas';
import { emitUserEvent } from '@speakwise/events';
import { recordSkillEvidence } from '../progress';

export interface EvaluateInput {
  userId: string;
  userResponseId: string;
  correctionMode?: string;
}

export async function evaluateUserResponse({
  userId,
  userResponseId,
  correctionMode = 'adaptive',
}: EvaluateInput) {
  const ur = await prisma.userResponse.findFirst({
    where: { id: userResponseId, session: { userId } },
    include: { lessonTask: true, session: { include: { lesson: true, user: { include: { profile: true } } } } },
  });
  if (!ur) throw new Error('UserResponse not found');

  const profile = ur.session.user.profile;
  const level = profile?.currentLevel ?? 'beginner';

  const taskJson = ur.lessonTask
    ? {
        taskType: ur.lessonTask.taskType,
        prompt: ur.lessonTask.prompt,
        expectedAnswer: ur.lessonTask.expectedAnswer,
        options: ur.lessonTask.options,
        skillIds: ur.lessonTask.targetSkillIds,
      }
    : { taskType: 'freestyle', prompt: '(freestyle)', expectedAnswer: null };

  const result = await chatStructured({
    promptKey: 'correction.evaluate',
    purpose: 'correction.evaluate',
    schema: CorrectionOutputSchema,
    model: Models.fast,
    temperature: 0.2,
    vars: {
      TASK_JSON: JSON.stringify(taskJson),
      ANSWER: ur.userAnswer,
      CORRECTION_MODE: correctionMode,
      LEVEL: level,
    },
  });
  const ai = result.data;

  const correction = await prisma.correction.create({
    data: {
      userResponseId: ur.id,
      correctionType: ai.mistakeType,
      severity: ai.severity,
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

  // Update progress for each tagged skill
  for (const skillId of ur.lessonTask?.targetSkillIds ?? []) {
    await recordSkillEvidence({ userId, skillId, correct: ai.isCorrect });
  }

  await emitUserEvent(userId, 'UserCorrected', {
    userResponseId: ur.id,
    correctionId: correction.id,
  });

  if (!ai.isCorrect) {
    await emitUserEvent(userId, 'MistakeDetected', {
      userResponseId: ur.id,
      correctionId: correction.id,
      skillIds: ur.lessonTask?.targetSkillIds ?? [],
      severity: ai.severity,
      mistakeType: ai.mistakeType,
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
