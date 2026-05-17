import { InteractionModeCard } from '@/components/profile/interaction-mode-card';
import { LanguageBalanceCard } from '@/components/profile/language-balance-card';
import { ProfileEditor } from '@/components/profile/profile-editor';
import { TutorCard } from '@/components/profile/tutor-card';
import { WiseRemembers } from '@/components/profile/wise-remembers';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { computeAutoLanguageRatio, ensureProfile } from '@/server/services/profile';

export default async function ProfilePage() {
  const user = await getOrCreateUser();
  const profile = await ensureProfile(user.id);
  // Auto-ratio is recomputed each request; surface both the auto value
  // and the (possibly overridden) stored value so the card can render
  // the right state without needing a second API call client-side.
  const autoLanguageRatio = await computeAutoLanguageRatio(user.id, profile.currentLevel);
  const storedRatio = Number(profile.languageRatio ?? 0);
  const overridden = Boolean(profile.languageRatioOverridden);
  const effectiveRatio = overridden && storedRatio > 0 ? storedRatio : autoLanguageRatio;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl mb-1 text-ink-50">Your profile</h1>
        <p className="text-sm text-ink-200">
          What Wise remembers, and what you&apos;d like to change.
        </p>
      </div>

      {/* How Wise communicates — voice-first vs text-first default. */}
      <section>
        <InteractionModeCard
          initial={profile.preferredInteractionMode === 'text' ? 'text' : 'voice'}
        />
      </section>

      {/* Language preferences — used to live as a chip on the home page,
          now properly settable here with auto-vs-override clarity. */}
      <section>
        <LanguageBalanceCard
          initial={{
            languageRatio: effectiveRatio,
            autoLanguageRatio,
            languageRatioOverridden: overridden,
            immersionMode: profile.immersionMode,
            currentLevel: profile.currentLevel,
          }}
        />
      </section>

      {/* Tutor link — used to live as a modal off the home page. */}
      <section>
        <TutorCard />
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-lg text-ink-50">Wise remembers</h2>
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink-200">
            built from your sessions
          </span>
        </div>
        <WiseRemembers />
      </section>

      <section>
        <h2 className="font-display text-lg text-ink-50 mb-4">Your settings</h2>
        <ProfileEditor profile={profile} />
      </section>
    </div>
  );
}
