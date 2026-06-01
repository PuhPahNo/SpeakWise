import { z } from 'zod';
import { CEFRLevelEnum, WiseTurnOutputSchema } from './ai-outputs';

export const InputTypeEnum = z.enum(['voice', 'text', 'multiple_choice', 'selection']);
export const SessionModeEnum = z.enum(['voice', 'text', 'mixed']);

export const PatchMeRequestSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  timezone: z.string().optional(),
  nativeLanguage: z.enum(['en', 'it']).optional(),
  targetLanguage: z.enum(['en', 'it']).optional(),
});

export const StartOnboardingRequestSchema = z.object({
  mode: SessionModeEnum,
});

export const RespondOnboardingRequestSchema = z.object({
  sessionId: z.string().uuid(),
  inputType: InputTypeEnum,
  text: z.string().min(1).max(4000),
});

export const PatchProfileRequestSchema = z.object({
  goals: z.array(z.string().min(1).max(200)).max(10).optional(),
  interests: z.array(z.string().min(1).max(200)).max(20).optional(),
  currentLevel: CEFRLevelEnum.optional(),
  preferredLearningStyle: z
    .enum(['mission', 'tutor', 'conversation', 'drill', 'balanced'])
    .optional(),
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
  preferredSessionLengthMinutes: z.number().int().min(2).max(120).optional(),
  preferredFrequency: z.string().max(120).optional(),
  motivationNotes: z.string().max(2000).optional(),
  /** ElevenLabs voice ID — must be one of the curated WISE_VOICES. */
  wiseVoiceId: z.string().min(8).max(64).optional(),
  /** 0.0–1.0 share of Wise's spoken output that should be Italian. */
  languageRatio: z.number().min(0).max(1).optional(),
  /**
   * Whether the languageRatio above should be treated as a manual
   * override. When false (the default), Wise auto-computes the ratio
   * from the learner's level + mastery; when true, the stored value
   * is what's served on reads.
   */
  languageRatioOverridden: z.boolean().optional(),
  /** Hard "Italian-only" mode toggle — overrides languageRatio. */
  immersionMode: z.boolean().optional(),
  /**
   * Default UI mode for Wise interactions:
   *   voice — Wise auto-speaks; learner answers by voice (orb-first).
   *   text  — Wise renders text immediately; learner types.
   */
  preferredInteractionMode: z.enum(['voice', 'text']).optional(),
});

// ── Classroom / tutor APIs ────────────────────────────────────────────
// Invite-code format: 8 chars, base32-style (no 0/1/O/I/L). Codes are
// shown in uppercase but accepted case-insensitively at the route layer.
export const InviteCodeSchema = z
  .string()
  .trim()
  .min(6)
  .max(12)
  .regex(/^[A-Za-z0-9]+$/, 'invite codes are alphanumeric only');

export const ConnectTutorRequestSchema = z.object({
  code: InviteCodeSchema,
});

export const CreateTutorDirectiveRequestSchema = z.object({
  studentId: z.string().uuid(),
  body: z.string().trim().min(3).max(800),
  /** Optional CurriculumSkill UUIDs to prioritize. Empty = directive is text-only. */
  pinnedSkillIds: z.array(z.string().uuid()).max(20).optional(),
  /** ISO date string. If null/omitted, the directive stays active until archived. */
  expiresAt: z.string().datetime().nullable().optional(),
  /** Whether to archive any other active directives for this student. Default true. */
  replaceExisting: z.boolean().optional(),
});

export const PatchTutorDirectiveRequestSchema = z.object({
  body: z.string().trim().min(3).max(800).optional(),
  pinnedSkillIds: z.array(z.string().uuid()).max(20).optional(),
  expiresAt: z.string().datetime().nullable().optional(),
  /** Setting status to 'archived' is the common path. */
  status: z.enum(['active', 'archived']).optional(),
});

export const PatchTutorProfileRequestSchema = z.object({
  displayName: z.string().trim().min(1).max(80).optional(),
  bio: z.string().trim().max(800).optional(),
  specialties: z.array(z.string().trim().min(1).max(40)).max(10).optional(),
});

export const WiseMessageRequestSchema = z.object({
  mode: SessionModeEnum,
  message: z.string().min(1).max(8000),
  sessionId: z.string().uuid().nullable().optional(),
  context: z
    .object({
      screen: z.string().optional(),
      lessonId: z.string().uuid().optional(),
    })
    .optional(),
});

export const WiseMessageResponseSchema = WiseTurnOutputSchema;

/**
 * A mid-lesson "ask Wise" question. Context anchors the explanation to the
 * exact task and the learner's last attempt so "why is this wrong?" works.
 */
export const WiseExplainRequestSchema = z.object({
  question: z.string().min(1).max(2000),
  context: z
    .object({
      lessonId: z.string().uuid().optional(),
      lessonTaskId: z.string().uuid().optional(),
      userResponseId: z.string().uuid().optional(),
      // Fallback context the client already has on screen, used when the
      // task/response rows aren't passed (e.g. before the first answer).
      taskPrompt: z.string().max(2000).optional(),
      lastAnswer: z.string().max(2000).optional(),
    })
    .optional(),
});

export const GenerateLessonRequestSchema = z.object({
  lessonType: z.enum([
    'daily_mission',
    'recovery',
    'freestyle',
    'grammar',
    'vocabulary_review',
    'speaking_challenge',
    'listening_challenge',
    'media',
    'scenario_roleplay',
    'progress_check',
    'placement',
  ]),
  durationMinutes: z.number().int().min(2).max(60).optional(),
  targetSkillIds: z.array(z.string().uuid()).optional(),
  interestTheme: z.string().max(200).optional(),
  userRequest: z.string().max(2000).optional(),
});

export const PracticeRespondRequestSchema = z.object({
  sessionId: z.string().uuid(),
  lessonTaskId: z.string().uuid(),
  inputType: InputTypeEnum,
  answer: z.string().min(1).max(4000),
  audioUrl: z.string().url().optional(),
});

export const EvaluateCorrectionRequestSchema = z.object({
  userResponseId: z.string().uuid(),
  correctionMode: z
    .enum(['gentle', 'direct', 'strict', 'end_of_task', 'major_mistakes_only', 'adaptive'])
    .default('adaptive'),
});

export const VocabularyQuerySchema = z.object({
  status: z.enum(['new', 'learning', 'review', 'mastered', 'archived']).optional(),
  tag: z.string().optional(),
  dueForReview: z.coerce.boolean().optional(),
});

export const VocabularyCreateSchema = z.object({
  targetText: z.string().min(1).max(200),
  nativeText: z.string().min(1).max(200),
  partOfSpeech: z.string().max(40).optional(),
  exampleSentence: z.string().max(500).optional(),
  exampleTranslation: z.string().max(500).optional(),
  tags: z.array(z.string().max(40)).max(20).optional(),
  sourceLessonId: z.string().uuid().optional(),
  sourceSessionId: z.string().uuid().optional(),
});

export const VocabularyReviewResultSchema = z.object({
  result: z.enum(['correct', 'incorrect']),
});

export const ImportMediaRequestSchema = z.object({
  sourceType: z.enum([
    'youtube',
    'uploaded',
    'licensed',
    'ai_generated',
    'article',
    'transcript',
    'other',
  ]),
  sourceUrl: z.string().url().optional(),
  title: z.string().min(1).max(200),
  language: z.enum(['en', 'it']).default('it'),
  transcript: z.string().optional(),
  userIntent: z.string().max(500).optional(),
});

export type WiseMessageRequest = z.infer<typeof WiseMessageRequestSchema>;
export type GenerateLessonRequest = z.infer<typeof GenerateLessonRequestSchema>;
export type PracticeRespondRequest = z.infer<typeof PracticeRespondRequestSchema>;
