/**
 * CEFR-level hero card. Shows the learner's current European-framework
 * level, the next level they're working toward, and progress within
 * the current level (% of current-level skills mastered).
 */
import type { CefrProgress } from '@/server/services/dashboard';

const LEVEL_LABELS: Record<string, string> = {
  complete_beginner: 'Just starting',
  beginner: 'Beginner',
  lower_intermediate: 'Lower intermediate',
  intermediate: 'Intermediate',
  upper_intermediate: 'Upper intermediate',
  advanced: 'Advanced',
};

// Rough CEFR equivalents — most users have heard of A1/A2/B1/B2/C1/C2.
const CEFR_CODES: Record<string, string> = {
  complete_beginner: 'pre-A1',
  beginner: 'A1',
  lower_intermediate: 'A2',
  intermediate: 'B1',
  upper_intermediate: 'B2',
  advanced: 'C1+',
};

export function CefrHero({
  progress,
  learnerName,
}: {
  progress: CefrProgress;
  learnerName: string;
}) {
  const pct = Math.round(progress.percent * 100);
  const currentLabel = LEVEL_LABELS[progress.current] ?? progress.current;
  const currentCode = CEFR_CODES[progress.current] ?? '';
  const remaining = Math.max(0, progress.totalAtLevel - progress.masteredCount);

  return (
    <section className="surface rounded-2xl p-5 sm:p-7">
      <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200">
        {learnerName}'s level
      </div>
      <div className="mt-2 flex items-baseline gap-3 flex-wrap">
        <h2 className="font-display text-3xl sm:text-4xl text-ink-50">{currentLabel}</h2>
        {currentCode && (
          <span className="text-sm text-ink-300 font-mono">{currentCode}</span>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between mb-2 text-sm">
          <span className="text-ink-200">
            {progress.totalAtLevel === 0
              ? 'No skills tracked yet'
              : `${progress.masteredCount} of ${progress.totalAtLevel} skills mastered`}
          </span>
          <span className="text-wise-300 font-medium">{pct}%</span>
        </div>
        <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-wise-500 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {progress.nextLevel && (
        <p className="mt-4 text-sm text-ink-200">
          {remaining > 0 ? (
            <>
              <span className="text-ink-100">{remaining}</span> more skill
              {remaining === 1 ? '' : 's'} to master to advance to{' '}
              <span className="text-ink-100">
                {LEVEL_LABELS[progress.nextLevel] ?? progress.nextLevel}
              </span>
              .
            </>
          ) : (
            <>You've mastered everything at this level — ready for the next step.</>
          )}
        </p>
      )}
    </section>
  );
}
