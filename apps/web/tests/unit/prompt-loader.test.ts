import { describe, it, expect } from 'vitest';
import { renderPrompt } from '@speakwise/ai';

describe('renderPrompt', () => {
  it('substitutes {{VARS}} with provided values', () => {
    const out = renderPrompt('Hello {{NAME}}, today is {{DAY}}.', {
      NAME: 'Anthony',
      DAY: 'Wednesday',
    });
    expect(out).toBe('Hello Anthony, today is Wednesday.');
  });

  it('throws when a variable is missing', () => {
    expect(() => renderPrompt('Hi {{NAME}}!', {})).toThrow(/Missing prompt variable/);
  });

  it('passes through templates with no variables', () => {
    expect(renderPrompt('plain text', {})).toBe('plain text');
  });

  it('handles multi-line bodies and repeats', () => {
    const tpl = '{{X}} and {{X}}\nover\n{{Y}} lines';
    expect(renderPrompt(tpl, { X: '1', Y: '2' })).toBe('1 and 1\nover\n2 lines');
  });
});
