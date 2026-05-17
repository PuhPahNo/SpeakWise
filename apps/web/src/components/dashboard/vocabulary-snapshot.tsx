/**
 * Vocabulary status snapshot — replaces the standalone /vocabulary
 * page in the top nav. Counts by status + "Review N due" CTA when
 * there are items overdue.
 */
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Props {
  counts: Record<string, number>;
  dueCount: number;
  topDue: Array<{ id: string; targetText: string; nativeText: string }>;
}

const STATUS_ORDER = ['new', 'learning', 'review', 'mastered'] as const;
const STATUS_LABEL: Record<string, string> = {
  new: 'New',
  learning: 'Learning',
  review: 'In review',
  mastered: 'Mastered',
  archived: 'Archived',
};

export function VocabularySnapshot({ counts, dueCount, topDue }: Props) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0 && dueCount === 0) {
    return null;
  }
  return (
    <section className="surface rounded-2xl p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-wise-400" aria-hidden />
          <h2 className="font-display text-lg sm:text-xl text-ink-50">Vocabulary</h2>
        </div>
        <Link
          href="/vocabulary"
          className="text-xs text-ink-300 hover:text-ink-50 inline-flex items-center gap-1 transition"
        >
          See all words <ArrowRight size={12} aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {STATUS_ORDER.map((s) => (
          <div
            key={s}
            className="rounded-xl bg-white/4 px-3 py-2.5"
            aria-label={`${STATUS_LABEL[s]}: ${counts[s] ?? 0}`}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-300">
              {STATUS_LABEL[s]}
            </div>
            <div className="font-display text-xl text-ink-50">{counts[s] ?? 0}</div>
          </div>
        ))}
      </div>

      {dueCount > 0 ? (
        <div className="rounded-xl bg-wise-500/10 border border-wise-500/30 p-3 sm:p-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <div className="text-ink-50 font-medium">
              {dueCount} word{dueCount === 1 ? '' : 's'} due for review
            </div>
            {topDue.length > 0 && (
              <div className="text-xs text-ink-300 truncate mt-1">
                Including: {topDue.map((v) => v.targetText).join(', ')}
              </div>
            )}
          </div>
          <Link
            href="/vocabulary/review"
            className="rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-4 py-2 text-sm inline-flex items-center gap-1.5 shrink-0"
          >
            Review now <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      ) : (
        <p className="text-sm text-ink-300">All caught up — nothing due right now.</p>
      )}
    </section>
  );
}
