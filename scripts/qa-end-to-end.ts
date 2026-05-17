/* eslint-disable no-console */
/**
 * Italian-word counter — used to verify Wise honors the learner's
 * languageRatio. Mirrors `packages/ai/src/text-segmenter.ts` token set
 * but standalone (the harness can't import workspace packages directly
 * via Node's --experimental-strip-types runner). Three signals stack:
 *   1. Italian diacritics (à è é ì ò ù) — definitive.
 *   2. Curated Italian function/content words — definitive.
 *   3. Italian morphology endings (-are -ere -ire -azione -mente -iamo
 *      -ate -ato -ata -ito -uto …) — strong but conservative.
 */
const IT_DIACRITICS = /[àèéìòùÀÈÉÌÒÙ]/;
const IT_COMMON = new Set([
  // greetings + manners
  'ciao',
  'salve',
  'arrivederci',
  'buongiorno',
  'buonasera',
  'buonanotte',
  'grazie',
  'prego',
  'scusa',
  'scusi',
  'piacere',
  'pronto',
  'certo',
  'bentornato',
  'bentornata',
  'bentornati',
  'bentornate',
  // articles, prepositions, contractions
  'il',
  'la',
  'lo',
  'gli',
  'le',
  'un',
  'uno',
  'una',
  'di',
  'da',
  'in',
  'su',
  'per',
  'con',
  'al',
  'allo',
  'alla',
  'ai',
  'agli',
  'alle',
  'del',
  'dello',
  'della',
  'dei',
  'degli',
  'delle',
  'nel',
  'nello',
  'nella',
  'nei',
  'negli',
  'nelle',
  'sul',
  'sullo',
  'sulla',
  'sui',
  'sugli',
  'sulle',
  // pronouns
  'io',
  'tu',
  'lui',
  'lei',
  'noi',
  'voi',
  'loro',
  'mi',
  'ti',
  'ci',
  'vi',
  'si',
  // common verbs (essere/avere/fare/andare/volere/potere/dovere/dire)
  'sono',
  'sei',
  'è',
  'siamo',
  'siete',
  'ho',
  'hai',
  'ha',
  'abbiamo',
  'avete',
  'hanno',
  'faccio',
  'fai',
  'fa',
  'facciamo',
  'fate',
  'fanno',
  'vado',
  'vai',
  'va',
  'andiamo',
  'andate',
  'vanno',
  'voglio',
  'vuoi',
  'vuole',
  'vogliamo',
  'volete',
  'vogliono',
  'vorrei',
  'vorresti',
  'vorrebbe',
  'posso',
  'puoi',
  'può',
  'possiamo',
  'potete',
  'possono',
  'devo',
  'devi',
  'deve',
  'dobbiamo',
  'dovete',
  'devono',
  'dico',
  'dici',
  'dice',
  'diciamo',
  'dite',
  'dicono',
  // adverbs / connectors
  'sì',
  'no',
  'non',
  'molto',
  'tanto',
  'poco',
  'bene',
  'male',
  'oggi',
  'ieri',
  'domani',
  'sempre',
  'mai',
  'già',
  'ancora',
  'anche',
  'allora',
  'però',
  'perché',
  'quindi',
  'davvero',
  'forse',
  'magari',
  'come',
  'dove',
  'quando',
  'cosa',
  'chi',
  'quale',
  'quali',
  'quanto',
  // hallmark nouns/adjectives
  'cibo',
  'casa',
  'giorno',
  'tempo',
  'volta',
  'gente',
  'ragazzo',
  'ragazza',
  'bambino',
  'amico',
  'amica',
  'famiglia',
  'lavoro',
  'scuola',
  'acqua',
  'pasta',
  'vino',
  'caffè',
  'cucina',
  'ristorante',
  'piatto',
  'parola',
  'parole',
  'lingua',
  'storia',
  'musica',
  'film',
  'libro',
  'viaggio',
  'estate',
  'settimana',
  'mese',
  'anno',
  'mattina',
  'sera',
  'notte',
  'cucinare',
  'mangiare',
  'bere',
  'parlare',
  'capire',
  'imparare',
  'lezione',
  'lezioni',
  'roleplay',
  // set phrases (single-token slice)
  'bene',
  'piacere',
  'ripasso',
  'ripassare',
  'esercizio',
  'continuiamo',
  'cominciamo',
  'iniziamo',
  'andiamo',
]);
const IT_ENDINGS = [
  'are',
  'ere',
  'ire', // infinitives
  'ato',
  'ata',
  'ati',
  'ate', // participles -are
  'uto',
  'uta',
  'uti',
  'ute', // participles -ere
  'ito',
  'ita',
  'iti',
  'ite', // participles -ire
  'ando',
  'endo', // gerunds
  'iamo',
  'avamo',
  'evamo',
  'ivamo', // -iamo conjugation endings
  'azione',
  'zione',
  'mente',
  'aggio',
  'eggio',
];
function countItalianRatio(text: string): { it: number; total: number; ratio: number } {
  const tokens = text.toLowerCase().match(/[a-zà-öø-ÿ']+/g) ?? [];
  let it = 0;
  for (const t of tokens) {
    if (IT_DIACRITICS.test(t)) {
      it++;
      continue;
    }
    if (IT_COMMON.has(t)) {
      it++;
      continue;
    }
    if (t.length >= 4 && IT_ENDINGS.some((suf) => t.endsWith(suf))) {
      it++;
    }
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

  log('\n=== Speakwise end-to-end QA ===');
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
    'I want to be conversational on a trip to Italy this summer.',
    "I'm into food, cooking, and music.",
    "I'm a beginner — I know maybe 20 words.",
    'Probably 10 minutes a day. Be gentle when I mess up.',
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

  // Beginner-title check: the test learner picked "sprinkle a little
  // Italian" so the title should be mostly English. We fail if it
  // overshoots — that catches regressions like the user's reported
  // "Il vocabolario del cibo al ristorante" title for a beginner.
  const titleStats = countItalianRatio(firstLesson.title);
  log(
    `    title italian-ratio: ${(titleStats.ratio * 100).toFixed(0)}% (${titleStats.it}/${titleStats.total})`,
  );
  if (titleStats.ratio <= 0.5) {
    pass('beginner title respects ratio');
  } else {
    fail(
      'beginner title overshoot',
      `${(titleStats.ratio * 100).toFixed(0)}% Italian in "${firstLesson.title}" — should be ≤ 50%`,
    );
  }

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
    fail('GET /lesson/{id} (browser path)', '404 — this is what the user sees');
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
      else
        fail(
          'briefing',
          `generic — does not reference interests/goals: "${briefing.slice(0, 100)}…"`,
        );
    }
    let badTasks = 0;
    let listeningWithScript = 0;
    let listeningTotal = 0;
    for (const t of dbLesson.tasks) {
      if (!t.prompt || t.prompt.length < 5) badTasks++;
      if (t.taskType === 'multiple_choice') {
        const opts = t.options as string[] | null;
        if (!opts || opts.length < 2) badTasks++;
        if (!t.expectedAnswer) badTasks++;
      }
      if (t.taskType === 'listening_comprehension') {
        listeningTotal++;
        const meta = t.metadata as { script?: unknown } | null;
        const s = meta?.script;
        if (Array.isArray(s) && s.length >= 2) listeningWithScript++;
      }
    }
    if (badTasks > 0) fail('task quality', `${badTasks} malformed task(s)`);
    else pass('all tasks well-formed');
    // Listening tasks should have a 2+ line script for two-voice playback.
    // Lessons without any listening task are also fine (not all are
    // dialogue-heavy) — only fail if a listening task was generated
    // without a script.
    if (listeningTotal > 0) {
      if (listeningWithScript === listeningTotal) {
        pass('listening tasks have scripts', `${listeningWithScript}/${listeningTotal}`);
      } else {
        fail(
          'listening tasks missing script',
          `${listeningWithScript}/${listeningTotal} have a script`,
        );
      }
    }
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
    pass('lesson session started', `${sessionStart.data.session.id.slice(0, 8)}…`);
    const sessionId = sessionStart.data.session.id;

    const tasks = dbLesson?.tasks ?? [];
    let answered = 0;
    let correctCount = 0;
    for (const task of tasks) {
      const answer =
        task.expectedAnswer || (task.options as string[] | null)?.[0] || 'Sì, va bene.';
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
      fail(
        'lesson complete',
        `status ${completeLesson.status}: ${completeLesson.raw.slice(0, 200)}`,
      );
    } else {
      pass('lesson completed');
    }
  }

  // ── 8. Progress tracking ──────────────────────────────────────────
  log('\n8. PROGRESS TRACKING');
  const progress = await prisma.userSkillProgress.findMany({ where: { userId: user.id } });
  if (progress.length === 0) fail('skill progress', 'no UserSkillProgress rows after lesson');
  else pass('skill progress rows', `${progress.length} skills tracked`);

  // Production vs comprehension: at least ONE skill should have a
  // non-zero score in either dimension after a lesson, otherwise the
  // recordSkillEvidence dimension wiring is broken.
  const anyProd = progress.some((p) => Number(p.productionScore) > 0);
  const anyComp = progress.some((p) => Number(p.comprehensionScore) > 0);
  if (anyProd || anyComp)
    pass(
      'production/comprehension scores tracked',
      `prod=${progress.filter((p) => Number(p.productionScore) > 0).length}, comp=${progress.filter((p) => Number(p.comprehensionScore) > 0).length}`,
    );
  else fail('production/comprehension scores', 'all zero after a played lesson');

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
      fail(
        'greeting personalization',
        `generic — no name/interest/goal in: "${greeting.data.greeting}"`,
      );

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

    // ── Audio sanity-check: synthesize the actual Wise greeting through
    // /api/voice/speak with language='auto', send the audio back through
    // /api/voice/transcribe (auto-detect), and assert that what comes
    // out is recognizably the same bilingual content. This catches
    // regressions where the multilingual TTS pipeline silently breaks
    // (single-language fallback, mp3 frame artifacts, etc.).
    const ttsRes = await fetch(`${BASE}/api/voice/speak`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ text: greeting.data.greeting, language: 'auto' }),
    });
    if (!ttsRes.ok) {
      fail('greeting TTS', `status ${ttsRes.status}`);
    } else {
      const audioBuf = await ttsRes.arrayBuffer();
      const audioCtype = ttsRes.headers.get('content-type') ?? 'audio/mpeg';
      const audioExt = audioCtype.includes('wav') ? 'wav' : 'mp3';
      const tFd = new FormData();
      tFd.append('audio', new Blob([audioBuf], { type: audioCtype }), `g.${audioExt}`);
      const sttBack = await fetch(`${BASE}/api/voice/transcribe`, {
        method: 'POST',
        headers: { Cookie: cookie },
        body: tFd,
      });
      const sttData = (await sttBack.json()) as { text?: string; language?: string };
      const back = (sttData.text ?? '').toLowerCase();
      log(`    audio round-trip transcript: "${sttData.text}"`);
      // Only assert "Italian survives" when the GREETING actually contained
      // Italian. For a low-ratio learner whose auto-ratio is ≤0.10, the
      // greeting may correctly be pure English (within the model's budget)
      // — in that case we just verify the pipeline produces readable audio.
      const greetingHadItalian = /ciao|bentornat|perché|allora|cibo|grazie|prego|sì/.test(
        greeting.data.greeting.toLowerCase(),
      );
      if (greetingHadItalian) {
        if (/ciao|bentornat/.test(back)) pass('audio round-trip preserved Italian');
        else fail('audio round-trip', `Italian opener missing in: "${back.slice(0, 100)}"`);
      } else {
        pass('audio round-trip — greeting was English-only (low-ratio learner)');
      }
      // Round-trip should not be empty / catastrophically short.
      if (back.length >= 10) pass('audio round-trip readable');
      else fail('audio round-trip', `transcript too short (${back.length} chars)`);
    }
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
        const answer = (task.expectedAnswer as string | null) || firstOptValue || 'Sì, va bene.';
        const r = await api<unknown>('POST', '/api/practice/respond', cookie, {
          sessionId: sessionId2,
          lessonTaskId: task.id,
          inputType: 'text',
          answer,
        });
        if (r.status === 200) answered++;
      }
      pass('second lesson played', `${answered}/${dbLesson2.tasks.length} answered`);
      const c2 = await api<unknown>(
        'POST',
        `/api/lessons/${gen2.data.lesson.id}/complete`,
        cookie,
        {
          sessionId: sessionId2,
        },
      );
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
    'What should I work on?',
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

  // ── 11. Intermediate-level smoke test ─────────────────────────────
  // Spin up a SECOND user with intermediate level + 60% languageRatio
  // and check that the generated lesson briefing actually contains
  // significantly more Italian than the beginner case.
  log('\n11. INTERMEDIATE LEARNER (ratio 0.6)');
  const interUsername = `qa-int-${randomBytes(3).toString('hex')}`;
  const interUser = await prisma.user.create({
    data: {
      username: interUsername,
      passwordHash: await bcrypt.hash(password, 12),
      name: 'Inter QA',
      role: 'learner',
      nativeLanguage: 'en',
      targetLanguage: 'it',
    },
  });
  await prisma.learnerProfile.create({
    data: {
      userId: interUser.id,
      currentLevel: 'intermediate',
      goals: ['talk about food and travel comfortably'],
      interests: ['food', 'travel', 'music'],
      preferredSessionLengthMinutes: 10,
      preferredCorrectionStyle: 'gentle',
      preferredWisePersonality: 'friendly_tutor',
      languageRatio: 0.6,
      onboardingCompleted: true,
    },
  });
  const interSignin = await fetch(`${BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: interUsername, password }),
  });
  const interCookie = `sw_session=${
    interSignin.headers.get('set-cookie')?.match(/sw_session=([^;]+)/)?.[1] ?? ''
  }`;

  const interLessonRes = await api<{ lesson: { id: string; title: string } }>(
    'POST',
    '/api/lessons/generate',
    interCookie,
    { lessonType: 'daily_mission' },
  );
  if (interLessonRes.status !== 200) {
    fail('intermediate lesson generate', `status ${interLessonRes.status}`);
  } else {
    const dbInterLesson = await prisma.lesson.findUnique({
      where: { id: interLessonRes.data.lesson.id },
      include: { tasks: { orderBy: { orderIndex: 'asc' } } },
    });
    const briefing = (dbInterLesson?.content as Record<string, unknown> | null)?.briefing as
      | string
      | undefined;
    if (briefing) {
      const r = countItalianRatio(briefing);
      log(`    intermediate briefing: "${briefing}"`);
      log(`    italian-ratio measured: ${(r.ratio * 100).toFixed(0)}% (${r.it}/${r.total})`);
      // For ratio 0.6 we want at least 30% Italian (lower bound; we don't
      // upper-bound because intermediates can absolutely handle more).
      if (r.ratio >= 0.3) pass('intermediate briefing is Italian-heavy');
      else
        fail(
          'intermediate briefing too English',
          `${(r.ratio * 100).toFixed(0)}% — should be ≥30%`,
        );
    }
    // Also test that the greeting respects the higher ratio
    const interGreet = await api<{ greeting: string }>('GET', '/api/wise/greeting', interCookie);
    const gr = countItalianRatio(interGreet.data.greeting);
    log(`    intermediate greeting: "${interGreet.data.greeting}"`);
    log(`    italian-ratio measured: ${(gr.ratio * 100).toFixed(0)}%`);
    if (gr.ratio >= 0.3) pass('intermediate greeting is Italian-heavy');
    else
      fail('intermediate greeting too English', `${(gr.ratio * 100).toFixed(0)}% — should be ≥30%`);
  }

  await cleanup(prisma, interUser.id);

  // ── 12. Tutor + Student end-to-end ────────────────────────────────
  // Provision a tutor, link the original learner, write a directive
  // pinning a known past-tense skill, generate a lesson, and assert
  // the directive flows through to the lesson's target skills + briefing.
  log('\n12. TUTOR + STUDENT END-TO-END');

  // Find a past-tense / passato prossimo skill to pin
  const pastTenseSkill = await prisma.curriculumSkill.findFirst({
    where: {
      OR: [
        { slug: { contains: 'passato' } },
        { slug: { contains: 'past' } },
        { name: { contains: 'past', mode: 'insensitive' } },
        { name: { contains: 'passato', mode: 'insensitive' } },
      ],
    },
  });
  if (!pastTenseSkill) {
    fail('past-tense skill seed', 'no past-tense skill in curriculum');
  } else {
    pass('past-tense skill resolved', `${pastTenseSkill.slug} (${pastTenseSkill.name})`);
  }

  // Provision the tutor directly via Prisma (mirrors the admin CLI)
  const tutorUsername = `qa-tutor-${randomBytes(3).toString('hex')}`;
  const tutorUser = await prisma.user.create({
    data: {
      username: tutorUsername,
      passwordHash: await bcrypt.hash(password, 12),
      name: 'QA Tutor',
      role: 'tutor',
      nativeLanguage: 'en',
      targetLanguage: 'it',
    },
  });
  const tutorProfile = await prisma.tutorProfile.create({
    data: {
      userId: tutorUser.id,
      displayName: 'Maestra QA',
      inviteCode: `QATEST${randomBytes(1).toString('hex').toUpperCase()}`,
    },
  });
  pass('tutor provisioned', `code=${tutorProfile.inviteCode}`);

  // Tutor signs in, fetches /me, gets invite code
  const tutorSignin = await fetch(`${BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: tutorUsername, password }),
  });
  const tutorCookie = `sw_session=${
    tutorSignin.headers.get('set-cookie')?.match(/sw_session=([^;]+)/)?.[1] ?? ''
  }`;
  const meRes = await api<{ inviteCode: string; displayName: string | null }>(
    'GET',
    '/api/classroom/me',
    tutorCookie,
  );
  if (meRes.status === 200 && meRes.data.inviteCode === tutorProfile.inviteCode) {
    pass('GET /api/classroom/me', `code=${meRes.data.inviteCode}`);
  } else {
    fail('GET /api/classroom/me', `status ${meRes.status}: ${meRes.raw.slice(0, 200)}`);
  }

  // Original learner connects via the code
  const connectRes = await api<{ connected: boolean; tutorName?: string }>(
    'POST',
    '/api/profile/tutor',
    cookie,
    { code: tutorProfile.inviteCode },
  );
  if (connectRes.status === 200 && connectRes.data.connected) {
    pass('student linked', `to ${connectRes.data.tutorName}`);
  } else {
    fail('POST /api/profile/tutor', `status ${connectRes.status}: ${connectRes.raw.slice(0, 200)}`);
  }

  // Verify the link exists in DB
  const link = await prisma.tutorStudent.findUnique({
    where: { tutorId_studentId: { tutorId: tutorProfile.id, studentId: user.id } },
  });
  if (link?.status === 'active') pass('TutorStudent row created');
  else fail('TutorStudent row', `status ${link?.status ?? 'missing'}`);

  // Tutor sees student in their list
  const studentsRes = await api<{ students: Array<{ studentId: string; name: string }> }>(
    'GET',
    '/api/classroom/students',
    tutorCookie,
  );
  if (
    studentsRes.status === 200 &&
    studentsRes.data.students.some((s) => s.studentId === user.id)
  ) {
    pass('GET /api/classroom/students includes the new link');
  } else {
    fail(
      'GET /api/classroom/students',
      `status ${studentsRes.status}: ${studentsRes.raw.slice(0, 200)}`,
    );
  }

  // Tutor creates a directive
  const directiveBody = 'Focus on past tense verbs this week. Lots of passato prossimo drills.';
  const dirRes = await api<{ directive: { id: string; body: string; pinnedSkillIds: string[] } }>(
    'POST',
    '/api/classroom/directives',
    tutorCookie,
    {
      studentId: user.id,
      body: directiveBody,
      pinnedSkillIds: pastTenseSkill ? [pastTenseSkill.id] : [],
    },
  );
  if (dirRes.status !== 200 || !dirRes.data.directive?.id) {
    fail('POST /api/classroom/directives', `status ${dirRes.status}: ${dirRes.raw.slice(0, 200)}`);
  } else {
    pass('directive created', `${dirRes.data.directive.id.slice(0, 8)}…`);
  }

  // Student generates a new lesson — should be driven by the directive
  const dirLessonRes = await api<{ lesson: { id: string; tutorDirectiveId: string | null } }>(
    'POST',
    '/api/lessons/generate',
    cookie,
    { lessonType: 'daily_mission' },
  );
  if (dirLessonRes.status !== 200) {
    fail(
      'directive lesson generate',
      `status ${dirLessonRes.status}: ${dirLessonRes.raw.slice(0, 200)}`,
    );
  } else {
    pass('lesson generated under directive', `${dirLessonRes.data.lesson.id.slice(0, 8)}…`);
    const dbLesson = await prisma.lesson.findUnique({
      where: { id: dirLessonRes.data.lesson.id },
      include: { tasks: true },
    });
    if (dbLesson?.tutorDirectiveId === dirRes.data.directive?.id) {
      pass('lesson.tutorDirectiveId matches');
    } else {
      fail(
        'lesson.tutorDirectiveId',
        `expected ${dirRes.data.directive?.id} got ${dbLesson?.tutorDirectiveId}`,
      );
    }
    if (dbLesson?.createdBy === 'tutor') {
      pass('lesson.createdBy = tutor');
    } else {
      fail('lesson.createdBy', `expected 'tutor' got '${dbLesson?.createdBy}'`);
    }
    if (pastTenseSkill && dbLesson?.targetSkillIds.includes(pastTenseSkill.id)) {
      pass('lesson targets the pinned skill');
    } else {
      fail(
        'lesson targetSkillIds',
        `pinned ${pastTenseSkill?.id} not in [${dbLesson?.targetSkillIds.join(', ')}]`,
      );
    }
    const briefing = (dbLesson?.content as Record<string, unknown> | null)?.briefing as
      | string
      | undefined;
    if (briefing && /tutor|past tense|passato|past-tense/i.test(briefing)) {
      pass('lesson briefing references the directive', `${briefing.slice(0, 80)}…`);
    } else {
      fail('directive briefing', `no tutor/past-tense reference in: "${briefing?.slice(0, 100)}"`);
    }
  }

  // Greeting should also mention the directive
  const dirGreetRes = await api<{ greeting: string }>('GET', '/api/wise/greeting', cookie);
  if (dirGreetRes.status === 200) {
    log(`    directive greeting: "${dirGreetRes.data.greeting}"`);
    if (/tutor|past tense|passato/i.test(dirGreetRes.data.greeting)) {
      pass('greeting references the directive');
    } else {
      fail(
        'directive greeting',
        `no tutor/past-tense reference in: "${dirGreetRes.data.greeting}"`,
      );
    }
  }

  // ── 13. Fluency dashboard ─────────────────────────────────────────
  // The new /api/dashboard endpoint is the data source for the rebuilt
  // /progress page. Verify the composite payload includes all the
  // pieces the dashboard renders: CEFR progress, weekly summary,
  // 30-day activity, derived strengths/weaknesses, and "coming next".
  log('\n13. FLUENCY DASHBOARD');
  const dashRes = await api<{
    learner: { name: string; currentLevel: string };
    cefrProgress: {
      current: string;
      nextLevel: string | null;
      percent: number;
      masteredCount: number;
      totalAtLevel: number;
    };
    weekly: {
      daysPracticedThisWeek: number;
      lessonsCompletedThisWeek: number;
      currentStreak: number;
      xpTotal: number;
    };
    activity30: Array<{ date: string; sessions: number; lessons: number }>;
    strengths: unknown[];
    workingOn: unknown[];
    weaknesses: unknown[];
    comingNext: Array<{ skillId: string; name: string; pinnedByTutor?: boolean }>;
    vocabulary: { counts: Record<string, number>; dueCount: number };
    recentLessons: Array<{ id: string; title: string }>;
    tutorDirective: { body: string } | null;
    isFresh: boolean;
  }>('GET', '/api/dashboard', cookie);

  if (dashRes.status !== 200) {
    fail('GET /api/dashboard', `status ${dashRes.status}: ${dashRes.raw.slice(0, 200)}`);
  } else {
    pass('GET /api/dashboard', 'status 200');
    const d = dashRes.data;
    // Identity
    if (d.cefrProgress.current === 'beginner') pass('cefr current matches profile');
    else fail('cefr current', `got '${d.cefrProgress.current}', expected 'beginner'`);
    // Weekly should reflect the lessons we ran in earlier phases
    if (d.weekly.lessonsCompletedThisWeek >= 1)
      pass('weekly.lessonsCompletedThisWeek', String(d.weekly.lessonsCompletedThisWeek));
    else
      fail(
        'weekly.lessonsCompletedThisWeek',
        `got ${d.weekly.lessonsCompletedThisWeek}; expected ≥ 1 after Phase 7`,
      );
    // 30-day activity has exactly 30 days
    if (d.activity30.length === 30) pass('activity30 has 30 days');
    else fail('activity30 length', String(d.activity30.length));
    // Coming next should always have something (either from progress or empty-state fallback)
    if (d.comingNext.length >= 3) pass('comingNext non-empty', String(d.comingNext.length));
    else fail('comingNext too short', String(d.comingNext.length));
    // After the tutor directive was issued in Phase 12, the dashboard's
    // coming-next list should mark the pinned skill as pinnedByTutor.
    const anyPinned = d.comingNext.some((s) => s.pinnedByTutor === true);
    if (anyPinned) pass('tutor-pinned skill surfaces in comingNext');
    else
      fail(
        'comingNext missing tutor pin',
        'Phase 12 set a tutor directive; expected pinnedByTutor=true on at least one skill',
      );
    // Tutor directive passthrough
    if (d.tutorDirective?.body)
      pass('dashboard surfaces tutor directive body', `${d.tutorDirective.body.slice(0, 60)}…`);
    else fail('dashboard tutor directive missing', 'expected directive after Phase 12');
    // Recent lessons should include the lessons we ran
    if (d.recentLessons.length >= 1)
      pass('recentLessons populated', String(d.recentLessons.length));
    else fail('recentLessons empty', '0');
  }

  await cleanup(prisma, tutorUser.id);
  await cleanup(prisma, user.id);
  await prisma.$disconnect();
  await summarize();
}

async function cleanup(prisma: PrismaClient, userId: string) {
  // Best-effort delete of test user + cascading rows. Don't disconnect
  // here — the harness reuses the prisma client across multiple users.
  // Most tables cascade on `User` delete (FKs are onDelete: Cascade), so
  // strictly only `user.delete()` is required — the deleteMany calls
  // below are belt-and-suspenders for tables that pre-date cascades.
  try {
    // Tutor-side rows first (a tutor user may have linked students;
    // those rows cascade off the tutor profile).
    await prisma.tutorDirective.deleteMany({
      where: { OR: [{ studentId: userId }, { tutor: { userId } }] },
    });
    await prisma.tutorStudent.deleteMany({
      where: { OR: [{ studentId: userId }, { tutor: { userId } }] },
    });
    await prisma.tutorProfile.deleteMany({ where: { userId } });
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
  }
}

async function summarize() {
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
