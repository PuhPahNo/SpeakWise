'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

export function UserMenu({ name }: { name: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  async function signOut() {
    setPending(true);
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      router.push('/sign-in');
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  const initial = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-ink-200 hover:bg-ink-300 text-ink-800 font-medium"
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-ink-200 bg-white shadow-lg overflow-hidden z-40">
          <div className="px-3 py-2 border-b border-ink-100 text-sm">
            <div className="font-medium truncate">{name}</div>
          </div>
          <a
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-ink-50"
          >
            <User size={14} aria-hidden /> Profile
          </a>
          <button
            type="button"
            onClick={signOut}
            disabled={pending}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-ink-50 text-left"
          >
            <LogOut size={14} aria-hidden /> {pending ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      )}
    </div>
  );
}
