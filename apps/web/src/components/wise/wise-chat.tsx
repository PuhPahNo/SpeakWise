'use client';

import { Loader2, Send, Volume2 } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'wise'; content: string };

// ── markdown-lite (no dep) — **bold**, *italic*/_italic_, `code`, -/1. lists ──
function renderInline(text: string, key: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*|_[^_\n]+_)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex.exec loop
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) out.push(<strong key={`${key}-${i}`}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith('`'))
      out.push(
        <code
          key={`${key}-${i}`}
          className="rounded bg-ink-900/60 px-1 text-wise-200 text-[0.92em]"
        >
          {tok.slice(1, -1)}
        </code>,
      );
    else out.push(<em key={`${key}-${i}`}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Markdown({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split('\n');
        const isUl = lines.length > 0 && lines.every((l) => /^\s*[-*]\s+/.test(l));
        const isOl = lines.length > 0 && lines.every((l) => /^\s*\d+\.\s+/.test(l));
        if (isUl) {
          return (
            <ul key={bi} className="my-1 list-disc space-y-0.5 pl-5">
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^\s*[-*]\s+/, ''), `${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        if (isOl) {
          return (
            <ol key={bi} className="my-1 list-decimal space-y-0.5 pl-5">
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^\s*\d+\.\s+/, ''), `${bi}-${li}`)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={bi} className="my-1 leading-relaxed">
            {lines.map((l, li) => (
              <span key={li}>
                {renderInline(l, `${bi}-${li}`)}
                {li < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

const SUGGESTIONS = [
  'Help me practice the passato prossimo',
  'How do I order food at a restaurant?',
  'Quiz me on some travel vocabulary',
];

export function WiseChat({ firstName }: { firstName: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'wise',
      content: `Ciao ${firstName}! 👋 What's on your mind — want to practice, ask a question about Italian, or just chat a bit?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new content
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;
    // Build the payload from the prior turns BEFORE we add the placeholder.
    const payload = [
      ...messages.map((m) => ({
        role: m.role === 'wise' ? ('assistant' as const) : ('user' as const),
        content: m.content,
      })),
      { role: 'user' as const, content },
    ];
    setMessages((m) => [...m, { role: 'user', content }, { role: 'wise', content: '' }]);
    setInput('');
    setStreaming(true);
    try {
      const res = await fetch('/api/wise/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      });
      if (!res.ok || !res.body) throw new Error(`chat failed: ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = { role: 'wise', content: acc };
          return c;
        });
      }
      if (!acc.trim()) {
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = { role: 'wise', content: 'Sorry — I didn’t catch that. Try again?' };
          return c;
        });
      }
    } catch {
      setMessages((m) => {
        const c = [...m];
        c[c.length - 1] = {
          role: 'wise',
          content: 'Sorry — something went wrong. Try again in a moment.',
        };
        return c;
      });
    } finally {
      setStreaming(false);
    }
  }

  async function listen(text: string) {
    try {
      const r = await fetch('/api/voice/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: 'auto' }),
      });
      if (!r.ok) return;
      const url = URL.createObjectURL(await r.blob());
      const a = new Audio(url);
      a.onended = () => URL.revokeObjectURL(url);
      await a.play().catch(() => URL.revokeObjectURL(url));
    } catch {
      /* best-effort */
    }
  }

  const onlyOpener = messages.length === 1;

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col px-0 sm:px-2">
      {/* messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((m, i) => {
          const isLast = i === messages.length - 1;
          if (m.role === 'user') {
            return (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-wise-500 px-4 py-2.5 text-ink-900">
                  {m.content}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[88%] rounded-2xl rounded-bl-sm border hairline bg-ink-800/60 px-4 py-2.5 text-ink-50">
                {m.content ? (
                  <div className="text-[15px]">
                    <Markdown content={m.content} />
                  </div>
                ) : streaming && isLast ? (
                  <span className="inline-flex items-center gap-1 text-ink-300">
                    <Loader2 size={14} className="animate-spin" /> Wise is typing…
                  </span>
                ) : null}
                {m.content && !(streaming && isLast) ? (
                  <button
                    type="button"
                    onClick={() => void listen(m.content)}
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-ink-400 transition hover:text-ink-100"
                    aria-label="Listen to this message"
                  >
                    <Volume2 size={12} /> Listen
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}

        {onlyOpener ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                className="rounded-full border hairline bg-ink-800/40 px-3 py-1.5 text-sm text-ink-200 transition hover:bg-ink-700/60 hover:text-ink-50"
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="flex items-end gap-2 pt-2 pb-[88px] md:pb-4"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          rows={1}
          placeholder="Message Wise…"
          className="flex-1 resize-none rounded-2xl border hairline bg-ink-800/60 px-4 py-3 text-[15px] text-ink-50 placeholder:text-ink-400 focus:outline-none focus:ring-1 focus:ring-wise-500 max-h-40"
        />
        <button
          type="submit"
          disabled={!input.trim() || streaming}
          aria-label="Send"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-wise-500 text-ink-900 transition hover:bg-wise-400 disabled:opacity-50"
        >
          {streaming ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
}
