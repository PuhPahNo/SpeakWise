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
  return (
    <div className="h-[calc(100dvh-3.5rem)]">
      <WiseChat firstName={firstName} />
    </div>
  );
}
