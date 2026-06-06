'use client';

import { useToast } from '@/components/ui/toast';
import { VoiceOrb } from '@/components/voice/voice-orb';
import { WiseChat } from '@/components/wise/wise-chat';
import { useVoiceTutor } from '@/hooks/use-voice-tutor';
import { Flame, MessageSquareText, Mic, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Props {
  firstName: string;
  sessionMinutes: number;
  /** From LearnerProfile.preferredInteractionMode; user can flip per-session. */
  defaultMode?: 'voice' | 'text';
  /** Whether ElevenLabs TTS works from the server (paid plan). When false,
   *  voice is disabled and we stay in chat. */
  voiceAvailable?: boolean;
}

interface WiseTurn {
  intent: string;
  wiseMessage: string;
  actions: Array<{ type: string; lessonId?: string }>;
}

interface Turn {
  role: 'user' | 'wise';
  text: string;
  ts: number;
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

export function CommandCenter({
  firstName,
  sessionMinutes,
  defaultMode = 'voice',
  voiceAvailable = true,
}: Props) {
  const router = useRouter();
  const toast = useToast();
  const [greeting, setGreeting] = useState<GreetingResponse | null>(null);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [comeback, setComeback] = useState<ComebackResponse['offer']>(null);
  const [wiseLine, setWiseLine] = useState<string>('');
  const [userLine, setUserLine] = useState<string>('');
  const [pending, setPending] = useState(false);
  // Running transcript of the spoken conversation (folded in from the old
  // Freestyle/Talk page so Home is the single conversational surface).
  const [turns, setTurns] = useState<Turn[]>([]);
  const convoRef = useRef<HTMLDivElement>(null);
  const greetedRef = useRef(false);
  // Italian language settings — fetched on mount so the bilingual
  // labels (Inizia/Start, Ripasso/Review) pick the right word. The
  // immersion + tutor controls themselves now live on /profile, not
  // on this voice-first home page.
  const [languageRatio, setLanguageRatio] = useState<number>(0.1);
  const [immersionMode, setImmersionMode] = useState<boolean>(false);
  // Per-session interaction mode. Initialized from the profile default
  // passed by the server but tweakable inline so users can flip into a
  // voice conversation without changing their profile preference.
  const [mode, setMode] = useState<'voice' | 'text'>(defaultMode);

  // Remember the chosen interface across visits (per-browser). Initialized
  // from the profile default; the segmented toggle below persists changes.
  useEffect(() => {
    // When voice can't work from the server, force chat and ignore any stale
    // 'voice' choice in storage — otherwise the orb would silently fail.
    if (!voiceAvailable) {
      setMode('text');
      return;
    }
    try {
      const saved = localStorage.getItem('sw:homeMode');
      if (saved === 'voice' || saved === 'text') setMode(saved);
    } catch {
      /* private mode / no storage — keep the profile default */
    }
  }, [voiceAvailable]);
  const switchMode = (m: 'voice' | 'text') => {
    if (m === 'voice' && !voiceAvailable) return; // voice disabled — no-op
    setMode(m);
    try {
      localStorage.setItem('sw:homeMode', m);
    } catch {
      /* non-fatal */
    }
  };

  const addTurn = (role: 'user' | 'wise', text: string) =>
    setTurns((t) => [...t, { role, text, ts: Date.now() }]);

  // Keep the transcript pinned to the latest turn.
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new turns
  useEffect(() => {
    convoRef.current?.scrollTo({ top: convoRef.current.scrollHeight, behavior: 'smooth' });
  }, [turns]);

  const tutor = useVoiceTutor({
    // Auto-detect on both ends: the learner might reply in either
    // language on this screen, and Wise's reply mixes naturally. Italian
    // phrases get correct phonetics; English stays warm English; same
    // voice across both.
    sttLanguage: 'auto',
    ttsLanguage: 'auto',
    autoListenAfterSpeak: true, // turn-taking
    // The hook respects `mode === 'text'` by no-op'ing speak() so
    // chat-style users never hear unexpected narration. Calls to
    // tutor.speak() from below still work in voice mode; in text mode
    // they short-circuit cleanly. Explicit "Listen" buttons use
    // tutor.playOnce() to bypass the gate.
    mode,
    onUserSpeech: async (text) => {
      setUserLine(text);
      addTurn('user', text);
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
        if (profileRes.languageRatio != null) setLanguageRatio(Number(profileRes.languageRatio));
        if (profileRes.immersionMode != null) setImmersionMode(Boolean(profileRes.immersionMode));
      } catch (e) {
        console.error('command-center boot failed', e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // True once the user has tapped the orb. Ref so rapid double-taps see
  // the same value synchronously (state updates are async and would let
  // a second tap fire speak() again before the first finished).
  //
  // We also persist the "spoken once" flag to sessionStorage so the
  // greeting doesn't re-voice every time the user navigates away and
  // back to the command-center within the same tab. Without this gate,
  // the page remount fetches a fresh greeting and the first orb tap
  // replays it — which the user perceives as Wise repeating itself
  // every time they come back to the page.
  const GREETING_SESSION_KEY = 'sw:greetingVoicedOnce';
  const greetingPlayedRef = useRef(false);
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  // On mount: if this tab session already heard the greeting, mark it
  // played so subsequent orb taps go straight to chat instead of
  // re-greeting.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(GREETING_SESSION_KEY) === '1') {
      greetingPlayedRef.current = true;
      setGreetingPlayed(true);
    }
  }, []);

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
      // Surface failure visibly — previously this silently swallowed
      // non-200 responses, so the user saw "nothing happens" on tap.
      if (!gen.ok) {
        const errBody = await gen.json().catch(() => ({}));
        toast.error('Couldn’t build that lesson', errBody.message ?? 'Try again in a moment.');
        return;
      }
      const out = await gen.json();
      if (out.lesson?.id) router.push(`/lesson/${out.lesson.id}`);
      else toast.error('Couldn’t build that lesson', 'No lesson id in response — try again.');
    } catch (e) {
      console.error('comeback lesson start failed', e);
      toast.error('Network blip', 'Check your connection and try again.');
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
      addTurn('wise', data.wiseMessage);

      // The model occasionally returns a START_LESSON with a skill slug or
      // topic label as lessonId. Treat any non-UUID lessonId as an
      // implicit GENERATE_LESSON instead — never push to /lesson/<garbage>.
      const isUuid = (v: unknown): v is string =>
        typeof v === 'string' &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
      const startAction = data.actions.find((a) => a.type === 'START_LESSON' && isUuid(a.lessonId));
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
      addTurn('wise', fallback);
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
      // Persist across remounts so a tab navigation away-and-back
      // doesn't replay the greeting. Cleared when the tab closes.
      try {
        sessionStorage.setItem(GREETING_SESSION_KEY, '1');
      } catch {
        /* private browsing or quota — non-fatal */
      }
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

      {/* Language-immersion + tutor controls moved off the home page —
          they live on /profile now. */}

      <h1 className="font-display text-2xl sm:text-3xl text-ink-50 leading-tight">
        Welcome back, {firstName}.
      </h1>

      {/* Interface toggle — flips the home dashboard between the voice orb and
          the text chat IN PLACE. The choice persists per-browser. Voice is
          disabled (and we stay in chat) when ElevenLabs TTS can't run from the
          server; it auto-enables once the plan is upgraded. */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="inline-flex items-center rounded-full surface p-0.5 text-xs">
          <button
            type="button"
            onClick={() => switchMode('voice')}
            disabled={!voiceAvailable}
            aria-pressed={mode === 'voice'}
            title={voiceAvailable ? undefined : 'Voice needs an ElevenLabs plan upgrade'}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
              mode === 'voice' ? 'bg-wise-500 text-ink-900' : 'text-ink-200 hover:text-ink-50'
            } ${voiceAvailable ? '' : 'cursor-not-allowed opacity-40 hover:text-ink-200'}`}
          >
            <Mic size={13} aria-hidden /> Voice
          </button>
          <button
            type="button"
            onClick={() => switchMode('text')}
            aria-pressed={mode === 'text'}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
              mode === 'text' ? 'bg-wise-500 text-ink-900' : 'text-ink-200 hover:text-ink-50'
            }`}
          >
            <MessageSquareText size={13} aria-hidden /> Chat
          </button>
        </div>
        {!voiceAvailable && (
          <p className="text-[11px] text-ink-300">
            Voice is off — upgrade ElevenLabs to enable it.
          </p>
        )}
      </div>

      {mode === 'text' ? (
        // Text chat fills the dashboard in place of the orb.
        <div className="w-full h-[calc(100dvh-9.5rem)] min-h-[420px]">
          <WiseChat firstName={firstName} />
        </div>
      ) : (
        <>
          {/* ── Voice interface ───────────────────────────────────────── */}
          <VoiceOrb
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

          {/* Running transcript — appears once a spoken conversation starts.
              This is the freestyle "Talk" experience, folded into Home. */}
          {turns.length > 0 && (
            <div
              ref={convoRef}
              className="w-full max-w-xl max-h-[34vh] overflow-y-auto surface rounded-2xl p-4 space-y-2.5"
            >
              {turns.map((t) => (
                <div key={t.ts} className={t.role === 'user' ? 'text-right' : 'text-left'}>
                  <div
                    className={`inline-block max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
                      t.role === 'user'
                        ? 'bg-wise-500/15 border border-wise-500/25 text-ink-50'
                        : 'bg-white/5 border border-white/10 text-ink-50'
                    }`}
                  >
                    {t.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {comeback && (
            <button
              onClick={startComebackLesson}
              disabled={pending}
              className="w-full max-w-xl text-left rounded-2xl p-5 sm:p-6 surface border-wise-500/40 text-ink-50 hover:border-wise-500/70 transition disabled:opacity-60"
            >
              <div className="text-[11px] uppercase tracking-[0.2em] text-wise-400">
                Welcome back
              </div>
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
              <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">
                {immersionMode || languageRatio > 0.5 ? 'Inizia' : 'Start'}
              </div>
              <div className="font-display text-xl sm:text-2xl mt-2">Today&apos;s mission</div>
              <div className="text-sm mt-1 opacity-90">~{sessionMinutes} min</div>
            </button>
            <a
              href="/vocabulary/review"
              className="text-left rounded-2xl p-5 sm:p-6 surface text-ink-50 hover:border-wise-500/40 transition"
            >
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200">
                {immersionMode || languageRatio > 0.5 ? 'Ripasso' : 'Review'}
              </div>
              <div className="font-display text-xl sm:text-2xl mt-2">
                {dueCount > 0 ? `${dueCount} due` : 'All caught up'}
              </div>
              <div className="text-sm mt-1 text-ink-200">
                {dueCount > 0 ? 'Quick wins for spaced repetition' : 'Come back tomorrow'}
              </div>
            </a>
          </div>

          <div className="w-full max-w-xl text-sm">
            <a
              href="/lessons"
              className="block text-center rounded-xl px-4 py-3 surface text-ink-100 hover:text-ink-50 hover:border-wise-500/40 transition"
            >
              Past lessons
            </a>
          </div>
        </>
      )}
    </div>
  );
}
