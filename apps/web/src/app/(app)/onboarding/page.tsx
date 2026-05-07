'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Turn { role: 'user' | 'wise'; text: string }

export default function OnboardingPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch('/api/onboarding/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'text' }),
    })
      .then((r) => r.json())
      .then((d) => {
        setSessionId(d.sessionId);
        setTurns([{ role: 'wise', text: d.wiseMessage }]);
      });
  }, []);

  async function send() {
    if (!input.trim() || !sessionId) return;
    const userText = input;
    setTurns((t) => [...t, { role: 'user', text: userText }]);
    setInput('');
    setPending(true);
    try {
      const res = await fetch('/api/onboarding/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, inputType: 'text', text: userText }),
      });
      const data = await res.json();
      setTurns((t) => [...t, { role: 'wise', text: data.wiseMessage }]);
      if (data.nextStep === 'complete') {
        setDone(true);
        await fetch('/api/onboarding/complete', { method: 'POST' });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="font-display text-2xl sm:text-3xl mb-5 sm:mb-6">Let's get to know you.</h1>
      <div className="space-y-3 mb-6">
        {turns.map((t, i) => (
          <div key={i} className={t.role === 'user' ? 'text-ink-900' : 'text-ink-700 italic'}>
            <span className="font-semibold mr-2">{t.role === 'user' ? 'You' : 'Wise'}</span>
            {t.text}
          </div>
        ))}
      </div>
      {!done ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={pending}
            placeholder="Type your answer…"
            enterKeyHint="send"
            autoCapitalize="sentences"
            className="flex-1 min-w-0 rounded-lg border border-ink-200 px-3 py-2"
          />
          <button
            type="submit"
            disabled={pending || !input.trim()}
            className="rounded-lg bg-wise-500 text-white px-4 py-2 hover:bg-wise-600 disabled:opacity-50 shrink-0"
          >
            Send
          </button>
        </form>
      ) : (
        <button
          onClick={() => router.push('/command-center')}
          className="w-full sm:w-auto rounded-full bg-wise-500 text-white px-6 py-3 hover:bg-wise-600"
        >
          Take me to my first lesson →
        </button>
      )}
    </div>
  );
}
