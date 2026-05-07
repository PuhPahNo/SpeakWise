import { getOrCreateUser } from '@/lib/auth/current-user';
import { ensureProfile } from '@/server/services/profile';
import { ProfileEditor } from '@/components/profile/profile-editor';
import { WiseRemembers } from '@/components/profile/wise-remembers';

export default async function ProfilePage() {
  const user = await getOrCreateUser();
  const profile = await ensureProfile(user.id);
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl mb-1 text-ink-50">Your profile</h1>
        <p className="text-sm text-ink-200">
          What Wise remembers, and what you&apos;d like to change.
        </p>
      </div>

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
