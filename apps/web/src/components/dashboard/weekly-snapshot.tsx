/**
 * Four-card strip showing weekly consistency at a glance: streak,
 * days practiced this week, lessons completed this week, total XP.
 */
import { BookOpen, Calendar, Flame, Sparkles } from 'lucide-react';

interface Weekly {
  daysPracticedThisWeek: number;
  lessonsCompletedThisWeek: number;
  currentStreak: number;
  longestStreak: number;
  xpTotal: number;
}

export function WeeklySnapshot({ weekly }: { weekly: Weekly }) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
      <Stat
        Icon={Flame}
        label="Streak"
        value={weekly.currentStreak.toString()}
        unit={`day${weekly.currentStreak === 1 ? '' : 's'}`}
        sub={weekly.longestStreak > 0 ? `best ${weekly.longestStreak}` : undefined}
      />
      <Stat
        Icon={Calendar}
        label="This week"
        value={weekly.daysPracticedThisWeek.toString()}
        unit={'of 7 days'}
      />
      <Stat
        Icon={BookOpen}
        label="Lessons this week"
        value={weekly.lessonsCompletedThisWeek.toString()}
      />
      <Stat Icon={Sparkles} label="Total XP" value={weekly.xpTotal.toLocaleString()} />
    </section>
  );
}

function Stat({
  Icon,
  label,
  value,
  unit,
  sub,
}: {
  Icon: typeof Flame;
  label: string;
  value: string;
  unit?: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl p-3 sm:p-4 surface">
      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink-200">
        <Icon size={12} className="text-wise-400" aria-hidden />
        <span>{label}</span>
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-display text-xl sm:text-2xl text-ink-50">{value}</span>
        {unit && <span className="text-xs text-ink-300">{unit}</span>}
      </div>
      {sub && <div className="text-[10px] sm:text-xs text-ink-300 mt-0.5">{sub}</div>}
    </div>
  );
}
