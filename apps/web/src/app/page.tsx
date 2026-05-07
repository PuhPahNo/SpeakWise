import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect('/command-center');

  return (
    <main className="min-h-screen flex items-center justify-center px-5 sm:px-6 py-12">
      <div className="max-w-xl text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          Learn Italian with an AI tutor that <em>remembers you</em>.
        </h1>
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-ink-600">
          Wise turns your goals, interests, mistakes, and progress into personalized
          voice-first lessons.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-full bg-wise-500 px-6 py-3 font-medium text-white hover:bg-wise-600 transition"
          >
            Start free
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 font-medium hover:bg-ink-100"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
