import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-ink-200 bg-ink-50 px-6 py-3 flex items-center justify-between">
        <Link href="/command-center" className="font-display text-xl">
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
      <main className="flex-1">{children}</main>
    </div>
  );
}
