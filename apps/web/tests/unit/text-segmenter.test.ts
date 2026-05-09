import { italianScore, segmentMixedText } from '@speakwise/ai';
import { describe, expect, it } from 'vitest';

describe('italianScore', () => {
  it('detects diacritics as definitely Italian', () => {
    expect(italianScore('Perché no?')).toBe(1);
    expect(italianScore('è bello')).toBe(1);
  });

  it('scores Italian-strong words high', () => {
    expect(italianScore('Ciao Anthony')).toBeGreaterThan(0.7);
    expect(italianScore('Vorrei una pasta')).toBeGreaterThan(0.7);
  });

  it('scores English fragments low', () => {
    expect(italianScore('Welcome back, glad you made it.')).toBeLessThan(0.3);
    expect(italianScore('Today we are going to practice ordering food.')).toBeLessThan(0.3);
  });

  it('handles empty input', () => {
    expect(italianScore('')).toBe(0);
    expect(italianScore('   ')).toBe(0);
  });
});

describe('segmentMixedText', () => {
  it('returns a single English span for pure English', () => {
    const r = segmentMixedText("Welcome back. Today we'll cover ordering food at a trattoria.");
    expect(r).toHaveLength(1);
    expect(r[0]?.lang).toBe('en');
  });

  it('returns a single Italian span for pure Italian', () => {
    const r = segmentMixedText("Ciao Anthony. Come va? Vorrei un caffè.");
    expect(r).toHaveLength(1);
    expect(r[0]?.lang).toBe('it');
  });

  it('splits Wise-style mixed greeting into Italian + English', () => {
    const r = segmentMixedText("Ciao Anthony! Welcome back to today's lesson.");
    expect(r.length).toBeGreaterThanOrEqual(2);
    // First fragment ("Ciao Anthony!") should be tagged Italian
    expect(r[0]?.lang).toBe('it');
    // Last fragment ("Welcome back...") should be tagged English
    expect(r[r.length - 1]?.lang).toBe('en');
  });

  it('keeps English-with-loanword fragments tagged English', () => {
    // "passato prossimo" alone is ambiguous; the surrounding English wins
    const r = segmentMixedText('Yesterday you struggled with passato prossimo agreement.');
    expect(r).toHaveLength(1);
    expect(r[0]?.lang).toBe('en');
  });

  it('detects Italian phrases inside an English-led paragraph', () => {
    const r = segmentMixedText(
      'Great work! Vorrei che tu provassi questa frase. Then translate it back.',
    );
    const langs = r.map((s) => s.lang);
    expect(langs).toContain('it');
    expect(langs).toContain('en');
  });

  it('merges adjacent same-language phrases', () => {
    const r = segmentMixedText('Hello. Welcome. How are you doing today?');
    expect(r).toHaveLength(1); // all merged into one English span
  });
});
