'use client';

import { useToast } from '@/components/ui/toast';
import { useState } from 'react';

interface Props {
  initial: {
    languageRatio: number;
    autoLanguageRatio: number;
    languageRatioOverridden: boolean;
    immersionMode: boolean;
    currentLevel: string;
  };
}

/**
 * Profile-page card for controlling how much Italian Wise speaks.
 *
 * Two modes:
 *  - Auto (default): Wise auto-computes the ratio from the learner's
 *    CEFR level + how much of that level they've mastered. Display is
 *    read-only; the card shows the current target ("~12% Italian today")
 *    and a one-liner explaining why.
 *  - Override: the learner has picked a specific ratio. A slider lets
 *    them tweak it; "Let Wise decide" reverts to auto.
 *
 * Immersion is a separate hard switch on top of either mode.
 */
export function LanguageBalanceCard({ initial }: Props) {
  const toast = useToast();
  const [ratio, setRatio] = useState(initial.languageRatio);
  const [overridden, setOverridden] = useState(initial.languageRatioOverridden);
  const [immersion, setImmersion] = useState(initial.immersionMode);
  const [draftRatio, setDraftRatio] = useState(initial.languageRatio);
  const [pending, setPending] = useState(false);

  async function persist(patch: {
    languageRatio?: number;
    languageRatioOverridden?: boolean;
    immersionMode?: boolean;
  }) {
    setPending(true);
    try {
      const r = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!r.ok) throw new Error(`status ${r.status}`);
    } catch (e) {
      toast.error('Save failed', e instanceof Error ? e.message : 'Try again.');
      throw e;
    } finally {
      setPending(false);
    }
  }

  async function saveOverride() {
    const next = Math.max(0, Math.min(1, draftRatio));
    try {
      await persist({ languageRatio: next, languageRatioOverridden: true });
      setRatio(next);
      setOverridden(true);
      toast.success(
        'Saved',
        `Wise will aim for ${Math.round(next * 100)}% Italian going forward.`,
      );
    } catch {
      /* toast already shown */
    }
  }

  async function resetToAuto() {
    try {
      await persist({ languageRatioOverridden: false });
      setRatio(initial.autoLanguageRatio);
      setDraftRatio(initial.autoLanguageRatio);
      setOverridden(false);
      toast.success('Reset', 'Wise will auto-tune your Italian mix from now on.');
    } catch {
      /* toast already shown */
    }
  }

  async function toggleImmersion() {
    const next = !immersion;
    setImmersion(next);
    try {
      await persist({ immersionMode: next });
      toast.success(
        next ? 'Italian-only mode on' : 'Italian-only mode off',
        next
          ? 'Wise will speak only Italian until you turn this off.'
          : 'Wise is back to your usual language mix.',
      );
    } catch {
      // roll back
      setImmersion(!next);
    }
  }

  const displayPercent = Math.round((overridden ? ratio : initial.autoLanguageRatio) * 100);

  return (
    <div className="surface rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h2 className="font-display text-lg text-ink-50">Italian mix</h2>
          <p className="text-sm text-ink-200 mt-1">
            How much of Wise's speech is in Italian. Auto-tunes with your level — you can override.
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display text-2xl text-wise-300">~{displayPercent}%</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-ink-300">
            {immersion ? 'immersion' : overridden ? 'manual' : 'auto'}
          </div>
        </div>
      </div>

      {/* Immersion hard toggle */}
      <label className="flex items-center justify-between gap-3 rounded-xl bg-white/4 px-4 py-3 cursor-pointer">
        <span className="text-sm text-ink-100">
          Italian-only mode <span className="text-ink-300">— Wise speaks only Italian</span>
        </span>
        <input
          type="checkbox"
          checked={immersion}
          onChange={toggleImmersion}
          disabled={pending}
          className="accent-wise-500 h-4 w-4"
        />
      </label>

      {/* Override slider — disabled when immersion is on */}
      <div className={`space-y-2 ${immersion ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex items-center justify-between text-xs text-ink-200">
          <span>Pure English</span>
          <span>{Math.round(draftRatio * 100)}% Italian</span>
          <span>All Italian</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={Math.round(draftRatio * 100)}
          onChange={(e) => setDraftRatio(Number(e.target.value) / 100)}
          className="w-full accent-wise-500"
          aria-label="Italian share"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={saveOverride}
            disabled={pending || (overridden && Math.abs(draftRatio - ratio) < 0.001)}
            className="rounded-full bg-wise-500 hover:bg-wise-600 disabled:opacity-50 text-ink-900 font-medium px-4 py-2 text-sm"
          >
            Use this
          </button>
          {overridden && (
            <button
              type="button"
              onClick={resetToAuto}
              disabled={pending}
              className="text-sm text-ink-200 hover:text-ink-50 underline-offset-4 hover:underline disabled:opacity-50"
            >
              Let Wise decide ({Math.round(initial.autoLanguageRatio * 100)}%)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
