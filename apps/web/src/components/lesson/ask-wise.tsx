'use client';

import { HelpCircle, Loader2, Mic, Send, Square, X } from 'lucide-react';
import { useRef, useState } from 'react';

export interface AskWiseContext {
  lessonId?: string;
  lessonTaskId?: string;
  userResponseId?: string;
  taskPrompt?: string;
  lastAnswer?: string;
}

/**
 * Floating "Ask Wise" helper. Available throughout a lesson: the learner taps
 * it, asks a question by voice or text ("why is it sono andata?"), and Wise
 * explains — grounded in the current task and their last answer. It never
 * submits an answer or advances the lesson; the learner closes it and continues.
 */
export function AskWise({ context }: { context: AskWiseContext }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  function reset() {
    setQuestion('');
    setAnswer(null);
    setError(null);
  }

  async function speak(text: string) {
    try {
      const r = await fetch('/api/voice/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: 'auto' }),
      });
      if (!r.ok) return;
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      await audio.play().catch(() => URL.revokeObjectURL(url));
    } catch {
      /* TTS is best-effort; the text is shown regardless */
    }
  }

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = async () => {
        for (const t of stream.getTracks()) t.stop();
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribe(blob);
      };
      recorderRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      setError('Mic unavailable — type your question instead.');
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  async function transcribe(blob: Blob) {
    setTranscribing(true);
    try {
      const form = new FormData();
      form.append('audio', blob, 'question.webm');
      // 'auto' — the learner may ask in English or Italian.
      form.append('language', 'auto');
      const r = await fetch('/api/voice/transcribe', { method: 'POST', body: form });
      if (!r.ok) throw new Error('transcribe failed');
      const data = (await r.json()) as { text?: string };
      if (data.text) setQuestion((q) => (q ? `${q} ${data.text}` : (data.text ?? '')));
    } catch {
      setError('Couldn’t hear that — try typing your question.');
    } finally {
      setTranscribing(false);
    }
  }

  async function ask() {
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const r = await fetch('/api/wise/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, context }),
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        setError(e.message ?? 'Wise couldn’t answer that — try rephrasing.');
        return;
      }
      const data = (await r.json()) as { explanation?: string; keyPoint?: string | null };
      const text = data.explanation ?? '';
      setAnswer(text);
      if (text) void speak(text);
    } catch {
      setError('Network blip — try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask Wise a question"
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 inline-flex items-center gap-2 rounded-full bg-wise-500 px-4 py-3 text-sm font-medium text-ink-900 shadow-orb-glow transition hover:bg-wise-400 min-h-[48px]"
      >
        <HelpCircle size={18} aria-hidden="true" />
        Ask Wise
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 w-[min(92vw,22rem)]">
      <div className="rounded-2xl border hairline bg-ink-700/95 backdrop-blur p-4 shadow-orb-glow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-ink-50">Ask Wise</p>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              reset();
            }}
            aria-label="Close"
            className="text-ink-300 hover:text-ink-50 transition"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {answer ? (
          <div className="mb-3 rounded-xl bg-ink-800/70 p-3">
            <p className="text-[15px] text-ink-100 leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
        ) : (
          <p className="text-xs text-ink-300 mb-2">
            Stuck? Ask anything — “why is this wrong?”, “what does this word mean?”
          </p>
        )}

        <div className="flex items-end gap-2">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void ask();
              }
            }}
            rows={2}
            placeholder={recording ? 'Listening…' : 'Type or speak your question'}
            className="flex-1 resize-none rounded-xl bg-ink-800/70 border hairline px-3 py-2 text-sm text-ink-50 placeholder:text-ink-400 focus:outline-none focus:ring-1 focus:ring-wise-500"
          />
          <button
            type="button"
            onClick={recording ? stopRecording : startRecording}
            disabled={transcribing || loading}
            aria-label={recording ? 'Stop recording' : 'Record question'}
            className={`shrink-0 grid place-items-center h-10 w-10 rounded-full border hairline transition disabled:opacity-50 ${
              recording ? 'bg-wise-500 text-ink-900' : 'text-ink-100 hover:bg-ink-600/60'
            }`}
          >
            {transcribing ? (
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            ) : recording ? (
              <Square size={16} aria-hidden="true" />
            ) : (
              <Mic size={18} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={ask}
            disabled={loading || !question.trim()}
            aria-label="Send question"
            className="shrink-0 grid place-items-center h-10 w-10 rounded-full bg-wise-500 text-ink-900 transition hover:bg-wise-400 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            ) : (
              <Send size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        {error ? <p className="text-xs text-red-300 mt-2">{error}</p> : null}

        {answer ? (
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              reset();
            }}
            className="mt-3 w-full rounded-full bg-ink-600/60 px-4 py-2 text-sm text-ink-50 transition hover:bg-ink-600 min-h-[44px]"
          >
            Got it — keep going
          </button>
        ) : null}
      </div>
    </div>
  );
}
