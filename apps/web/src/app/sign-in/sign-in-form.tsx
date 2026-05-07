'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') ?? '/command-center';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push(next);
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(
        data.error === 'invalid_credentials'
          ? 'Wrong username or password.'
          : 'Sign-in failed. Try again.',
      );
    } catch {
      setError('Network error. Try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 surface p-6 sm:p-7">
      <label className="block">
        <div className="text-xs uppercase tracking-wider text-ink-200 mb-1.5">Username</div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="username"
          required
          className="w-full"
        />
      </label>
      <label className="block">
        <div className="text-xs uppercase tracking-wider text-ink-200 mb-1.5">Password</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="w-full"
        />
      </label>
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 px-3 py-2 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={pending || !username || !password}
        className="w-full rounded-lg bg-wise-500 hover:bg-wise-600 active:bg-wise-700 text-ink-900 font-medium py-3 disabled:opacity-50 transition"
      >
        {pending ? 'Signing in…' : 'Continue'}
      </button>
      <p className="text-xs text-ink-200 text-center pt-1">
        Accounts are admin-provisioned. Talk to your admin to get one.
      </p>
    </form>
  );
}
