import { expect, test } from '@playwright/test';
import { authenticate, collectErrors } from './_helpers';

test.describe('public surface', () => {
  test('marketing landing renders, links to sign-in', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Italian/i);
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible();
    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('sign-in page has username + password inputs and a submit button', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/sign-in');
    await expect(page.getByText(/Speakwise/i).first()).toBeVisible();
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /continue/i })).toBeVisible();
    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('protected page redirects to /sign-in when unauthenticated', async ({ page }) => {
    await page.goto('/command-center');
    await expect(page).toHaveURL(/\/sign-in/);
  });
});

test.describe('authed surface (smoke — pages load without errors)', () => {
  // These pages should serve 200 even pre-onboarding (some redirect to /onboarding).
  const pages = [
    { path: '/onboarding', mustContain: /Wise|Getting to know you|tap/i },
    { path: '/lessons', mustContain: /Le tue lezioni|lessons/i },
    { path: '/vocabulary', mustContain: /Vocabulary/i },
    { path: '/vocabulary/review', mustContain: /(Review|caught up|Nothing due)/i },
    { path: '/progress', mustContain: /Your progress/i },
    { path: '/profile', mustContain: /Your profile/i },
  ];

  for (const { path, mustContain } of pages) {
    test(`GET ${path} renders without console errors`, async ({ page, context, baseURL }) => {
      await authenticate(context, baseURL!);
      const errors = collectErrors(page);
      const resp = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(resp?.status(), `${path} HTTP status`).toBeLessThan(400);
      // Allow a tick for client effects to settle and report errors.
      await page.waitForTimeout(400);
      await expect(page.locator('body')).toContainText(mustContain);
      expect(errors, errors.join('\n')).toEqual([]);
    });
  }
});
