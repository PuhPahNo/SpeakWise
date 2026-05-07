import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ensureProfile } from '@/server/services/profile';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { recommendNext } from '@/server/services/wise';
import { CommandCenter } from '@/components/wise/command-center';

export default async function CommandCenterPage() {
  const user = await getOrCreateUser();
  const profile = await ensureProfile(user.id);
  if (!profile.onboardingCompleted) redirect('/onboarding');

  const next = await recommendNext(user.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-3xl leading-tight">
          Welcome back, {user.name}.
        </h1>
        <p className="text-sm sm:text-base text-ink-600 mt-2">{next.reason}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
        <Link
          href="#"
          className="block rounded-2xl bg-wise-500 text-white p-5 sm:p-6 hover:bg-wise-600 active:bg-wise-700 transition"
        >
          <div className="text-xs sm:text-sm uppercase tracking-wider opacity-80">Today</div>
          <div className="font-display text-xl sm:text-2xl mt-2">Start daily mission</div>
          <div className="text-sm mt-1 sm:mt-2 opacity-90">
            ~{profile.preferredSessionLengthMinutes ?? 10} min
          </div>
        </Link>
        <Link
          href="/vocabulary?dueForReview=true"
          className="block rounded-2xl bg-ink-100 p-5 sm:p-6 hover:bg-ink-200 active:bg-ink-300 transition"
        >
          <div className="text-xs sm:text-sm uppercase tracking-wider text-ink-500">Review</div>
          <div className="font-display text-xl sm:text-2xl mt-2 text-ink-900">
            Vocabulary due
          </div>
          <div className="text-sm mt-1 sm:mt-2 text-ink-600">
            Catch up on what you've learned
          </div>
        </Link>
      </div>

      <CommandCenter />
    </div>
  );
}
