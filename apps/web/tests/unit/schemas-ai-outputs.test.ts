import {
  CorrectionOutputSchema,
  LessonGenerationOutputSchema,
  MemoryExtractionOutputSchema,
  PlacementAssessmentOutputSchema,
  ProgressReportOutputSchema,
  WiseTurnOutputSchema,
} from '@speakwise/schemas';
import { describe, expect, it } from 'vitest';

describe('LessonGenerationOutputSchema', () => {
  const valid = {
    title: 'Ordering at a Roman trattoria',
    lessonType: 'daily_mission',
    estimatedDurationMinutes: 12,
    targetSkills: ['it-essere-present'],
    interestTheme: 'food',
    briefing: 'Since you are heading to Rome, today we will roleplay ordering.',
    tasks: [
      {
        taskType: 'multiple_choice',
        prompt: 'Which is the polite "I would like"?',
        options: [
          { value: 'a', label: 'Voglio' },
          { value: 'b', label: 'Vorrei' },
        ],
        expectedAnswer: 'b',
        skillTags: ['it-essere-present'],
        vocabularyTargets: ['vorrei'],
      },
    ],
    recapPlan: 'Quick review of polite request forms.',
  };

  it('accepts a valid lesson', () => {
    const r = LessonGenerationOutputSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it('rejects empty tasks array', () => {
    const r = LessonGenerationOutputSchema.safeParse({ ...valid, tasks: [] });
    expect(r.success).toBe(false);
  });

  it('rejects missing title', () => {
    const r = LessonGenerationOutputSchema.safeParse({ ...valid, title: '' });
    expect(r.success).toBe(false);
  });

  it('rejects bad lessonType', () => {
    const r = LessonGenerationOutputSchema.safeParse({ ...valid, lessonType: 'whatever' });
    expect(r.success).toBe(false);
  });

  it('clamps duration to 1-120', () => {
    const r1 = LessonGenerationOutputSchema.safeParse({ ...valid, estimatedDurationMinutes: 0 });
    const r2 = LessonGenerationOutputSchema.safeParse({ ...valid, estimatedDurationMinutes: 200 });
    expect(r1.success).toBe(false);
    expect(r2.success).toBe(false);
  });

  // Regression: gpt-4o sometimes ships tasks without `vocabularyTargets`.
  // We default that to [] rather than failing the whole lesson.
  it('defaults missing vocabularyTargets to []', () => {
    const taskNoVocab = {
      taskType: 'roleplay',
      prompt: 'Order at a trattoria.',
      expectedAnswer: null,
      skillTags: ['it-essere-present'],
      // vocabularyTargets intentionally omitted
    };
    const r = LessonGenerationOutputSchema.safeParse({ ...valid, tasks: [taskNoVocab] });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.tasks[0]?.vocabularyTargets).toEqual([]);
  });

  // Regression: gpt-4o occasionally returns plain string options for
  // multiple_choice ("a", "b", ...). We accept either shape.
  it('accepts either plain-string or object options', () => {
    const taskStringOpts = {
      ...valid.tasks[0],
      options: ['Voglio', 'Vorrei'],
    };
    const r = LessonGenerationOutputSchema.safeParse({ ...valid, tasks: [taskStringOpts] });
    expect(r.success).toBe(true);
  });
});

describe('CorrectionOutputSchema', () => {
  it('accepts a valid correction', () => {
    const r = CorrectionOutputSchema.safeParse({
      isCorrect: false,
      score: 0.4,
      encouragement: 'Close!',
      correctedAnswer: 'Ho mangiato la pizza',
      explanation:
        'In passato prossimo with avere, the past participle stays masculine singular by default.',
      mistakeType: 'grammar',
      severity: 'moderate',
      skillTags: ['it-passato-prossimo-avere'],
      retryPrompt: null,
      shouldUpdateMemory: true,
    });
    expect(r.success).toBe(true);
  });

  // Regression: when isCorrect=true the model returns null for both
  // mistakeType and severity. Forcing the enum forced every successful
  // answer to 502.
  it('accepts null mistakeType + severity on correct answers', () => {
    const r = CorrectionOutputSchema.safeParse({
      isCorrect: true,
      score: 1,
      encouragement: 'Nice!',
      correctedAnswer: 'Vorrei una pasta',
      explanation: 'Right verb form.',
      mistakeType: null,
      severity: null,
      skillTags: ['it-essere-present'],
      retryPrompt: null,
      shouldUpdateMemory: false,
    });
    expect(r.success).toBe(true);
  });

  it('rejects score out of [0,1]', () => {
    const bad = CorrectionOutputSchema.safeParse({
      isCorrect: true,
      score: 1.5,
      encouragement: '',
      correctedAnswer: '',
      explanation: '',
      mistakeType: 'other',
      severity: 'minor',
      skillTags: [],
      retryPrompt: null,
      shouldUpdateMemory: false,
    });
    expect(bad.success).toBe(false);
  });
});

describe('WiseTurnOutputSchema', () => {
  it('accepts a minimal valid output', () => {
    const r = WiseTurnOutputSchema.safeParse({
      intent: 'greet',
      wiseMessage: 'Hi.',
      actions: [],
      memoryCandidates: [],
    });
    expect(r.success).toBe(true);
  });

  it('rejects unknown intent', () => {
    const r = WiseTurnOutputSchema.safeParse({
      intent: 'something_else',
      wiseMessage: 'Hi.',
      actions: [],
      memoryCandidates: [],
    });
    expect(r.success).toBe(false);
  });

  // Regression: Wise was returning skill slugs (or null) as lessonId for
  // START_LESSON actions, which forced "Invalid uuid" errors and made
  // every learning request 502 → the user saw "Wise is unable to do that".
  // Accept slugs/null at the schema level; the call site filters.
  it('accepts non-UUID lessonId (slug, null, omitted)', () => {
    for (const lessonId of ['it-vocab-food-restaurant', null, undefined]) {
      const r = WiseTurnOutputSchema.safeParse({
        intent: 'start_lesson',
        wiseMessage: "Let's go.",
        actions: [{ type: 'START_LESSON', lessonId }],
        memoryCandidates: [],
      });
      expect(r.success).toBe(true);
    }
  });
});

describe('ProgressReportOutputSchema (lenient)', () => {
  it('fills in default empty arrays/zeros for cold-start', () => {
    const r = ProgressReportOutputSchema.safeParse({ summary: 'Nothing yet.' });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.strengths).toEqual([]);
      expect(r.data.weaknesses).toEqual([]);
      expect(r.data.vocabularySummary).toEqual({ learning: 0, review: 0, mastered: 0 });
      expect(r.data.recommendedNextSteps).toEqual([]);
    }
  });
});

describe('MemoryExtractionOutputSchema', () => {
  it('accepts valid memory candidates', () => {
    const r = MemoryExtractionOutputSchema.safeParse({
      memoryCandidates: [
        {
          type: 'goal',
          content: 'wants to travel to Rome',
          visibility: 'user_visible',
          confidence: 0.85,
        },
      ],
      profileUpdates: {},
      skillSignals: [],
      vocabularySignals: [],
    });
    expect(r.success).toBe(true);
  });

  it('rejects out-of-range confidence', () => {
    const r = MemoryExtractionOutputSchema.safeParse({
      memoryCandidates: [
        { type: 'goal', content: 'x', visibility: 'user_visible', confidence: 1.5 },
      ],
      profileUpdates: {},
      skillSignals: [],
      vocabularySignals: [],
    });
    expect(r.success).toBe(false);
  });
});

describe('PlacementAssessmentOutputSchema', () => {
  it('accepts a valid placement output', () => {
    const r = PlacementAssessmentOutputSchema.safeParse({
      estimatedLevel: 'beginner',
      confidence: 0.7,
      reasoning: 'Used basic essere correctly.',
      suggestedFirstSkillSlugs: ['it-essere-present'],
    });
    expect(r.success).toBe(true);
  });
});
