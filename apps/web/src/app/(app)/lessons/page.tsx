import { getOrCreateUser } from '@/lib/auth/current-user';
import { listLessons } from '@/server/services/lesson';
import Link from 'next/link';

export const metadata = { title: 'Le tue lezioni · Speakwise' };

const LABELS: Record<string, string> = {
  daily_mission: 'Daily mission',
  recovery: 'Comeback',
  freestyle: 'Freestyle',
  grammar: 'Grammar',
  vocabulary_review: 'Vocab review',
  speaking_challenge: 'Speaking',
  listening_challenge: 'Listening',
  media: 'Media',
  scenario_roleplay: 'Roleplay',
  progress_check: 'Check-in',
  placement: 'Placement',
};

function relTime(d: Date): string {
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString();
}

export default async function LessonsPage() {
  const user = await getOrCreateUser();
  const lessons = await listLessons(user.id, { limit: 50 });

  const completed = lessons.filter((l) => l.status === 'completed');
  const inProgress = lessons.filter(
    (l) => l.status === 'recommended' || l.status === 'active' || l.status === 'draft',
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-50">Le tue lezioni</h1>
        <p className="text-sm text-ink-200 mt-1">Past missions and what&apos;s queued.</p>
      </div>

      {inProgress.length > 0 && (
        <section>
          <div className="text-[11px] uppercase tracking-[0.2em] text-wise-400 mb-3">In flight</div>
          <ul className="space-y-2">
            {inProgress.map((l) => (
              <LessonRow key={l.id} l={l} />
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-3">
          Completed ({completed.length})
        </div>
        {completed.length === 0 ? (
          <p className="text-sm text-ink-200">
            Nothing finished yet. Complete a mission and it&apos;ll show here.
          </p>
        ) : (
          <ul className="space-y-2">
            {completed.map((l) => (
              <LessonRow key={l.id} l={l} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );

  function LessonRow({
    l,
  }: {
    l: {
      id: string;
      title: string;
      lessonType: string;
      status: string;
      interestTheme: string | null;
      estimatedDurationMinutes: number | null;
      createdAt: Date;
      completedAt: Date | null;
    };
  }) {
    const when = l.completedAt ?? l.createdAt;
    return (
      <li>
        <Link
          href={`/lesson/${l.id}`}
          className="block surface rounded-xl px-4 py-3 hover:border-wise-500/40 transition"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200">
                {LABELS[l.lessonType] ?? l.lessonType.replace(/_/g, ' ')}
                {l.interestTheme ? ` · ${l.interestTheme}` : ''}
              </div>
              <div className="font-medium text-ink-50 truncate mt-0.5">{l.title}</div>
            </div>
            <div className="text-xs text-ink-200 shrink-0">{relTime(when)}</div>
          </div>
        </Link>
      </li>
    );
  }
}
