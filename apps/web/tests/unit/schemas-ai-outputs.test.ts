import { describe, it, expect } from 'vitest';
import {
  LessonGenerationOutputSchema,
  CorrectionOutputSchema,
  WiseTurnOutputSchema,
  ProgressReportOutputSchema,
  MemoryExtractionOutputSchema,
  PlacementAssessmentOutputSchema,
} from '@speakwise/schemas';

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
});

describe('CorrectionOutputSchema', () => {
  it('accepts a valid correction', () => {
    const r = CorrectionOutputSchema.safeParse({
      isCorrect: false,
      score: 0.4,
      encouragement: 'Close!',
      correctedAnswer: 'Ho mangiato la pizza',
      explanation: 'In passato prossimo with avere, the past participle stays masculine singular by default.',
      mistakeType: 'grammar',
      severity: 'moderate',
      skillTags: ['it-passato-prossimo-avere'],
      retryPrompt: null,
      shouldUpdateMemory: true,
    });
    expect(r.success).toBe(true);
  });

  it('rejects score out of [0,1]', () => {
    const bad = CorrectionOutputSchema.safeParse({
      isCorrect: true, score: 1.5, encouragement: '', correctedAnswer: '',
      explanation: '', mistakeType: 'other', severity: 'minor',
      skillTags: [], retryPrompt: null, shouldUpdateMemory: false,
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
      profileUpdates: {}, skillSignals: [], vocabularySignals: [],
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
