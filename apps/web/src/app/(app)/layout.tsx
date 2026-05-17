import { MobileTabBar } from '@/components/ui/mobile-tab-bar';
import { UserMenu } from '@/components/ui/user-menu';
import { getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@speakwise/db';
import Link from 'next/link';

/**
 * Pick ONE language for a nav label based on the learner's ratio band.
 * Previously we stacked EN over a tiny IT subtitle, which felt cluttered
 * and didn't visually center well at small text sizes. A single word is
 * cleaner and scales with the learner: English for beginners, Italian
 * once they're comfortable.
 *   ratio ≤ 0.50  →  English
 *   ratio  > 0.50 →  Italian
 *   immersion    →  Italian
 */
function navLabel(en: string, it: string, ratio: number, immersion: boolean): string {
  if (immersion) return it;
  if (ratio > 0.5) return it;
  return en;
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
          // Single-language nav by ratio band; cleaner than the stacked
          // EN/IT we shipped before. /lessons and /vocabulary moved into
          // the Progress dashboard so they're not separate top-level
          // tabs anymore (still reachable via dashboard CTAs).
          <nav className="hidden md:flex gap-8 text-[15px] text-ink-200 items-center">
            <Link href="/command-center" className="hover:text-ink-50 transition">
              {navLabel('Home', 'Casa', ratio, immersion)}
            </Link>
            <Link href="/talk" className="hover:text-ink-50 transition">
              {navLabel('Talk', 'Parla', ratio, immersion)}
            </Link>
            <Link href="/progress" className="hover:text-ink-50 transition">
              {navLabel('Progress', 'Progressi', ratio, immersion)}
            </Link>
            <Link href="/profile" className="hover:text-ink-50 transition">
              {navLabel('Profile', 'Profilo', ratio, immersion)}
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
