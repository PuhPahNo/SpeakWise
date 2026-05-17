'use client';

import { useState } from 'react';
import { VoicePicker } from './voice-picker';

interface Profile {
  goals: string[];
  interests: string[];
  currentLevel: string;
  preferredCorrectionStyle: string;
  preferredSessionLengthMinutes: number | null;
  motivationNotes: string | null;
  wiseVoiceId: string | null;
}

export function ProfileEditor({ profile }: { profile: Profile }) {
  const [goals, setGoals] = useState(profile.goals.join(', '));
  const [interests, setInterests] = useState(profile.interests.join(', '));
  const [level, setLevel] = useState(profile.currentLevel);
  const [correctionStyle, setCorrectionStyle] = useState(profile.preferredCorrectionStyle);
  const [duration, setDuration] = useState(profile.preferredSessionLengthMinutes ?? 10);
  const [notes, setNotes] = useState(profile.motivationNotes ?? '');
  const [voiceId, setVoiceId] = useState<string | null>(profile.wiseVoiceId);
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
          goals: goals
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          interests: interests
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          currentLevel: level,
          preferredCorrectionStyle: correctionStyle,
          preferredSessionLengthMinutes: Number(duration),
          motivationNotes: notes,
          wiseVoiceId: voiceId ?? undefined,
        }),
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  // The container uses the same `surface` dark-glass treatment as every
  // other card in the app. Previously we shipped `bg-white` here, which
  // landed white text from globals.css on a white background (unreadable).
  // Inputs / textareas / selects inherit the dark-theme styles from
  // globals.css — no scoped `.sw-input` block needed anymore.
  return (
    <div className="space-y-5 surface rounded-2xl p-4 sm:p-6">
      <Field label="Goals (comma-separated)">
        <input
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          autoCapitalize="sentences"
        />
      </Field>
      <Field label="Interests (comma-separated)">
        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          autoCapitalize="sentences"
        />
      </Field>
      <Field label="Current level">
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="complete_beginner">Complete beginner</option>
          <option value="beginner">Beginner</option>
          <option value="lower_intermediate">Lower intermediate</option>
          <option value="intermediate">Intermediate</option>
          <option value="upper_intermediate">Upper intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </Field>
      <Field label="Correction style">
        <select value={correctionStyle} onChange={(e) => setCorrectionStyle(e.target.value)}>
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
          inputMode="numeric"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </Field>
      <Field label="Notes (motivation, context)">
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      </Field>
      <Field label="Wise's voice">
        <VoicePicker value={voiceId} onChange={setVoiceId} />
      </Field>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="w-full sm:w-auto rounded-full bg-wise-500 text-ink-900 font-medium px-5 py-3 hover:bg-wise-600 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {saved && <span className="text-sm text-sage-400">Saved.</span>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-ink-200 mb-1">{label}</div>
      {children}
    </label>
  );
}
