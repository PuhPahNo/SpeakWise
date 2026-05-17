import { ActivityHeatmap } from '@/components/dashboard/activity-heatmap';
import { CefrHero } from '@/components/dashboard/cefr-hero';
import { ComingNext } from '@/components/dashboard/coming-next';
import { RecentLessons } from '@/components/dashboard/recent-lessons';
import { SkillCardList } from '@/components/dashboard/skill-card-list';
import { VocabularySnapshot } from '@/components/dashboard/vocabulary-snapshot';
import { WeeklySnapshot } from '@/components/dashboard/weekly-snapshot';
import { ProgressNarrative } from '@/components/progress/progress-narrative';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { getFluencyDashboard } from '@/server/services/dashboard';

/**
 * Fluency dashboard. Replaces the old /progress that was just a skill
 * graph + AI narrative. Also folds in the views that used to live at
 * /lessons and /vocabulary (those routes still work but were removed
 * from the top nav since this page covers them).
 *
 * Section order is intentional — top is "where am I and how am I
 * doing", middle is "what's been clicking vs slipping", bottom is
 * "what's next + recent history".
 */
export default async function ProgressPage() {
  const user = await getOrCreateUser();
  const dashboard = await getFluencyDashboard(user.id);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-50">Your progress</h1>
        <p className="text-sm text-ink-200 mt-1">
          {dashboard.isFresh
            ? 'Take your first lesson to start filling this in.'
            : 'Where you are, where you’ve been, and what Wise is teeing up next.'}
        </p>
      </div>

      {/* CEFR hero — where am I on the official scale */}
      <CefrHero progress={dashboard.cefrProgress} learnerName={dashboard.learner.name} />

      {/* Weekly snapshot — streak, days practiced, lessons this week, XP */}
      <WeeklySnapshot weekly={dashboard.weekly} />

      {/* Activity heatmap — last 30 days */}
      <section>
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink-200 mb-3">
          Last 30 days
        </h2>
        <ActivityHeatmap days={dashboard.activity30} />
      </section>

      {/* Strengths — what's clicking */}
      {dashboard.strengths.length > 0 && (
        <SkillCardList
          heading="What's clicking"
          subheading="Skills you've been nailing"
          skills={dashboard.strengths}
          variant="strength"
        />
      )}

      {/* Working on — currently practicing, with prod/comp breakdown */}
      {dashboard.workingOn.length > 0 && (
        <SkillCardList
          heading="Currently practicing"
          subheading="Wise is actively working these into your lessons"
          skills={dashboard.workingOn}
          variant="working"
          showBreakdown
        />
      )}

      {/* Weaknesses — where you're slipping */}
      {dashboard.weaknesses.length > 0 && (
        <SkillCardList
          heading="Where you're slipping"
          subheading="Worth a focused review"
          skills={dashboard.weaknesses}
          variant="weakness"
        />
      )}

      {/* Coming next — what Wise will focus on, plus tutor directive */}
      <ComingNext
        skills={dashboard.comingNext}
        directive={dashboard.tutorDirective}
      />

      {/* Vocabulary snapshot — counts + Review N due CTA */}
      <VocabularySnapshot
        counts={dashboard.vocabulary.counts}
        dueCount={dashboard.vocabulary.dueCount}
        topDue={dashboard.vocabulary.topDue}
      />

      {/* Recent lessons */}
      {dashboard.recentLessons.length > 0 && (
        <RecentLessons lessons={dashboard.recentLessons} />
      )}

      {/* Wise's weekly narrative (existing component) */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-display text-lg sm:text-xl text-ink-50">This week, with Wise</h2>
        </div>
        <ProgressNarrative />
      </section>
    </div>
  );
}
