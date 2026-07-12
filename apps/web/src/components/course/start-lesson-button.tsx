'use client';

import { useToast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  lessonType: string;
  /** Skill ids this lesson should target (resolved from a template's objectives). */
  targetSkillIds: string[];
  interestTheme?: string | null;
  durationMinutes?: number;
  label: string;
  /** Optional free-text steer for the generator (e.g. the template summary). */
  userRequest?: string;
  lessonTemplateSlug?: string;
  className?: string;
}

/**
 * Generates a personalized lesson from a chapter or lesson template, then
 * sends the learner straight into the lesson player. Mirrors the
 * generate→/lesson/[id] flow used on the command center.
 */
export function StartLessonButton({
  lessonType,
  targetSkillIds,
  interestTheme,
  durationMinutes,
  label,
  userRequest,
  lessonTemplateSlug,
  className,
}: Props) {
  const router = useRouter();
  const toast = useToast();
  const [pending, setPending] = useState(false);

  async function start() {
    setPending(true);
    try {
      const res = await fetch('/api/lessons/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonType,
          targetSkillIds: targetSkillIds.length > 0 ? targetSkillIds : undefined,
          interestTheme: interestTheme ?? undefined,
          durationMinutes,
          userRequest,
          lessonTemplateSlug,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error('Couldn’t build that lesson', err.message ?? 'Try again in a moment.');
        return;
      }
      const out = await res.json();
      if (out.lesson?.id) router.push(`/lesson/${out.lesson.id}`);
      else toast.error('Couldn’t build that lesson', 'No lesson id in the response — try again.');
    } catch {
      toast.error('Network blip', 'Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={start}
      disabled={pending}
      className={
        className ??
        'inline-flex items-center justify-center gap-2 rounded-full bg-wise-500 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-wise-400 disabled:opacity-60 min-h-[44px]'
      }
    >
      {pending ? 'Building…' : label}
    </button>
  );
}
