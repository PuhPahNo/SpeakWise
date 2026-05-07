'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { VoiceOrb } from '@/components/voice/voice-orb';
import { useVoiceTutor } from '@/hooks/use-voice-tutor';

interface Task {
  id: string;
  taskType: string;
  prompt: string;
  options: unknown;
  expectedAnswer: unknown;
  metadata: { explanation?: string; vocabularyTargets?: string[] };
  orderIndex: number;
}

interface Lesson {
  id: string;
  content: unknown;
}

interface CorrectionData {
  isCorrect: boolean;
  correctedAnswer: string;
  explanation: string;
  encouragement?: string | null;
  retryPrompt?: string | null;
}

type Phase = 'idle' | 'briefing' | 'task' | 'correction' | 'complete';

export function LessonPlayer({ lesson, tasks }: { lesson: Lesson; tasks: Task[] }) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [taskIndex, setTaskIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correction, setCorrection] = useState<CorrectionData | null>(null);
  const [pending, setPending] = useState(false);
  const [showText, setShowText] = useState(false);
  const [xpEarned, setXpEarned] = useState<number | null>(null);
  const briefedRef = useRef(false);

  const briefing =
    (lesson.content as { briefing?: string } | null)?.briefing ?? '';

  const tutor = useVoiceTutor({
    sttLanguage: 'it',
    ttsLanguage: 'en', // wise speaks English; learner speaks Italian back
    onUserSpeech: async (text) => {
      setAnswer(text);
      // For voice tasks, auto-submit
      await submit(text);
    },
  });

  const currentTask = tasks[taskIndex];
  const opts = (currentTask?.options ?? null) as
    | Array<{ value: string; label: string }>
    | null;

  // ── Session start + briefing narration ───────────────────────────────
  async function startSession() {
    if (briefedRef.current) return;
    briefedRef.current = true;
    setPending(true);
    try {
      const res = await fetch(`/api/lessons/${lesson.id}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'voice' }),
      });
      const data = await res.json();
      setSessionId(data.session.id);
      setPhase('briefing');
      if (briefing.trim()) {
        await tutor.speak(briefing, { autoListenAfter: false });
      }
      await beginTask(0);
    } finally {
      setPending(false);
    }
  }

  async function beginTask(idx: number) {
    setTaskIndex(idx);
    setCorrection(null);
    setAnswer('');
    setPhase('task');
    const t = tasks[idx];
    if (!t) return;
    // Wise narrates the prompt out loud. For multiple-choice + fill_blank we
    // do NOT auto-listen (user clicks an option or types). For speaking
    // tasks we auto-listen so the user can just answer.
    const isVoiceAnswerTask =
      t.taskType === 'speaking_prompt' ||
      t.taskType === 'translation' ||
      t.taskType === 'roleplay';
    await tutor.speak(t.prompt, { autoListenAfter: isVoiceAnswerTask });
  }

  async function submit(answerText?: string) {
    const a = (answerText ?? answer).trim();
    if (!a || !sessionId || !currentTask) return;
    setPending(true);
    try {
      const res = await fetch('/api/practice/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          lessonTaskId: currentTask.id,
          inputType:
            currentTask.taskType === 'multiple_choice' ? 'multiple_choice' : 'voice',
          answer: a,
        }),
      });
      const data = await res.json();
      const c = data.correction as Record<string, unknown>;
      const isCorrect = Boolean((data.userResponse as { isCorrect?: boolean }).isCorrect);
      const correctionPayload: CorrectionData = {
        isCorrect,
        correctedAnswer: String(c.correctedText ?? ''),
        explanation: String(c.explanation ?? ''),
        encouragement: (c.encouragement as string) ?? null,
        retryPrompt: (c.retryPrompt as string) ?? null,
      };
      setCorrection(correctionPayload);
      setPhase('correction');

      const spoken = isCorrect
        ? `${correctionPayload.encouragement ?? 'Nice.'} ${correctionPayload.explanation}`.trim()
        : `Not quite. ${correctionPayload.explanation} A better answer: ${correctionPayload.correctedAnswer}.`;
      await tutor.speak(spoken, { autoListenAfter: false });
    } finally {
      setPending(false);
    }
  }

  async function next() {
    if (taskIndex + 1 < tasks.length) {
      await beginTask(taskIndex + 1);
    } else {
      await finish();
    }
  }

  async function finish() {
    if (!sessionId) return;
    setPending(true);
    try {
      const res = await fetch(`/api/lessons/${lesson.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const data = (await res.json()) as {
        sessionSummary?: { tasksCompleted: number; mistakesDetected: number };
      };
      const correctCount =
        (data.sessionSummary?.tasksCompleted ?? 0) -
        (data.sessionSummary?.mistakesDetected ?? 0);
      // Approximate XP: 50 base + 5 per correct
      setXpEarned(50 + correctCount * 5);
      setPhase('complete');
      await tutor.speak(
        `Mission complete. You handled ${data.sessionSummary?.tasksCompleted ?? 0} tasks. Well done.`,
        { autoListenAfter: false },
      );
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
        if (phase === 'task' && opts) return 'Pick an answer below';
        if (phase === 'task') return 'Tap the orb to answer by voice';
        if (phase === 'correction') return 'Tap continue when ready';
        return ' ';
    }
  }

  function onOrbTap() {
    if (phase === 'idle') {
      void startSession();
      return;
    }
    if (tutor.state === 'speaking') {
      tutor.interrupt();
      if (phase === 'task' && !opts) void tutor.toggleListen();
      return;
    }
    if (phase === 'task' && !opts) {
      void tutor.toggleListen();
    }
  }

  // ── Idle: not yet started ────────────────────────────────────────────
  if (phase === 'idle') {
    return (
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <p className="text-ink-200 text-center max-w-md">{briefing || 'Ready when you are.'}</p>
        <VoiceOrb state="idle" size="xl" onTap={onOrbTap} ariaLabel="Begin lesson" />
        <button
          onClick={startSession}
          disabled={pending}
          className="rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-7 py-3 disabled:opacity-50"
        >
          {pending ? 'Starting…' : 'Begin lesson →'}
        </button>
      </div>
    );
  }

  // ── Complete ─────────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <div className="flex flex-col items-center gap-6 sm:gap-8 py-6">
        <VoiceOrb state={tutor.state} size="lg" amplitude={tutor.amplitude} />
        <div className="text-center">
          <div className="font-display text-3xl sm:text-4xl text-ink-50">Mission complete</div>
          {xpEarned !== null && (
            <div className="mt-3 inline-flex items-center gap-2 text-wise-400">
              <Sparkles size={18} />
              <span className="text-lg font-medium">+{xpEarned} XP</span>
            </div>
          )}
        </div>
        <button
          onClick={() => router.push('/command-center')}
          className="rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-6 py-3"
        >
          Back home
        </button>
      </div>
    );
  }

  // ── Task / Correction ────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-between w-full max-w-xl gap-3">
        <div className="text-xs text-ink-200 uppercase tracking-[0.2em]">
          {taskIndex + 1} / {tasks.length} · {currentTask?.taskType.replace(/_/g, ' ')}
        </div>
        <div className="h-1 w-24 sm:w-40 bg-white/8 rounded-full overflow-hidden" aria-hidden>
          <div
            className="h-full bg-wise-500 transition-all duration-500"
            style={{ width: `${((taskIndex + 1) / tasks.length) * 100}%` }}
          />
        </div>
      </div>

      <VoiceOrb
        state={tutor.state}
        size="lg"
        amplitude={tutor.amplitude}
        onTap={onOrbTap}
      />

      <div className="text-center max-w-2xl px-2">
        <p className="font-display text-xl sm:text-2xl text-ink-50 leading-snug animate-fade-up">
          {currentTask?.prompt}
        </p>
      </div>

      {/* Multiple-choice options — primary input for that task type */}
      {phase === 'task' && opts && (
        <div className="w-full max-w-xl space-y-2">
          {opts.map((o) => (
            <button
              key={o.value}
              onClick={() => {
                setAnswer(o.value);
                void submit(o.value);
              }}
              disabled={pending || tutor.state === 'speaking'}
              className="block w-full text-left rounded-xl px-4 py-3 surface text-ink-50 hover:border-wise-500/40 active:bg-white/5 transition disabled:opacity-50"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}

      {/* Voice answer ergonomics + collapsed text fallback */}
      {phase === 'task' && !opts && (
        <div className="flex flex-col items-center gap-3 w-full max-w-xl">
          {!showText ? (
            <button
              onClick={() => setShowText(true)}
              className="text-sm text-ink-200 hover:text-ink-50 underline-offset-4 hover:underline"
            >
              or type instead
            </button>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
              className="w-full flex gap-2"
            >
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer…"
                autoCapitalize="sentences"
                enterKeyHint="send"
                className="flex-1 min-w-0"
              />
              <button
                type="submit"
                disabled={pending || !answer.trim()}
                className="rounded-lg bg-wise-500 hover:bg-wise-600 disabled:opacity-50 text-ink-900 font-medium px-4 shrink-0"
              >
                Send
              </button>
            </form>
          )}
        </div>
      )}

      {/* Correction panel */}
      {phase === 'correction' && correction && (
        <div
          className={`w-full max-w-xl rounded-2xl p-4 sm:p-5 border ${
            correction.isCorrect
              ? 'bg-sage-500/10 border-sage-500/30 text-ink-50'
              : 'bg-wise-500/10 border-wise-500/30 text-ink-50'
          } animate-fade-up`}
        >
          <div className="font-medium">
            {correction.isCorrect ? '✓ Correct' : 'Not quite —'}
            {correction.encouragement ? ` ${correction.encouragement}` : ''}
          </div>
          {!correction.isCorrect && (
            <div className="mt-1 text-ink-100">
              Better: <span className="italic">{correction.correctedAnswer}</span>
            </div>
          )}
          <div className="mt-2 text-ink-200 text-sm">{correction.explanation}</div>
          <button
            onClick={next}
            className="mt-4 w-full sm:w-auto rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-5 py-3"
          >
            {taskIndex + 1 < tasks.length ? 'Continue →' : 'Finish lesson'}
          </button>
        </div>
      )}

      <p className="text-xs text-ink-200">{statusText()}</p>
    </div>
  );
}
