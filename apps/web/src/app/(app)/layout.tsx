import { MobileTabBar } from '@/components/ui/mobile-tab-bar';
import { type RailItem, SideRail } from '@/components/ui/side-rail';
import { TopBar } from '@/components/ui/top-bar';
import { UnauthenticatedError, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@speakwise/db';
import { redirect } from 'next/navigation';

/**
 * One language per nav label, by the learner's ratio band:
 *   ratio ≤ 0.50 / non-immersion → English; otherwise Italian.
 */
function navLabel(en: string, it: string, ratio: number, immersion: boolean): string {
  return immersion || ratio > 0.5 ? it : en;
}

// CEFRLevel enum → short ladder code for the rail chip.
const LEVEL_CODE: Record<string, string> = {
  complete_beginner: 'A1',
  beginner: 'A1',
  lower_intermediate: 'A2',
  intermediate: 'B1',
  upper_intermediate: 'B2',
  advanced: 'C1',
};

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser().catch((error) => {
    if (error instanceof UnauthenticatedError) redirect('/sign-in');
    throw error;
  });
  const isTutor = user.role === 'tutor';

  let ratio = 0;
  let immersion = false;
  let levelCode: string | undefined;
  let streakDays: number | undefined;
  if (!isTutor) {
    const [profile, streak] = await Promise.all([
      prisma.learnerProfile.findUnique({
        where: { userId: user.id },
        select: { languageRatio: true, immersionMode: true, currentLevel: true },
      }),
      prisma.userStreak.findUnique({
        where: { userId: user.id },
        select: { currentDays: true },
      }),
    ]);
    if (profile) {
      ratio = Number(profile.languageRatio ?? 0.1);
      immersion = Boolean(profile.immersionMode);
      levelCode = LEVEL_CODE[profile.currentLevel] ?? 'A1';
    }
    streakDays = streak?.currentDays;
  }

  const items: RailItem[] = isTutor
    ? [
        { href: '/classroom', label: 'Classroom', icon: 'classroom' },
        { href: '/classroom?tab=students', label: 'Students', icon: 'students' },
        { href: '/profile', label: 'Profile', icon: 'profile' },
      ]
    : [
        {
          href: '/command-center',
          label: navLabel('Home', 'Casa', ratio, immersion),
          icon: 'home',
        },
        { href: '/chat', label: navLabel('Chat', 'Conversa', ratio, immersion), icon: 'chat' },
        {
          href: '/progress',
          label: navLabel('Progress', 'Progressi', ratio, immersion),
          icon: 'progress',
        },
        { href: '/course', label: navLabel('Course', 'Corso', ratio, immersion), icon: 'course' },
        {
          href: '/profile',
          label: navLabel('Profile', 'Profilo', ratio, immersion),
          icon: 'profile',
        },
      ];

  // Admins get a dedicated entry into the admin console at the top of the rail.
  if (user.role === 'admin') {
    items.unshift({ href: '/admin', label: 'Admin', icon: 'admin' });
  }

  return (
    <div className="md:grid md:h-screen md:grid-cols-[248px_1fr] md:overflow-hidden">
      <SideRail
        brandHref={isTutor ? '/classroom' : '/command-center'}
        items={items}
        learnerName={user.name}
        levelCode={levelCode}
        streakDays={streakDays}
      />
      <div className="flex min-w-0 flex-col md:h-screen md:min-h-0">
        <TopBar name={user.name} isAdmin={user.role === 'admin'} />
        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 md:overflow-y-auto md:px-8 md:pb-8">
          {children}
        </main>
      </div>
      {/* Learner-only bottom bar on mobile; tutors get none. */}
      {isTutor ? null : <MobileTabBar />}
    </div>
  );
}
