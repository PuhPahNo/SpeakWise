// Vitest global setup. Loads .env from the monorepo root so tests can
// see DATABASE_URL, OPENAI_API_KEY, etc.
import { config } from 'dotenv';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(here, '../../..');

config({ path: resolve(root, '.env') });

// Sane defaults so unit tests that import services don't crash on missing
// env when they aren't using it.
process.env.AUTH_SESSION_SECRET ||= 'x'.repeat(32);
process.env.NODE_ENV ||= 'test';
process.env.APP_URL ||= 'http://localhost:3001';
process.env.NEXT_PUBLIC_APP_URL ||= 'http://localhost:3001';
process.env.CRON_SECRET ||= 'a'.repeat(16);
