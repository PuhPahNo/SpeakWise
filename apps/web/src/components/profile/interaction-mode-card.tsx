'use client';

import { useToast } from '@/components/ui/toast';
import { MessageSquareText, Mic } from 'lucide-react';
import { useState } from 'react';

interface Props {
  initial: 'voice' | 'text';
}

/**
 * Profile-page card to pick the DEFAULT interaction mode with Wise.
 *   voice — Wise auto-speaks and listens; orb-first UI (current default).
 *   text  — Wise renders text immediately; learner types; no auto-narration.
 *           A "Listen" button on each Wise message lets the learner hear
 *           any line on demand. Every screen still has a per-session
 *           toggle so users can flip into voice for one conversation
 *           without changing their default.
 */
export function InteractionModeCard({ initial }: Props) {
  const toast = useToast();
  const [mode, setMode] = useState<'voice' | 'text'>(initial);
  const [pending, setPending] = useState(false);

  async function pick(next: 'voice' | 'text') {
    if (next === mode || pending) return;
    setPending(true);
    const prev = mode;
    setMode(next);
    try {
      const r = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferredInteractionMode: next }),
      });
      if (!r.ok) throw new Error(`status ${r.status}`);
      toast.success(
        next === 'voice' ? 'Voice-first by default' : 'Text-first by default',
        next === 'voice'
          ? 'Wise will speak and listen; the orb is the main control.'
          : 'Wise will show text; type to reply. You can still tap for voice on any screen.',
      );
    } catch (e) {
      setMode(prev);
      toast.error('Save failed', e instanceof Error ? e.message : 'Try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="surface rounded-2xl p-5 sm:p-6 space-y-4">
      <div>
        <h2 className="font-display text-lg text-ink-50">How do you want to talk with Wise?</h2>
        <p className="text-sm text-ink-200 mt-1">
          Pick a default. Every screen still has a quick toggle if you want to flip for one
          session.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Tile
          Icon={Mic}
          title="Voice"
          subtitle="Wise speaks. You answer out loud. The orb is the main control."
          selected={mode === 'voice'}
          disabled={pending}
          onClick={() => pick('voice')}
        />
        <Tile
          Icon={MessageSquareText}
          title="Text"
          subtitle="Wise writes. You type. Tap a “listen” button when you want to hear something."
          selected={mode === 'text'}
          disabled={pending}
          onClick={() => pick('text')}
        />
      </div>
    </div>
  );
}

function Tile({
  Icon,
  title,
  subtitle,
  selected,
  disabled,
  onClick,
}: {
  Icon: typeof Mic;
  title: string;
  subtitle: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`text-left rounded-xl px-4 py-4 transition-all border disabled:opacity-50 ${
        selected
          ? 'bg-wise-500/20 border-wise-500/60 text-ink-50'
          : 'bg-white/3 border-white/8 text-ink-100 hover:border-wise-500/40'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon
          size={16}
          className={selected ? 'text-wise-300' : 'text-ink-300'}
          aria-hidden
        />
        <span className="font-medium">{title}</span>
        {selected && (
          <span className="text-[10px] uppercase tracking-wider text-wise-300 ml-auto">Default</span>
        )}
      </div>
      <p className={`text-xs mt-2 leading-relaxed ${selected ? 'text-ink-100' : 'text-ink-300'}`}>
        {subtitle}
      </p>
    </button>
  );
}
