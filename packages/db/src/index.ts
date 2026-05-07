import { PrismaClient } from '@prisma/client';

declare global {
  // biome-ignore lint/style/noVar: required for Node global declaration
  var __speakwisePrisma: PrismaClient | undefined;
}

export const prisma =
  global.__speakwisePrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.__speakwisePrisma = prisma;
}

export type { Prisma } from '@prisma/client';
export {
  UserRole,
  CEFRLevel,
  LearningStyle,
  CorrectionStyle,
  WisePersonality,
  SkillCategory,
  SkillStatus,
  VocabStatus,
  LessonType,
  LessonStatus,
  LessonAuthor,
  TaskType,
  SessionType,
  SessionMode,
  SessionStatus,
  InputType,
  CorrectionType,
  CorrectionSeverity,
  MemoryType,
  MemoryVisibility,
  MediaSourceType,
  RightsStatus,
} from '@prisma/client';
