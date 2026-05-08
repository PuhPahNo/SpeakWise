import { CommandCenter } from '@/components/wise/command-center';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { ensureProfile } from '@/server/services/profile';
import { redirect } from 'next/navigation';

export default async function CommandCenterPage() {
  const user = await getOrCreateUser();
  const profile = await ensureProfile(user.id);
  if (!profile.onboardingCompleted) redirect('/onboarding');

  const firstName = user.name.split(' ')[0] ?? user.name;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <CommandCenter
        firstName={firstName}
        sessionMinutes={profile.preferredSessionLengthMinutes ?? 10}
      />
    </div>
  );
}
