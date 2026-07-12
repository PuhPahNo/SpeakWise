import { consumeRateLimit, resetRateLimit } from '@/lib/security/rate-limit';
import { describe, expect, it } from 'vitest';

describe('consumeRateLimit', () => {
  it('blocks after the configured request count', () => {
    const subject = `unit-${crypto.randomUUID()}`;
    expect(consumeRateLimit('test', subject, 2, 60_000).allowed).toBe(true);
    expect(consumeRateLimit('test', subject, 2, 60_000).allowed).toBe(true);
    const blocked = consumeRateLimit('test', subject, 2, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('isolates scopes and subjects', () => {
    const subject = `unit-${crypto.randomUUID()}`;
    expect(consumeRateLimit('a', subject, 1, 60_000).allowed).toBe(true);
    expect(consumeRateLimit('b', subject, 1, 60_000).allowed).toBe(true);
    expect(consumeRateLimit('a', `${subject}-other`, 1, 60_000).allowed).toBe(true);
  });

  it('can clear an account bucket after successful authentication', () => {
    const subject = `unit-${crypto.randomUUID()}`;
    expect(consumeRateLimit('signin-account', subject, 1, 60_000).allowed).toBe(true);
    expect(consumeRateLimit('signin-account', subject, 1, 60_000).allowed).toBe(false);
    resetRateLimit('signin-account', subject);
    expect(consumeRateLimit('signin-account', subject, 1, 60_000).allowed).toBe(true);
  });
});
