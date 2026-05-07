import { z } from 'zod';

export const ServerEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_URL: z.string().url(),

  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),

  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_WEBHOOK_SECRET: z.string().min(1),

  OPENAI_API_KEY: z.string().min(1),
  OPENAI_ORG_ID: z.string().optional(),
  OPENAI_MODEL_FAST: z.string().default('gpt-4o-mini'),
  OPENAI_MODEL_REASONING: z.string().default('gpt-4o'),
  OPENAI_MODEL_EMBEDDING: z.string().default('text-embedding-3-small'),
  OPENAI_MODEL_STT: z.string().default('whisper-1'),

  ELEVENLABS_API_KEY: z.string().min(1),
  ELEVENLABS_VOICE_ID_IT: z.string().min(1),
  ELEVENLABS_VOICE_ID_EN: z.string().min(1),
  ELEVENLABS_MODEL_ID: z.string().default('eleven_turbo_v2_5'),

  SENTRY_DSN: z.string().url().optional(),
  POSTHOG_API_KEY: z.string().optional(),

  CRON_SECRET: z.string().min(16),
});

export const PublicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

export type ServerEnv = z.infer<typeof ServerEnvSchema>;
export type PublicEnv = z.infer<typeof PublicEnvSchema>;
