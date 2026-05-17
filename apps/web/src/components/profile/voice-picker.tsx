'use client';

import { Check, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Voice {
  id: string;
  name: string;
  shortDescription: string;
  gender: 'female' | 'male' | 'neutral';
  isDefault?: boolean;
}

export function VoicePicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (voiceId: string | null) => void;
}) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [defaultVoiceId, setDefaultVoiceId] = useState<string>('');
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch('/api/voice/voices')
      .then((r) => r.json())
      .then((d: { voices: Voice[]; defaultVoiceId: string }) => {
        setVoices(d.voices);
        setDefaultVoiceId(d.defaultVoiceId);
      })
      .catch(() => {});
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  async function preview(voiceId: string) {
    if (audioRef.current) audioRef.current.pause();
    if (playing === voiceId) {
      setPlaying(null);
      return;
    }
    setPlaying(voiceId);
    try {
      const res = await fetch('/api/voice/sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voiceId, language: 'it' }),
      });
      if (!res.ok) throw new Error('preview failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setPlaying(null);
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } catch {
      setPlaying(null);
    }
  }

  if (voices.length === 0) {
    return <div className="text-sm text-ink-300">Loading voices…</div>;
  }

  const effective = value ?? defaultVoiceId;

  // Dark-theme card styling — selected uses a tinted wise-glow, unselected
  // uses the standard surface treatment. Previously this rendered on a
  // white background with pale-gold accents that were unreadable.
  return (
    <ul className="space-y-2">
      {voices.map((v) => {
        const selected = effective === v.id;
        const isPlaying = playing === v.id;
        return (
          <li
            key={v.id}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2 sm:py-3 transition ${
              selected
                ? 'bg-wise-500/20 border-wise-500/60 text-ink-50'
                : 'surface text-ink-100 hover:border-wise-500/40'
            }`}
          >
            <button
              type="button"
              onClick={() => preview(v.id)}
              aria-label={isPlaying ? `Stop preview of ${v.name}` : `Preview ${v.name}`}
              className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/8 hover:bg-white/15 text-ink-50 transition"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              type="button"
              onClick={() => onChange(v.id === defaultVoiceId ? null : v.id)}
              className="flex-1 min-w-0 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-ink-50">{v.name}</span>
                {v.id === defaultVoiceId && (
                  <span className="text-[10px] uppercase tracking-wider text-ink-300 bg-white/8 px-1.5 py-0.5 rounded">
                    Default
                  </span>
                )}
              </div>
              <div className="text-sm text-ink-300 truncate">{v.shortDescription}</div>
            </button>
            {selected && <Check size={18} className="text-wise-300 shrink-0" aria-hidden />}
          </li>
        );
      })}
    </ul>
  );
}
