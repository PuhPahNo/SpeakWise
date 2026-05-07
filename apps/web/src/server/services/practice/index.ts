import { prisma, type InputType } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';
import { evaluateUserResponse } from '../correction/index.js';

export interface SubmitResponseInput {
  userId: string;
  sessionId: string;
  lessonTaskId: string;
  inputType: InputType;
  answer: string;
  audioUrl?: string;
}

export async function submitResponse(input: SubmitResponseInput) {
  const session = await prisma.session.findFirst({
    where: { id: input.sessionId, userId: input.userId },
    include: { lesson: { include: { tasks: { orderBy: { orderIndex: 'asc' } } } } },
  });
  if (!session) throw new Error('Session not found');

  const task = session.lesson?.tasks.find((t) => t.id === input.lessonTaskId);
  if (!task) throw new Error('Lesson task not found in session');

  const userResponse = await prisma.userResponse.create({
    data: {
      sessionId: input.sessionId,
      lessonTaskId: input.lessonTaskId,
      inputType: input.inputType,
      userAnswer: input.answer,
      transcription: input.inputType === 'voice' ? input.answer : null,
      skillIds: task.targetSkillIds,
      vocabularyItemIds: task.vocabularyItemIds,
    },
  });

  await emitUserEvent(input.userId, 'PracticeAnswered', {
    sessionId: input.sessionId,
    lessonTaskId: input.lessonTaskId,
    userResponseId: userResponse.id,
    inputType: input.inputType,
    skillIds: task.targetSkillIds,
    vocabularyItemIds: task.vocabularyItemIds,
  });

  const { correction, ai } = await evaluateUserResponse({
    userId: input.userId,
    userResponseId: userResponse.id,
  });

  // Find next task
  const nextTask = session.lesson?.tasks.find((t) => t.orderIndex === task.orderIndex + 1) ?? null;

  return {
    userResponse,
    correction,
    correctionAi: ai,
    nextTask,
  };
}
