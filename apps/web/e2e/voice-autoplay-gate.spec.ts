import { test, expect } from '@playwright/test';
import { authenticate } from './_helpers';

test.describe('voice autoplay gate (Wise should not speak before user gesture)', () => {
  test('onboarding shows intro tap-to-begin, does NOT POST /api/voice/speak on load', async ({
    page,
    context,
    baseURL,
  }) => {
    await authenticate(context, baseURL!);

    // Track every voice/speak call.
    const speakCalls: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/api/voice/speak')) speakCalls.push(req.method());
    });

    await page.goto('/onboarding');
    await page.waitForLoadState('domcontentloaded');
    // Give the page a beat to let any rogue useEffect speak go through.
    await page.waitForTimeout(800);

    expect(
      speakCalls,
      'no /api/voice/speak calls should happen before the user taps the orb',
    ).toEqual([]);

    // Intro copy should be visible.
    await expect(
      page.getByText(/Tap the orb when you[’']re ready/i),
    ).toBeVisible();
  });

  test('command-center shows greeting text but does NOT POST /api/voice/speak on load', async ({
    page,
    context,
    baseURL,
  }) => {
    await authenticate(context, baseURL!);

    const speakCalls: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/api/voice/speak')) speakCalls.push(req.method());
    });

    // Hit /command-center; if user is mid-onboarding, this redirects to
    // /onboarding (which is also fine — it must not auto-speak either).
    await page.goto('/command-center');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(800);

    expect(speakCalls, 'no auto-speak before user gesture').toEqual([]);
  });
});
