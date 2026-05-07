'use client';

import { useState } from 'react';

interface Profile {
  goals: string[];
  interests: string[];
  currentLevel: string;
  preferredCorrectionStyle: string;
  preferredSessionLengthMinutes: number | null;
  motivationNotes: string | null;
}

export function ProfileEditor({ profile }: { profile: Profile }) {
  const [goals, setGoals] = useState(profile.goals.join(', '));
  const [interests, setInterests] = useState(profile.interests.join(', '));
  const [level, setLevel] = useState(profile.currentLevel);
  const [correctionStyle, setCorrectionStyle] = useState(profile.preferredCorrectionStyle);
  const [duration, setDuration] = useState(profile.preferredSessionLengthMinutes ?? 10);
  const [notes, setNotes] = useState(profile.motivationNotes ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goals: goals.split(',').map((s) => s.trim()).filter(Boolean),
          interests: interests.split(',').map((s) => s.trim()).filter(Boolean),
          currentLevel: level,
          preferredCorrectionStyle: correctionStyle,
          preferredSessionLengthMinutes: Number(duration),
          motivationNotes: notes,
        }),
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5 rounded-2xl border border-ink-200 bg-white p-6">
      <Field label="Goals (comma-separated)">
        <input value={goals} onChange={(e) => setGoals(e.target.value)} className="input" />
      </Field>
      <Field label="Interests (comma-separated)">
        <input value={interests} onChange={(e) => setInterests(e.target.value)} className="input" />
      </Field>
      <Field label="Current level">
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="input">
          <option value="complete_beginner">Complete beginner</option>
          <option value="beginner">Beginner</option>
          <option value="lower_intermediate">Lower intermediate</option>
          <option value="intermediate">Intermediate</option>
          <option value="upper_intermediate">Upper intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </Field>
      <Field label="Correction style">
        <select
          value={correctionStyle}
          onChange={(e) => setCorrectionStyle(e.target.value)}
          className="input"
        >
          <option value="adaptive">Adaptive</option>
          <option value="gentle">Gentle</option>
          <option value="direct">Direct</option>
          <option value="strict">Strict</option>
          <option value="end_of_task">End of task</option>
          <option value="major_mistakes_only">Major mistakes only</option>
        </select>
      </Field>
      <Field label="Preferred session length (minutes)">
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="input"
        />
      </Field>
      <Field label="Notes (motivation, context)">
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input" rows={3} />
      </Field>
      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-wise-500 text-white px-5 py-2 text-sm hover:bg-wise-600 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {saved && <span className="text-sm text-emerald-700">Saved.</span>}
      </div>
      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e3da;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-ink-700 mb-1">{label}</div>
      {children}
    </label>
  );
}
