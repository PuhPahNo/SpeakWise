/**
 * Reusable section for strength / weakness / working-on lists.
 *
 * Variants tint the accent: green-leaning for strengths, gold for
 * working, slightly muted-red for weaknesses. When `showBreakdown` is
 * set (used for "currently practicing"), each card surfaces both the
 * production score and comprehension score separately — Wise tracks
 * them independently so the learner can see which side they need to
 * push more.
 */
import type { DashboardSkillCard } from '@/server/services/dashboard';

interface Props {
  heading: string;
  subheading?: string;
  skills: DashboardSkillCard[];
  variant: 'strength' | 'working' | 'weakness';
  showBreakdown?: boolean;
}

const ACCENT: Record<Props['variant'], string> = {
  strength: 'text-sage-400',
  working: 'text-wise-400',
  weakness: 'text-ink-100',
};

export function SkillCardList({ heading, subheading, skills, variant, showBreakdown }: Props) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3 gap-3 flex-wrap">
        <div>
          <h2 className={`font-display text-lg sm:text-xl ${ACCENT[variant]}`}>{heading}</h2>
          {subheading && <p className="text-xs text-ink-300 mt-0.5">{subheading}</p>}
        </div>
      </div>
      <ul className="space-y-2">
        {skills.map((s) => (
          <li key={s.skillId} className="surface rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
              <div className="min-w-0">
                <div className="text-sm text-ink-50 font-medium truncate">{s.name}</div>
                <div className="text-xs text-ink-300">
                  {s.category.replace(/_/g, ' ')} · {s.status.replace(/_/g, ' ')}
                  {s.lastPracticedAt && ` · ${formatRelative(new Date(s.lastPracticedAt))}`}
                </div>
              </div>
              <div className="text-xs text-ink-200 shrink-0">
                {Math.round(s.masteryScore * 100)}%
              </div>
            </div>

            {showBreakdown ? (
              <div className="grid grid-cols-2 gap-2 text-xs text-ink-200">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Comprehension</span>
                    <span>{Math.round(s.comprehensionScore * 100)}%</span>
                  </div>
                  <Bar value={s.comprehensionScore} tone="comp" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Production</span>
                    <span>{Math.round(s.productionScore * 100)}%</span>
                  </div>
                  <Bar value={s.productionScore} tone="prod" />
                </div>
              </div>
            ) : (
              <Bar value={s.masteryScore} tone={variant === 'strength' ? 'strength' : 'mastery'} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Bar({
  value,
  tone,
}: {
  value: number;
  tone: 'mastery' | 'strength' | 'comp' | 'prod';
}) {
  const color =
    tone === 'strength'
      ? 'bg-sage-500'
      : tone === 'comp'
        ? 'bg-wise-400/70'
        : tone === 'prod'
          ? 'bg-wise-500'
          : 'bg-wise-500';
  return (
    <div className="h-1.5 w-full bg-white/8 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500`}
        style={{ width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%` }}
      />
    </div>
  );
}

function formatRelative(d: Date): string {
  const diffMs = Date.now() - d.getTime();
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return d.toLocaleDateString();
}
