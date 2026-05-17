import { MobileTabBar } from '@/components/ui/mobile-tab-bar';
import { UserMenu } from '@/components/ui/user-menu';
import { getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@speakwise/db';
import Link from 'next/link';

/**
 * Bilingual nav label. We render English-primary with Italian secondary
 * when the learner's languageRatio is low (≤0.30) so a beginner can
 * actually navigate the app. As they level up, the Italian word takes
 * the primary slot. At full immersion, only the Italian word shows.
 *
 * Trade-off: previously the nav was 100% Italian for every learner —
 * "Casa / Parla / Lezioni / …" — which is great for an intermediate
 * learner but a wall to a complete beginner who hasn't learned any
 * navigation vocabulary yet. This makes the app teachable from day one.
 */
function NavLabel({
  en,
  it,
  ratio,
  immersion,
}: {
  en: string;
  it: string;
  ratio: number;
  immersion: boolean;
}) {
  // Full immersion → Italian only.
  if (immersion) {
    return <span>{it}</span>;
  }
  // Intermediate+ → Italian primary, English subtitle.
  if (ratio > 0.5) {
    return (
      <span className="inline-flex flex-col leading-none">
        <span>{it}</span>
        <span className="text-[10px] text-ink-300 mt-0.5">{en}</span>
      </span>
    );
  }
  // Beginner / lower-intermediate → English primary, Italian subtitle.
  return (
    <span className="inline-flex flex-col leading-none">
      <span>{en}</span>
      <span className="text-[10px] text-ink-300 mt-0.5">{it}</span>
    </span>
  );
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const isTutor = user.role === 'tutor';
  // Learners get bilingual nav scaled to their languageRatio; tutors and
  // admins always see English (they're not learning).
  let ratio = 0;
  let immersion = false;
  if (!isTutor) {
    const profile = await prisma.learnerProfile.findUnique({
      where: { userId: user.id },
      select: { languageRatio: true, immersionMode: true },
    });
    if (profile) {
      ratio = Number(profile.languageRatio ?? 0.1);
      immersion = Boolean(profile.immersionMode);
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between bg-ink-800/70 backdrop-blur supports-[backdrop-filter]:bg-ink-800/55 border-b hairline">
        <Link
          href={isTutor ? '/classroom' : '/command-center'}
          className="font-display text-lg sm:text-xl text-ink-50"
        >
          Speakwise
        </Link>
        {/* Top nav branches by role. Tutors see a Classroom-centric nav;
            learners see voice-first tabs whose labels follow their
            languageRatio (English-primary for beginners, Italian for
            advanced). The MobileTabBar in components/ui/mobile-tab-bar.tsx
            is learner-only and renders nothing for tutors. */}
        {isTutor ? (
          <nav className="hidden md:flex gap-6 text-sm text-ink-200">
            <Link href="/classroom" className="hover:text-ink-50 transition">
              Classroom
            </Link>
            <Link href="/classroom?tab=students" className="hover:text-ink-50 transition">
              Students
            </Link>
            <Link href="/profile" className="hover:text-ink-50 transition">
              Profile
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex gap-6 text-sm text-ink-200 items-center">
            <Link href="/command-center" className="hover:text-ink-50 transition">
              <NavLabel en="Home" it="Casa" ratio={ratio} immersion={immersion} />
            </Link>
            <Link href="/talk" className="hover:text-ink-50 transition">
              <NavLabel en="Talk" it="Parla" ratio={ratio} immersion={immersion} />
            </Link>
            <Link href="/lessons" className="hover:text-ink-50 transition">
              <NavLabel en="Lessons" it="Lezioni" ratio={ratio} immersion={immersion} />
            </Link>
            <Link href="/vocabulary" className="hover:text-ink-50 transition">
              <NavLabel en="Words" it="Parole" ratio={ratio} immersion={immersion} />
            </Link>
            <Link href="/progress" className="hover:text-ink-50 transition">
              <NavLabel en="Progress" it="Progressi" ratio={ratio} immersion={immersion} />
            </Link>
            <Link href="/profile" className="hover:text-ink-50 transition">
              <NavLabel en="Profile" it="Profilo" ratio={ratio} immersion={immersion} />
            </Link>
          </nav>
        )}
        <UserMenu name={user.name} />
      </header>
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      {/* MobileTabBar is learner-only; hide it entirely for tutors. */}
      {isTutor ? null : <MobileTabBar />}
    </div>
  );
}
