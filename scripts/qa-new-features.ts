/* eslint-disable no-console */
// Focused end-to-end driver for the three "trust + support" features:
//   Gap 3 — deterministic grader (objective tasks)
//   Gap 4 — Ask Wise mid-lesson "why?" explanations
//   Gap 2 — pronunciation feedback on voice answers
// plus a look at advanced-learner content quality.
//
// Run: node --experimental-strip-types --env-file=.env scripts/qa-new-features.ts

import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const BASE = process.env.APP_URL ?? 'http://localhost:3001';
const prisma = new PrismaClient();

async function api<T = any>(
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
  let data: any;
  try {
    data = raw ? JSON.parse(raw) : undefined;
  } catch {
    data = raw;
  }
  return { status: res.status, data, raw };
}

async function setupLearner(opts: {
  level: string;
  ratio: number;
  interests: string[];
  goals: string[];
}) {
  const username = `qa-${randomBytes(4).toString('hex')}`;
  const password = 'qa-test-pw-1234';
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { username, passwordHash, name: `QA ${username}`, role: 'learner' },
  });
  await prisma.learnerProfile.create({
    data: {
      userId: user.id,
      currentLevel: opts.level as any,
      onboardingCompleted: true,
      interests: opts.interests,
      goals: opts.goals,
      languageRatio: opts.ratio as any,
      languageRatioOverridden: true,
    },
  });
  const signin = await fetch(`${BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const cookie = `sw_session=${signin.headers.get('set-cookie')?.match(/sw_session=([^;]+)/)?.[1]}`;
  return { user, cookie };
}

const optValues = (options: any): string[] =>
  Array.isArray(options)
    ? options.map((o) => (typeof o === 'string' ? o : (o?.value ?? ''))).filter(Boolean)
    : [];

const expDisplay = (e: any): string =>
  e == null
    ? ''
    : typeof e === 'string'
      ? e
      : typeof e === 'object'
        ? (e.value ?? JSON.stringify(e))
        : String(e);

async function run() {
  console.log(`\n=== SpeakWise new-feature validation ===\nbase: ${BASE}\n`);
  const created: string[] = [];

  // ─────────────────────────────────────────────────────────────────────
  // BEGINNER
  // ─────────────────────────────────────────────────────────────────────
  const beg = await setupLearner({
    level: 'beginner',
    ratio: 0.15,
    interests: ['food', 'travel'],
    goals: ['travel to Italy'],
  });
  created.push(beg.user.id);
  console.log('— Beginner learner created (interests: food, travel)\n');

  // A grammar lesson reliably yields objective tasks (MC / fill_blank).
  const gen = await api('POST', '/api/lessons/generate', beg.cookie, {
    lessonType: 'grammar',
    interestTheme: 'food',
  });
  if (gen.status !== 200) {
    console.error('lesson generate failed', gen.status, gen.raw.slice(0, 300));
    return finish(created);
  }
  const lesson = gen.data.lesson;
  const tasks = gen.data.tasks as any[];
  console.log(`LESSON: "${lesson.title}"`);
  console.log(`Briefing: ${(lesson.content?.briefing ?? '').slice(0, 220)}\n`);
  console.log('Tasks generated:');
  for (const t of tasks) {
    console.log(
      `  - ${t.taskType}: "${t.prompt.slice(0, 70)}"${t.expectedAnswer != null ? `  [expected: ${expDisplay(t.expectedAnswer)}]` : ''}`,
    );
  }

  const session = await api('POST', `/api/lessons/${lesson.id}/start`, beg.cookie, {
    mode: 'text',
  });
  const sessionId = session.data.session.id;

  // ── GAP 3: deterministic grader ──────────────────────────────────────
  console.log('\n■ GAP 3 — deterministic grader (objective tasks)');
  const mc = tasks.find((t) => t.taskType === 'multiple_choice' && t.expectedAnswer != null);
  const fb = tasks.find((t) => t.taskType === 'fill_blank' && t.expectedAnswer != null);

  if (mc) {
    const correctVal = expDisplay(mc.expectedAnswer);
    const r = await api('POST', '/api/practice/respond', beg.cookie, {
      sessionId,
      lessonTaskId: mc.id,
      inputType: 'multiple_choice',
      answer: correctVal,
    });
    console.log(
      `  MC, submitted the CORRECT option "${correctVal}" → isCorrect=${r.data.userResponse?.isCorrect}  (expect true)`,
    );
    // a wrong option on the same task
    const wrong = optValues(mc.options).find((v) => v !== correctVal) ?? 'definitely-wrong';
    const r2 = await api('POST', '/api/practice/respond', beg.cookie, {
      sessionId,
      lessonTaskId: mc.id,
      inputType: 'multiple_choice',
      answer: wrong,
    });
    console.log(
      `  MC, submitted a WRONG option "${wrong}" → isCorrect=${r2.data.userResponse?.isCorrect}  (expect false)`,
    );
  } else {
    console.log('  (no multiple_choice task in this lesson)');
  }
  if (fb) {
    const correctVal = expDisplay(fb.expectedAnswer);
    const r = await api('POST', '/api/practice/respond', beg.cookie, {
      sessionId,
      lessonTaskId: fb.id,
      inputType: 'text',
      answer: correctVal,
    });
    console.log(
      `  fill_blank, submitted the exact answer "${correctVal}" → isCorrect=${r.data.userResponse?.isCorrect}  (expect true)`,
    );
  }

  // ── GAP 4: Ask Wise "why is this wrong?" ─────────────────────────────
  console.log('\n■ GAP 4 — Ask Wise mid-lesson explanation');
  const askTask =
    tasks.find((t) => ['fill_blank', 'translation', 'conjugation'].includes(t.taskType)) ??
    tasks[1];
  const wrongAns = 'ho andato'; // a classic beginner mistake to ask about
  const wr = await api('POST', '/api/practice/respond', beg.cookie, {
    sessionId,
    lessonTaskId: askTask.id,
    inputType: 'text',
    answer: wrongAns,
  });
  console.log(`  Task: "${askTask.prompt.slice(0, 70)}"`);
  console.log(`  Learner answered: "${wrongAns}" → isCorrect=${wr.data.userResponse?.isCorrect}`);
  console.log(`  Correction: ${String(wr.data.correction?.explanation ?? '').slice(0, 160)}`);
  const ask = await api('POST', '/api/wise/explain', beg.cookie, {
    question: 'Why is my answer wrong? Explain it simply.',
    context: {
      lessonId: lesson.id,
      lessonTaskId: askTask.id,
      userResponseId: wr.data.userResponse?.id,
    },
  });
  console.log(`  → Ask Wise status ${ask.status}`);
  console.log(`  → Wise explains: ${ask.data.explanation ?? ask.raw.slice(0, 200)}`);
  if (ask.data.keyPoint) console.log(`  → Key point: ${ask.data.keyPoint}`);

  // ── GAP 2: pronunciation feedback on a voice answer ──────────────────
  console.log('\n■ GAP 2 — pronunciation feedback (voice answers on speaking tasks)');
  const speak = await api('POST', '/api/lessons/generate', beg.cookie, {
    lessonType: 'speaking_challenge',
    interestTheme: 'food',
  });
  const speakTasks = speak.data.tasks as any[];
  const speakSession = await api('POST', `/api/lessons/${speak.data.lesson.id}/start`, beg.cookie, {
    mode: 'voice',
  });
  const spk = speakTasks.find((t) =>
    ['speaking_prompt', 'translation', 'roleplay'].includes(t.taskType),
  );
  if (spk) {
    const target = expDisplay(spk.expectedAnswer) || 'Vorrei un caffè, per favore.';
    console.log(`  Speaking task: "${spk.prompt.slice(0, 70)}"  [target: ${target}]`);
    // (a) a clean attempt (transcript == target)
    const clean = await api('POST', '/api/practice/respond', beg.cookie, {
      sessionId: speakSession.data.session.id,
      lessonTaskId: spk.id,
      inputType: 'voice',
      answer: target,
    });
    const p1 = clean.data.pronunciation;
    console.log(
      `  (a) clean attempt → pronunciation: ${p1 ? `soundsGood=${p1.soundsGood}, clarity=${p1.clarityScore}, tip="${p1.tip}"` : 'none'}`,
    );
    if (p1?.issues?.length)
      for (const i of p1.issues) console.log(`        · ${i.sound} — ${i.note}`);
  } else {
    console.log('  (no speaking task generated)');
  }

  // ─────────────────────────────────────────────────────────────────────
  // ADVANCED — content quality
  // ─────────────────────────────────────────────────────────────────────
  console.log('\n■ ADVANCED learner — content quality');
  const adv = await setupLearner({
    level: 'advanced',
    ratio: 0.85,
    interests: ['politics', 'art'],
    goals: ['discuss current events fluently'],
  });
  created.push(adv.user.id);
  const congiuntivo = await prisma.curriculumSkill.findUnique({
    where: { slug: 'it-congiuntivo-presente' },
    select: { id: true, name: true },
  });
  const advGen = await api('POST', '/api/lessons/generate', adv.cookie, {
    lessonType: 'grammar',
    targetSkillIds: congiuntivo ? [congiuntivo.id] : undefined,
    interestTheme: 'politics',
  });
  if (advGen.status === 200) {
    console.log(`  Target skill: ${congiuntivo?.name}`);
    console.log(`  LESSON: "${advGen.data.lesson.title}"`);
    console.log(`  Briefing: ${(advGen.data.lesson.content?.briefing ?? '').slice(0, 260)}`);
    console.log('  Tasks:');
    for (const t of (advGen.data.tasks as any[]).slice(0, 6)) {
      console.log(
        `    - ${t.taskType}: "${t.prompt.slice(0, 90)}"${t.expectedAnswer != null ? `  [→ ${expDisplay(t.expectedAnswer)}]` : ''}`,
      );
    }
  } else {
    console.log('  advanced generate failed', advGen.status, advGen.raw.slice(0, 200));
  }

  await finish(created);
}

async function finish(userIds: string[]) {
  for (const id of userIds) {
    await prisma.user.delete({ where: { id } }).catch(() => {});
  }
  await prisma.$disconnect();
  console.log('\n=== done (test users cleaned up) ===');
}

run().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
