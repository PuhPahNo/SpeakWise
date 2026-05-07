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
    <form
      onSubmit={submit}
      className="space-y-3 rounded-2xl border border-ink-200 bg-white p-5 sm:p-6"
    >
      <label className="block">
        <div className="text-sm font-medium text-ink-700 mb-1">Username</div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="username"
          required
          className="w-full rounded-lg border border-ink-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wise-300"
        />
      </label>
      <label className="block">
        <div className="text-sm font-medium text-ink-700 mb-1">Password</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-ink-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wise-300"
        />
      </label>
      {error && (
        <div className="rounded-lg bg-amber-50 text-amber-900 px-3 py-2 text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={pending || !username || !password}
        className="w-full rounded-full bg-wise-500 text-white py-3 hover:bg-wise-600 disabled:opacity-50"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="text-xs text-ink-500 text-center pt-2">
        Accounts are admin-provisioned. Contact your admin to get one.
      </p>
    </form>
  );
}
