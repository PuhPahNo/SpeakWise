'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';

interface Card {
  id: string;
  targetText: string;
  nativeText: string;
  exampleSentence: string | null;
  exampleTranslation: string | null;
}

export function VocabReview({ cards }: { cards: Card[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [pending, setPending] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [done, setDone] = useState(false);

  const card = cards[index];

  async function speakItalian(text: string) {
    try {
      const res = await fetch('/api/voice/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: 'it' }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      void audio.play();
    } catch {
      // non-fatal
    }
  }

  async function record(result: 'correct' | 'incorrect') {
    if (!card || pending) return;
    setPending(true);
    try {
      await fetch(`/api/vocabulary/${card.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result }),
      });
      setStats((s) => ({
        correct: s.correct + (result === 'correct' ? 1 : 0),
        incorrect: s.incorrect + (result === 'incorrect' ? 1 : 0),
      }));
      if (index + 1 >= cards.length) {
        setDone(true);
      } else {
        setIndex(index + 1);
        setRevealed(false);
      }
    } finally {
      setPending(false);
    }
  }

  if (done) {
    const total = stats.correct + stats.incorrect;
    return (
      <div className="text-center py-10 animate-fade-up">
        <div className="font-display text-3xl text-ink-50">Review done</div>
        <div className="mt-3 text-ink-200">
          {stats.correct} of {total} remembered
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push('/vocabulary')}
            className="rounded-full surface text-ink-50 px-6 py-3 hover:border-wise-500/40"
          >
            See all words
          </button>
          <button
            onClick={() => router.push('/command-center')}
            className="rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-6 py-3"
          >
            Back home
          </button>
        </div>
      </div>
    );
  }

  if (!card) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full flex items-center justify-between text-xs text-ink-200">
        <span className="uppercase tracking-[0.2em]">
          Review {index + 1} / {cards.length}
        </span>
        <span>
          ✓ {stats.correct} · ✗ {stats.incorrect}
        </span>
      </div>

      <div className="w-full h-1 bg-white/8 rounded-full overflow-hidden" aria-hidden>
        <div
          className="h-full bg-wise-500 transition-all duration-500"
          style={{ width: `${((index + (revealed ? 1 : 0)) / cards.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.button
          key={card.id + (revealed ? '-back' : '-front')}
          type="button"
          onClick={() => setRevealed((r) => !r)}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full surface rounded-3xl p-8 sm:p-12 min-h-[260px] sm:min-h-[320px] flex flex-col items-center justify-center text-center cursor-pointer"
        >
          {!revealed ? (
            <>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-4">
                Italiano
              </div>
              <div className="font-display text-3xl sm:text-4xl text-ink-50 leading-tight">
                {card.targetText}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  void speakItalian(card.targetText);
                }}
                className="mt-5 inline-flex items-center gap-2 text-sm text-ink-200 hover:text-wise-400 transition"
              >
                <Volume2 size={14} /> Hear it
              </button>
              <div className="mt-6 text-xs text-ink-200 italic">tap to flip</div>
            </>
          ) : (
            <>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-4">
                English
              </div>
              <div className="font-display text-2xl sm:text-3xl text-ink-50 leading-tight">
                {card.nativeText}
              </div>
              {card.exampleSentence && (
                <div className="mt-6 text-sm text-ink-200 italic max-w-md">
                  &ldquo;{card.exampleSentence}&rdquo;
                  {card.exampleTranslation && (
                    <div className="text-ink-200/70 not-italic mt-1">
                      {card.exampleTranslation}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </motion.button>
      </AnimatePresence>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-3 w-full max-w-md"
        >
          <button
            onClick={() => void record('incorrect')}
            disabled={pending}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full surface text-ink-50 px-5 py-3 hover:border-wise-500/40 transition disabled:opacity-50"
          >
            <X size={16} /> Forgot
          </button>
          <button
            onClick={() => void record('correct')}
            disabled={pending}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-5 py-3 disabled:opacity-50"
          >
            <Check size={16} /> Got it
          </button>
        </motion.div>
      )}
    </div>
  );
}
