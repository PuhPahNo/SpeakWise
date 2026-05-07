import Link from 'next/link';
import { MobileTabBar } from '@/components/ui/mobile-tab-bar';
import { UserMenu } from '@/components/ui/user-menu';
import { getCurrentUser } from '@/lib/auth/current-user';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between bg-ink-800/70 backdrop-blur supports-[backdrop-filter]:bg-ink-800/55 border-b hairline">
        <Link href="/command-center" className="font-display text-lg sm:text-xl text-ink-50">
          Speakwise
        </Link>
        <nav className="hidden md:flex gap-6 text-sm text-ink-200">
          <Link href="/command-center" className="hover:text-ink-50 transition">Casa</Link>
          <Link href="/talk" className="hover:text-ink-50 transition">Parla</Link>
          <Link href="/lessons" className="hover:text-ink-50 transition">Lezioni</Link>
          <Link href="/vocabulary" className="hover:text-ink-50 transition">Parole</Link>
          <Link href="/progress" className="hover:text-ink-50 transition">Progressi</Link>
          <Link href="/profile" className="hover:text-ink-50 transition">Profilo</Link>
        </nav>
        <UserMenu name={user.name} />
      </header>
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileTabBar />
    </div>
  );
}
