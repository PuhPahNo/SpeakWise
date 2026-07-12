// Next.js instrumentation hook — runs once when the server process boots.
// We use it to start the in-process cron scheduler so scheduled work
// (review/comeback offers, memory extraction) runs inside the web service
// rather than as separate Render cron services.
//
// Guards:
//   - Node runtime only (skip the edge runtime).
//   - Production only — local `next dev` shouldn't fire real jobs.
//   - DISABLE_CRON=1 escape hatch (e.g. if you later move to multiple
//     instances and want an external scheduler to own it instead).

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (process.env.NODE_ENV !== 'production') return;

  const { validatePublicEnv, validateServerEnv } = await import('@speakwise/schemas');
  validateServerEnv(process.env);
  validatePublicEnv(process.env);
  if (process.env.DISABLE_CRON === '1') return;

  const { startCronScheduler } = await import('@/server/services/cron/scheduler');
  startCronScheduler();
}
