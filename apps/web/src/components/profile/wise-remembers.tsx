'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  confidence: number;
  updatedAt: string;
}
interface Group {
  key: string;
  label: string;
  notes: Note[];
}
interface Grouped {
  groups: Group[];
  totalActive: number;
}

export function WiseRemembers() {
  const [data, setData] = useState<Grouped | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/memory/grouped')
      .then((r) => r.json() as Promise<Grouped>)
      .then(setData)
      .catch(() => setData({ groups: [], totalActive: 0 }));
  }, []);

  async function forget(id: string) {
    setPendingDelete(id);
    try {
      await fetch(`/api/memory/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: false }),
      });
      setData((d) =>
        d
          ? {
              ...d,
              groups: d.groups.map((g) => ({
                ...g,
                notes: g.notes.filter((n) => n.id !== id),
              })),
              totalActive: d.totalActive - 1,
            }
          : d,
      );
    } finally {
      setPendingDelete(null);
    }
  }

  if (!data) {
    return <div className="text-sm text-ink-200">Loading what Wise remembers…</div>;
  }

  if (data.totalActive === 0) {
    return (
      <p className="text-sm text-ink-200 max-w-prose">
        Wise hasn&apos;t learned much about you yet. After a few sessions,
        what stands out about your goals, strengths, and preferences will
        show up here. You can always edit or remove anything Wise remembers.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {data.groups
        .filter((g) => g.notes.length > 0)
        .map((g) => (
          <section key={g.key}>
            <h3 className="font-display text-base text-ink-100 mb-2 tracking-tight">
              {g.label}
            </h3>
            <ul className="space-y-2">
              {g.notes.map((n) => (
                <li
                  key={n.id}
                  className="group flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 surface text-ink-50 text-sm"
                >
                  <span className="leading-snug">{n.content}</span>
                  <button
                    type="button"
                    onClick={() => forget(n.id)}
                    disabled={pendingDelete === n.id}
                    aria-label="Forget this"
                    className="opacity-0 group-hover:opacity-60 hover:opacity-100 transition shrink-0 text-ink-200 hover:text-ink-50"
                    title="Tell Wise to forget this"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      <p className="text-xs text-ink-200 italic">
        Wise updates this as you learn. Tap the trash icon to forget anything that&apos;s wrong.
      </p>
    </div>
  );
}
