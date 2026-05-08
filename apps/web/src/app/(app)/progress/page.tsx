import { ProgressNarrative } from '@/components/progress/progress-narrative';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { getGamificationSummary } from '@/server/services/gamification';
import { getDashboard } from '@/server/services/progress';

export default async function ProgressPage() {
  const user = await getOrCreateUser();
  const [dashboard, gam] = await Promise.all([
    getDashboard(user.id),
    getGamificationSummary(user.id),
  ]);

  const vocabLearning = dashboard.vocabularyCounts.learning ?? 0;
  const vocabReview = dashboard.vocabularyCounts.review ?? 0;
  const vocabMastered = dashboard.vocabularyCounts.mastered ?? 0;
  const vocabTotal = vocabLearning + vocabReview + vocabMastered;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-50">Your progress</h1>
        <p className="text-sm text-ink-200 mt-1">The trail Wise is keeping for you.</p>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <Stat label="Streak" value={`${gam.streakDays}d`} sub={`best ${gam.longestStreakDays}d`} />
        <Stat label="XP" value={gam.xpTotal.toLocaleString()} />
        <Stat label="Skills active" value={dashboard.skills.length.toString()} />
        <Stat label="Vocab mastered" value={`${vocabMastered}/${vocabTotal}`} />
      </div>

      {/* Wise-narrated weekly report */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-display text-lg sm:text-xl text-ink-50">This week, with Wise</h2>
        </div>
        <ProgressNarrative />
      </section>

      {/* Skill graph */}
      <section>
        <h2 className="font-display text-lg sm:text-xl text-ink-50 mb-4">Skill graph</h2>
        {dashboard.skills.length === 0 ? (
          <p className="text-ink-200 text-sm">Complete a lesson to start tracking skills.</p>
        ) : (
          <ul className="space-y-2">
            {dashboard.skills.map((s) => (
              <li
                key={s.slug}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 sm:py-3 surface text-ink-50"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-xs text-ink-200 capitalize">
                    {s.status.replace(/_/g, ' ')}
                  </div>
                </div>
                <div
                  className="h-1.5 bg-white/10 rounded-full overflow-hidden w-20 sm:w-36 shrink-0"
                  aria-label={`Mastery ${Math.round(s.masteryScore * 100)} percent`}
                >
                  <div
                    className="h-full bg-wise-500 transition-all duration-700"
                    style={{ width: `${s.masteryScore * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl p-3 sm:p-4 surface">
      <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink-200">{label}</div>
      <div className="font-display text-xl sm:text-2xl text-ink-50 mt-1">{value}</div>
      {sub && <div className="text-[10px] sm:text-xs text-ink-200 mt-0.5">{sub}</div>}
    </div>
  );
}
