import { detectHardSounds } from '@/server/services/correction/pronunciation';
import { describe, expect, it } from 'vitest';

describe('detectHardSounds', () => {
  it('flags the gli, gn, and sc clusters', () => {
    expect(detectHardSounds('famiglia').join(' ')).toContain('gli');
    expect(detectHardSounds('gnocchi').join(' ')).toContain('gn');
    expect(detectHardSounds('pesce').join(' ')).toContain('sc before e/i');
  });

  it('flags double consonants and soft c/g', () => {
    expect(detectHardSounds('cappuccino').some((s) => s.includes('double consonant'))).toBe(true);
    expect(detectHardSounds('cena').some((s) => s.includes('soft c'))).toBe(true);
    expect(detectHardSounds('gelato').some((s) => s.includes('soft g'))).toBe(true);
  });

  it('flags written accents / stressed final vowels', () => {
    expect(detectHardSounds('caffè').some((s) => s.includes('accent'))).toBe(true);
  });

  it('returns an array (possibly empty) and never throws', () => {
    expect(Array.isArray(detectHardSounds(''))).toBe(true);
    expect(Array.isArray(detectHardSounds('blu'))).toBe(true);
  });

  it('de-duplicates repeated sounds', () => {
    const out = detectHardSounds('gnocchi e gnomi');
    expect(out.filter((s) => s.startsWith('gn')).length).toBe(1);
  });
});
