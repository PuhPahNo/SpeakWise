/* eslint-disable no-console */
// Longitudinal simulation: ONE beginner across several lessons, answering
// correctly, to watch the learning loop actually move — mastery climbing,
// status transitions, spaced-review scheduling, regression on a wrong answer,
// and due skills resurfacing as targets in a later lesson.
//
// Run: node --experimental-strip-types --env-file=.env scripts/qa-longitudinal.ts

import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const BASE = process.env.APP_URL ?? 'http://localhost:3001';
const prisma = new PrismaClient();

// Skills we pin every lesson so the SAME skills recur and their mastery climbs.
const PINNED = ['it-avere-present', 'it-essere-present', 'it-noun-gender'];
const LESSONS = 5;

async function api<T = Record<string, unknown>>(
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
    /* leave undefined */
  }
  return { status: res.status, data, raw };
}

const ANSWERABLE = new Set([
  'multiple_choice',
  'fill_blank',
  'translation',
  'conjugation',
  'tense_selection',
  'pronoun_replacement',
  'error_correction',
  'speaking_prompt',
  'roleplay',
  'listening_comprehension',
]);

const expDisplay = (e: unknown): string => {
  if (e == null) return '';
  if (typeof e === 'string') return e;
  if (typeof e === 'object')
    return String((e as Record<string, unknown>).value ?? JSON.stringify(e));
  return String(e);
};

const firstOpt = (options: unknown): string => {
  if (!Array.isArray(options)) return '';
  const o = options[0];
  return typeof o === 'string' ? o : String((o as Record<string, unknown>)?.value ?? '');
};

async function snapshot(userId: string, skillIdBySlug: Map<string, string>) {
  const rows = await prisma.userSkillProgress.findMany({
    where: { userId, skillId: { in: [...skillIdBySlug.values()] } },
  });
  const bySkill = new Map(rows.map((r) => [r.skillId, r]));
  const out: Record<string, string> = {};
  for (const [slug, id] of skillIdBySlug) {
    const r = bySkill.get(id);
    out[slug] = r
      ? `${r.status.padEnd(11)} m=${Number(r.masteryScore).toFixed(2)} c=${Number(r.comprehensionScore).toFixed(2)} p=${Number(r.productionScore).toFixed(2)} next=${r.nextReviewAt ? daysFromNow(r.nextReviewAt) : '—'}`
      : '(not started)';
  }
  return out;
}

function daysFromNow(d: Date): string {
  const days = Math.round((d.getTime() - Date.now()) / (24 * 3600 * 1000));
  return days <= 0 ? `${days}d (due)` : `+${days}d`;
}

async function run() {
  console.log(`\n=== SpeakWise longitudinal simulation (${LESSONS} lessons) ===\nbase: ${BASE}\n`);

  // ── learner ──
  const username = `qa-${randomBytes(4).toString('hex')}`;
  const password = 'qa-test-pw-1234';
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 12),
      name: 'QA Longitudinal',
      role: 'learner',
    },
  });
  await prisma.learnerProfile.create({
    data: {
      userId: user.id,
      currentLevel: 'beginner',
      onboardingCompleted: true,
      interests: ['food', 'travel'],
      goals: ['travel to Italy'],
      languageRatio: 0.2,
    },
  });
  const signin = await fetch(`${BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const cookie = `sw_session=${signin.headers.get('set-cookie')?.match(/sw_session=([^;]+)/)?.[1]}`;

  const skills = await prisma.curriculumSkill.findMany({
    where: { slug: { in: PINNED } },
    select: { id: true, slug: true, name: true },
  });
  const idBySlug = new Map(skills.map((s) => [s.slug, s.id]));
  const pinnedIds = PINNED.map((s) => idBySlug.get(s)).filter(Boolean) as string[];
  console.log(`Learner: beginner, pinned skills: ${skills.map((s) => s.name).join(', ')}\n`);

  // ── lessons ──
  for (let n = 1; n <= LESSONS; n++) {
    const gen = await api<{ lesson: { id: string }; tasks: any[] }>(
      'POST',
      '/api/lessons/generate',
      cookie,
      { lessonType: 'daily_mission', targetSkillIds: pinnedIds, interestTheme: 'food' },
    );
    if (gen.status !== 200) {
      console.error(`  lesson ${n} generate failed`, gen.status, gen.raw.slice(0, 160));
      continue;
    }
    const start = await api<{ session: { id: string } }>(
      'POST',
      `/api/lessons/${gen.data.lesson.id}/start`,
      cookie,
      { mode: 'text' },
    );
    const sessionId = start.data.session.id;

    let answered = 0;
    let correct = 0;
    for (const [i, t] of gen.data.tasks.entries()) {
      if (!ANSWERABLE.has(t.taskType)) continue;
      // Lesson 3: deliberately blow ONE answer to show regression handling.
      const sabotage =
        n === 3 && i === gen.data.tasks.findIndex((x: any) => ANSWERABLE.has(x.taskType));
      const ans = sabotage
        ? 'totally wrong answer'
        : expDisplay(t.expectedAnswer) || firstOpt(t.options) || 'Sì, va bene.';
      const r = await api<{ userResponse: { isCorrect: boolean | null } }>(
        'POST',
        '/api/practice/respond',
        cookie,
        {
          sessionId,
          lessonTaskId: t.id,
          inputType: t.taskType === 'multiple_choice' ? 'multiple_choice' : 'text',
          answer: ans,
        },
      );
      answered++;
      if (r.data.userResponse?.isCorrect) correct++;
    }
    await api('POST', `/api/lessons/${gen.data.lesson.id}/complete`, cookie, { sessionId });

    const snap = await snapshot(user.id, idBySlug);
    console.log(
      `Lesson ${n}: ${answered} answered, ${correct} correct${n === 3 ? ' (1 deliberate miss)' : ''}`,
    );
    for (const slug of PINNED) console.log(`   ${slug.padEnd(22)} ${snap[slug]}`);
    console.log('');
  }

  // ── review resurfacing ──
  console.log('■ REVIEW RESURFACING');
  console.log(
    '  Backdating the pinned skills’ nextReviewAt to yesterday (simulating time passing)…',
  );
  await prisma.userSkillProgress.updateMany({
    where: { userId: user.id, skillId: { in: pinnedIds } },
    data: { nextReviewAt: new Date(Date.now() - 24 * 3600 * 1000) },
  });
  const due = await prisma.userSkillProgress.findMany({
    where: { userId: user.id, nextReviewAt: { lte: new Date() } },
    include: { skill: { select: { slug: true, name: true } } },
  });
  console.log(`  Skills now due for review: ${due.map((d) => d.skill.slug).join(', ')}`);
  // Generate WITHOUT pinning — the engine should pull the due skills back in.
  const reviewLesson = await api<{ lesson: { id: string; targetSkillIds: string[] } }>(
    'POST',
    '/api/lessons/generate',
    cookie,
    { lessonType: 'daily_mission', interestTheme: 'food' },
  );
  const targeted = reviewLesson.data.lesson?.targetSkillIds ?? [];
  const resurfaced = due.filter((d) => targeted.includes(d.skillId)).map((d) => d.skill.slug);
  console.log(
    `  Next lesson (no pin) targeted ${targeted.length} skills; due skills that resurfaced: ${resurfaced.length ? resurfaced.join(', ') : 'none'}`,
  );

  // ── trajectory summary ──
  console.log('\n■ FINAL MASTERY (after time-passing reset above, mastery values persist)');
  const finalSnap = await snapshot(user.id, idBySlug);
  for (const slug of PINNED) console.log(`   ${slug.padEnd(22)} ${finalSnap[slug]}`);

  await prisma.user.delete({ where: { id: user.id } }).catch(() => {});
  await prisma.$disconnect();
  console.log('\n=== done (test user cleaned up) ===');
}

run().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
