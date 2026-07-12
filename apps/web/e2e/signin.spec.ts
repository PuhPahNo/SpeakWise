import { expect, test } from '@playwright/test';

test('sign-in form happy path lands on app shell', async ({ page }) => {
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;
  if (!username || !password) throw new Error('TEST_USERNAME and TEST_PASSWORD are required');
  await page.goto('/sign-in');
  await page.getByLabel(/username/i).fill(username);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /continue/i }).click();
  await page.waitForURL(/\/(admin|command-center|onboarding)/, { timeout: 10_000 });
  await expect(page.locator('body')).toContainText(/Speakwise/i);
});

test('sign-in form rejects bad password with a visible error', async ({ page }) => {
  const username = process.env.TEST_USERNAME;
  if (!username) throw new Error('TEST_USERNAME is required');
  await page.goto('/sign-in');
  await page.getByLabel(/username/i).fill(username);
  await page.getByLabel(/password/i).fill('this-is-wrong');
  await page.getByRole('button', { name: /continue/i }).click();
  await expect(page.getByText(/Wrong username or password/i)).toBeVisible();
});

test('sign-in input text is readable (foreground != white-on-white)', async ({ page }) => {
  await page.goto('/sign-in');
  const input = page.getByLabel(/username/i);
  await input.fill('readable test');
  // Snapshot the actual computed styles
  const styles = await input.evaluate((el) => {
    const cs = window.getComputedStyle(el);
    return {
      color: cs.color,
      bg: cs.backgroundColor,
      fontSize: cs.fontSize,
    };
  });
  // Inputs in our dark theme: bg should not be white, OR color should be readable.
  expect(styles.color).not.toBe(styles.bg);
  // Font size 16+ on phones (we use ≥16px to prevent iOS auto-zoom).
  expect(Number.parseFloat(styles.fontSize)).toBeGreaterThanOrEqual(15.99);
});
