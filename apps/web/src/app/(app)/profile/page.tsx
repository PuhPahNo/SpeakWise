import { getOrCreateUser } from '@/lib/auth/current-user';
import { ensureProfile } from '@/server/services/profile';
import { ProfileEditor } from '@/components/profile/profile-editor';

export default async function ProfilePage() {
  const user = await getOrCreateUser();
  const profile = await ensureProfile(user.id);
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="font-display text-2xl sm:text-3xl mb-5 sm:mb-6">Your profile</h1>
      <ProfileEditor profile={profile} />
    </div>
  );
}
