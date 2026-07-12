import { type InputType, prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';
import { evaluateUserResponse } from '../correction';

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
    where: { id: input.sessionId, userId: input.userId, status: 'active' },
    include: { lesson: { include: { tasks: { orderBy: { orderIndex: 'asc' } } } } },
  });
  if (!session) throw new Error('Session not found');

  const task = session.lesson?.tasks.find((t) => t.id === input.lessonTaskId);
  if (!task) throw new Error('Lesson task not found in session');

  let userResponse = await prisma.userResponse.findUnique({
    where: {
      sessionId_lessonTaskId: {
        sessionId: input.sessionId,
        lessonTaskId: input.lessonTaskId,
      },
    },
  });

  if (!userResponse) {
    try {
      userResponse = await prisma.userResponse.create({
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
    } catch (error) {
      const concurrent = await prisma.userResponse.findUnique({
        where: {
          sessionId_lessonTaskId: {
            sessionId: input.sessionId,
            lessonTaskId: input.lessonTaskId,
          },
        },
      });
      if (!concurrent) throw error;
      userResponse = concurrent;
    }
  }

  if (session.mode !== 'mixed') {
    const responseMode = input.inputType === 'voice' ? 'voice' : 'text';
    if (responseMode !== session.mode) {
      await prisma.session.update({ where: { id: session.id }, data: { mode: 'mixed' } });
    }
  }

  const { correction, ai, pronunciation } = await evaluateUserResponse({
    userId: input.userId,
    userResponseId: userResponse.id,
  });

  // Find next task
  const nextTask = session.lesson?.tasks.find((t) => t.orderIndex === task.orderIndex + 1) ?? null;

  // `userResponse` above is the row as CREATED — before evaluateUserResponse
  // updates it with the verdict. Reflect the (deterministic-override-corrected)
  // verdict from `ai` onto the object we return, or the client sees isCorrect=null
  // and renders every answer as "Not quite".
  return {
    userResponse: {
      ...userResponse,
      isCorrect: ai.isCorrect,
      correctedAnswer: ai.correctedAnswer,
      feedback: ai.explanation,
    },
    correction,
    correctionAi: ai,
    // Pronunciation coaching for voice answers on speaking tasks (null otherwise).
    pronunciation,
    nextTask,
  };
}
