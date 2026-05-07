'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VoiceOrb } from '@/components/voice/voice-orb';
import { useVoiceTutor } from '@/hooks/use-voice-tutor';

interface Props {
  firstName: string;
  recommendationReason: string;
  sessionMinutes: number;
}

interface WiseTurn {
  intent: string;
  wiseMessage: string;
  actions: Array<{ type: string; lessonId?: string }>;
}

export function CommandCenter({ firstName, recommendationReason, sessionMinutes }: Props) {
  const router = useRouter();
  const [wiseLine, setWiseLine] = useState<string>('');
  const [userLine, setUserLine] = useState<string>('');
  const [pending, setPending] = useState(false);

  const tutor = useVoiceTutor({
    sttLanguage: 'en',
    ttsLanguage: 'en',
    onUserSpeech: async (text) => {
      setUserLine(text);
      await sendToWise(text);
    },
  });

  async function sendToWise(message: string) {
    setPending(true);
    try {
      const res = await fetch('/api/wise/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'voice',
          message,
          context: { screen: 'command_center' },
        }),
      });
      const data: WiseTurn = await res.json();
      setWiseLine(data.wiseMessage);
      void tutor.speak(data.wiseMessage);

      const startAction = data.actions.find((a) => a.type === 'START_LESSON' && a.lessonId);
      if (startAction?.lessonId) {
        router.push(`/lesson/${startAction.lessonId}`);
        return;
      }
      const generateAction = data.actions.find((a) => a.type === 'GENERATE_LESSON');
      if (generateAction) {
        const gen = await fetch('/api/lessons/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonType: 'daily_mission', userRequest: message }),
        });
        const out = await gen.json();
        if (out.lesson?.id) router.push(`/lesson/${out.lesson.id}`);
      }
    } catch {
      const fallback = 'Sorry — something went sideways. Try again?';
      setWiseLine(fallback);
      void tutor.speak(fallback);
    } finally {
      setPending(false);
    }
  }

  async function startMission() {
    setPending(true);
    try {
      const gen = await fetch('/api/lessons/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonType: 'daily_mission' }),
      });
      const out = await gen.json();
      if (out.lesson?.id) router.push(`/lesson/${out.lesson.id}`);
    } finally {
      setPending(false);
    }
  }

  function statusText(): string {
    switch (tutor.state) {
      case 'speaking':
        return 'Wise is speaking…';
      case 'listening':
        return 'Listening — tap to stop';
      case 'processing_transcription':
        return 'Got it — transcribing…';
      case 'thinking':
        return 'Thinking…';
      case 'awaiting_user_response':
      case 'idle':
      case 'paused':
      default:
        return pending ? 'Working…' : 'Tap the orb to talk to Wise';
    }
  }

  function onOrbTap() {
    if (tutor.state === 'speaking') {
      tutor.cancel();
      return;
    }
    void tutor.toggleListen();
  }

  return (
    <div className="flex flex-col items-center gap-8 sm:gap-10">
      <div className="text-center w-full">
        <div className="text-xs uppercase tracking-[0.2em] text-ink-200">Today</div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink-50 mt-2 leading-tight">
          Welcome back, {firstName}.
        </h1>
        <p className="text-sm sm:text-base text-ink-200 mt-2 max-w-md mx-auto">
          {recommendationReason}
        </p>
      </div>

      <VoiceOrb
        state={tutor.state}
        size="lg"
        amplitude={tutor.amplitude}
        onTap={onOrbTap}
      />

      <div className="text-center min-h-[3.5rem] max-w-xl">
        {wiseLine ? (
          <p className="font-display text-xl sm:text-2xl text-ink-50 animate-fade-up">{wiseLine}</p>
        ) : (
          <p className="text-ink-200 text-sm">{statusText()}</p>
        )}
        {userLine && (
          <p className="mt-2 text-sm text-ink-200 italic">you: &ldquo;{userLine}&rdquo;</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-xl">
        <button
          onClick={startMission}
          disabled={pending}
          className="text-left rounded-2xl p-5 sm:p-6 bg-wise-500 hover:bg-wise-600 active:bg-wise-700 text-ink-900 transition disabled:opacity-60"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">Start now</div>
          <div className="font-display text-xl sm:text-2xl mt-2">Today&apos;s mission</div>
          <div className="text-sm mt-1 opacity-90">~{sessionMinutes} min</div>
        </button>
        <a
          href="/vocabulary?dueForReview=true"
          className="text-left rounded-2xl p-5 sm:p-6 surface text-ink-50 hover:border-wise-500/40 transition"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200">Review</div>
          <div className="font-display text-xl sm:text-2xl mt-2">Vocabulary due</div>
          <div className="text-sm mt-1 text-ink-200">Catch up on what you&apos;ve learned</div>
        </a>
      </div>
    </div>
  );
}
