'use client';

import { useToast } from '@/components/ui/toast';
import { Copy, RefreshCw, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface InitialProfile {
  displayName: string | null;
  bio: string | null;
  specialties: string[];
  inviteCode: string;
}

interface StudentRow {
  studentId: string;
  username: string;
  name: string;
  currentLevel: string | null;
  streakDays: number;
  xpTotal: number;
  lastSessionAt: Date | string | null;
  activeDirectiveCount: number;
}

interface Props {
  initialProfile: InitialProfile;
  initialStudents: StudentRow[];
}

/**
 * Tutor home — the equivalent of the learner's command-center, but
 * text-first (no orb). Two stacked sections:
 *   1. Invite code panel with a copy button + small rotate link.
 *   2. Student list. Each row links to /classroom/student/[id].
 * If the tutor's displayName is null, an inline "set your display name"
 * panel appears at top (one-shot, dismissible after save).
 */
export function ClassroomHome({ initialProfile, initialStudents }: Props) {
  const toast = useToast();
  const [profile, setProfile] = useState(initialProfile);
  const [students] = useState(initialStudents);
  const [pending, setPending] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(!initialProfile.displayName);
  const [displayNameDraft, setDisplayNameDraft] = useState(initialProfile.displayName ?? '');
  const [bioDraft, setBioDraft] = useState(initialProfile.bio ?? '');

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(profile.inviteCode);
      toast.success('Copied', `${profile.inviteCode} is on your clipboard.`);
    } catch {
      toast.error('Copy failed', 'Select the code and copy manually.');
    }
  }

  async function rotateCode() {
    if (!confirm('Generate a new invite code? The old one will stop working.')) return;
    setPending(true);
    try {
      const r = await fetch('/api/classroom/invite-code/rotate', { method: 'POST' });
      if (!r.ok) throw new Error(`status ${r.status}`);
      const { inviteCode } = (await r.json()) as { inviteCode: string };
      setProfile((p) => ({ ...p, inviteCode }));
      toast.success('New code generated', inviteCode);
    } catch (e) {
      toast.error('Rotate failed', e instanceof Error ? e.message : 'Try again.');
    } finally {
      setPending(false);
    }
  }

  async function saveProfile() {
    if (!displayNameDraft.trim()) {
      toast.error('Display name required', 'Your students will see this name.');
      return;
    }
    setPending(true);
    try {
      const r = await fetch('/api/classroom/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: displayNameDraft.trim(),
          bio: bioDraft.trim() || undefined,
        }),
      });
      if (!r.ok) throw new Error(`status ${r.status}`);
      const data = (await r.json()) as { displayName: string | null; bio: string | null };
      setProfile((p) => ({ ...p, displayName: data.displayName, bio: data.bio }));
      setShowProfileSetup(false);
      toast.success('Profile saved');
    } catch (e) {
      toast.error('Save failed', e instanceof Error ? e.message : 'Try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-7 sm:gap-9">
      {/* Display-name setup, shown only on first visit */}
      {showProfileSetup && (
        <section className="surface rounded-2xl p-5 sm:p-6">
          <div className="text-[11px] uppercase tracking-[0.2em] text-wise-400 mb-2">
            One quick setup
          </div>
          <h2 className="font-display text-xl sm:text-2xl text-ink-50 mb-3">
            What should your students call you?
          </h2>
          <div className="space-y-3">
            <label className="block text-sm text-ink-200">
              Display name
              <input
                value={displayNameDraft}
                onChange={(e) => setDisplayNameDraft(e.target.value)}
                placeholder="Professor Anthony"
                className="mt-1 w-full"
              />
            </label>
            <label className="block text-sm text-ink-200">
              Short bio (optional)
              <textarea
                value={bioDraft}
                onChange={(e) => setBioDraft(e.target.value)}
                placeholder="20 years teaching Italian. Specializing in conversational fluency."
                rows={3}
                className="mt-1 w-full"
              />
            </label>
            <button
              type="button"
              onClick={saveProfile}
              disabled={pending}
              className="rounded-full bg-wise-500 hover:bg-wise-600 disabled:opacity-50 text-ink-900 font-medium px-5 py-2.5"
            >
              {pending ? 'Saving…' : 'Save'}
            </button>
          </div>
        </section>
      )}

      <div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-50 leading-tight">
          Classroom
        </h1>
        {profile.displayName && (
          <p className="text-sm text-ink-200 mt-1">Welcome back, {profile.displayName}.</p>
        )}
      </div>

      {/* Invite code panel */}
      <section className="surface rounded-2xl p-5 sm:p-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-2">
          Your invite code
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <code className="font-display text-2xl sm:text-3xl text-wise-300 tracking-[0.15em]">
            {profile.inviteCode}
          </code>
          <button
            type="button"
            onClick={copyCode}
            className="inline-flex items-center gap-1.5 rounded-full surface px-3 py-1.5 text-xs text-ink-50 hover:border-wise-500/40 transition"
            aria-label="Copy invite code"
          >
            <Copy size={12} aria-hidden /> Copy
          </button>
          <button
            type="button"
            onClick={rotateCode}
            disabled={pending}
            className="inline-flex items-center gap-1.5 rounded-full surface px-3 py-1.5 text-xs text-ink-200 hover:text-ink-50 hover:border-wise-500/40 transition disabled:opacity-50"
            aria-label="Rotate invite code"
          >
            <RefreshCw size={12} aria-hidden /> Rotate
          </button>
        </div>
        <p className="text-sm text-ink-200 mt-3 leading-relaxed">
          Share this code with your students. They paste it under{' '}
          <span className="text-ink-100">Profile → Connect a tutor</span> to link
          their account to yours. Anyone with this code can connect — rotate it
          if it leaks.
        </p>
      </section>

      {/* Students list */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Users size={14} className="text-ink-300" aria-hidden />
          <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200">
            Students ({students.length})
          </div>
        </div>
        {students.length === 0 ? (
          <div className="surface rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-ink-100">No students yet.</p>
            <p className="text-sm text-ink-200 mt-2">
              Share your invite code above to link your first student.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {students.map((s) => (
              <li key={s.studentId}>
                <Link
                  href={`/classroom/student/${s.studentId}`}
                  className="block surface rounded-2xl p-4 sm:p-5 hover:border-wise-500/40 transition"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <div className="font-display text-lg text-ink-50">{s.name}</div>
                      <div className="text-xs text-ink-200">@{s.username}</div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-ink-200 flex-wrap">
                      {s.currentLevel && (
                        <span className="rounded-full surface px-2.5 py-0.5">
                          {s.currentLevel.replace(/_/g, ' ')}
                        </span>
                      )}
                      <span>
                        <span className="text-ink-50 font-medium">{s.streakDays}</span>{' '}
                        day{s.streakDays === 1 ? '' : 's'}
                      </span>
                      <span>
                        <span className="text-ink-50 font-medium">{s.xpTotal.toLocaleString()}</span>{' '}
                        XP
                      </span>
                      {s.activeDirectiveCount > 0 && (
                        <span className="rounded-full bg-wise-500/15 border border-wise-500/40 text-wise-200 px-2.5 py-0.5">
                          {s.activeDirectiveCount} active directive
                          {s.activeDirectiveCount === 1 ? '' : 's'}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
