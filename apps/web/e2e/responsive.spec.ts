import { test, expect } from '@playwright/test';
import { authenticate } from './_helpers';

test('mobile: bottom tab bar is visible', async ({ page, context, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only');
  await authenticate(context, baseURL!);
  await page.goto('/lessons');
  // Casa / Parla / Parole / Progressi / Profilo
  for (const label of ['Casa', 'Parla', 'Parole', 'Progressi', 'Profilo']) {
    await expect(page.getByRole('link', { name: label, exact: true })).toBeVisible();
  }
});

test('mobile: page does not horizontally overflow the viewport', async ({ page, context, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only');
  await authenticate(context, baseURL!);
  await page.goto('/lessons');
  await page.waitForLoadState('domcontentloaded');
  const overflow = await page.evaluate(() => {
    const w = window.innerWidth;
    const docW = document.documentElement.scrollWidth;
    return { w, docW, overflow: docW - w };
  });
  // 1px tolerance for sub-pixel rounding.
  expect(overflow.overflow, JSON.stringify(overflow)).toBeLessThanOrEqual(1);
});

test('desktop: top nav is visible (md breakpoint shows it)', async ({ page, context, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop-only');
  await authenticate(context, baseURL!);
  await page.goto('/lessons');
  // Top nav links from layout.tsx
  for (const label of ['Casa', 'Parla', 'Lezioni', 'Parole', 'Progressi', 'Profilo']) {
    await expect(page.getByRole('link', { name: label, exact: true })).toBeVisible();
  }
});

test('desktop: bottom tab bar is hidden', async ({ page, context, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop-only');
  await authenticate(context, baseURL!);
  await page.goto('/lessons');
  // Bottom tab bar is wrapped in <nav aria-label="Primary"> with md:hidden.
  // On desktop it should be display:none.
  const nav = page.locator('nav[aria-label="Primary"]');
  // Either not present or display:none — either is acceptable
  if ((await nav.count()) > 0) {
    const display = await nav.first().evaluate((el) => window.getComputedStyle(el).display);
    expect(display).toBe('none');
  }
});
