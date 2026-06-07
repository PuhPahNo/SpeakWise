import { WiseChat } from '@/components/wise/wise-chat';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { ensureProfile } from '@/server/services/profile';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Chat with Wise · Speakwise' };
export const dynamic = 'force-dynamic';

export default async function ChatPage() {
  const user = await getOrCreateUser();
  const profile = await ensureProfile(user.id);
  if (!profile.onboardingCompleted) redirect('/onboarding');
  const firstName = user.name.split(' ')[0] ?? user.name;
  // Break out of the shell's main padding so chat is edge-to-edge; height
  // accounts for the top bar (and the mobile bottom tab bar).
  return (
    <div className="-mx-4 -mb-24 -mt-6 h-[calc(100dvh-7rem)] sm:-mx-6 md:-mx-8 md:-mb-8 md:h-[calc(100vh-5rem)]">
      <WiseChat firstName={firstName} />
    </div>
  );
}
