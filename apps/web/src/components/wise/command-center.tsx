'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, Sparkles } from 'lucide-react';
import { VoiceOrb } from '@/components/voice/voice-orb';
import { useVoiceTutor } from '@/hooks/use-voice-tutor';

interface Props {
  firstName: string;
  sessionMinutes: number;
}

interface WiseTurn {
  intent: string;
  wiseMessage: string;
  actions: Array<{ type: string; lessonId?: string }>;
}

interface GreetingResponse {
  greeting: string;
  context: {
    streakDays: number;
    dueSkillCount: number;
    dueVocabCount: number;
    recentMistakeSkillNames: string[];
    lastSessionAgoDays: number | null;
  };
}

interface SummaryResponse {
  xpTotal: number;
  streakDays: number;
  longestStreakDays: number;
}

export function CommandCenter({ firstName, sessionMinutes }: Props) {
  const router = useRouter();
  const [greeting, setGreeting] = useState<GreetingResponse | null>(null);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [wiseLine, setWiseLine] = useState<string>('');
  const [userLine, setUserLine] = useState<string>('');
  const [pending, setPending] = useState(false);
  const greetedRef = useRef(false);

  const tutor = useVoiceTutor({
    sttLanguage: 'en',
    ttsLanguage: 'en',
    autoListenAfterSpeak: true, // turn-taking
    onUserSpeech: async (text) => {
      setUserLine(text);
      await sendToWise(text);
    },
  });

  // Boot: fetch greeting + summary in parallel; speak greeting once
  useEffect(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;
    (async () => {
      try {
        const [greetRes, summaryRes] = await Promise.all([
          fetch('/api/wise/greeting').then((r) => r.json() as Promise<GreetingResponse>),
          fetch('/api/gamification/summary').then((r) => r.json() as Promise<SummaryResponse>),
        ]);
        setGreeting(greetRes);
        setSummary(summaryRes);
        setWiseLine(greetRes.greeting);
        await tutor.speak(greetRes.greeting);
      } catch (e) {
        console.error('command-center boot failed', e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      // Otherwise: speak the reply and auto-listen for the next turn (default).
      await tutor.speak(data.wiseMessage);
    } catch {
      const fallback = "Sorry — I missed that. Try again?";
      setWiseLine(fallback);
      await tutor.speak(fallback);
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
        return 'Wise is speaking — tap to interrupt';
      case 'listening':
        return 'Listening — tap when you’re done';
      case 'processing_transcription':
        return 'Got it…';
      case 'thinking':
        return 'Thinking…';
      default:
        return pending ? 'Working…' : 'Tap the orb to talk to Wise';
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

  const dueCount =
    (greeting?.context.dueSkillCount ?? 0) + (greeting?.context.dueVocabCount ?? 0);

  return (
    <div className="flex flex-col items-center gap-7 sm:gap-9">
      {summary && (summary.streakDays > 0 || summary.xpTotal > 0) && (
        <div className="flex items-center gap-3 text-sm text-ink-200">
          {summary.streakDays > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Flame size={14} className="text-wise-400" aria-hidden />
              <span className="font-medium text-ink-50">{summary.streakDays}</span>
              <span>day{summary.streakDays === 1 ? '' : 's'}</span>
            </span>
          )}
          {summary.streakDays > 0 && summary.xpTotal > 0 && (
            <span className="opacity-30">·</span>
          )}
          {summary.xpTotal > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={14} className="text-wise-400" aria-hidden />
              <span className="font-medium text-ink-50">{summary.xpTotal.toLocaleString()}</span>
              <span>XP</span>
            </span>
          )}
        </div>
      )}

      <h1 className="font-display text-2xl sm:text-3xl text-ink-50 leading-tight">
        Welcome back, {firstName}.
      </h1>

      <VoiceOrb
        state={tutor.state}
        size="lg"
        amplitude={tutor.amplitude}
        onTap={onOrbTap}
      />

      <div className="text-center min-h-[5rem] max-w-xl">
        {wiseLine ? (
          <p className="font-display text-xl sm:text-2xl text-ink-50 animate-fade-up leading-snug">
            {wiseLine}
          </p>
        ) : (
          <p className="text-ink-200 text-sm">Loading…</p>
        )}
        {userLine && tutor.state !== 'listening' && (
          <p className="mt-3 text-sm text-ink-200 italic animate-fade-up">
            you: &ldquo;{userLine}&rdquo;
          </p>
        )}
      </div>

      <p className="text-xs text-ink-200 -mt-2">{statusText()}</p>

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
          <div className="font-display text-xl sm:text-2xl mt-2">
            {dueCount > 0 ? `${dueCount} due` : 'All caught up'}
          </div>
          <div className="text-sm mt-1 text-ink-200">
            {dueCount > 0 ? 'Quick wins for spaced repetition' : 'Come back tomorrow for more reviews'}
          </div>
        </a>
      </div>
    </div>
  );
}
