import { DEFAULT_VOICE_ID, WISE_VOICES, getVoiceById, resolveVoiceId } from '@speakwise/ai';
import { describe, expect, it } from 'vitest';

describe('voices catalog', () => {
  it('has at least one voice and a default', () => {
    expect(WISE_VOICES.length).toBeGreaterThan(0);
    expect(DEFAULT_VOICE_ID.length).toBeGreaterThan(0);
  });

  it('default voice is in the catalog', () => {
    expect(getVoiceById(DEFAULT_VOICE_ID)).not.toBeNull();
  });

  it('every voice has a stable shape', () => {
    for (const v of WISE_VOICES) {
      expect(v.id).toMatch(/^[A-Za-z0-9]{15,}$/);
      expect(v.name.length).toBeGreaterThan(0);
      expect(v.shortDescription.length).toBeGreaterThan(0);
      expect(['female', 'male', 'neutral']).toContain(v.gender);
    }
  });

  it('exactly one voice is marked default', () => {
    const defaults = WISE_VOICES.filter((v) => v.isDefault);
    expect(defaults.length).toBe(1);
  });

  it('getVoiceById returns null for unknown ids and the voice for known', () => {
    expect(getVoiceById(null)).toBeNull();
    expect(getVoiceById(undefined)).toBeNull();
    expect(getVoiceById('not-a-real-id')).toBeNull();
    expect(getVoiceById(DEFAULT_VOICE_ID)?.id).toBe(DEFAULT_VOICE_ID);
  });

  it('resolveVoiceId falls back to the default for missing/unknown', () => {
    expect(resolveVoiceId(null)).toBe(DEFAULT_VOICE_ID);
    expect(resolveVoiceId(undefined)).toBe(DEFAULT_VOICE_ID);
    expect(resolveVoiceId('xxxxxxxxxxxxxxx')).toBe(DEFAULT_VOICE_ID);
    const second = WISE_VOICES.find((v) => !v.isDefault)!;
    expect(resolveVoiceId(second.id)).toBe(second.id);
  });
});
