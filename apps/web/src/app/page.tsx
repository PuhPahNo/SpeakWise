import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect('/command-center');

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight">
          Learn Italian with an AI tutor that <em>remembers you</em>.
        </h1>
        <p className="mt-6 text-lg text-ink-600">
          Wise turns your goals, interests, mistakes, and progress into personalized
          voice-first lessons.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="rounded-full bg-wise-500 px-6 py-3 font-medium text-white hover:bg-wise-600 transition"
          >
            Start free
          </Link>
          <Link href="/sign-in" className="rounded-full px-6 py-3 font-medium hover:bg-ink-100">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
