import { sessionFingerprint } from '@/lib/auth/session';
import { describe, expect, it } from 'vitest';

describe('sessionFingerprint', () => {
  it('is stable for the same credential state', () => {
    expect(sessionFingerprint('user', 'hash', 'learner')).toBe(
      sessionFingerprint('user', 'hash', 'learner'),
    );
  });

  it('changes after password or role changes', () => {
    const initial = sessionFingerprint('user', 'hash', 'learner');
    expect(sessionFingerprint('user', 'new-hash', 'learner')).not.toBe(initial);
    expect(sessionFingerprint('user', 'hash', 'admin')).not.toBe(initial);
  });
});
