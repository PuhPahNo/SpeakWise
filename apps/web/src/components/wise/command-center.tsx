'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface WiseTurn {
  intent: string;
  wiseMessage: string;
  actions: Array<{ type: string; lessonId?: string }>;
}

export function CommandCenter() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Array<{ role: 'user' | 'wise'; text: string }>>([]);
  const [pending, setPending] = useState(false);

  async function send() {
    if (!message.trim()) return;
    const userMsg = message;
    setHistory((h) => [...h, { role: 'user', text: userMsg }]);
    setMessage('');
    setPending(true);
    try {
      const res = await fetch('/api/wise/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'text', message: userMsg, context: { screen: 'command_center' } }),
      });
      const data: WiseTurn = await res.json();
      setHistory((h) => [...h, { role: 'wise', text: data.wiseMessage }]);
      const startAction = data.actions.find((a) => a.type === 'START_LESSON' && a.lessonId);
      if (startAction?.lessonId) {
        router.push(`/lesson/${startAction.lessonId}`);
      }
      const generateAction = data.actions.find((a) => a.type === 'GENERATE_LESSON');
      if (generateAction) {
        const gen = await fetch('/api/lessons/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonType: 'daily_mission', userRequest: userMsg }),
        });
        const out = await gen.json();
        if (out.lesson?.id) router.push(`/lesson/${out.lesson.id}`);
      }
    } catch (e) {
      setHistory((h) => [...h, { role: 'wise', text: 'Sorry — something went wrong. Try again?' }]);
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

  return (
    <div className="rounded-2xl border border-ink-200 bg-white">
      <div className="px-5 py-4 border-b border-ink-200">
        <div className="font-display text-lg">Talk to Wise</div>
        <div className="text-sm text-ink-500">
          Ask for a lesson, request a topic, or just say hi.
        </div>
      </div>
      <div className="p-5 space-y-3 min-h-[200px] max-h-[400px] overflow-y-auto">
        {history.length === 0 && (
          <button
            onClick={startMission}
            disabled={pending}
            className="text-sm text-wise-600 hover:underline"
          >
            {pending ? 'Building…' : 'Or just start today’s mission →'}
          </button>
        )}
        {history.map((m, i) => (
          <div
            key={i}
            className={`text-sm ${m.role === 'user' ? 'text-ink-900' : 'text-ink-700 italic'}`}
          >
            <span className="font-semibold mr-2">{m.role === 'user' ? 'You' : 'Wise'}</span>
            {m.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="border-t border-ink-200 p-3 flex gap-2"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Make today's lesson about a trattoria…"
          enterKeyHint="send"
          autoCapitalize="sentences"
          autoComplete="off"
          className="flex-1 min-w-0 rounded-lg border border-ink-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wise-300"
        />
        <button
          type="submit"
          disabled={pending || !message.trim()}
          className="rounded-lg bg-wise-500 text-white px-4 py-2 hover:bg-wise-600 disabled:opacity-50 shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
}
