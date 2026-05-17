// Fluency dashboard — the single composite read used by the new
// /progress page. Everything here is derived from existing data; no
// new AI calls happen in this layer. The expensive pieces (Wise's
// weekly narrative) stay on /api/progress/report and are fetched
// separately by the page client-side.
import { type CEFRLevel, prisma } from '@speakwise/db';
import { getActiveDirectiveForStudent } from '../classroom';
import { getActiveSkills, getSkillsDueForReview } from '../curriculum';
import { listLessons } from '../lesson';
import { listVocabulary } from '../vocabulary';

// CEFR level order — used to compute "next level" for progression bars.
const CEFR_ORDER: CEFRLevel[] = [
  'complete_beginner',
  'beginner',
  'lower_intermediate',
  'intermediate',
  'upper_intermediate',
  'advanced',
];

const MASTERY_THRESHOLD = 0.85;

export interface CefrProgress {
  current: CEFRLevel;
  nextLevel: CEFRLevel | null;
  /** 0–1 share of current-level skills mastered. */
  percent: number;
  masteredCount: number;
  totalAtLevel: number;
}

export interface ActivityDay {
  /** ISO date string `YYYY-MM-DD` in the server's timezone. */
  date: string;
  sessions: number;
  lessons: number;
}

export interface DashboardSkillCard {
  skillId: string;
  slug: string;
  name: string;
  level: CEFRLevel;
  category: string;
  status: string;
  masteryScore: number;
  productionScore: number;
  comprehensionScore: number;
  lastPracticedAt: Date | null;
  nextReviewAt: Date | null;
  /** Set when this skill is pinned by the user's tutor directive. */
  pinnedByTutor?: boolean;
}

export interface DashboardData {
  learner: {
    name: string;
    currentLevel: CEFRLevel;
    languageRatio: number;
    immersionMode: boolean;
  };
  cefrProgress: CefrProgress;
  weekly: {
    daysPracticedThisWeek: number;
    lessonsCompletedThisWeek: number;
    currentStreak: number;
    longestStreak: number;
    xpTotal: number;
  };
  activity30: ActivityDay[];
  strengths: DashboardSkillCard[];
  workingOn: DashboardSkillCard[];
  weaknesses: DashboardSkillCard[];
  comingNext: DashboardSkillCard[];
  vocabulary: {
    counts: Record<string, number>;
    dueCount: number;
    topDue: Array<{ id: string; targetText: string; nativeText: string }>;
  };
  recentLessons: Array<{
    id: string;
    title: string;
    lessonType: string;
    status: string;
    interestTheme: string | null;
    estimatedDurationMinutes: number | null;
    createdAt: Date;
    completedAt: Date | null;
  }>;
  tutorDirective: { body: string; pinnedSkills: Array<{ slug: string; name: string }> } | null;
  /** True when there's effectively no data — page can render a friendlier onboarding empty state. */
  isFresh: boolean;
}

function isoDay(d: Date): string {
  // YYYY-MM-DD in local server timezone
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function startOfWeek(now: Date): Date {
  // Monday as the start of the week — matches "this week" in tracking
  // contexts most users have in their head.
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay(); // 0=Sun
  const diff = (dow + 6) % 7; // days since Monday
  d.setDate(d.getDate() - diff);
  return d;
}

/**
 * Composite dashboard fetch. Designed to be a single API call from the
 * page. Roughly N+5 Prisma queries — all on indexed columns; safe to
 * call on every dashboard render.
 */
export async function getFluencyDashboard(userId: string): Promise<DashboardData> {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    user,
    profile,
    allSkillsAtCurrentLevel,
    allProgress,
    completedSessions30,
    completedLessons30,
    streak,
    xpEntries,
    vocabCounts,
    dueVocab,
    recentMistakeResponses,
    recentLessons,
    directive,
    activeSkills,
    dueSkills,
  ] = await Promise.all([
    prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true },
    }),
    prisma.learnerProfile.findUniqueOrThrow({ where: { userId } }),
    prisma.curriculumSkill.findMany({
      where: { isActive: true },
      select: { id: true, slug: true, name: true, level: true, category: true },
    }),
    prisma.userSkillProgress.findMany({
      where: { userId },
      include: { skill: true },
    }),
    prisma.session.findMany({
      where: { userId, status: 'completed', completedAt: { gte: monthAgo } },
      select: { id: true, completedAt: true, lessonId: true },
      orderBy: { completedAt: 'desc' },
    }),
    prisma.lesson.findMany({
      where: { userId, status: 'completed', completedAt: { gte: monthAgo } },
      select: { id: true, completedAt: true },
    }),
    prisma.userStreak.findUnique({ where: { userId } }),
    prisma.xpEntry.findMany({ where: { userId }, select: { amount: true } }),
    prisma.vocabularyItem.groupBy({
      by: ['status'],
      where: { userId },
      _count: { _all: true },
    }),
    listVocabulary(userId, { dueForReview: true }),
    prisma.userResponse.findMany({
      where: { session: { userId }, isCorrect: false },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { skillIds: true, createdAt: true },
    }),
    listLessons(userId, { limit: 8 }),
    getActiveDirectiveForStudent(userId),
    getActiveSkills(userId),
    getSkillsDueForReview(userId, 5),
  ]);

  // ── CEFR progress ─────────────────────────────────────────────────
  const currentLevel = profile.currentLevel as CEFRLevel;
  const skillsAtLevel = allSkillsAtCurrentLevel.filter((s) => s.level === currentLevel);
  const progressByLevel = allProgress.filter((p) => p.skill.level === currentLevel);
  const masteredAtLevel = progressByLevel.filter(
    (p) => Number(p.masteryScore) >= MASTERY_THRESHOLD,
  ).length;
  const totalAtLevel = skillsAtLevel.length;
  const cefrProgress: CefrProgress = {
    current: currentLevel,
    nextLevel:
      CEFR_ORDER[CEFR_ORDER.indexOf(currentLevel) + 1] ?? null,
    percent: totalAtLevel > 0 ? masteredAtLevel / totalAtLevel : 0,
    masteredCount: masteredAtLevel,
    totalAtLevel,
  };

  // ── Weekly summary ────────────────────────────────────────────────
  const sessionsThisWeek = completedSessions30.filter(
    (s) => s.completedAt && s.completedAt >= weekStart,
  );
  const daysPracticedThisWeek = new Set(
    sessionsThisWeek.map((s) => (s.completedAt ? isoDay(s.completedAt) : '')).filter(Boolean),
  ).size;
  const lessonsCompletedThisWeek = completedLessons30.filter(
    (l) => l.completedAt && l.completedAt >= weekStart,
  ).length;
  const xpTotal = xpEntries.reduce((sum, e) => sum + e.amount, 0);

  // ── 30-day activity heatmap ───────────────────────────────────────
  // Bucket sessions/lessons by ISO day. Pad missing days with zeros so
  // the client can render a stable 30-cell grid without holes.
  const sessionsByDay = new Map<string, number>();
  const lessonsByDay = new Map<string, number>();
  for (const s of completedSessions30) {
    if (!s.completedAt) continue;
    const k = isoDay(s.completedAt);
    sessionsByDay.set(k, (sessionsByDay.get(k) ?? 0) + 1);
  }
  for (const l of completedLessons30) {
    if (!l.completedAt) continue;
    const k = isoDay(l.completedAt);
    lessonsByDay.set(k, (lessonsByDay.get(k) ?? 0) + 1);
  }
  const activity30: ActivityDay[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const k = isoDay(d);
    activity30.push({
      date: k,
      sessions: sessionsByDay.get(k) ?? 0,
      lessons: lessonsByDay.get(k) ?? 0,
    });
  }

  // ── Skill cards (strengths / working / weaknesses) ───────────────
  const mistakeSkillCounts = new Map<string, number>();
  for (const r of recentMistakeResponses) {
    for (const id of r.skillIds) {
      mistakeSkillCounts.set(id, (mistakeSkillCounts.get(id) ?? 0) + 1);
    }
  }
  const toCard = (p: (typeof allProgress)[number]): DashboardSkillCard => ({
    skillId: p.skillId,
    slug: p.skill.slug,
    name: p.skill.name,
    level: p.skill.level,
    category: p.skill.category,
    status: p.status,
    masteryScore: Number(p.masteryScore),
    productionScore: Number(p.productionScore),
    comprehensionScore: Number(p.comprehensionScore),
    lastPracticedAt: p.lastPracticedAt,
    nextReviewAt: p.nextReviewAt,
  });

  const strengths = [...allProgress]
    .filter((p) => Number(p.masteryScore) >= 0.7 && p.exposureCount >= 2)
    .sort((a, b) => {
      const ma = Number(a.masteryScore);
      const mb = Number(b.masteryScore);
      if (ma !== mb) return mb - ma;
      return (b.lastPracticedAt?.getTime() ?? 0) - (a.lastPracticedAt?.getTime() ?? 0);
    })
    .slice(0, 3)
    .map(toCard);

  const workingOn = [...allProgress]
    .filter((p) => p.status === 'practicing' || p.status === 'introduced')
    .sort((a, b) => (b.updatedAt.getTime() ?? 0) - (a.updatedAt.getTime() ?? 0))
    .slice(0, 5)
    .map(toCard);

  const weaknesses = [...allProgress]
    .filter((p) => {
      const score = Number(p.masteryScore);
      const recentMistakes = mistakeSkillCounts.get(p.skillId) ?? 0;
      return (score < 0.4 && p.exposureCount >= 2) || recentMistakes >= 2;
    })
    .sort((a, b) => {
      const ra = mistakeSkillCounts.get(a.skillId) ?? 0;
      const rb = mistakeSkillCounts.get(b.skillId) ?? 0;
      if (ra !== rb) return rb - ra;
      return Number(a.masteryScore) - Number(b.masteryScore);
    })
    .slice(0, 3)
    .map(toCard);

  // ── "Coming next" — uses the SAME picker the lesson generator does ─
  // 1. If a tutor directive has pinned skills, those are surfaced (top of list).
  // 2. Otherwise: skills due for review + active skills, deduped.
  const pinnedSet = new Set(directive?.pinnedSkillIds ?? []);
  const comingMap = new Map<string, DashboardSkillCard>();
  const skillById = new Map(allProgress.map((p) => [p.skillId, p]));
  // Pinned skills first — fetch fresh if not in progress yet
  if (pinnedSet.size > 0) {
    const pinned = await prisma.curriculumSkill.findMany({
      where: { id: { in: [...pinnedSet] } },
    });
    for (const s of pinned) {
      const existing = skillById.get(s.id);
      comingMap.set(s.id, {
        skillId: s.id,
        slug: s.slug,
        name: s.name,
        level: s.level,
        category: s.category,
        status: existing?.status ?? 'not_started',
        masteryScore: existing ? Number(existing.masteryScore) : 0,
        productionScore: existing ? Number(existing.productionScore) : 0,
        comprehensionScore: existing ? Number(existing.comprehensionScore) : 0,
        lastPracticedAt: existing?.lastPracticedAt ?? null,
        nextReviewAt: existing?.nextReviewAt ?? null,
        pinnedByTutor: true,
      });
    }
  }
  // Then due-for-review skills
  for (const d of dueSkills) {
    if (comingMap.size >= 7) break;
    if (comingMap.has(d.skillId)) continue;
    comingMap.set(d.skillId, toCard(d as (typeof allProgress)[number]));
  }
  // Then active skills (in-progress)
  for (const s of activeSkills) {
    if (comingMap.size >= 7) break;
    const existing = skillById.get(s.id);
    if (!existing || comingMap.has(s.id)) continue;
    comingMap.set(s.id, toCard(existing));
  }
  // Empty-state fallback: if nothing matched and the learner has zero
  // progress, surface introductory skills at their level.
  if (comingMap.size === 0) {
    const intro = skillsAtLevel.slice(0, 5);
    for (const s of intro) {
      comingMap.set(s.id, {
        skillId: s.id,
        slug: s.slug,
        name: s.name,
        level: s.level,
        category: s.category,
        status: 'not_started',
        masteryScore: 0,
        productionScore: 0,
        comprehensionScore: 0,
        lastPracticedAt: null,
        nextReviewAt: null,
      });
    }
  }
  const comingNext = [...comingMap.values()].slice(0, 7);

  // ── Vocabulary snapshot ───────────────────────────────────────────
  const vocabCountsMap: Record<string, number> = {};
  for (const v of vocabCounts) vocabCountsMap[v.status] = v._count._all;

  // ── isFresh: brand-new account heuristic ─────────────────────────
  const isFresh =
    allProgress.length === 0 &&
    completedSessions30.length === 0 &&
    completedLessons30.length === 0;

  // ── Compute current effective languageRatio (matches profile svc) ─
  // We don't reimport from profile to keep this service standalone;
  // the page passes the value through anyway via SSR.
  const ratio = Number(profile.languageRatio ?? 0.1);

  return {
    learner: {
      name: user.name,
      currentLevel,
      languageRatio: ratio,
      immersionMode: profile.immersionMode,
    },
    cefrProgress,
    weekly: {
      daysPracticedThisWeek,
      lessonsCompletedThisWeek,
      currentStreak: streak?.currentDays ?? 0,
      longestStreak: streak?.longestDays ?? 0,
      xpTotal,
    },
    activity30,
    strengths,
    workingOn,
    weaknesses,
    comingNext,
    vocabulary: {
      counts: vocabCountsMap,
      dueCount: dueVocab.length,
      topDue: dueVocab.slice(0, 5).map((v) => ({
        id: v.id,
        targetText: v.targetText,
        nativeText: v.nativeText,
      })),
    },
    recentLessons: recentLessons.slice(0, 5).map((l) => ({
      id: l.id,
      title: l.title,
      lessonType: l.lessonType,
      status: l.status,
      interestTheme: l.interestTheme,
      estimatedDurationMinutes: l.estimatedDurationMinutes,
      createdAt: l.createdAt,
      completedAt: l.completedAt,
    })),
    tutorDirective: directive
      ? {
          body: directive.body,
          pinnedSkills: directive.pinnedSkills.map((s) => ({ slug: s.slug, name: s.name })),
        }
      : null,
    isFresh,
  };
}
