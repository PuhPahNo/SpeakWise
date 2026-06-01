import { getOrCreateUser } from '@/lib/auth/current-user';
import { getCourseProgress } from '@/server/services/curriculum';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const LEVEL_LABEL: Record<string, string> = {
  complete_beginner: 'Complete beginner · A1',
  beginner: 'Beginner · A1–A2',
  lower_intermediate: 'Lower intermediate · A2',
  intermediate: 'Intermediate · B1',
  upper_intermediate: 'Upper intermediate · B1–B2',
  advanced: 'Advanced · B2–C1',
};

const THEME_EMOJI: Record<string, string> = {
  travel: '✈️',
  food: '🍝',
  family: '👪',
  sports: '⚽',
  music: '🎵',
  film: '🎬',
  art: '🎨',
  history: '🏛️',
  politics: '🏛️',
  business: '💼',
  news: '📰',
  culture: '🇮🇹',
};

export default async function CoursePage() {
  const user = await getOrCreateUser();
  const units = await getCourseProgress(user.id);

  const totalSkills = units.reduce((n, u) => n + u.total, 0);
  const masteredSkills = units.reduce((n, u) => n + u.mastered, 0);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-6 sm:py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-ink-300">Il corso</p>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-50 mt-1">The Italian course</h1>
        <p className="text-ink-200 mt-2 text-[15px] leading-relaxed">
          Twenty chapters from first hello to fluent conversation — greetings and sounds all the way
          to the subjunctive. Every chapter feeds Wise the skills behind your lessons, themed to
          what you care about.
        </p>
        <p className="text-ink-300 text-sm mt-3">
          {masteredSkills} of {totalSkills} skills mastered
        </p>
      </header>

      <ol className="space-y-3">
        {units.map((u) => {
          const pct = u.total > 0 ? Math.round((u.mastered / u.total) * 100) : 0;
          const startedPct = u.total > 0 ? Math.round((u.started / u.total) * 100) : 0;
          return (
            <li key={u.code}>
              <Link
                href={`/course/${u.code}`}
                className="block rounded-2xl border hairline bg-ink-800/50 p-4 transition hover:bg-ink-800/80"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 grid place-items-center h-10 w-10 rounded-full bg-ink-900/60 text-base">
                    <span aria-hidden="true">{THEME_EMOJI[u.theme] ?? '🇮🇹'}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-ink-400 tabular-nums">
                        {u.code === 'appendix' ? 'App.' : `Cap. ${u.order}`}
                      </span>
                      <h2 className="font-display text-lg text-ink-50 truncate">{u.title}</h2>
                    </div>
                    {u.subtitle ? (
                      <p className="text-sm text-ink-300 truncate">{u.subtitle}</p>
                    ) : null}
                    <p className="text-[13px] text-ink-400 mt-0.5">
                      {LEVEL_LABEL[u.level] ?? u.level}
                    </p>
                    {/* progress: a filled bar for mastered, a fainter one for started */}
                    <div className="mt-2 h-1.5 w-full rounded-full bg-ink-900/70 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-wise-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-ink-400 mt-1">
                      {u.mastered}/{u.total} mastered
                      {u.started > u.mastered ? ` · ${u.started}/${u.total} started` : ''}
                      {startedPct === 0 ? ' · not started yet' : ''}
                    </p>
                  </div>
                  <span aria-hidden="true" className="text-ink-400 self-center">
                    ›
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
