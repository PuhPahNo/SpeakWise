/* eslint-disable no-console */
/**
 * Quick & dirty Italian-word counter — used to verify Wise honors the
 * learner's languageRatio. Anything with Italian diacritics or in the
 * curated common-Italian-token set is counted as Italian; otherwise it's
 * either English or punctuation (skipped).
 */
const IT_COMMON = new Set([
  'ciao', 'salve', 'arrivederci', 'buongiorno', 'buonasera', 'grazie', 'prego',
  'scusa', 'scusi', 'bentornato', 'bentornata', 'bene', 'allora', 'però',
  'perché', 'quindi', 'davvero', 'forse', 'magari', 'va', 'oggi', 'ieri',
  'domani', 'sempre', 'mai', 'già', 'ancora', 'anche', 'molto', 'tanto',
  'poco', 'sono', 'sei', 'è', 'siamo', 'siete', 'ho', 'hai', 'ha', 'abbiamo',
  'avete', 'hanno', 'voglio', 'vuoi', 'vuole', 'vorrei', 'vorresti', 'posso',
  'puoi', 'può', 'devo', 'devi', 'deve', 'faccio', 'fai', 'fa', 'cibo',
  'pasta', 'caffè', 'vino', 'casa', 'lavoro', 'famiglia', 'gente', 'ragazzo',
  'ragazza', 'amico', 'amica', 'il', 'la', 'lo', 'gli', 'le', 'un', 'una',
  'di', 'da', 'in', 'su', 'per', 'con', 'che', 'chi', 'non', 'sì', 'mi',
  'ti', 'ci', 'vi', 'si', 'al', 'alla', 'del', 'della', 'nel', 'nella',
  'oggi', 'come', 'dove', 'quando', 'cosa',
]);
function countItalianRatio(text: string): { it: number; total: number; ratio: number } {
  const tokens = text.toLowerCase().match(/[a-zà-öø-ÿ']+/g) ?? [];
  let it = 0;
  for (const t of tokens) {
    if (/[àèéìòù]/.test(t) || IT_COMMON.has(t)) it++;
  }
  return { it, total: tokens.length, ratio: tokens.length === 0 ? 0 : it / tokens.length };
}

/**
 * Programmatic end-to-end QA — walks the FULL user journey:
 *
 *   1. Create a fresh user (deterministic username so re-runs are easy to diff)
 *   2. Sign in
 *   3. Walk through onboarding turn-by-turn
 *   4. Call /api/onboarding/complete
 *   5. Verify the recommended first lesson + GET /api/lessons/{id} (THE 404)
 *   6. Start lesson session, walk every task via /api/practice/respond
 *   7. Complete the lesson
 *   8. Inspect DB state — skill mastery deltas, memory notes, gamification
 *   9. Re-fetch greeting and verify it references session 1
 *  10. Send Wise messages including "let me learn vocab" — flag any "unable to"
 *
 * Run from monorepo root with the dev server already up on :3001:
 *   node --experimental-strip-types --env-file=.env scripts/qa-end-to-end.ts
 *
 * Exit code: 0 if all checks pass, 1 if any check fails.
 */
import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const BASE = process.env.APP_URL ?? 'http://localhost:3001';

interface Failure {
  step: string;
  detail: string;
}
const failures: Failure[] = [];
const log = (...args: unknown[]) => console.log(...args);
const fail = (step: string, detail: string) => {
  failures.push({ step, detail });
  console.error(`  ✗ ${step}: ${detail}`);
};
const pass = (step: string, note = '') => console.log(`  ✓ ${step}${note ? ` — ${note}` : ''}`);

async function api<T = unknown>(
  method: string,
  path: string,
  cookie: string,
  body?: unknown,
): Promise<{ status: number; data: T; raw: string }> {
  const headers: Record<string, string> = { Cookie: cookie };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const raw = await res.text();
  let data: T = undefined as unknown as T;
  try {
    data = raw ? (JSON.parse(raw) as T) : (undefined as unknown as T);
  } catch {
    /* leave as text */
  }
  return { status: res.status, data, raw };
}

async function main() {
  const prisma = new PrismaClient();
  const username = `qa-${randomBytes(4).toString('hex')}`;
  const password = 'qa-test-pw-1234';

  log(`\n=== Speakwise end-to-end QA ===`);
  log(`base: ${BASE}`);
  log(`user: ${username}\n`);

  // ── 1. Create user ────────────────────────────────────────────────
  log('1. CREATE USER');
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
      name: `QA ${username}`,
      role: 'learner',
      nativeLanguage: 'en',
      targetLanguage: 'it',
    },
  });
  await prisma.learnerProfile.create({ data: { userId: user.id } });
  pass('created user', user.id);

  // ── 2. Sign in ────────────────────────────────────────────────────
  log('\n2. SIGN IN');
  const signinRes = await fetch(`${BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!signinRes.ok) {
    fail('sign in', `status ${signinRes.status}: ${await signinRes.text()}`);
    await cleanup(prisma, user.id);
    summarize();
    return;
  }
  const setCookie = signinRes.headers.get('set-cookie');
  const cookieMatch = setCookie?.match(/sw_session=([^;]+)/);
  if (!cookieMatch) {
    fail('sign in', 'no sw_session cookie');
    await cleanup(prisma, user.id);
    summarize();
    return;
  }
  const cookie = `sw_session=${cookieMatch[1]}`;
  pass('signed in');

  // ── 3. Onboarding ─────────────────────────────────────────────────
  log('\n3. ONBOARDING');
  const start = await api<{ sessionId: string; wiseMessage: string }>(
    'POST',
    '/api/onboarding/start',
    cookie,
    { mode: 'voice' },
  );
  if (start.status !== 200 || !start.data.sessionId) {
    fail('onboarding start', `status ${start.status}: ${start.raw.slice(0, 200)}`);
    await cleanup(prisma, user.id);
    summarize();
    return;
  }
  pass('start', `session ${start.data.sessionId.slice(0, 8)}…`);
  log(`    Wise: "${start.data.wiseMessage}"`);

  const userTurns = [
    "I want to be conversational on a trip to Italy this summer.",
    "I'm into food, cooking, and music.",
    "I'm a beginner — I know maybe 20 words.",
    "Probably 10 minutes a day. Be gentle when I mess up.",
    "I'd love a friendly tutor vibe.",
    'Just sprinkle a little Italian for now — mostly English while I get my feet wet.',
    "Yeah let's get going — that's everything.",
  ];

  let nextStep: 'continue' | 'complete' = 'continue';
  let lastWise = '';
  for (const text of userTurns) {
    log(`    you:  "${text}"`);
    const r = await api<{ wiseMessage: string; nextStep: 'continue' | 'complete' }>(
      'POST',
      '/api/onboarding/respond',
      cookie,
      { sessionId: start.data.sessionId, inputType: 'text', text },
    );
    if (r.status !== 200) {
      fail('onboarding respond', `status ${r.status}: ${r.raw.slice(0, 200)}`);
      break;
    }
    log(`    Wise: "${r.data.wiseMessage}"`);
    nextStep = r.data.nextStep;
    lastWise = r.data.wiseMessage;
    if (nextStep === 'complete') break;
  }
  if (nextStep === 'complete') {
    pass('onboarding reached "complete"', `${lastWise.slice(0, 60)}…`);
  } else {
    fail('onboarding', 'never reached "complete" after 5 turns');
  }

  // ── 4. Onboarding complete (generates first lesson) ──────────────
  log('\n4. ONBOARDING COMPLETE → FIRST LESSON');
  const complete = await api<{
    learnerProfile: unknown;
    recommendedFirstLesson: { id: string; title: string; tasks: unknown[] };
  }>('POST', '/api/onboarding/complete', cookie);
  if (complete.status !== 200) {
    fail('onboarding complete', `status ${complete.status}: ${complete.raw.slice(0, 300)}`);
    await cleanup(prisma, user.id);
    summarize();
    return;
  }
  const firstLesson = complete.data.recommendedFirstLesson;
  if (!firstLesson?.id) {
    fail('onboarding complete', `no recommendedFirstLesson.id; raw: ${complete.raw.slice(0, 300)}`);
    await cleanup(prisma, user.id);
    summarize();
    return;
  }
  pass('first lesson generated', `id=${firstLesson.id.slice(0, 8)}… title="${firstLesson.title}"`);

  // What did the onboarding extractor set the languageRatio to?
  const profileRow = await prisma.learnerProfile.findUnique({ where: { userId: user.id } });
  log(
    `    profile.languageRatio = ${profileRow?.languageRatio} (immersion=${profileRow?.immersionMode})`,
  );

  // ── 5. THE 404 — fetch the lesson via API + simulate page render ──
  log('\n5. FETCH FIRST LESSON (the page-404 candidate)');
  const lessonGet = await api<{ lesson: { id: string; tasks: unknown[] }; tasks: unknown[] }>(
    'GET',
    `/api/lessons/${firstLesson.id}`,
    cookie,
  );
  if (lessonGet.status !== 200) {
    fail('GET /api/lessons/{id}', `status ${lessonGet.status}: ${lessonGet.raw.slice(0, 200)}`);
  } else if (!lessonGet.data.lesson || !Array.isArray(lessonGet.data.tasks)) {
    fail('GET /api/lessons/{id}', `malformed body: ${lessonGet.raw.slice(0, 200)}`);
  } else {
    pass('lesson fetchable via API', `${lessonGet.data.tasks.length} tasks`);
  }

  // Simulate the actual page render — fetch /lesson/{id} as the browser would
  const pageRes = await fetch(`${BASE}/lesson/${firstLesson.id}`, {
    headers: { Cookie: cookie, Accept: 'text/html' },
    redirect: 'manual',
  });
  if (pageRes.status === 404) {
    fail('GET /lesson/{id} (browser path)', `404 — this is what the user sees`);
  } else if (pageRes.status >= 400) {
    fail('GET /lesson/{id} (browser path)', `status ${pageRes.status}`);
  } else {
    pass('lesson page renders', `HTTP ${pageRes.status}`);
  }

  // ── 6. Lesson legitimacy check ────────────────────────────────────
  log('\n6. LESSON LEGITIMACY');
  const dbLesson = await prisma.lesson.findUnique({
    where: { id: firstLesson.id },
    include: { tasks: { orderBy: { orderIndex: 'asc' } } },
  });
  if (!dbLesson) {
    fail('lesson in DB', 'not found');
  } else {
    pass('lesson in DB', `${dbLesson.tasks.length} tasks, status=${dbLesson.status}`);
    const briefing = (dbLesson.content as Record<string, unknown> | null)?.briefing;
    if (typeof briefing !== 'string' || briefing.length < 30) {
      fail('briefing', `missing or too short: ${JSON.stringify(briefing).slice(0, 80)}`);
    } else {
      // Briefing should reference one of the user's interests (food/cooking/music) or goal (Italy/trip/summer)
      const referenced = /food|cook|music|italy|trip|summer/i.test(briefing);
      if (referenced) pass('briefing references learner context');
      else fail('briefing', `generic — does not reference interests/goals: "${briefing.slice(0, 100)}…"`);
    }
    let badTasks = 0;
    for (const t of dbLesson.tasks) {
      if (!t.prompt || t.prompt.length < 5) badTasks++;
      if (t.taskType === 'multiple_choice') {
        const opts = t.options as string[] | null;
        if (!opts || opts.length < 2) badTasks++;
        if (!t.expectedAnswer) badTasks++;
      }
    }
    if (badTasks > 0) fail('task quality', `${badTasks} malformed task(s)`);
    else pass('all tasks well-formed');
  }

  // ── 7. Walk the lesson — start, respond to each task, complete ──
  log('\n7. PLAY THE LESSON');
  const sessionStart = await api<{
    session: { id: string };
    currentTask: { id: string; prompt: string; expectedAnswer?: string | null };
  }>('POST', `/api/lessons/${firstLesson.id}/start`, cookie, { mode: 'text' });
  if (sessionStart.status !== 200) {
    fail('lesson start', `status ${sessionStart.status}: ${sessionStart.raw.slice(0, 200)}`);
  } else {
    pass('lesson session started', sessionStart.data.session.id.slice(0, 8) + '…');
    const sessionId = sessionStart.data.session.id;

    const tasks = dbLesson?.tasks ?? [];
    let answered = 0;
    let correctCount = 0;
    for (const task of tasks) {
      const answer =
        task.expectedAnswer ||
        (task.options as string[] | null)?.[0] ||
        'Sì, va bene.';
      const r = await api<{
        correction: { isCorrect?: boolean };
        nextTask: unknown;
      }>('POST', '/api/practice/respond', cookie, {
        sessionId,
        lessonTaskId: task.id,
        inputType: 'text',
        answer,
      });
      if (r.status !== 200) {
        fail(`respond task ${answered + 1}`, `status ${r.status}: ${r.raw.slice(0, 200)}`);
        break;
      }
      answered++;
      if (r.data.correction?.isCorrect) correctCount++;
    }
    pass('walked tasks', `${answered}/${tasks.length} answered, ${correctCount} correct`);

    const completeLesson = await api<unknown>(
      'POST',
      `/api/lessons/${firstLesson.id}/complete`,
      cookie,
      { sessionId },
    );
    if (completeLesson.status !== 200) {
      fail('lesson complete', `status ${completeLesson.status}: ${completeLesson.raw.slice(0, 200)}`);
    } else {
      pass('lesson completed');
    }
  }

  // ── 8. Progress tracking ──────────────────────────────────────────
  log('\n8. PROGRESS TRACKING');
  const progress = await prisma.userSkillProgress.findMany({ where: { userId: user.id } });
  if (progress.length === 0) fail('skill progress', 'no UserSkillProgress rows after lesson');
  else pass('skill progress rows', `${progress.length} skills tracked`);

  const responses = await prisma.userResponse.findMany({
    where: { session: { userId: user.id } },
  });
  if (responses.length === 0) fail('user responses', 'no responses recorded');
  else pass('user responses recorded', `${responses.length} responses`);

  const lessons = await prisma.lesson.findMany({ where: { userId: user.id } });
  const completed = lessons.filter((l) => l.status === 'completed').length;
  if (completed === 0) fail('lesson completion', 'no lessons marked completed');
  else pass('completed lessons', String(completed));

  const streak = await prisma.userStreak.findUnique({ where: { userId: user.id } });
  if (!streak) fail('streak', 'no streak row');
  else pass('streak', `current ${streak.currentDays}d, longest ${streak.longestDays}d`);

  const xpEntries = await prisma.xpEntry.findMany({ where: { userId: user.id } });
  const totalXp = xpEntries.reduce((sum, e) => sum + e.amount, 0);
  pass('XP', `${xpEntries.length} entries, total ${totalXp} xp`);

  // ── 9. Memory persistence + greeting on next session ─────────────
  log('\n9. CROSS-SESSION MEMORY');
  const memories = await prisma.memoryNote.findMany({ where: { userId: user.id } });
  pass('memory notes', `${memories.length} stored`);

  const greeting = await api<{ greeting: string; context: { lastSessionAgoDays: number | null } }>(
    'GET',
    '/api/wise/greeting',
    cookie,
  );
  if (greeting.status !== 200) {
    fail('greeting', `status ${greeting.status}`);
  } else {
    log(`    greeting: "${greeting.data.greeting}"`);
    const ctx = greeting.data.context;
    if (ctx.lastSessionAgoDays !== null && ctx.lastSessionAgoDays === 0) {
      pass('greeting knows recent session', `${ctx.lastSessionAgoDays} days ago`);
    } else if (ctx.lastSessionAgoDays === null) {
      fail('greeting context', 'lastSessionAgoDays still null after a completed lesson');
    } else {
      pass('greeting context', `lastSessionAgoDays=${ctx.lastSessionAgoDays}`);
    }
    // Greeting should mention something concrete in EITHER language.
    // We check English markers (food, italy, …), Italian renderings of
    // those interests (cibo, italia, viaggio, estate, cucinare), the
    // user's name, and Italian welcome-back forms (bentornato/a) which
    // imply the learner is a known returning user.
    const refsContext =
      /qa-|food|cook|music|italy|summer|trip|beginner/i.test(greeting.data.greeting) ||
      /cibo|cucina|musica|italia|viaggio|estate|cucinare|bentornat/i.test(greeting.data.greeting);
    if (refsContext) pass('greeting references learner');
    else
      fail('greeting personalization', `generic — no name/interest/goal in: "${greeting.data.greeting}"`);

    // Verify Wise is honoring the language ratio. The QA user explicitly
    // requested "just sprinkle a little Italian — mostly English", so
    // languageRatio should be ≤ 0.15 and the greeting should reflect that.
    const rstats = countItalianRatio(greeting.data.greeting);
    log(
      `    italian-ratio measured: ${(rstats.ratio * 100).toFixed(0)}% (${rstats.it}/${rstats.total})`,
    );
    // Allow some slack — model occasionally adds a 2nd Italian phrase. Cap
    // at 35% so the test fails if Wise reverts to talking ALL Italian.
    if (rstats.ratio <= 0.35) pass('greeting respects beginner language ratio');
    else
      fail(
        'language-ratio overshoot',
        `${(rstats.ratio * 100).toFixed(0)}% Italian for a "sprinkle" learner — should be ≤ 35%`,
      );
  }

  // ── 9b. Second lesson — verify cross-session continuity ──────────
  log('\n9b. SECOND LESSON (cross-session continuity)');
  const gen2 = await api<{ lesson: { id: string; title: string; tasks: unknown[] } }>(
    'POST',
    '/api/lessons/generate',
    cookie,
    { lessonType: 'daily_mission', userRequest: 'Keep going with food and cooking words.' },
  );
  if (gen2.status !== 200 || !gen2.data.lesson?.id) {
    fail('second lesson generate', `status ${gen2.status}: ${gen2.raw.slice(0, 200)}`);
  } else {
    pass('second lesson generated', `id=${gen2.data.lesson.id.slice(0, 8)}…`);
    const dbLesson2 = await prisma.lesson.findUnique({
      where: { id: gen2.data.lesson.id },
      include: { tasks: { orderBy: { orderIndex: 'asc' } } },
    });
    const briefing2 = (dbLesson2?.content as Record<string, unknown> | null)?.briefing as
      | string
      | undefined;
    if (briefing2 && /food|cook|music|italy|trip/i.test(briefing2)) {
      pass('second briefing still personal');
    } else {
      fail('second briefing', `not personal enough: "${briefing2?.slice(0, 100)}"`);
    }
    // Walk + complete this second lesson too — tests that mastery deltas
    // accumulate across sessions and Wise can pick up tomorrow.
    const start2 = await api<{ session: { id: string } }>(
      'POST',
      `/api/lessons/${gen2.data.lesson.id}/start`,
      cookie,
      { mode: 'text' },
    );
    if (start2.status === 200 && dbLesson2) {
      const sessionId2 = start2.data.session.id;
      let answered = 0;
      for (const task of dbLesson2.tasks) {
        const optsAny = task.options as unknown;
        const firstOptValue =
          Array.isArray(optsAny) && optsAny.length > 0
            ? typeof optsAny[0] === 'string'
              ? (optsAny[0] as string)
              : ((optsAny[0] as { value?: string }).value ?? null)
            : null;
        const answer =
          (task.expectedAnswer as string | null) || firstOptValue || 'Sì, va bene.';
        const r = await api<unknown>('POST', '/api/practice/respond', cookie, {
          sessionId: sessionId2,
          lessonTaskId: task.id,
          inputType: 'text',
          answer,
        });
        if (r.status === 200) answered++;
      }
      pass('second lesson played', `${answered}/${dbLesson2.tasks.length} answered`);
      const c2 = await api<unknown>('POST', `/api/lessons/${gen2.data.lesson.id}/complete`, cookie, {
        sessionId: sessionId2,
      });
      if (c2.status === 200) pass('second lesson completed');
      else fail('second lesson complete', `status ${c2.status}: ${c2.raw.slice(0, 200)}`);
    }

    // After two lessons, mastery should be tracked across more skills
    const progress2 = await prisma.userSkillProgress.findMany({ where: { userId: user.id } });
    pass('skills tracked after 2 lessons', String(progress2.length));

    // Greeting after 2 sessions should still personalize
    const g2 = await api<{ greeting: string; context: { lastSessionAgoDays: number | null } }>(
      'GET',
      '/api/wise/greeting',
      cookie,
    );
    if (g2.status === 200) log(`    greeting after 2: "${g2.data.greeting}"`);
  }

  // ── 10. Wise turn — including the "learn vocab" failure case ─────
  log('\n10. WISE TURN INTENT MAPPING');
  const probes = [
    'I want to learn vocabulary today.',
    'Let me practice food words.',
    'Start a lesson please.',
    "What should I work on?",
  ];
  for (const message of probes) {
    const r = await api<{ wiseMessage: string; intent: string; actions: Array<{ type: string }> }>(
      'POST',
      '/api/wise/message',
      cookie,
      { mode: 'text', message, context: { screen: 'command_center' } },
    );
    if (r.status !== 200) {
      fail(`wise turn "${message}"`, `status ${r.status}: ${r.raw.slice(0, 150)}`);
      continue;
    }
    const text = r.data.wiseMessage ?? '';
    const types = r.data.actions?.map((a) => a.type).join(',') || 'NONE';
    log(`    you:  "${message}"`);
    log(`    Wise (intent=${r.data.intent}, actions=${types}): "${text}"`);
    if (/can'?t|cannot|unable to|i'?m sorry,? i don'?t/i.test(text)) {
      fail(`wise turn "${message}"`, `Wise refused: "${text}"`);
    } else {
      pass(`wise turn "${message}"`, `intent=${r.data.intent}`);
    }
  }

  await cleanup(prisma, user.id);
  summarize();
}

async function cleanup(prisma: PrismaClient, userId: string) {
  // Best-effort delete of test user + cascading rows
  try {
    await prisma.userResponse.deleteMany({ where: { session: { userId } } });
    await prisma.session.deleteMany({ where: { userId } });
    await prisma.lessonTask.deleteMany({ where: { lesson: { userId } } });
    await prisma.lesson.deleteMany({ where: { userId } });
    await prisma.userSkillProgress.deleteMany({ where: { userId } });
    await prisma.vocabularyItem.deleteMany({ where: { userId } });
    await prisma.memoryNote.deleteMany({ where: { userId } });
    await prisma.userStreak.deleteMany({ where: { userId } });
    await prisma.xpEntry.deleteMany({ where: { userId } });
    await prisma.userEvent.deleteMany({ where: { userId } });
    await prisma.learnerProfile.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });
  } catch (e) {
    console.warn(`cleanup partial: ${e instanceof Error ? e.message : String(e)}`);
  } finally {
    await prisma.$disconnect();
  }
}

function summarize() {
  console.log('\n=== SUMMARY ===');
  if (failures.length === 0) {
    console.log('✓ ALL CHECKS PASSED');
    process.exit(0);
  }
  console.log(`✗ ${failures.length} FAILURE(S):`);
  for (const f of failures) console.log(`  - ${f.step}: ${f.detail}`);
  process.exit(1);
}

main().catch((e) => {
  console.error('Harness crashed:', e);
  process.exit(2);
});
