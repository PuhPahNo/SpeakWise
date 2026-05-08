import { beforeAll, describe, expect, it } from 'vitest';
import { api, signInForTests } from './_helpers';

let cookie: string;

beforeAll(async () => {
  cookie = await signInForTests();
});

describe('authed read-only endpoints', () => {
  it('GET /api/me returns user + profile', async () => {
    const { data } = await api<{
      user: { id: string; username: string; name: string; role: string };
      learnerProfile: { onboardingCompleted: boolean };
    }>('GET', '/api/me', { cookie, expectStatus: 200 });
    expect(data.user.username).toBe('anthony');
    expect(data.user.role).toBe('admin');
    expect(typeof data.learnerProfile.onboardingCompleted).toBe('boolean');
  });

  it('GET /api/profile returns the learner profile', async () => {
    const { data } = await api<{ id: string; userId: string }>('GET', '/api/profile', {
      cookie,
      expectStatus: 200,
    });
    expect(data.id).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('GET /api/profile/summary returns summary or null', async () => {
    const { data } = await api<{ summary: unknown }>('GET', '/api/profile/summary', {
      cookie,
      expectStatus: 200,
    });
    expect('summary' in (data as object)).toBe(true);
  });

  it('GET /api/voice/voices returns curated voices + default', async () => {
    const { data } = await api<{
      voices: Array<{ id: string; name: string }>;
      defaultVoiceId: string;
    }>('GET', '/api/voice/voices', { cookie, expectStatus: 200 });
    expect(data.voices.length).toBeGreaterThan(0);
    expect(data.defaultVoiceId.length).toBeGreaterThan(0);
    expect(data.voices.some((v) => v.id === data.defaultVoiceId)).toBe(true);
  });

  it('GET /api/gamification/summary returns numeric counters', async () => {
    const { data } = await api<{
      xpTotal: number;
      streakDays: number;
      longestStreakDays: number;
    }>('GET', '/api/gamification/summary', { cookie, expectStatus: 200 });
    expect(typeof data.xpTotal).toBe('number');
    expect(typeof data.streakDays).toBe('number');
    expect(typeof data.longestStreakDays).toBe('number');
  });

  it('GET /api/gamification/comeback returns offer or null', async () => {
    const { data } = await api<{ offer: unknown }>('GET', '/api/gamification/comeback', {
      cookie,
      expectStatus: 200,
    });
    expect('offer' in (data as object)).toBe(true);
  });

  it('GET /api/memory returns an array', async () => {
    const { data } = await api<unknown[]>('GET', '/api/memory', {
      cookie,
      expectStatus: 200,
    });
    expect(Array.isArray(data)).toBe(true);
  });

  it('GET /api/memory/grouped returns 5 group buckets', async () => {
    const { data } = await api<{
      groups: Array<{ key: string; label: string; notes: unknown[] }>;
      totalActive: number;
    }>('GET', '/api/memory/grouped', { cookie, expectStatus: 200 });
    expect(data.groups.length).toBe(5);
    expect(typeof data.totalActive).toBe('number');
  });

  it('GET /api/vocabulary returns an array', async () => {
    const { data } = await api<unknown[]>('GET', '/api/vocabulary', {
      cookie,
      expectStatus: 200,
    });
    expect(Array.isArray(data)).toBe(true);
  });

  it('GET /api/progress/skills returns an array', async () => {
    const { data } = await api<unknown[]>('GET', '/api/progress/skills', {
      cookie,
      expectStatus: 200,
    });
    expect(Array.isArray(data)).toBe(true);
  });

  it('GET /api/progress/dashboard returns expected shape', async () => {
    const { data } = await api<{
      skills: unknown[];
      recentSessions: unknown[];
      vocabularyCounts: Record<string, number>;
    }>('GET', '/api/progress/dashboard', { cookie, expectStatus: 200 });
    expect(Array.isArray(data.skills)).toBe(true);
    expect(Array.isArray(data.recentSessions)).toBe(true);
    expect(typeof data.vocabularyCounts).toBe('object');
  });
});

describe('AI-backed authed endpoints (live OpenAI calls — keep light)', () => {
  it('GET /api/wise/greeting returns a non-empty greeting referencing context', async () => {
    const { data } = await api<{
      greeting: string;
      context: { dueSkillCount: number };
    }>('GET', '/api/wise/greeting', { cookie, expectStatus: 200 });
    expect(typeof data.greeting).toBe('string');
    expect(data.greeting.length).toBeGreaterThan(8);
    expect(typeof data.context.dueSkillCount).toBe('number');
  }, 30_000);

  it('GET /api/progress/report returns a structured report', async () => {
    const { data } = await api<{
      summary: string;
      strengths: unknown[];
      vocabularySummary: { learning: number; review: number; mastered: number };
    }>('GET', '/api/progress/report', { cookie, expectStatus: 200 });
    expect(typeof data.summary).toBe('string');
    expect(Array.isArray(data.strengths)).toBe(true);
    expect(typeof data.vocabularySummary.mastered).toBe('number');
  }, 30_000);
});

describe('input validation on authed POST endpoints', () => {
  it('POST /api/onboarding/start with bad mode → 400', async () => {
    const { res } = await api('POST', '/api/onboarding/start', {
      cookie,
      body: { mode: 'telepathy' },
    });
    expect(res.status).toBe(400);
  });

  it('POST /api/wise/message with missing required fields → 400', async () => {
    const { res } = await api('POST', '/api/wise/message', {
      cookie,
      body: { mode: 'voice' }, // missing message
    });
    expect(res.status).toBe(400);
  });

  it('POST /api/lessons/generate with bad lessonType → 400', async () => {
    const { res } = await api('POST', '/api/lessons/generate', {
      cookie,
      body: { lessonType: 'definitely-not-real' },
    });
    expect(res.status).toBe(400);
  });

  it('POST /api/practice/respond with missing fields → 400', async () => {
    const { res } = await api('POST', '/api/practice/respond', {
      cookie,
      body: {},
    });
    expect(res.status).toBe(400);
  });
});
