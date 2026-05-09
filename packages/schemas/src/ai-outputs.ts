import { z } from 'zod';

export const TaskTypeEnum = z.enum([
  'briefing',
  'explanation',
  'multiple_choice',
  'fill_blank',
  'translation',
  'conjugation',
  'pronoun_replacement',
  'tense_selection',
  'error_correction',
  'speaking_prompt',
  'listening_comprehension',
  'roleplay',
  'recap',
  'media_clip',
  'reflection',
]);

export const LessonTypeEnum = z.enum([
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
]);

export const CorrectionTypeEnum = z.enum([
  'grammar',
  'vocabulary',
  'pronunciation',
  'spelling',
  'word_order',
  'tone',
  'comprehension',
  'fluency',
  'other',
]);

export const CorrectionSeverityEnum = z.enum(['minor', 'moderate', 'major']);

export const MemoryTypeEnum = z.enum([
  'preference',
  'goal',
  'interest',
  'strength',
  'weakness',
  'recurring_mistake',
  'tutor_observation',
  'motivation',
  'content_preference',
  'correction_preference',
  'pronunciation_note',
  'session_summary',
]);

export const MemoryVisibilityEnum = z.enum(['user_visible', 'internal']);

export const CEFRLevelEnum = z.enum([
  'complete_beginner',
  'beginner',
  'lower_intermediate',
  'intermediate',
  'upper_intermediate',
  'advanced',
]);

export const MultipleChoiceOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const LessonGenerationOutputSchema = z.object({
  title: z.string().min(3).max(200),
  lessonType: LessonTypeEnum,
  estimatedDurationMinutes: z.number().int().min(1).max(120),
  targetSkills: z.array(z.string()).min(1),
  interestTheme: z.string().nullable(),
  briefing: z.string().min(10),
  tasks: z
    .array(
      z.object({
        taskType: TaskTypeEnum,
        prompt: z.string().min(1),
        // The model often returns options as plain strings instead of
        // {value,label} pairs, so accept both shapes and normalize at
        // call sites. Same with expectedAnswer — accept anything.
        options: z
          .union([z.array(MultipleChoiceOptionSchema), z.array(z.string())])
          .optional(),
        expectedAnswer: z.unknown().optional(),
        explanation: z.string().optional(),
        skillTags: z.array(z.string()).default([]),
        // Models sometimes omit empty arrays — default to [] to be lenient
        // rather than reject the whole lesson.
        vocabularyTargets: z.array(z.string()).default([]),
      }),
    )
    .min(1),
  recapPlan: z.string(),
});

export const CorrectionOutputSchema = z.object({
  isCorrect: z.boolean(),
  score: z.number().min(0).max(1),
  encouragement: z.string(),
  correctedAnswer: z.string(),
  explanation: z.string(),
  // mistakeType and severity are nullable: when isCorrect=true there is no
  // mistake, so the model is told to return null for both. Forcing an enum
  // here would make every successful answer fail validation.
  mistakeType: CorrectionTypeEnum.nullable(),
  severity: CorrectionSeverityEnum.nullable(),
  skillTags: z.array(z.string()),
  retryPrompt: z.string().nullable(),
  shouldUpdateMemory: z.boolean(),
});

export const MemoryCandidateSchema = z.object({
  type: MemoryTypeEnum,
  content: z.string().min(3),
  visibility: MemoryVisibilityEnum,
  confidence: z.number().min(0).max(1),
  structuredData: z.record(z.unknown()).optional(),
});

export const MemoryExtractionOutputSchema = z.object({
  memoryCandidates: z.array(MemoryCandidateSchema),
  profileUpdates: z.record(z.unknown()),
  skillSignals: z.array(
    z.object({
      skillSlug: z.string(),
      outcome: z.enum(['correct', 'incorrect']),
      weight: z.number().min(0).max(1),
    }),
  ),
  vocabularySignals: z.array(
    z.object({
      targetText: z.string(),
      outcome: z.enum(['correct', 'incorrect']),
    }),
  ),
});

export const ProgressReportOutputSchema = z.object({
  summary: z.string(),
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
  skillsMastered: z.array(z.string()).default([]),
  skillsNeedingReview: z.array(z.string()).default([]),
  vocabularySummary: z
    .object({
      learning: z.number().int().min(0),
      review: z.number().int().min(0),
      mastered: z.number().int().min(0),
    })
    .default({ learning: 0, review: 0, mastered: 0 }),
  recommendedNextSteps: z.array(z.string()).default([]),
});

export const PlacementAssessmentOutputSchema = z.object({
  estimatedLevel: CEFRLevelEnum,
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  suggestedFirstSkillSlugs: z.array(z.string()),
});

export const WiseIntentEnum = z.enum([
  'greet',
  'recommend_next',
  'start_lesson',
  'continue_lesson',
  'submit_practice_response',
  'explain_concept',
  'update_preference',
  'request_progress_report',
  'freestyle_conversation',
  'request_media_lesson',
  'unknown',
]);

export const WiseActionSchema = z.object({
  type: z.enum([
    'START_LESSON',
    'GENERATE_LESSON',
    'CONTINUE_LESSON',
    'OPEN_PROFILE',
    'UPDATE_PROFILE',
    'OPEN_PROGRESS',
    'OPEN_VOCAB',
    'NONE',
  ]),
  // Accept any string, null, or absent. Models often hand back skill slugs
  // or topic labels instead of UUIDs (or null when there's no specific
  // lesson); rejecting the whole turn over that is far worse than letting
  // the call site filter and decide whether to promote to GENERATE_LESSON
  // or drop the action.
  lessonId: z.string().nullable().optional(),
  // Same null-vs-undefined laxity for payload — many models emit
  // `"payload": null` instead of omitting the key.
  payload: z.record(z.unknown()).nullish(),
});

export const WiseTurnOutputSchema = z.object({
  intent: WiseIntentEnum,
  wiseMessage: z.string().min(1),
  actions: z.array(WiseActionSchema),
  memoryCandidates: z.array(MemoryCandidateSchema),
  audioUrl: z.string().url().optional(),
});

export type LessonGenerationOutputParsed = z.infer<typeof LessonGenerationOutputSchema>;
export type CorrectionOutputParsed = z.infer<typeof CorrectionOutputSchema>;
export type MemoryExtractionOutputParsed = z.infer<typeof MemoryExtractionOutputSchema>;
export type ProgressReportOutputParsed = z.infer<typeof ProgressReportOutputSchema>;
export type PlacementAssessmentOutputParsed = z.infer<typeof PlacementAssessmentOutputSchema>;
export type WiseTurnOutputParsed = z.infer<typeof WiseTurnOutputSchema>;
