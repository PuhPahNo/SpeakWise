import { getOrCreateUser } from '@/lib/auth/current-user';
import { getDashboard } from '@/server/services/progress';
import { getXpTotal } from '@/server/services/gamification';

export default async function ProgressPage() {
  const user = await getOrCreateUser();
  const [dashboard, xp] = await Promise.all([getDashboard(user.id), getXpTotal(user.id)]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="font-display text-2xl sm:text-3xl mb-5 sm:mb-6">Your progress</h1>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
        <Stat label="XP" value={xp.toString()} />
        <Stat label="Skills" value={dashboard.skills.length.toString()} />
        <Stat label="Mastered" value={String(dashboard.vocabularyCounts.mastered ?? 0)} />
      </div>

      <h2 className="font-display text-lg sm:text-xl mb-3">Skill graph</h2>
      {dashboard.skills.length === 0 ? (
        <p className="text-ink-600">Complete a lesson to start tracking skills.</p>
      ) : (
        <ul className="space-y-2 sm:space-y-3">
          {dashboard.skills.map((s) => (
            <li
              key={s.slug}
              className="flex items-center gap-3 rounded-xl bg-white border border-ink-100 px-3 py-2 sm:py-3"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{s.name}</div>
                <div className="text-xs text-ink-500">{s.status}</div>
              </div>
              <div
                className="h-1.5 bg-ink-100 rounded-full overflow-hidden w-20 sm:w-32 shrink-0"
                aria-label={`Mastery ${Math.round(s.masteryScore * 100)} percent`}
              >
                <div className="h-full bg-wise-500" style={{ width: `${s.masteryScore * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-3 sm:p-4">
      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-ink-500">{label}</div>
      <div className="font-display text-xl sm:text-2xl mt-1">{value}</div>
    </div>
  );
}
