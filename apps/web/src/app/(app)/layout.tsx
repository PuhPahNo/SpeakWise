import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { MobileTabBar } from '@/components/ui/mobile-tab-bar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 border-b border-ink-200 bg-ink-50/90 backdrop-blur supports-[backdrop-filter]:bg-ink-50/70 px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/command-center" className="font-display text-lg sm:text-xl">
          Speakwise
        </Link>
        <nav className="hidden md:flex gap-6 text-sm text-ink-600">
          <Link href="/command-center" className="hover:text-ink-900">Home</Link>
          <Link href="/vocabulary" className="hover:text-ink-900">Vocabulary</Link>
          <Link href="/progress" className="hover:text-ink-900">Progress</Link>
          <Link href="/profile" className="hover:text-ink-900">Profile</Link>
        </nav>
        <UserButton afterSignOutUrl="/" />
      </header>
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileTabBar />
    </div>
  );
}
