'use client';

import { BarChart3, BookOpen, Home, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/command-center', label: 'Casa', Icon: Home },
  { href: '/talk', label: 'Parla', Icon: MessageCircle },
  { href: '/vocabulary', label: 'Parole', Icon: BookOpen },
  { href: '/progress', label: 'Progressi', Icon: BarChart3 },
  { href: '/profile', label: 'Profilo', Icon: User },
];

export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t hairline bg-ink-800/85 backdrop-blur supports-[backdrop-filter]:bg-ink-800/65"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-5">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center justify-center gap-1 py-2 text-[11px] tracking-wide min-h-[56px] transition ${
                  active ? 'text-wise-400' : 'text-ink-200 hover:text-ink-50'
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
