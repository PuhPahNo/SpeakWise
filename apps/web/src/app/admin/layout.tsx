import { UserMenu } from '@/components/ui/user-menu';
import { getOrCreateUser } from '@/lib/auth/current-user';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminNav } from './admin-nav';

export const dynamic = 'force-dynamic';

/** Single admin gate for everything under /admin. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getOrCreateUser();
  if (user.role !== 'admin') redirect('/command-center');

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b hairline px-4 py-3 backdrop-blur sm:px-8"
        style={{ background: 'color-mix(in oklch, var(--bg) 75%, transparent)' }}
      >
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-display text-lg text-ink-50">
            Speakwise <span className="text-ink-300">Admin</span>
          </Link>
          <AdminNav />
        </div>
        <UserMenu name={user.name} />
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-8">{children}</main>
    </div>
  );
}
