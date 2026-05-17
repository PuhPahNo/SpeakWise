/**
 * "Coming next" section — what Wise will focus on in upcoming lessons.
 * If there's an active tutor directive, it gets a prominent callout
 * above the list and any tutor-pinned skills are tagged.
 */
import type { DashboardSkillCard } from '@/server/services/dashboard';
import { GraduationCap, Pin, Sparkles } from 'lucide-react';

interface Props {
  skills: DashboardSkillCard[];
  directive: { body: string; pinnedSkills: Array<{ slug: string; name: string }> } | null;
}

export function ComingNext({ skills, directive }: Props) {
  if (skills.length === 0 && !directive) return null;
  return (
    <section>
      <div className="flex items-baseline gap-2 mb-3">
        <Sparkles size={14} className="text-wise-400" aria-hidden />
        <h2 className="font-display text-lg sm:text-xl text-ink-50">Coming next</h2>
      </div>

      {directive && (
        <div className="surface rounded-2xl p-4 sm:p-5 mb-3 border-wise-500/40">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-wise-400 mb-1">
            <GraduationCap size={12} aria-hidden />
            Your tutor's focus
          </div>
          <p className="text-ink-100 leading-relaxed">{directive.body}</p>
        </div>
      )}

      <ul className="grid sm:grid-cols-2 gap-2">
        {skills.map((s) => (
          <li
            key={s.skillId}
            className={`surface rounded-xl p-3 sm:p-4 ${
              s.pinnedByTutor ? 'border-wise-500/40' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm text-ink-50 font-medium truncate">{s.name}</div>
                <div className="text-xs text-ink-300">
                  {s.category.replace(/_/g, ' ')}
                </div>
              </div>
              {s.pinnedByTutor && (
                <span
                  title="Pinned by your tutor"
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-wise-300 shrink-0"
                >
                  <Pin size={10} aria-hidden /> tutor
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-300 mt-3">
        These are derived from skills due for review, your active focus, and any tutor pins. They
        feed the next lesson Wise generates.
      </p>
    </section>
  );
}
