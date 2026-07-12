'use client';

import { useEffect, useState } from 'react';

interface Report {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skillsMastered: string[];
  skillsNeedingReview: string[];
  vocabularySummary: { learning: number; review: number; mastered: number };
  recommendedNextSteps: string[];
}

export function ProgressNarrative() {
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/progress/report')
      .then(async (r) => {
        if (!r.ok) throw new Error(`status ${r.status}`);
        return r.json() as Promise<Report>;
      })
      .then(setReport)
      .catch((e) => setError(e instanceof Error ? e.message : 'failed'));
  }, []);

  if (error) {
    return (
      <p className="text-sm text-ink-200 italic">
        Wise needs a session or two before there&apos;s much to say. Come back after your first
        lesson.
      </p>
    );
  }
  if (!report) {
    return (
      <div className="surface p-5 sm:p-6 rounded-2xl">
        <div className="h-3 w-2/3 bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-3/4 bg-white/10 rounded mt-3 animate-pulse" />
        <div className="h-3 w-1/2 bg-white/10 rounded mt-3 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="surface rounded-2xl p-5 sm:p-7 text-ink-50 space-y-5">
      <p className="font-display text-lg sm:text-xl leading-snug text-ink-50">{report.summary}</p>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-sage-400 mb-2">Strengths</div>
          {report.strengths.length === 0 ? (
            <p className="text-sm text-ink-200">Building.</p>
          ) : (
            <ul className="space-y-1.5">
              {report.strengths.map((s) => (
                <li key={s} className="text-sm text-ink-100 leading-snug">
                  · {s}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-wise-400 mb-2">
            Where Wise is helping
          </div>
          {report.weaknesses.length === 0 ? (
            <p className="text-sm text-ink-200">Nothing flagged yet.</p>
          ) : (
            <ul className="space-y-1.5">
              {report.weaknesses.map((s) => (
                <li key={s} className="text-sm text-ink-100 leading-snug">
                  · {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {report.recommendedNextSteps.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-2">
            What's next
          </div>
          <ul className="space-y-1.5">
            {report.recommendedNextSteps.map((s) => (
              <li key={s} className="text-sm text-ink-100 leading-snug">
                · {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
