import { expect, test } from '@playwright/test';

test('sign-in form happy path lands on app shell', async ({ page }) => {
  await page.goto('/sign-in');
  await page.getByLabel(/username/i).fill('anthony');
  await page.getByLabel(/password/i).fill('admin123');
  await page.getByRole('button', { name: /continue/i }).click();
  // Should land on either /command-center or /onboarding (depends on profile state)
  await page.waitForURL(/\/(command-center|onboarding)/, { timeout: 10_000 });
  // Header should be present in the app shell
  await expect(page.getByRole('link', { name: /^Speakwise$/ })).toBeVisible();
});

test('sign-in form rejects bad password with a visible error', async ({ page }) => {
  await page.goto('/sign-in');
  await page.getByLabel(/username/i).fill('anthony');
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
