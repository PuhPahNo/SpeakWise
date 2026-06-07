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
    <div className="page page-narrow">
      <p className="-mt-1 text-sm text-ink-200">
        What Wise remembers, and what you&apos;d like to change.
      </p>

      {/* De-crammed: the compact preference cards sit two-up on desktop. */}
      <div className="grid-2">
        {/* How Wise communicates — voice-first vs text-first default. */}
        <InteractionModeCard
          initial={profile.preferredInteractionMode === 'text' ? 'text' : 'voice'}
        />
        {/* Language preferences — auto-vs-override clarity. */}
        <LanguageBalanceCard
          initial={{
            languageRatio: effectiveRatio,
            autoLanguageRatio,
            languageRatioOverridden: overridden,
            immersionMode: profile.immersionMode,
            currentLevel: profile.currentLevel,
          }}
        />
        {/* Tutor link. */}
        <TutorCard />
      </div>

      <section className="sect">
        <div className="sect-head">
          <h2 className="sect-title">Wise remembers</h2>
          <span className="sect-meta">built from your sessions</span>
        </div>
        <WiseRemembers />
      </section>

      <section className="sect">
        <h2 className="sect-title">Your settings</h2>
        <ProfileEditor profile={profile} />
      </section>
    </div>
  );
}
