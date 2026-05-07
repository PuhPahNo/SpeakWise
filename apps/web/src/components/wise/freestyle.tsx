'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceOrb } from '@/components/voice/voice-orb';
import { useVoiceTutor } from '@/hooks/use-voice-tutor';

interface Turn {
  role: 'user' | 'wise';
  text: string;
  ts: number;
}

interface WiseTurn {
  intent: string;
  wiseMessage: string;
  actions: Array<{ type: string; lessonId?: string }>;
}

export function Freestyle({ firstName }: { firstName: string }) {
  const router = useRouter();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [showText, setShowText] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [pending, setPending] = useState(false);
  const startedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tutor = useVoiceTutor({
    sttLanguage: 'en',
    ttsLanguage: 'en',
    autoListenAfterSpeak: true,
    onUserSpeech: async (text) => {
      addTurn('user', text);
      await sendToWise(text);
    },
  });

  function addTurn(role: 'user' | 'wise', text: string) {
    setTurns((t) => [...t, { role, text, ts: Date.now() }]);
  }

  // Open with a quick warm prompt
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const opener = `Sono qui, ${firstName}. What do you want to talk about — practice, a question, or something on your mind?`;
    addTurn('wise', opener);
    void tutor.speak(opener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns]);

  async function sendToWise(message: string) {
    setPending(true);
    try {
      const res = await fetch('/api/wise/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'voice',
          message,
          context: { screen: 'freestyle' },
        }),
      });
      const data: WiseTurn = await res.json();
      addTurn('wise', data.wiseMessage);

      const startAction = data.actions.find((a) => a.type === 'START_LESSON' && a.lessonId);
      if (startAction?.lessonId) {
        await tutor.speak(data.wiseMessage, { autoListenAfter: false });
        router.push(`/lesson/${startAction.lessonId}`);
        return;
      }
      const generateAction = data.actions.find((a) => a.type === 'GENERATE_LESSON');
      if (generateAction) {
        await tutor.speak(data.wiseMessage, { autoListenAfter: false });
        const gen = await fetch('/api/lessons/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonType: 'daily_mission', userRequest: message }),
        });
        const out = await gen.json();
        if (out.lesson?.id) router.push(`/lesson/${out.lesson.id}`);
        return;
      }
      await tutor.speak(data.wiseMessage);
    } catch {
      const fallback = "Sorry — try that again?";
      addTurn('wise', fallback);
      await tutor.speak(fallback);
    } finally {
      setPending(false);
    }
  }

  async function submitText() {
    const text = textInput.trim();
    if (!text) return;
    setTextInput('');
    addTurn('user', text);
    await sendToWise(text);
  }

  function statusText(): string {
    switch (tutor.state) {
      case 'speaking':
        return 'Wise is speaking — tap to interrupt';
      case 'listening':
        return 'Listening… (auto-stops on silence)';
      case 'processing_transcription':
        return 'Got it…';
      case 'thinking':
        return 'Thinking…';
      case 'error':
        return 'Microphone error — try again or use text';
      default:
        return pending ? 'Working…' : 'Tap the orb to talk';
    }
  }

  function onOrbTap() {
    if (tutor.state === 'speaking') {
      tutor.interrupt();
      void tutor.toggleListen();
      return;
    }
    void tutor.toggleListen();
  }

  return (
    <div className="flex flex-col gap-5 min-h-[70vh]">
      <header className="text-center">
        <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200">Freestyle</div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-50 mt-1">Talk to Wise</h1>
      </header>

      <div className="flex justify-center">
        <VoiceOrb
          state={tutor.state}
          size="md"
          amplitude={tutor.amplitude}
          onTap={onOrbTap}
        />
      </div>

      {/* Conversation transcript */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto max-h-[40vh] sm:max-h-[44vh] surface rounded-2xl p-4 sm:p-5 space-y-3"
      >
        <AnimatePresence initial={false}>
          {turns.map((t) => (
            <motion.div
              key={t.ts}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={t.role === 'user' ? 'text-right' : 'text-left'}
            >
              <div
                className={`inline-block max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                  t.role === 'user'
                    ? 'bg-wise-500/15 border border-wise-500/25 text-ink-50'
                    : 'bg-white/5 border border-white/10 text-ink-50'
                }`}
              >
                {t.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {turns.length === 0 && (
          <div className="text-ink-200 text-sm text-center py-6">No words yet.</div>
        )}
      </div>

      <p className="text-xs text-ink-200 text-center">{statusText()}</p>

      {/* Text fallback */}
      {showText ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submitText();
          }}
          className="flex gap-2"
        >
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type instead…"
            enterKeyHint="send"
            autoCapitalize="sentences"
            className="flex-1 min-w-0"
          />
          <button
            type="submit"
            disabled={!textInput.trim()}
            className="rounded-lg bg-wise-500 hover:bg-wise-600 disabled:opacity-50 text-ink-900 font-medium px-4 shrink-0"
          >
            Invia
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowText(true)}
          className="text-sm text-ink-200 hover:text-ink-50 underline-offset-4 hover:underline self-center"
        >
          or type instead
        </button>
      )}
    </div>
  );
}
