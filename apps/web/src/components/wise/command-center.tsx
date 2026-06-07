'use client';

import { useToast } from '@/components/ui/toast';
import { VoiceOrb } from '@/components/voice/voice-orb';
import { WiseChat } from '@/components/wise/wise-chat';
import { useVoiceTutor } from '@/hooks/use-voice-tutor';
import { ArrowRight, BookOpen, Flame, MessageSquareText, Mic, Sparkles } from 'lucide-react';
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
  const vstate = pending ? 'thinking' : tutor.state;
  const dotClass =
    vstate === 'listening'
      ? 's-listening'
      : vstate === 'speaking'
        ? 's-speaking'
        : vstate === 'thinking' || vstate === 'processing_transcription'
          ? 's-thinking'
          : '';
  const SUGGESTIONS = [
    'Help me practice the passato prossimo',
    'How do I order food at a restaurant?',
    'Quiz me on travel vocabulary',
  ];
  async function askSuggestion(s: string) {
    setUserLine(s);
    addTurn('user', s);
    try {
      await tutor.primeAudio();
    } catch {
      /* audio unlock is best-effort */
    }
    await sendToWise(s);
  }

  return (
    <div className="home-wrap">
      {summary && (summary.streakDays > 0 || summary.xpTotal > 0) && (
        <div className="mx-auto mb-4 flex items-center gap-3 text-sm text-ink-200">
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

      {/* Voice / Chat segmented toggle — flips the dashboard in place. Voice is
          disabled (and we stay in chat) when ElevenLabs TTS can't run from the
          server; it auto-enables once the plan is upgraded. */}
      <div className="seg mx-auto mb-6 w-full max-w-[260px]">
        <button
          type="button"
          onClick={() => switchMode('voice')}
          disabled={!voiceAvailable}
          aria-pressed={mode === 'voice'}
          title={voiceAvailable ? undefined : 'Voice needs an ElevenLabs plan upgrade'}
          className={`seg-btn ${mode === 'voice' ? 'on' : ''}`}
        >
          <Mic size={15} aria-hidden /> Voice
        </button>
        <button
          type="button"
          onClick={() => switchMode('text')}
          aria-pressed={mode === 'text'}
          className={`seg-btn ${mode === 'text' ? 'on' : ''}`}
        >
          <MessageSquareText size={15} aria-hidden /> Chat
        </button>
      </div>
      {!voiceAvailable && (
        <p className="-mt-4 mb-5 text-center text-[11px] text-ink-300">
          Voice is off — upgrade ElevenLabs to enable it.
        </p>
      )}

      {mode === 'text' ? (
        // Text chat fills the dashboard in place of the orb.
        <div className="h-[calc(100vh-13rem)] min-h-[440px] w-full">
          <WiseChat firstName={firstName} />
        </div>
      ) : (
        <>
          <div className="home-greeting">
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              {firstName ? `Bentornato, ${firstName}` : 'Bentornato'}
            </div>
            <p className="home-line">{wiseLine || `Ciao ${firstName}! Pronto per imparare?`}</p>
          </div>

          <div className="wave-holder">
            <VoiceOrb state={vstate} size="xl" amplitude={tutor.amplitude} onTap={onOrbTap} />
          </div>

          <div className="home-status">
            <span className={`status-dot ${dotClass}`} aria-hidden />
            {statusText()}
          </div>

          {turns.length === 0 ? (
            <div className="suggest-row">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="suggest"
                  disabled={pending}
                  onClick={() => void askSuggestion(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <div className="transcript" ref={convoRef}>
              {turns.map((t) => (
                <div key={t.ts} className={`tline ${t.role === 'user' ? 'user' : ''}`}>
                  <span className="tline-who">{t.role === 'wise' ? 'Wise' : 'You'}</span>
                  <span className="tline-text">{t.text}</span>
                </div>
              ))}
            </div>
          )}

          {comeback && (
            <button
              type="button"
              onClick={startComebackLesson}
              disabled={pending}
              className="card card-pad card-hover mt-7 w-full max-w-[600px] text-left disabled:opacity-60"
              style={{ borderColor: 'var(--accent-line)' }}
            >
              <div className="eyebrow" style={{ color: 'var(--accent)' }}>
                Welcome back
              </div>
              <div className="mt-2 font-display text-lg text-ink-50 sm:text-xl">
                {comeback.daysMissed === 1
                  ? 'A short reset — pick up where you left off'
                  : `It's been ${comeback.daysMissed} days. Quick warm-up to ease back in.`}
              </div>
              <div className="mt-1 text-sm text-ink-200">
                ~{comeback.recommendedDurationMinutes} min · low pressure, recent vocab
              </div>
            </button>
          )}

          <div className="home-actions">
            <button
              type="button"
              onClick={startMission}
              disabled={pending}
              className="card card-pad action-primary text-left disabled:opacity-60"
            >
              <div>
                <div className="eyebrow">
                  {immersionMode || languageRatio > 0.5 ? 'Inizia · Start' : 'Start'}
                </div>
                <div className="action-title">Today&apos;s mission</div>
                <div className="action-sub">~{sessionMinutes} min</div>
              </div>
              <span className="action-go">
                <ArrowRight size={20} aria-hidden />
              </span>
            </button>

            <a href="/vocabulary/review" className="card card-pad card-hover action-soft text-left">
              <div>
                <div className="eyebrow">
                  {immersionMode || languageRatio > 0.5 ? 'Ripasso · Review' : 'Review'}
                </div>
                <div className="action-title">
                  {dueCount > 0 ? `${dueCount} due` : 'All caught up'}
                </div>
                <div className="action-sub">
                  {dueCount > 0 ? 'Quick spaced-repetition wins' : 'Come back tomorrow'}
                </div>
              </div>
              <span className="action-go ghost">
                <ArrowRight size={20} aria-hidden />
              </span>
            </a>

            <a
              href="/lessons"
              className="card card-pad card-hover full-span flex items-center gap-3.5"
            >
              <span className="mode-icon">
                <BookOpen size={18} aria-hidden />
              </span>
              <div>
                <div className="action-title sm">Past lessons</div>
                <div className="action-sub">Revisit what you&apos;ve completed</div>
              </div>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
