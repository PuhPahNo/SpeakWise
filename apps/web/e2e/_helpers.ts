import type { BrowserContext, ConsoleMessage, Page } from '@playwright/test';

const TEST_USERNAME = process.env.TEST_USERNAME ?? 'anthony';
const TEST_PASSWORD = process.env.TEST_PASSWORD ?? 'admin123';

/**
 * Sign in by hitting the API and dropping the cookie into the context, so
 * tests don't need to drive the form every time.
 */
export async function authenticate(context: BrowserContext, baseURL: string): Promise<void> {
  const res = await context.request.post(`${baseURL}/api/auth/signin`, {
    data: { username: TEST_USERNAME, password: TEST_PASSWORD },
  });
  if (!res.ok()) {
    throw new Error(
      `Test sign-in failed (${res.status()}). Ensure ${TEST_USERNAME}/${TEST_PASSWORD} exists locally.`,
    );
  }
}

/**
 * Collect console errors + page errors during the lifetime of a test.
 * Filters out the noise we know is harmless in dev (next-router fetches,
 * 401s on prefetched routes pre-auth, etc.).
 */
export function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (isIgnorableError(text)) return;
    errors.push(`console.error: ${text}`);
  });
  page.on('pageerror', (err: Error) => {
    if (isIgnorableError(err.message)) return;
    errors.push(`pageerror: ${err.message}`);
  });
  return errors;
}

function isIgnorableError(text: string): boolean {
  // 401s on background prefetches before the user has a session.
  if (/Failed to load resource.*401/.test(text)) return true;
  // React's dev hydration warnings about the safe-area envs.
  if (/Hydration failed because the initial UI does not match/i.test(text)) return false; // we DO care
  // Source map noise from third-party scripts.
  if (/sourceMappingURL/.test(text)) return true;
  // Network blips when test stops dev server.
  if (/Failed to fetch/i.test(text)) return true;
  return false;
}
