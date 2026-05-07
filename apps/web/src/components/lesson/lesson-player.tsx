'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

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

export function LessonPlayer({ lesson, tasks }: { lesson: Lesson; tasks: Task[] }) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correction, setCorrection] = useState<CorrectionData | null>(null);
  const [pending, setPending] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const currentTask = tasks[taskIndex];

  async function startSession() {
    setPending(true);
    try {
      const res = await fetch(`/api/lessons/${lesson.id}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'text' }),
      });
      const data = await res.json();
      setSessionId(data.session.id);
    } finally {
      setPending(false);
    }
  }

  async function submit() {
    if (!sessionId || !currentTask || !answer.trim()) return;
    setPending(true);
    try {
      const res = await fetch('/api/practice/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          lessonTaskId: currentTask.id,
          inputType: 'text',
          answer,
        }),
      });
      const data = await res.json();
      const ai = (data.correction ?? data) as Record<string, unknown>;
      setCorrection({
        isCorrect: Boolean((data.userResponse as { isCorrect?: boolean }).isCorrect),
        correctedAnswer: String(ai.correctedText ?? ai.correctedAnswer ?? ''),
        explanation: String(ai.explanation ?? ''),
        encouragement: (ai.encouragement as string) ?? null,
        retryPrompt: (ai.retryPrompt as string) ?? null,
      });
    } finally {
      setPending(false);
    }
  }

  function next() {
    setCorrection(null);
    setAnswer('');
    if (taskIndex + 1 < tasks.length) {
      setTaskIndex(taskIndex + 1);
    } else {
      finish();
    }
  }

  async function finish() {
    if (!sessionId) return;
    setPending(true);
    try {
      await fetch(`/api/lessons/${lesson.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      setCompleted(true);
    } finally {
      setPending(false);
    }
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const fd = new FormData();
      fd.append('audio', blob, 'speech.webm');
      fd.append('language', 'it');
      const res = await fetch('/api/voice/transcribe', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.text) setAnswer(data.text);
      stream.getTracks().forEach((t) => t.stop());
      setRecording(false);
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
  }

  function stopRecording() {
    recorderRef.current?.stop();
  }

  if (completed) {
    return (
      <div className="rounded-2xl bg-wise-50 p-6 sm:p-8 text-center">
        <div className="font-display text-xl sm:text-2xl">Mission complete.</div>
        <p className="text-ink-600 mt-2">Wise is updating your memory…</p>
        <button
          onClick={() => router.push('/command-center')}
          className="mt-5 sm:mt-6 w-full sm:w-auto rounded-full bg-wise-500 text-white px-6 py-3 hover:bg-wise-600"
        >
          Back to home
        </button>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <button
        onClick={startSession}
        disabled={pending}
        className="w-full sm:w-auto rounded-full bg-wise-500 text-white px-6 py-3 hover:bg-wise-600 disabled:opacity-50"
      >
        {pending ? 'Starting…' : 'Begin lesson →'}
      </button>
    );
  }

  if (!currentTask) {
    return (
      <button
        onClick={finish}
        disabled={pending}
        className="w-full sm:w-auto rounded-full bg-wise-500 text-white px-6 py-3 hover:bg-wise-600"
      >
        Finish lesson
      </button>
    );
  }

  const opts = (currentTask.options ?? null) as Array<{ value: string; label: string }> | null;

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-ink-500 uppercase tracking-wider truncate">
          {taskIndex + 1} / {tasks.length} · {currentTask.taskType.replace(/_/g, ' ')}
        </div>
        <div className="h-1 w-20 sm:w-32 bg-ink-100 rounded-full overflow-hidden shrink-0" aria-hidden="true">
          <div
            className="h-full bg-wise-500 transition-all"
            style={{ width: `${((taskIndex + 1) / tasks.length) * 100}%` }}
          />
        </div>
      </div>
      <div className="font-display text-lg sm:text-xl mt-3 leading-snug">{currentTask.prompt}</div>

      {opts ? (
        <div className="mt-4 space-y-2">
          {opts.map((o) => (
            <button
              key={o.value}
              onClick={() => setAnswer(o.value)}
              className={`block w-full text-left rounded-lg border px-4 py-3 transition ${
                answer === o.value
                  ? 'border-wise-500 bg-wise-50'
                  : 'border-ink-200 hover:border-ink-300 active:bg-ink-50'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={
              currentTask.taskType === 'speaking_prompt'
                ? 'Speak (Italian) or type your answer…'
                : 'Type your answer…'
            }
            rows={3}
            autoCapitalize="sentences"
            className="w-full rounded-lg border border-ink-200 px-3 py-2"
          />
          {currentTask.taskType === 'speaking_prompt' && (
            <button
              onClick={recording ? stopRecording : startRecording}
              aria-label={recording ? 'Stop recording' : 'Record speech'}
              className={`self-start inline-flex items-center gap-2 rounded-full px-5 py-3 ${
                recording ? 'bg-red-500 text-white' : 'bg-ink-100 hover:bg-ink-200'
              }`}
            >
              {recording ? (
                <>
                  <span aria-hidden>■</span>
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <span aria-hidden>🎤</span>
                  <span>Speak</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {correction ? (
        <div
          className={`mt-5 rounded-lg p-4 text-sm ${
            correction.isCorrect
              ? 'bg-emerald-50 text-emerald-900'
              : 'bg-amber-50 text-amber-900'
          }`}
        >
          <div className="font-semibold">
            {correction.isCorrect ? '✓ Correct' : 'Not quite —'}
            {correction.encouragement ? ` ${correction.encouragement}` : ''}
          </div>
          {!correction.isCorrect && (
            <div className="mt-1">
              Better: <span className="italic">{correction.correctedAnswer}</span>
            </div>
          )}
          <div className="mt-2 text-ink-700">{correction.explanation}</div>
          <button
            onClick={next}
            className="mt-4 w-full sm:w-auto rounded-full bg-wise-500 text-white px-5 py-3 hover:bg-wise-600"
          >
            {taskIndex + 1 < tasks.length ? 'Next →' : 'Finish lesson'}
          </button>
        </div>
      ) : (
        <button
          onClick={submit}
          disabled={pending || !answer.trim()}
          className="mt-5 w-full sm:w-auto rounded-full bg-wise-500 text-white px-5 py-3 hover:bg-wise-600 disabled:opacity-50"
        >
          {pending ? 'Checking…' : 'Submit'}
        </button>
      )}
    </div>
  );
}
