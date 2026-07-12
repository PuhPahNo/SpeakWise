'use client';

import { Loader2, Mic, Send, Volume2 } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

type Msg = { id: string; role: 'user' | 'wise'; content: string };

let messageSequence = 0;
function nextMessageId(role: Msg['role']) {
  messageSequence += 1;
  return `${role}-${Date.now()}-${messageSequence}`;
}

function keyed(values: string[]) {
  const occurrences = new Map<string, number>();
  return values.map((value) => {
    const occurrence = (occurrences.get(value) ?? 0) + 1;
    occurrences.set(value, occurrence);
    return { value, key: `${value}:${occurrence}` };
  });
}

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
  const blocks = keyed(content.split(/\n{2,}/));
  return (
    <>
      {blocks.map(({ value: block, key: blockKey }) => {
        const lines = keyed(block.split('\n'));
        const isUl = lines.length > 0 && lines.every(({ value }) => /^\s*[-*]\s+/.test(value));
        const isOl = lines.length > 0 && lines.every(({ value }) => /^\s*\d+\.\s+/.test(value));
        if (isUl) {
          return (
            <ul key={blockKey} className="my-1 list-disc space-y-0.5 pl-5">
              {lines.map(({ value, key }) => (
                <li key={key}>
                  {renderInline(value.replace(/^\s*[-*]\s+/, ''), `${blockKey}-${key}`)}
                </li>
              ))}
            </ul>
          );
        }
        if (isOl) {
          return (
            <ol key={blockKey} className="my-1 list-decimal space-y-0.5 pl-5">
              {lines.map(({ value, key }) => (
                <li key={key}>
                  {renderInline(value.replace(/^\s*\d+\.\s+/, ''), `${blockKey}-${key}`)}
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={blockKey} className="my-1 leading-relaxed">
            {lines.map(({ value, key }, lineIndex) => (
              <span key={key}>
                {renderInline(value, `${blockKey}-${key}`)}
                {lineIndex < lines.length - 1 ? <br /> : null}
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
      id: 'opener',
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
    setMessages((m) => [
      ...m,
      { id: nextMessageId('user'), role: 'user', content },
      { id: nextMessageId('wise'), role: 'wise', content: '' },
    ]);
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
          const last = c[c.length - 1];
          if (last) c[c.length - 1] = { ...last, content: acc };
          return c;
        });
      }
      if (!acc.trim()) {
        setMessages((m) => {
          const c = [...m];
          const last = c[c.length - 1];
          if (last)
            c[c.length - 1] = { ...last, content: 'Sorry — I didn’t catch that. Try again?' };
          return c;
        });
      }
    } catch {
      setMessages((m) => {
        const c = [...m];
        const last = c[c.length - 1];
        if (last) {
          c[c.length - 1] = {
            ...last,
            content: 'Sorry — something went wrong. Try again in a moment.',
          };
        }
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
    <div className="chat-screen">
      <div className="chat-scroll" ref={scrollRef}>
        <div className="chat-inner">
          {messages.map((m, i) => {
            const isLast = i === messages.length - 1;
            if (m.role === 'user') {
              return (
                <div key={m.id} className="msg msg-user">
                  <div className="bubble bubble-user">{m.content}</div>
                </div>
              );
            }
            const showTyping = !m.content && streaming && isLast;
            return (
              <div key={m.id} className="msg msg-wise">
                <div className="wise-badge" aria-hidden>
                  <span className="wise-dot" />
                </div>
                {showTyping ? (
                  <div className="bubble bubble-wise typing">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                ) : (
                  <div className="bubble bubble-wise">
                    <Markdown content={m.content} />
                    {m.content && !(streaming && isLast) ? (
                      <button
                        type="button"
                        onClick={() => void listen(m.content)}
                        className="listen-btn"
                        aria-label="Listen to this message"
                      >
                        <Volume2 size={13} /> Listen
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="composer">
        <div className="composer-inner">
          {onlyOpener && (
            <div className="composer-chips">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" className="suggest sm" onClick={() => void send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <form
            className="composer-bar"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <a href="/command-center" className="composer-mic" aria-label="Switch to voice">
              <Mic size={18} aria-hidden />
            </a>
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
              placeholder="Message Wise… (try Italian!)"
              className="composer-input"
            />
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              aria-label="Send"
              className="composer-send"
            >
              {streaming ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
