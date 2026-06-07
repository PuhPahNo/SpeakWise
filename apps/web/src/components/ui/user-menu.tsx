'use client';

import { LogOut, Shield, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function UserMenu({ name, isAdmin = false }: { name: string; isAdmin?: boolean }) {
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
        className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-wise-500/15 border border-wise-500/30 text-wise-300 hover:bg-wise-500/25 font-medium transition"
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border hairline bg-ink-700/95 backdrop-blur shadow-2xl overflow-hidden z-40">
          <div className="px-3 py-2 border-b hairline text-sm text-ink-50">
            <div className="font-medium truncate">{name}</div>
          </div>
          {isAdmin && (
            <a
              href="/admin"
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-wise-300 hover:bg-white/5"
            >
              <Shield size={14} aria-hidden /> Admin console
            </a>
          )}
          <a
            href="/profile"
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-ink-100 hover:bg-white/5"
          >
            <User size={14} aria-hidden /> Profile
          </a>
          <button
            type="button"
            onClick={signOut}
            disabled={pending}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-ink-100 hover:bg-white/5 text-left"
          >
            <LogOut size={14} aria-hidden /> {pending ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      )}
    </div>
  );
}
