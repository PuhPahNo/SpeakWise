'use client';

import { useToast } from '@/components/ui/toast';
import { GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TutorLink {
  tutorUserId: string;
  tutorName: string;
  tutorDisplayName: string | null;
}

/**
 * Profile-page card for the student-side tutor link.
 *
 * If no tutor is linked: shows the invite-code entry form. The tutor
 * shares their 8-char code out-of-band; the learner enters it here.
 *
 * If linked: shows the tutor's display name + a Disconnect button.
 * Disconnecting sets the link's status to `ended`; re-entering the
 * same code reactivates it (idempotent on the server side).
 *
 * Replaces the modal that used to live on the command-center.
 */
export function TutorCard() {
  const toast = useToast();
  const [linkedTutor, setLinkedTutor] = useState<TutorLink | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile/tutor')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { tutor: TutorLink | null } | null) => {
        if (d) setLinkedTutor(d.tutor);
      })
      .finally(() => setLoading(false));
  }, []);

  async function connect(e: React.FormEvent) {
    e.preventDefault();
    const code = codeInput.trim().toUpperCase();
    if (code.length < 6) {
      toast.error('Code too short', 'Should be 8 letters/digits.');
      return;
    }
    setPending(true);
    try {
      const r = await fetch('/api/profile/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (r.status === 404) {
        toast.error('Code not found', 'Double-check with your tutor.');
        return;
      }
      if (!r.ok) throw new Error(`status ${r.status}`);
      const data = (await r.json()) as {
        connected?: boolean;
        tutorUserId?: string;
        tutorName?: string;
        tutorDisplayName?: string | null;
      };
      if (data.connected && data.tutorUserId && data.tutorName) {
        setLinkedTutor({
          tutorUserId: data.tutorUserId,
          tutorName: data.tutorName,
          tutorDisplayName: data.tutorDisplayName ?? null,
        });
        setCodeInput('');
        toast.success(
          'Connected',
          `You're linked to ${data.tutorDisplayName ?? data.tutorName}.`,
        );
      }
    } catch (err) {
      toast.error('Could not connect', err instanceof Error ? err.message : 'Try again.');
    } finally {
      setPending(false);
    }
  }

  async function disconnect() {
    if (!confirm('Disconnect from your tutor?')) return;
    setPending(true);
    try {
      const r = await fetch('/api/profile/tutor', { method: 'DELETE' });
      if (!r.ok) throw new Error(`status ${r.status}`);
      setLinkedTutor(null);
      toast.success('Disconnected', 'Wise will go back to autonomous mode.');
    } catch (e) {
      toast.error('Failed to disconnect', e instanceof Error ? e.message : 'Try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="surface rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-1">
        <GraduationCap size={16} className="text-wise-400" aria-hidden />
        <h2 className="font-display text-lg text-ink-50">Your tutor</h2>
      </div>
      {loading ? (
        <p className="text-sm text-ink-300 mt-2">Checking your link…</p>
      ) : linkedTutor ? (
        <>
          <p className="text-sm text-ink-200 mt-1">
            You're linked to{' '}
            <span className="text-ink-50 font-medium">
              {linkedTutor.tutorDisplayName ?? linkedTutor.tutorName}
            </span>
            . Wise follows your tutor's directives when generating your lessons; your progress and
            recent mistakes are visible to them.
          </p>
          <button
            type="button"
            onClick={disconnect}
            disabled={pending}
            className="mt-4 rounded-full bg-white/4 hover:bg-white/8 px-4 py-2 text-sm text-ink-200 hover:text-ink-50 transition disabled:opacity-50"
          >
            Disconnect
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-ink-200 mt-1 mb-3">
            Got an invite code from a tutor? Paste it below to link your account. They'll see your
            progress and can guide your lessons.
          </p>
          <form onSubmit={connect} className="flex flex-col sm:flex-row gap-2 items-stretch">
            <input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="ABC23XYZ"
              maxLength={12}
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              className="flex-1 tracking-[0.3em] text-center font-display text-xl"
            />
            <button
              type="submit"
              disabled={pending || codeInput.trim().length < 6}
              className="sm:w-auto rounded-full bg-wise-500 hover:bg-wise-600 disabled:opacity-50 text-ink-900 font-medium px-5 py-2.5"
            >
              {pending ? 'Connecting…' : 'Connect'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
