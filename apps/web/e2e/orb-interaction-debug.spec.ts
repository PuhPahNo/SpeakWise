/**
 * Diagnostic: actually tap the orb and observe what fires.
 * Reports exactly what's slow / what's missing / where the chain breaks.
 */
import { expect, test } from '@playwright/test';
import { authenticate } from './_helpers';

test.describe.configure({ mode: 'serial' });

test('onboarding orb tap: trace the full network + console flow', async ({
  page,
  context,
  baseURL,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop only');
  await authenticate(context, baseURL!);

  // Capture console + network with timestamps
  const events: { t: number; kind: string; detail: string }[] = [];
  const t0 = Date.now();
  const log = (kind: string, detail: string) => events.push({ t: Date.now() - t0, kind, detail });

  page.on('console', (msg) => log(`console.${msg.type()}`, msg.text()));
  page.on('pageerror', (err) => log('pageerror', err.message));
  page.on('request', (req) => {
    const u = req.url();
    if (u.includes('/api/')) log('req', `${req.method()} ${new URL(u).pathname}`);
  });
  page.on('response', (res) => {
    const u = res.url();
    if (u.includes('/api/')) log('res', `${res.status()} ${new URL(u).pathname}`);
  });

  await page.goto('/onboarding');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1500); // let prewarm kick off

  // Find the orb. There's only one big button on this page in intro state.
  const orb = page
    .locator(
      ['button[aria-label*="Tap to begin" i]', 'button[aria-label*="Voice orb" i]'].join(', '),
    )
    .first();
  await expect(orb).toBeVisible();

  log('test', 'about to click orb');
  // Strict click — should now succeed because idle orb is animation-free.
  await orb.click();

  // Wait up to 30s for either /api/voice/speak to be hit OR the page to
  // visibly change to "conversing" phase.
  const speakHit = page.waitForResponse((r) => r.url().includes('/api/voice/speak'), {
    timeout: 30_000,
  });
  const phaseChanged = page
    .getByText(/Wise is warming up|Wise is thinking|Wise is speaking/i)
    .first()
    .waitFor({ timeout: 30_000 });

  // Wait for the actual /api/voice/speak round-trip to complete
  try {
    const res = await speakHit;
    log('test', `speak HTTP ${res.status()}, body ${(await res.body()).byteLength} bytes`);
  } catch (e) {
    log('test', `speak failed: ${e instanceof Error ? e.message : String(e)}`);
  }
  await page.waitForTimeout(2000); // let audio actually start

  // Dump everything we saw
  console.log('\n=== ORB TAP TRACE ===');
  for (const e of events) {
    console.log(`  +${String(e.t).padStart(5)}ms  ${e.kind.padEnd(15)} ${e.detail}`);
  }
  console.log('=== END ===\n');

  // Test always passes — we just want the trace.
  expect(true).toBe(true);
});
