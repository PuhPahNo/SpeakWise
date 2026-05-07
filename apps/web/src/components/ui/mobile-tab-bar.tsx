'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart3, User } from 'lucide-react';

const tabs = [
  { href: '/command-center', label: 'Home', Icon: Home },
  { href: '/vocabulary', label: 'Words', Icon: BookOpen },
  { href: '/progress', label: 'Progress', Icon: BarChart3 },
  { href: '/profile', label: 'Profile', Icon: User },
];

export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-ink-200 bg-ink-50/95 backdrop-blur supports-[backdrop-filter]:bg-ink-50/80"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-4">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center justify-center gap-1 py-2 text-[11px] min-h-[56px] ${
                  active ? 'text-wise-600' : 'text-ink-500'
                }`}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
