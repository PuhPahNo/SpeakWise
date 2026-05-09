'use client';

import { useToast } from '@/components/ui/toast';
import { VoiceOrb } from '@/components/voice/voice-orb';
import { useVoiceTutor } from '@/hooks/use-voice-tutor';
import { Flame, Globe, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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

interface ComebackResponse {
  offer: { daysMissed: number; recommendedDurationMinutes: number; reason: string } | null;
}

export function CommandCenter({ firstName, sessionMinutes }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [greeting, setGreeting] = useState<GreetingResponse | null>(null);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [comeback, setComeback] = useState<ComebackResponse['offer']>(null);
  const [wiseLine, setWiseLine] = useState<string>('');
  const [userLine, setUserLine] = useState<string>('');
  const [pending, setPending] = useState(false);
  const greetedRef = useRef(false);
  // Italian language settings — fetched once on mount so the toggle
  // shows the current state immediately.
  const [languageRatio, setLanguageRatio] = useState<number>(0.1);
  const [immersionMode, setImmersionMode] = useState<boolean>(false);

  const tutor = useVoiceTutor({
    // Auto-detect on both ends: the learner might reply in either
    // language on this screen, and Wise's reply mixes naturally. Italian
    // phrases get correct phonetics; English stays warm English; same
    // voice across both.
    sttLanguage: 'auto',
    ttsLanguage: 'auto',
    autoListenAfterSpeak: true, // turn-taking
    onUserSpeech: async (text) => {
      setUserLine(text);
      await sendToWise(text);
    },
  });

  // Boot: fetch greeting + summary + comeback in parallel. We DISPLAY the
  // greeting eagerly but do NOT auto-speak it — browser autoplay policy
  // blocks audio without a user gesture. The first orb tap (or
  // primeAndSpeak) plays the greeting and unlocks audio for the session.
  useEffect(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;
    (async () => {
      try {
        const [greetRes, summaryRes, comebackRes, profileRes] = await Promise.all([
          fetch('/api/wise/greeting').then((r) => r.json() as Promise<GreetingResponse>),
          fetch('/api/gamification/summary').then((r) => r.json() as Promise<SummaryResponse>),
          fetch('/api/gamification/comeback').then((r) => r.json() as Promise<ComebackResponse>),
          fetch('/api/profile').then(
            (r) => r.json() as Promise<{ languageRatio?: number; immersionMode?: boolean }>,
          ),
        ]);
        setGreeting(greetRes);
        setSummary(summaryRes);
        setComeback(comebackRes.offer);
        setWiseLine(greetRes.greeting);
        if (profileRes.languageRatio != null)
          setLanguageRatio(Number(profileRes.languageRatio));
        if (profileRes.immersionMode != null)
          setImmersionMode(Boolean(profileRes.immersionMode));
      } catch (e) {
        console.error('command-center boot failed', e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // True once the user has tapped the orb. Ref so rapid double-taps see
  // the same value synchronously (state updates are async and would let
  // a second tap fire speak() again before the first finished).
  const greetingPlayedRef = useRef(false);
  const [greetingPlayed, setGreetingPlayed] = useState(false);

  async function startComebackLesson() {
    if (!comeback) return;
    setPending(true);
    try {
      const gen = await fetch('/api/lessons/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonType: 'recovery',
          durationMinutes: comeback.recommendedDurationMinutes,
          userRequest: 'Easy comeback lesson — re-engage and rebuild momentum.',
        }),
      });
      const out = await gen.json();
      if (out.lesson?.id) router.push(`/lesson/${out.lesson.id}`);
    } finally {
      setPending(false);
    }
  }

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

      // The model occasionally returns a START_LESSON with a skill slug or
      // topic label as lessonId. Treat any non-UUID lessonId as an
      // implicit GENERATE_LESSON instead — never push to /lesson/<garbage>.
      const isUuid = (v: unknown): v is string =>
        typeof v === 'string' &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
      const startAction = data.actions.find(
        (a) => a.type === 'START_LESSON' && isUuid(a.lessonId),
      );
      if (startAction?.lessonId) {
        await tutor.speak(data.wiseMessage, { autoListenAfter: false });
        router.push(`/lesson/${startAction.lessonId}`);
        return;
      }
      const generateAction =
        data.actions.find((a) => a.type === 'GENERATE_LESSON') ??
        // Promote a START_LESSON-with-slug into GENERATE_LESSON so the
        // conversation still leads somewhere useful.
        data.actions.find((a) => a.type === 'START_LESSON' && !isUuid(a.lessonId));
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
      const fallback = 'Sorry — I missed that. Try again?';
      setWiseLine(fallback);
      await tutor.speak(fallback);
    } finally {
      setPending(false);
    }
  }

  // Toggle Italian-immersion. Persists to the profile so future Wise
  // turns and lessons honor it. Optimistic local update for snappy feel.
  async function toggleImmersion() {
    const next = !immersionMode;
    setImmersionMode(next);
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ immersionMode: next }),
      });
      toast.success(
        next ? 'Modalità immersione attiva' : 'Immersion off',
        next
          ? 'Wise will speak only Italian until you toggle this back.'
          : 'Wise is back to your usual language mix.',
      );
    } catch (e) {
      // Roll back if the network blip fails the patch
      setImmersionMode(!next);
      console.error('immersion toggle failed', e);
    }
  }

  // Map the stored ratio to a friendly label for the chip.
  function ratioLabel(): string {
    if (immersionMode) return 'Immersione';
    const r = languageRatio;
    if (r >= 0.85) return '~95% IT';
    if (r >= 0.6) return '~70% IT';
    if (r >= 0.35) return '~50% IT';
    if (r >= 0.15) return '~25% IT';
    return '~10% IT';
  }

  async function startMission() {
    setPending(true);
    try {
      const gen = await fetch('/api/lessons/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonType: 'daily_mission' }),
      });
      if (!gen.ok) {
        const errBody = await gen.json().catch(() => ({}));
        toast.error('Couldn’t build that mission', errBody.message ?? 'Try again in a moment.');
        return;
      }
      const out = await gen.json();
      if (out.lesson?.id) router.push(`/lesson/${out.lesson.id}`);
    } catch (e) {
      console.error('mission start failed', e);
      toast.error('Network blip', 'Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  function statusText(): string {
    if (greeting && !greetingPlayed) return 'Tap the orb to hear Wise';
    switch (tutor.state) {
      case 'speaking':
        return 'Wise is speaking — tap to interrupt';
      case 'listening':
        return 'Listening — auto-stops on silence';
      case 'processing_transcription':
        return 'Got it…';
      case 'thinking':
        return 'Thinking…';
      default:
        return pending ? 'Working…' : 'Tap the orb to talk to Wise';
    }
  }

  async function onOrbTap() {
    // First tap plays the greeting and turn-takes from there. Ref-gate
    // is synchronous — a rapid double-tap sees `true` on the second
    // call and falls through, instead of firing speak() twice.
    if (greeting && !greetingPlayedRef.current) {
      greetingPlayedRef.current = true;
      setGreetingPlayed(true);
      // primeAudio MUST run inside this gesture handler before the TTS
      // fetch resolves — that unlocks the audio context for the session.
      await tutor.primeAudio();
      await tutor.speak(greeting.greeting);
      return;
    }

    // Subsequent taps: prime is already done, normal flow.
    if (tutor.state === 'speaking') {
      tutor.interrupt();
      void tutor.toggleListen();
      return;
    }
    void tutor.toggleListen();
  }

  const dueCount = (greeting?.context.dueSkillCount ?? 0) + (greeting?.context.dueVocabCount ?? 0);

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
          {summary.streakDays > 0 && summary.xpTotal > 0 && <span className="opacity-30">·</span>}
          {summary.xpTotal > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={14} className="text-wise-400" aria-hidden />
              <span className="font-medium text-ink-50">{summary.xpTotal.toLocaleString()}</span>
              <span>XP</span>
            </span>
          )}
        </div>
      )}

      {/* Italian-immersion chip — tap to flip the whole experience into
          Italian-only mode (overrides languageRatio until tapped off). */}
      <button
        type="button"
        onClick={toggleImmersion}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-all border ${
          immersionMode
            ? 'bg-wise-500/20 border-wise-500/60 text-wise-200'
            : 'bg-white/3 border-white/10 text-ink-200 hover:border-wise-500/40'
        }`}
        aria-pressed={immersionMode}
        title={immersionMode ? "Tap to leave full Italian immersion" : 'Tap for full Italian immersion'}
      >
        <Globe size={12} className={immersionMode ? 'text-wise-300' : 'text-ink-300'} aria-hidden />
        <span>{ratioLabel()}</span>
        {immersionMode && <span className="opacity-70">· tap to exit</span>}
      </button>

      <h1 className="font-display text-2xl sm:text-3xl text-ink-50 leading-tight">
        Welcome back, {firstName}.
      </h1>

      <VoiceOrb
        // Show thinking state during pending background work so the user
        // sees movement immediately on tap, not a static orb.
        state={pending ? 'thinking' : tutor.state}
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

      {comeback && (
        <button
          onClick={startComebackLesson}
          disabled={pending}
          className="w-full max-w-xl text-left rounded-2xl p-5 sm:p-6 surface border-wise-500/40 text-ink-50 hover:border-wise-500/70 transition disabled:opacity-60"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-wise-400">Welcome back</div>
          <div className="font-display text-lg sm:text-xl mt-2">
            {comeback.daysMissed === 1
              ? 'A short reset — pick up where you left off'
              : `It's been ${comeback.daysMissed} days. Quick warm-up to ease back in.`}
          </div>
          <div className="text-sm mt-1 text-ink-200">
            ~{comeback.recommendedDurationMinutes} min · low pressure, recent vocab
          </div>
        </button>
      )}

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-xl">
        <button
          onClick={startMission}
          disabled={pending}
          className="text-left rounded-2xl p-5 sm:p-6 bg-wise-500 hover:bg-wise-600 active:bg-wise-700 text-ink-900 transition disabled:opacity-60"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">Inizia</div>
          <div className="font-display text-xl sm:text-2xl mt-2">Today&apos;s mission</div>
          <div className="text-sm mt-1 opacity-90">~{sessionMinutes} min</div>
        </button>
        <a
          href="/vocabulary/review"
          className="text-left rounded-2xl p-5 sm:p-6 surface text-ink-50 hover:border-wise-500/40 transition"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200">Ripasso</div>
          <div className="font-display text-xl sm:text-2xl mt-2">
            {dueCount > 0 ? `${dueCount} due` : 'All caught up'}
          </div>
          <div className="text-sm mt-1 text-ink-200">
            {dueCount > 0 ? 'Quick wins for spaced repetition' : 'Come back tomorrow'}
          </div>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xl text-sm">
        <a
          href="/talk"
          className="text-center rounded-xl px-4 py-3 surface text-ink-100 hover:text-ink-50 hover:border-wise-500/40 transition"
        >
          Talk freely with Wise
        </a>
        <a
          href="/lessons"
          className="text-center rounded-xl px-4 py-3 surface text-ink-100 hover:text-ink-50 hover:border-wise-500/40 transition"
        >
          Past lessons
        </a>
      </div>
    </div>
  );
}
