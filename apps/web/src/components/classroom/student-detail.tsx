'use client';

import { useToast } from '@/components/ui/toast';
import { ArrowLeft, ClipboardList, Send, Sparkles, Flame } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Skill {
  id: string;
  slug: string;
  name: string;
  category: string;
  level: string;
}

interface Directive {
  id: string;
  body: string;
  pinnedSkillIds: string[];
  status: string;
  expiresAt: Date | string | null;
  createdAt: Date | string;
}

interface Detail {
  student: {
    id: string;
    name: string;
    username: string;
    profile: Record<string, unknown> | null;
    streak: { currentDays: number; longestDays: number } | null;
    xpTotal: number;
  };
  recentLessons: Array<{
    id: string;
    title: string;
    lessonType: string;
    status: string;
    createdBy: string;
    tutorDirectiveId: string | null;
    createdAt: Date | string;
    completedAt: Date | string | null;
  }>;
  skillProgress: Array<{
    skillSlug: string;
    skillName: string;
    level: string;
    category: string;
    status: string;
    masteryScore: number;
    productionScore: number;
    comprehensionScore: number;
  }>;
  recentMistakes: Array<{
    id: string;
    userAnswer: string;
    correctedAnswer: string | null;
    createdAt: Date | string;
    skillIds: string[];
  }>;
  directives: Directive[];
}

interface Props {
  detail: Detail;
  allSkills: Skill[];
}

/**
 * Tutor's per-student view. Top stat bar, recent activity, skill graph,
 * directive composer + list. Directive form is "write text + optionally
 * pin skills"; pinned skills override the lesson generator's default
 * targeting next time the student starts a lesson.
 */
export function StudentDetail({ detail, allSkills }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [directives, setDirectives] = useState(detail.directives);
  const [body, setBody] = useState('');
  const [pinned, setPinned] = useState<Set<string>>(new Set());
  const [pending, setPending] = useState(false);

  function toggleSkill(id: string) {
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function submitDirective() {
    const text = body.trim();
    if (text.length < 3) {
      toast.error('Too short', 'Write a sentence or two about the focus area.');
      return;
    }
    setPending(true);
    try {
      const r = await fetch('/api/classroom/directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: detail.student.id,
          body: text,
          pinnedSkillIds: [...pinned],
        }),
      });
      if (!r.ok) throw new Error(`status ${r.status}`);
      const { directive } = (await r.json()) as { directive: Directive };
      // Replace older actives with the new one (the API archives old ones
      // by default, so reflect that locally).
      setDirectives((ds) => [
        directive,
        ...ds.map((d) => (d.status === 'active' ? { ...d, status: 'archived' } : d)),
      ]);
      setBody('');
      setPinned(new Set());
      toast.success('Directive sent', `${detail.student.name} will see it in their next lesson.`);
    } catch (e) {
      toast.error('Send failed', e instanceof Error ? e.message : 'Try again.');
    } finally {
      setPending(false);
    }
  }

  async function archive(directiveId: string) {
    setPending(true);
    try {
      const r = await fetch(`/api/classroom/directives/${directiveId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'archived' }),
      });
      if (!r.ok) throw new Error(`status ${r.status}`);
      setDirectives((ds) =>
        ds.map((d) => (d.id === directiveId ? { ...d, status: 'archived' } : d)),
      );
      toast.success('Archived');
      router.refresh();
    } catch (e) {
      toast.error('Archive failed', e instanceof Error ? e.message : 'Try again.');
    } finally {
      setPending(false);
    }
  }

  const skillNameById = new Map(allSkills.map((s) => [s.id, s.name]));
  const activeDirective = directives.find((d) => d.status === 'active') ?? null;

  return (
    <div className="flex flex-col gap-7 sm:gap-9">
      <div>
        <Link
          href="/classroom"
          className="inline-flex items-center gap-1 text-xs text-ink-200 hover:text-ink-50 transition"
        >
          <ArrowLeft size={12} aria-hidden /> Back to classroom
        </Link>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-50 leading-tight mt-2">
          {detail.student.name}
        </h1>
        <div className="flex items-center gap-3 text-sm text-ink-200 mt-1 flex-wrap">
          <span>@{detail.student.username}</span>
          {detail.student.streak && detail.student.streak.currentDays > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Flame size={14} className="text-wise-400" aria-hidden />
              {detail.student.streak.currentDays} day
              {detail.student.streak.currentDays === 1 ? '' : 's'}
            </span>
          )}
          {detail.student.xpTotal > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={14} className="text-wise-400" aria-hidden />
              {detail.student.xpTotal.toLocaleString()} XP
            </span>
          )}
        </div>
      </div>

      {/* Directive composer */}
      <section className="surface rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList size={14} className="text-wise-400" aria-hidden />
          <div className="text-[11px] uppercase tracking-[0.2em] text-wise-400">
            Send a directive
          </div>
        </div>
        <p className="text-sm text-ink-200 mb-3 leading-relaxed">
          Tell Wise what {detail.student.name.split(' ')[0]} should focus on. Wise
          will fold it into the next lesson's briefing and skew the task mix
          toward any skills you pin. Sending replaces any older active directive.
        </p>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Focus on past-tense verbs this week. Lots of passato prossimo agreement drills."
          rows={3}
          className="w-full"
          disabled={pending}
        />
        <details className="mt-3">
          <summary className="text-sm text-ink-200 cursor-pointer hover:text-ink-50">
            Pin specific skills ({pinned.size} selected)
          </summary>
          <div className="mt-3 max-h-64 overflow-y-auto surface rounded-xl p-3 space-y-1">
            {allSkills.map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-2 text-sm text-ink-100 hover:text-ink-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={pinned.has(s.id)}
                  onChange={() => toggleSkill(s.id)}
                  className="accent-wise-500"
                />
                <span className="font-medium">{s.name}</span>
                <span className="text-xs text-ink-300">
                  {s.level} · {s.category.replace(/_/g, ' ')}
                </span>
              </label>
            ))}
          </div>
        </details>
        <button
          type="button"
          onClick={submitDirective}
          disabled={pending || body.trim().length < 3}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-wise-500 hover:bg-wise-600 disabled:opacity-50 text-ink-900 font-medium px-5 py-2.5"
        >
          <Send size={14} aria-hidden /> Send directive
        </button>
      </section>

      {/* Active + archived directives */}
      {directives.length > 0 && (
        <section>
          <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-3">
            Directives ({directives.length})
          </div>
          <ul className="space-y-2">
            {directives.map((d) => (
              <li
                key={d.id}
                className={`surface rounded-2xl p-4 sm:p-5 ${d.status === 'active' ? 'border-wise-500/40' : 'opacity-70'}`}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200">
                      {d.status === 'active' ? (
                        <span className="text-wise-400">Active</span>
                      ) : (
                        'Archived'
                      )}
                      {' · '}
                      {new Date(d.createdAt).toLocaleDateString()}
                    </div>
                    <p className="text-ink-100 mt-2 leading-relaxed">{d.body}</p>
                    {d.pinnedSkillIds.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {d.pinnedSkillIds.map((id) => (
                          <span
                            key={id}
                            className="rounded-full surface px-2.5 py-0.5 text-xs text-ink-200"
                          >
                            {skillNameById.get(id) ?? 'unknown skill'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {d.status === 'active' && (
                    <button
                      type="button"
                      onClick={() => archive(d.id)}
                      disabled={pending}
                      className="text-xs text-ink-200 hover:text-ink-50 underline-offset-4 hover:underline disabled:opacity-50 shrink-0"
                    >
                      Archive
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skill progress */}
      <section>
        <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-3">
          Skill mastery ({detail.skillProgress.length})
        </div>
        {detail.skillProgress.length === 0 ? (
          <p className="text-sm text-ink-200">No skills tracked yet.</p>
        ) : (
          <ul className="space-y-2">
            {detail.skillProgress.slice(0, 12).map((p) => (
              <li key={p.skillSlug} className="surface rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <div>
                    <div className="text-sm text-ink-50 font-medium">{p.skillName}</div>
                    <div className="text-xs text-ink-300">
                      {p.level} · {p.category.replace(/_/g, ' ')} · {p.status.replace(/_/g, ' ')}
                    </div>
                  </div>
                  <div className="text-xs text-ink-200">
                    P {Math.round(p.productionScore * 100)}% · C{' '}
                    {Math.round(p.comprehensionScore * 100)}%
                  </div>
                </div>
                <div className="h-1 w-full bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-wise-500 transition-all duration-500"
                    style={{ width: `${Math.round(p.masteryScore * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Recent lessons */}
      {detail.recentLessons.length > 0 && (
        <section>
          <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-3">
            Recent lessons ({detail.recentLessons.length})
          </div>
          <ul className="space-y-2">
            {detail.recentLessons.map((l) => (
              <li key={l.id} className="surface rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-sm text-ink-50 font-medium">{l.title}</div>
                    <div className="text-xs text-ink-300">
                      {l.lessonType.replace(/_/g, ' ')} · {l.status} ·{' '}
                      {l.createdBy === 'tutor' ? 'tutor-directed' : 'wise-driven'}
                      {activeDirective && l.tutorDirectiveId === activeDirective.id
                        ? ' · current directive'
                        : ''}
                    </div>
                  </div>
                  <div className="text-xs text-ink-200">
                    {new Date(l.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Recent mistakes (audit) */}
      {detail.recentMistakes.length > 0 && (
        <section>
          <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-3">
            Recent mistakes ({detail.recentMistakes.length})
          </div>
          <ul className="space-y-2">
            {detail.recentMistakes.slice(0, 5).map((m) => (
              <li key={m.id} className="surface rounded-xl p-3 sm:p-4 text-sm">
                <div className="text-ink-100">they said: <span className="italic">{m.userAnswer}</span></div>
                {m.correctedAnswer && (
                  <div className="text-ink-200 mt-1">
                    better: <span className="italic text-ink-50">{m.correctedAnswer}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
