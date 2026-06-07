'use client';

import type { AdminUserDetail } from '@/server/services/admin/users';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ROLES = ['learner', 'tutor', 'admin', 'student', 'organization_admin'];
const LEVELS = [
  'complete_beginner',
  'beginner',
  'lower_intermediate',
  'intermediate',
  'upper_intermediate',
  'advanced',
];
const LEARNING_STYLES = ['mission', 'tutor', 'conversation', 'drill', 'balanced'];
const CORRECTION_STYLES = [
  'gentle',
  'direct',
  'strict',
  'end_of_task',
  'major_mistakes_only',
  'adaptive',
];
const PERSONALITIES = [
  'default',
  'friendly_tutor',
  'direct_coach',
  'game_master',
  'premium_assistant',
  'strict_grammar_coach',
  'casual_companion',
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-ink-200">{label}</span>
      {children}
    </label>
  );
}

function Note({ kind, children }: { kind: 'ok' | 'err'; children: React.ReactNode }) {
  return (
    <p className={`text-sm ${kind === 'ok' ? 'text-sage-400' : 'text-red-400'}`}>{children}</p>
  );
}

export function UserEditor({ data }: { data: AdminUserDetail }) {
  const router = useRouter();
  const u = data.user;

  // ── Account form ──────────────────────────────────────────────────────
  const [acct, setAcct] = useState({
    username: u.username,
    name: u.name,
    email: u.email ?? '',
    role: u.role as string,
    nativeLanguage: u.nativeLanguage,
    targetLanguage: u.targetLanguage,
    timezone: u.timezone ?? '',
  });
  const [acctMsg, setAcctMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [acctPending, setAcctPending] = useState(false);

  async function saveAccount() {
    setAcctMsg(null);
    setAcctPending(true);
    try {
      const res = await fetch(`/api/admin/users/${u.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: acct.username.trim(),
          name: acct.name.trim(),
          email: acct.email.trim() || null,
          role: acct.role,
          nativeLanguage: acct.nativeLanguage,
          targetLanguage: acct.targetLanguage,
          timezone: acct.timezone.trim() || null,
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        setAcctMsg({ kind: 'err', text: body.message ?? body.error ?? 'Save failed.' });
        return;
      }
      setAcctMsg({ kind: 'ok', text: 'Saved.' });
      router.refresh();
    } catch {
      setAcctMsg({ kind: 'err', text: 'Network error.' });
    } finally {
      setAcctPending(false);
    }
  }

  // ── Password reset ────────────────────────────────────────────────────
  const [pwInput, setPwInput] = useState('');
  const [pwResult, setPwResult] = useState<string | null>(null);
  const [pwPending, setPwPending] = useState(false);

  async function resetPassword() {
    setPwResult(null);
    setPwPending(true);
    try {
      const res = await fetch(`/api/admin/users/${u.id}/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwInput.trim() || undefined }),
      });
      const body = await res.json();
      if (!res.ok) {
        setPwResult(body.message ?? 'Reset failed.');
        return;
      }
      setPwResult(
        body.password
          ? `New temporary password (copy now): ${body.password}`
          : 'Password updated to the value you set.',
      );
      setPwInput('');
    } catch {
      setPwResult('Network error.');
    } finally {
      setPwPending(false);
    }
  }

  // ── Profile form ──────────────────────────────────────────────────────
  const p = data.profile;
  const [prof, setProf] = useState(
    p
      ? {
          currentLevel: p.currentLevel,
          languageRatio: p.languageRatio,
          immersionMode: p.immersionMode,
          languageRatioOverridden: p.languageRatioOverridden,
          preferredInteractionMode: p.preferredInteractionMode,
          preferredLearningStyle: p.preferredLearningStyle,
          preferredCorrectionStyle: p.preferredCorrectionStyle,
          preferredWisePersonality: p.preferredWisePersonality,
          preferredSessionLengthMinutes: p.preferredSessionLengthMinutes ?? 10,
          goals: p.goals.join(', '),
          interests: p.interests.join(', '),
          wiseVoiceId: p.wiseVoiceId ?? '',
          onboardingCompleted: p.onboardingCompleted,
        }
      : null,
  );
  const [profMsg, setProfMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [profPending, setProfPending] = useState(false);

  async function saveProfile() {
    if (!prof) return;
    setProfMsg(null);
    setProfPending(true);
    try {
      const res = await fetch(`/api/admin/users/${u.id}/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentLevel: prof.currentLevel,
          languageRatio: prof.languageRatio,
          immersionMode: prof.immersionMode,
          languageRatioOverridden: prof.languageRatioOverridden,
          preferredInteractionMode: prof.preferredInteractionMode,
          preferredLearningStyle: prof.preferredLearningStyle,
          preferredCorrectionStyle: prof.preferredCorrectionStyle,
          preferredWisePersonality: prof.preferredWisePersonality,
          preferredSessionLengthMinutes: Number(prof.preferredSessionLengthMinutes),
          goals: prof.goals
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          interests: prof.interests
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          wiseVoiceId: prof.wiseVoiceId.trim() || undefined,
          onboardingCompleted: prof.onboardingCompleted,
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        setProfMsg({ kind: 'err', text: body.message ?? body.error ?? 'Save failed.' });
        return;
      }
      setProfMsg({ kind: 'ok', text: 'Saved.' });
      router.refresh();
    } catch {
      setProfMsg({ kind: 'err', text: 'Network error.' });
    } finally {
      setProfPending(false);
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────
  const [delPending, setDelPending] = useState(false);
  async function remove() {
    if (
      !confirm(
        `Delete ${u.name} (@${u.username})? This removes all their data and cannot be undone.`,
      )
    )
      return;
    setDelPending(true);
    try {
      const res = await fetch(`/api/admin/users/${u.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/users');
        router.refresh();
        return;
      }
      const body = await res.json().catch(() => ({}));
      alert(body.message ?? 'Delete failed.');
    } finally {
      setDelPending(false);
    }
  }

  function setP<K extends keyof NonNullable<typeof prof>>(k: K, v: NonNullable<typeof prof>[K]) {
    setProf((s) => (s ? { ...s, [k]: v } : s));
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm text-ink-200 hover:text-ink-50"
      >
        <ArrowLeft size={15} /> All users
      </Link>

      <div>
        <h1 className="font-display text-2xl text-ink-50">{u.name}</h1>
        <p className="text-sm text-ink-300">
          @{u.username} · {u.role} · joined {new Date(u.createdAt).toLocaleDateString()}
          {data.xpTotal ? ` · ${data.xpTotal.toLocaleString()} XP` : ''}
        </p>
      </div>

      {/* Account */}
      <section className="card card-pad space-y-3">
        <h2 className="prof-card-title">Account</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Username">
            <input
              value={acct.username}
              onChange={(e) => setAcct({ ...acct, username: e.target.value })}
            />
          </Field>
          <Field label="Display name">
            <input value={acct.name} onChange={(e) => setAcct({ ...acct, name: e.target.value })} />
          </Field>
          <Field label="Email">
            <input
              value={acct.email}
              onChange={(e) => setAcct({ ...acct, email: e.target.value })}
            />
          </Field>
          <Field label="Role">
            <select value={acct.role} onChange={(e) => setAcct({ ...acct, role: e.target.value })}>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Native language">
            <select
              value={acct.nativeLanguage}
              onChange={(e) => setAcct({ ...acct, nativeLanguage: e.target.value })}
            >
              <option value="en">en</option>
              <option value="it">it</option>
            </select>
          </Field>
          <Field label="Target language">
            <select
              value={acct.targetLanguage}
              onChange={(e) => setAcct({ ...acct, targetLanguage: e.target.value })}
            >
              <option value="en">en</option>
              <option value="it">it</option>
            </select>
          </Field>
          <Field label="Timezone">
            <input
              value={acct.timezone}
              onChange={(e) => setAcct({ ...acct, timezone: e.target.value })}
              placeholder="e.g. America/New_York"
            />
          </Field>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={saveAccount}
            disabled={acctPending}
          >
            {acctPending ? 'Saving…' : 'Save account'}
          </button>
          {acctMsg && <Note kind={acctMsg.kind}>{acctMsg.text}</Note>}
        </div>
      </section>

      {/* Security */}
      <section className="card card-pad space-y-3">
        <h2 className="prof-card-title">Password</h2>
        <Field label="Set a specific password (optional — leave blank to auto-generate)">
          <input
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            placeholder="auto-generate a strong temporary password"
          />
        </Field>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-soft btn-sm"
            onClick={resetPassword}
            disabled={pwPending}
          >
            {pwPending ? 'Resetting…' : 'Reset password'}
          </button>
        </div>
        {pwResult && (
          <div className="rounded-lg bg-ink-900/60 px-3 py-2 font-mono text-sm text-wise-300">
            {pwResult}
          </div>
        )}
      </section>

      {/* Learner profile */}
      {prof ? (
        <section className="card card-pad space-y-3">
          <h2 className="prof-card-title">Learner profile</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="CEFR level">
              <select
                value={prof.currentLevel}
                onChange={(e) => setP('currentLevel', e.target.value)}
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Interaction mode">
              <select
                value={prof.preferredInteractionMode}
                onChange={(e) => setP('preferredInteractionMode', e.target.value)}
              >
                <option value="voice">voice</option>
                <option value="text">text</option>
              </select>
            </Field>
            <Field label={`Italian ratio (${Math.round(prof.languageRatio * 100)}%)`}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={prof.languageRatio}
                onChange={(e) => setP('languageRatio', Number(e.target.value))}
              />
            </Field>
            <Field label="Session length (min)">
              <input
                type="number"
                min={2}
                max={120}
                value={prof.preferredSessionLengthMinutes}
                onChange={(e) => setP('preferredSessionLengthMinutes', Number(e.target.value))}
              />
            </Field>
            <Field label="Learning style">
              <select
                value={prof.preferredLearningStyle}
                onChange={(e) => setP('preferredLearningStyle', e.target.value)}
              >
                {LEARNING_STYLES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Correction style">
              <select
                value={prof.preferredCorrectionStyle}
                onChange={(e) => setP('preferredCorrectionStyle', e.target.value)}
              >
                {CORRECTION_STYLES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Wise personality">
              <select
                value={prof.preferredWisePersonality}
                onChange={(e) => setP('preferredWisePersonality', e.target.value)}
              >
                {PERSONALITIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Wise voice ID">
              <input
                value={prof.wiseVoiceId}
                onChange={(e) => setP('wiseVoiceId', e.target.value)}
              />
            </Field>
            <Field label="Goals (comma-separated)">
              <input value={prof.goals} onChange={(e) => setP('goals', e.target.value)} />
            </Field>
            <Field label="Interests (comma-separated)">
              <input value={prof.interests} onChange={(e) => setP('interests', e.target.value)} />
            </Field>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <label className="inline-flex items-center gap-2 text-sm text-ink-100">
              <input
                type="checkbox"
                className="!w-auto"
                checked={prof.immersionMode}
                onChange={(e) => setP('immersionMode', e.target.checked)}
              />
              Immersion mode
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-ink-100">
              <input
                type="checkbox"
                className="!w-auto"
                checked={prof.languageRatioOverridden}
                onChange={(e) => setP('languageRatioOverridden', e.target.checked)}
              />
              Override auto ratio
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-ink-100">
              <input
                type="checkbox"
                className="!w-auto"
                checked={prof.onboardingCompleted}
                onChange={(e) => setP('onboardingCompleted', e.target.checked)}
              />
              Onboarding completed
            </label>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={saveProfile}
              disabled={profPending}
            >
              {profPending ? 'Saving…' : 'Save profile'}
            </button>
            {profMsg && <Note kind={profMsg.kind}>{profMsg.text}</Note>}
          </div>
        </section>
      ) : (
        <section className="card card-pad">
          <h2 className="prof-card-title">Learner profile</h2>
          <p className="text-sm text-ink-300">
            This {u.role} account has no learner profile.
            {data.tutorProfile ? ` Tutor invite code: ${data.tutorProfile.inviteCode}.` : ''}
          </p>
        </section>
      )}

      {/* Danger */}
      <section
        className="card card-pad space-y-2"
        style={{ borderColor: 'oklch(0.5 0.16 25 / 0.4)' }}
      >
        <h2 className="prof-card-title">Danger zone</h2>
        <p className="text-sm text-ink-300">
          Permanently delete this account and all associated lessons, sessions, vocabulary, and
          progress.
        </p>
        <button
          type="button"
          className="btn btn-sm"
          style={{ background: 'oklch(0.55 0.18 25)', color: 'white' }}
          onClick={remove}
          disabled={delPending}
        >
          {delPending ? 'Deleting…' : 'Delete user'}
        </button>
      </section>
    </div>
  );
}
