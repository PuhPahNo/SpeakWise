import { getOrCreateUser } from '@/lib/auth/current-user';
import { ensureProfile } from '@/server/services/profile';
import { redirect } from 'next/navigation';
import { Freestyle } from '@/components/wise/freestyle';

export const metadata = { title: 'Talk to Wise · Speakwise' };

export default async function TalkPage() {
  const user = await getOrCreateUser();
  const profile = await ensureProfile(user.id);
  if (!profile.onboardingCompleted) redirect('/onboarding');
  const firstName = user.name.split(' ')[0] ?? user.name;
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Freestyle firstName={firstName} />
    </div>
  );
}
