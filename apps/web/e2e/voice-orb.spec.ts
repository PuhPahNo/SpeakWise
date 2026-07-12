import { expect, test } from '@playwright/test';
import { authenticate } from './_helpers';

test.describe('voice orb presence', () => {
  test('on /sign-in (idle, decorative)', async ({ page }) => {
    await page.goto('/sign-in');
    const orb = page.locator('button[aria-label*="Voice presence" i]');
    await expect(orb).toBeVisible();
  });

  test('on /onboarding (interactive voice or chat fallback)', async ({
    page,
    context,
    baseURL,
  }) => {
    await authenticate(context, baseURL!);
    await page.goto('/onboarding');
    // Onboarding can present the orb in any of these states.
    const orb = page.locator(
      [
        'button[aria-label*="Voice orb" i]',
        'button[aria-label*="Voice presence" i]',
        'button[aria-label*="Tap to speak" i]',
        'button[aria-label*="Tap to begin" i]',
        'button[aria-label*="Listen" i]',
        'button[aria-label*="Interrupt" i]',
      ].join(', '),
    );
    const voiceMode = page.getByRole('button', { name: 'Voice' });
    await expect(voiceMode).toBeVisible();
    if (await voiceMode.isDisabled()) {
      await expect(page.getByRole('button', { name: 'Chat' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    } else {
      await expect(orb.first()).toBeVisible();
    }
  });

  test('orb is sized + circular', async ({ page }) => {
    await page.goto('/sign-in');
    const orb = page.locator('button[aria-label*="Voice presence" i]').first();
    const box = await orb.boundingBox();
    expect(box, 'orb has a bounding box').toBeTruthy();
    if (box) {
      expect(box.width).toBeGreaterThan(40);
      expect(box.height).toBeGreaterThan(40);
      // approx square (rounded-full)
      expect(Math.abs(box.width - box.height)).toBeLessThanOrEqual(2);
    }
  });
});
