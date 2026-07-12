import { StartLessonButton } from '@/components/course/start-lesson-button';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { getSkillsBySlugs, getUnitDetail } from '@/server/services/curriculum';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const CATEGORY_LABEL: Record<string, string> = {
  pronunciation: 'Pronunciation',
  vocabulary: 'Vocabulary',
  grammar: 'Grammar',
  speaking: 'Speaking',
  listening: 'Listening',
  reading: 'Reading',
  writing: 'Writing',
  culture: 'Culture',
  fluency: 'Fluency',
};

const LEVEL_LABEL: Record<string, string> = {
  complete_beginner: 'Complete beginner · A1',
  beginner: 'Beginner · A1–A2',
  lower_intermediate: 'Lower intermediate · A2',
  intermediate: 'Intermediate · B1',
  upper_intermediate: 'Upper intermediate · B1–B2',
  advanced: 'Advanced · B2–C1',
};

interface CulturalNote {
  title: string;
  body: string;
}
interface SkillExample {
  target: string;
  native: string;
  note?: string;
}

export default async function ChapterPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  await getOrCreateUser();
  const unit = await getUnitDetail(code);
  if (!unit) notFound();

  // Resolve every slug referenced by a lesson template (objectives may include
  // a prerequisite from an earlier chapter) into ids the generator can target.
  const allObjectiveSlugs = [
    ...new Set(unit.lessonTemplates.flatMap((t) => t.objectiveSkillSlugs)),
  ];
  const objectiveSkills = await getSkillsBySlugs(allObjectiveSlugs);
  const idBySlug = new Map(objectiveSkills.map((s) => [s.slug, s.id]));

  const culturalNotes = (unit.culturalNotes as unknown as CulturalNote[]) ?? [];
  const unitSkillIds = unit.skills.map((s) => s.id);

  // group skills by category, preserving the authored within-unit order
  const skillsByCategory = new Map<string, typeof unit.skills>();
  for (const s of unit.skills) {
    const arr = skillsByCategory.get(s.category) ?? [];
    arr.push(s);
    skillsByCategory.set(s.category, arr);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-6 sm:py-8">
      <Link href="/course" className="text-sm text-ink-300 hover:text-ink-50 transition">
        ‹ All chapters
      </Link>

      <header className="mt-3 mb-6">
        <p className="text-xs uppercase tracking-widest text-ink-300">
          {unit.code === 'appendix' ? 'Appendix' : `Capitolo ${unit.order}`} ·{' '}
          {LEVEL_LABEL[unit.level] ?? unit.level}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-50 mt-1">{unit.title}</h1>
        {unit.subtitle ? <p className="text-ink-300 mt-1">{unit.subtitle}</p> : null}
        <p className="text-ink-200 mt-3 text-[15px] leading-relaxed">{unit.summary}</p>

        {unit.canDo.length > 0 ? (
          <div className="mt-4 rounded-2xl border hairline bg-ink-800/40 p-4">
            <p className="text-xs uppercase tracking-widest text-ink-300 mb-2">
              By the end you can
            </p>
            <ul className="space-y-1.5">
              {unit.canDo.map((c) => (
                <li key={c} className="flex gap-2 text-[15px] text-ink-100">
                  <span aria-hidden="true" className="text-wise-400">
                    ✓
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-4">
          <StartLessonButton
            lessonType="daily_mission"
            targetSkillIds={unitSkillIds.slice(0, 6)}
            interestTheme={unit.theme}
            userRequest={`A lesson for the chapter "${unit.title}".`}
            label="Start a lesson for this chapter"
          />
        </div>
      </header>

      {/* Lesson templates */}
      {unit.lessonTemplates.length > 0 ? (
        <section className="mb-8">
          <h2 className="font-display text-lg text-ink-50 mb-3">Lessons</h2>
          <div className="space-y-3">
            {unit.lessonTemplates.map((t) => {
              const ids = t.objectiveSkillSlugs
                .map((slug) => idBySlug.get(slug))
                .filter((v): v is string => Boolean(v));
              return (
                <div key={t.slug} className="rounded-2xl border hairline bg-ink-800/50 p-4">
                  <h3 className="font-display text-base text-ink-50">{t.title}</h3>
                  <p className="text-sm text-ink-200 mt-1 leading-relaxed">{t.summary}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs text-ink-400">
                      ~{t.defaultDurationMinutes} min · {t.lessonType.replace(/_/g, ' ')}
                    </span>
                    <StartLessonButton
                      lessonType={t.lessonType}
                      lessonTemplateSlug={t.slug}
                      targetSkillIds={ids.length > 0 ? ids : unitSkillIds.slice(0, 6)}
                      interestTheme={unit.theme}
                      durationMinutes={t.defaultDurationMinutes}
                      userRequest={t.summary}
                      label="Start"
                      className="inline-flex items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium text-ink-50 transition hover:bg-ink-700/60 disabled:opacity-60 min-h-[44px]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Skills */}
      <section className="mb-8">
        <h2 className="font-display text-lg text-ink-50 mb-3">What you’ll learn</h2>
        <div className="space-y-5">
          {[...skillsByCategory.entries()].map(([category, skills]) => (
            <div key={category}>
              <p className="text-xs uppercase tracking-widest text-ink-300 mb-2">
                {CATEGORY_LABEL[category] ?? category}
              </p>
              <ul className="space-y-2.5">
                {skills.map((s) => {
                  const examples = (s.examples as unknown as SkillExample[]) ?? [];
                  const ex = examples[0];
                  return (
                    <li key={s.slug} className="rounded-xl border hairline bg-ink-800/40 p-3">
                      <p className="text-[15px] text-ink-50 font-medium">{s.name}</p>
                      <p className="text-sm text-ink-300 mt-0.5 leading-relaxed">{s.description}</p>
                      {ex ? (
                        <p className="text-sm mt-1.5">
                          <span className="text-wise-300">{ex.target}</span>
                          <span className="text-ink-400"> — {ex.native}</span>
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Vocabulary */}
      {unit.vocabulary.length > 0 ? (
        <section className="mb-8">
          <h2 className="font-display text-lg text-ink-50 mb-3">
            Key vocabulary{' '}
            <span className="text-sm text-ink-400 font-normal">({unit.vocabulary.length})</span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {unit.vocabulary.map((v) => (
              <li
                key={v.slug}
                className="flex items-baseline justify-between gap-3 py-1 border-b hairline"
              >
                <span className="text-ink-50">
                  {v.targetText}
                  {v.gender ? (
                    <span className="text-ink-500 text-xs ml-1">({v.gender})</span>
                  ) : null}
                </span>
                <span className="text-ink-300 text-sm text-right">{v.nativeText}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Culture */}
      {culturalNotes.length > 0 ? (
        <section className="mb-4">
          <h2 className="font-display text-lg text-ink-50 mb-3">Culture</h2>
          <div className="space-y-3">
            {culturalNotes.map((n) => (
              <div key={n.title} className="rounded-2xl border hairline bg-ink-800/40 p-4">
                <p className="font-medium text-ink-50">{n.title}</p>
                <p className="text-sm text-ink-200 mt-1 leading-relaxed">{n.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
