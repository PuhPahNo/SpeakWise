import { describe, it, expect } from 'vitest';
import { ServerEnvSchema, PublicEnvSchema } from '@speakwise/schemas';

const VALID_SERVER = {
  APP_URL: 'http://localhost:3001',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/speakwise?schema=public',
  DIRECT_URL: 'postgresql://postgres:postgres@localhost:5432/speakwise?schema=public',
  AUTH_SESSION_SECRET: 'x'.repeat(32),
  OPENAI_API_KEY: 'sk-test',
  ELEVENLABS_API_KEY: 'el-test',
  CRON_SECRET: 'a'.repeat(16),
};

describe('ServerEnvSchema', () => {
  it('accepts a fully populated config', () => {
    expect(ServerEnvSchema.safeParse(VALID_SERVER).success).toBe(true);
  });

  it('rejects too-short AUTH_SESSION_SECRET', () => {
    const r = ServerEnvSchema.safeParse({ ...VALID_SERVER, AUTH_SESSION_SECRET: 'short' });
    expect(r.success).toBe(false);
  });

  it('rejects missing OPENAI_API_KEY', () => {
    const { OPENAI_API_KEY: _, ...rest } = VALID_SERVER;
    const r = ServerEnvSchema.safeParse(rest);
    expect(r.success).toBe(false);
  });

  it('rejects too-short CRON_SECRET', () => {
    const r = ServerEnvSchema.safeParse({ ...VALID_SERVER, CRON_SECRET: 'tooshort' });
    expect(r.success).toBe(false);
  });

  it('applies model defaults', () => {
    const r = ServerEnvSchema.safeParse(VALID_SERVER);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.OPENAI_MODEL_FAST).toBe('gpt-4o-mini');
      expect(r.data.OPENAI_MODEL_REASONING).toBe('gpt-4o');
      expect(r.data.ELEVENLABS_MODEL_ID).toBe('eleven_turbo_v2_5');
    }
  });
});

describe('PublicEnvSchema', () => {
  it('rejects bad NEXT_PUBLIC_APP_URL', () => {
    const r = PublicEnvSchema.safeParse({ NEXT_PUBLIC_APP_URL: 'not-a-url' });
    expect(r.success).toBe(false);
  });

  it('does NOT require Clerk vars (in-house auth)', () => {
    const r = PublicEnvSchema.safeParse({ NEXT_PUBLIC_APP_URL: 'http://localhost:3001' });
    expect(r.success).toBe(true);
  });
});
