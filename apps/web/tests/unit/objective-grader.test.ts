import {
  acceptableAnswers,
  firstAcceptableDisplay,
  gradeObjective,
} from '@/server/services/correction/objective-grader';
import { describe, expect, it } from 'vitest';

describe('acceptableAnswers', () => {
  it('handles strings, "/" alternatives, arrays, and {value} objects', () => {
    expect(acceptableAnswers('al')).toEqual(['al']);
    expect(acceptableAnswers('venti / trenta')).toEqual(['venti', 'trenta']);
    expect(acceptableAnswers(['a', 'in'])).toEqual(['a', 'in']);
    expect(acceptableAnswers({ value: 'sono andata' })).toEqual(['sono andata']);
    expect(acceptableAnswers(null)).toEqual([]);
  });
});

describe('gradeObjective — multiple_choice (authoritative both ways)', () => {
  const base = {
    taskType: 'multiple_choice',
    expectedAnswer: 'buongiorno',
    options: [
      { value: 'ciao', label: 'Ciao' },
      { value: 'buongiorno', label: 'Buongiorno' },
      { value: 'buonanotte', label: 'Buonanotte' },
    ],
  };
  it('marks the expected option correct', () => {
    expect(gradeObjective({ ...base, answer: 'buongiorno' })).toEqual({ correct: true });
  });
  it('marks a different valid option incorrect', () => {
    expect(gradeObjective({ ...base, answer: 'ciao' })).toEqual({ correct: false });
  });
  it('accepts the label of the correct option', () => {
    expect(gradeObjective({ ...base, answer: 'Buongiorno' })).toEqual({ correct: true });
  });
});

describe('gradeObjective — tense_selection is authoritative both ways', () => {
  it('correct and incorrect both resolve deterministically', () => {
    const t = { taskType: 'tense_selection', expectedAnswer: 'imperfetto', options: [] };
    expect(gradeObjective({ ...t, answer: 'imperfetto' })).toEqual({ correct: true });
    expect(gradeObjective({ ...t, answer: 'passato prossimo' })).toEqual({ correct: false });
  });
});

describe('gradeObjective — fill_blank / conjugation (override-to-correct only)', () => {
  it('marks an exact match correct', () => {
    expect(
      gradeObjective({ taskType: 'fill_blank', expectedAnswer: 'ventotto', answer: 'ventotto' }),
    ).toEqual({ correct: true });
  });
  it('is accent-tolerant (a missing accent never fails the learner)', () => {
    expect(
      gradeObjective({ taskType: 'fill_blank', expectedAnswer: 'caffè', answer: 'caffe' }),
    ).toEqual({ correct: true });
  });
  it('normalizes case, whitespace, trailing punctuation, and curly apostrophes', () => {
    expect(
      gradeObjective({ taskType: 'conjugation', expectedAnswer: 'è', answer: '  È.  ' }),
    ).toEqual({ correct: true });
    expect(
      gradeObjective({ taskType: 'fill_blank', expectedAnswer: "l'amico", answer: 'l’amico' }),
    ).toEqual({ correct: true });
  });
  it('accepts any listed "/" alternative', () => {
    expect(
      gradeObjective({ taskType: 'fill_blank', expectedAnswer: 'a / in', answer: 'in' }),
    ).toEqual({ correct: true });
  });
  it('defers (null) on a non-match instead of auto-failing', () => {
    expect(
      gradeObjective({ taskType: 'fill_blank', expectedAnswer: 'ventotto', answer: 'ventuno' }),
    ).toBeNull();
  });
});

describe('gradeObjective — translation defers unless confidently matched', () => {
  it('marks an exact match correct', () => {
    expect(
      gradeObjective({
        taskType: 'translation',
        expectedAnswer: 'Ho fame.',
        answer: 'ho fame',
      }),
    ).toEqual({ correct: true });
  });
  it('defers a plausibly-valid different translation to the LLM', () => {
    expect(
      gradeObjective({
        taskType: 'translation',
        expectedAnswer: 'Ho fame.',
        answer: 'Sono affamato',
      }),
    ).toBeNull();
  });
});

describe('gradeObjective — open-ended and empty cases defer', () => {
  it('returns null for open-ended task types', () => {
    expect(
      gradeObjective({ taskType: 'speaking_prompt', expectedAnswer: 'whatever', answer: 'x' }),
    ).toBeNull();
    expect(
      gradeObjective({ taskType: 'roleplay', expectedAnswer: 'whatever', answer: 'x' }),
    ).toBeNull();
  });
  it('returns null on empty answer or missing expected', () => {
    expect(
      gradeObjective({ taskType: 'multiple_choice', expectedAnswer: 'a', answer: '   ' }),
    ).toBeNull();
    expect(
      gradeObjective({ taskType: 'fill_blank', expectedAnswer: null, answer: 'ciao' }),
    ).toBeNull();
  });
});

describe('firstAcceptableDisplay', () => {
  it('returns the first acceptable answer in original form', () => {
    expect(firstAcceptableDisplay('venti / trenta')).toBe('venti');
    expect(firstAcceptableDisplay({ value: 'sono andata' })).toBe('sono andata');
    expect(firstAcceptableDisplay(['al', 'allo'])).toBe('al');
  });
});
