'use client';

import type { AdminUserSummary } from '@/server/services/admin/users';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const ROLES = ['learner', 'tutor', 'admin', 'student', 'organization_admin'] as const;

function roleBadge(role: string) {
  const tone =
    role === 'admin'
      ? 'bg-wise-500/20 text-wise-300 border-wise-500/30'
      : role === 'tutor'
        ? 'bg-sage-500/20 text-sage-400 border-sage-500/30'
        : 'bg-ink-500/40 text-ink-100 border-ink-400';
  return `inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone}`;
}

export function UsersClient({ initialUsers }: { initialUsers: AdminUserSummary[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [creating, setCreating] = useState(false);

  async function refresh() {
    const res = await fetch('/api/admin/users');
    if (res.ok) setUsers((await res.json()).users);
  }

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter && u.role !== roleFilter) return false;
      if (!needle) return true;
      return (
        u.username.toLowerCase().includes(needle) ||
        u.name.toLowerCase().includes(needle) ||
        (u.email ?? '').toLowerCase().includes(needle)
      );
    });
  }, [users, q, roleFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search
              size={15}
              className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 text-ink-300"
              aria-hidden
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, username, email…"
              className="w-64 max-w-full !pl-9"
            />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="">All roles</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-md"
          onClick={() => setCreating((c) => !c)}
        >
          <Plus size={16} /> New user
        </button>
      </div>

      {creating && (
        <CreateUserPanel
          onClose={() => setCreating(false)}
          onCreated={() => {
            void refresh();
          }}
        />
      )}

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-left text-[11px] uppercase tracking-wider text-ink-300">
            <tr className="border-b hairline">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Streak</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr
                key={u.id}
                className="border-b hairline transition last:border-0 hover:bg-ink-600/40"
              >
                <td className="px-4 py-3">
                  <Link href={`/admin/users/${u.id}`} className="block">
                    <div className="font-medium text-ink-50">{u.name}</div>
                    <div className="text-xs text-ink-300">
                      @{u.username}
                      {u.email ? ` · ${u.email}` : ''}
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className={roleBadge(u.role)}>{u.role}</span>
                </td>
                <td className="px-4 py-3 text-ink-200">{u.level ?? '—'}</td>
                <td className="px-4 py-3 text-ink-200">{u.streakDays ?? '—'}</td>
                <td className="px-4 py-3 text-ink-300">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-300">
                  No users match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-ink-300">
        {filtered.length} of {users.length} users
      </p>
    </div>
  );
}

function CreateUserPanel({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    role: 'learner',
    password: '',
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ username: string; password?: string } | null>(null);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit() {
    setError(null);
    if (!form.username.trim() || !form.name.trim()) {
      setError('Username and name are required.');
      return;
    }
    setPending(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username.trim(),
          name: form.name.trim(),
          email: form.email.trim() || undefined,
          role: form.role,
          password: form.password.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? data.error ?? 'Could not create user.');
        return;
      }
      setCreated({ username: data.username, password: data.generatedPassword });
      onCreated();
    } catch {
      setError('Network error — try again.');
    } finally {
      setPending(false);
    }
  }

  if (created) {
    return (
      <div className="card card-pad space-y-3" style={{ borderColor: 'var(--accent-line)' }}>
        <div className="font-display text-lg text-ink-50">User “{created.username}” created</div>
        {created.password ? (
          <div className="text-sm text-ink-200">
            Temporary password (shown once — copy it now):
            <div className="mt-1.5 rounded-lg bg-ink-900/60 px-3 py-2 font-mono text-wise-300">
              {created.password}
            </div>
          </div>
        ) : (
          <p className="text-sm text-ink-200">They can sign in with the password you set.</p>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-soft btn-sm"
            onClick={() => {
              setCreated(null);
              setForm({ username: '', name: '', email: '', role: 'learner', password: '' });
            }}
          >
            Create another
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-pad space-y-3">
      <div className="font-display text-lg text-ink-50">New user</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-ink-200">Username</span>
          <input value={form.username} onChange={(e) => set('username', e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-ink-200">Display name</span>
          <input value={form.name} onChange={(e) => set('name', e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-ink-200">Email (optional)</span>
          <input value={form.email} onChange={(e) => set('email', e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-ink-200">Role</span>
          <select value={form.role} onChange={(e) => set('role', e.target.value)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-ink-200">
            Password (optional — leave blank to generate)
          </span>
          <input
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            placeholder="auto-generate a strong temporary password"
          />
        </label>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={submit}
          disabled={pending}
        >
          {pending ? 'Creating…' : 'Create user'}
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
