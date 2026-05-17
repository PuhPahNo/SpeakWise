/**
 * Recent lessons list — replaces the standalone /lessons page in the
 * top nav. Last 5 lessons with title, type, and a deep link.
 */
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface LessonRow {
  id: string;
  title: string;
  lessonType: string;
  status: string;
  interestTheme: string | null;
  estimatedDurationMinutes: number | null;
  createdAt: Date;
  completedAt: Date | null;
}

export function RecentLessons({ lessons }: { lessons: LessonRow[] }) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-wise-400" aria-hidden />
          <h2 className="font-display text-lg sm:text-xl text-ink-50">Recent lessons</h2>
        </div>
        <Link
          href="/lessons"
          className="text-xs text-ink-300 hover:text-ink-50 inline-flex items-center gap-1 transition"
        >
          See all <ArrowRight size={12} aria-hidden />
        </Link>
      </div>
      <ul className="space-y-2">
        {lessons.map((l) => (
          <li key={l.id}>
            <Link
              href={`/lesson/${l.id}`}
              className="block surface rounded-xl p-3 sm:p-4 hover:border-wise-500/40 transition"
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-ink-50 font-medium truncate">{l.title}</div>
                  <div className="text-xs text-ink-300">
                    {l.lessonType.replace(/_/g, ' ')}
                    {' · '}
                    {l.status === 'completed' ? 'completed' : l.status}
                    {l.completedAt && ` · ${formatRelative(new Date(l.completedAt))}`}
                  </div>
                </div>
                {l.estimatedDurationMinutes && (
                  <span className="text-xs text-ink-300 shrink-0">
                    ~{l.estimatedDurationMinutes} min
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
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
