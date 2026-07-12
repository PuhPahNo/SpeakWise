import { VoiceOrb } from '@/components/voice/voice-orb';
import { UnauthenticatedError, getCurrentUser } from '@/lib/auth/current-user';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  try {
    await getCurrentUser();
    redirect('/command-center');
  } catch (error) {
    if (!(error instanceof UnauthenticatedError)) throw error;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 py-16">
      <div className="mb-10">
        <VoiceOrb state="idle" size="lg" />
      </div>
      <div className="max-w-2xl text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-ink-50">
          Learn Italian with an AI tutor that{' '}
          <em className="text-wise-400 font-display italic">remembers you</em>.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-ink-200 max-w-xl mx-auto">
          Wise turns your goals, interests, mistakes, and progress into personalized voice-first
          lessons.
        </p>
        <div className="mt-10">
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-7 py-3 transition"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
