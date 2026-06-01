'use client';

import { BarChart3, BookOpen, Home, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mobile bottom-tab nav. Mirrors the desktop top nav structure:
// vocabulary + lessons folded into the Progress dashboard, not separate
// tabs. /vocabulary/review still reachable via dashboard CTA.
const tabs = [
  { href: '/command-center', en: 'Home', it: 'Casa', Icon: Home },
  { href: '/course', en: 'Course', it: 'Corso', Icon: BookOpen },
  { href: '/progress', en: 'Progress', it: 'Progressi', Icon: BarChart3 },
  { href: '/profile', en: 'Profile', it: 'Profilo', Icon: User },
];

export function MobileTabBar() {
  const pathname = usePathname();
  // Fetch the learner's languageRatio so labels stay bilingual at low
  // levels and switch to Italian-primary at higher ratios. Default to
  // 0.1 (beginner-leaning) while loading; never block render on this.
  const [ratio, setRatio] = useState(0.1);
  const [immersion, setImmersion] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/profile')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        if (d.languageRatio != null) setRatio(Number(d.languageRatio));
        if (d.immersionMode != null) setImmersion(Boolean(d.immersionMode));
      })
      .catch(() => {
        /* network blip — keep defaults */
      });
    return () => {
      cancelled = true;
    };
  }, []);
  // Match the layout's labeling rules: immersion → IT only;
  // ratio > 0.5 → IT primary; otherwise EN primary. The tab bar is
  // tight on space so we only show ONE word at a time (no subtitle).
  const labelFor = (en: string, it: string) => {
    if (immersion) return it;
    if (ratio > 0.5) return it;
    return en;
  };
  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t hairline bg-ink-800/85 backdrop-blur supports-[backdrop-filter]:bg-ink-800/65"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-4">
        {tabs.map(({ href, en, it, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center justify-center gap-1 py-2 text-[11px] tracking-wide min-h-[56px] transition ${
                  active ? 'text-wise-400' : 'text-ink-200 hover:text-ink-50'
                }`}
                aria-label={en} /* always English for screen readers */
              >
                <Icon size={20} aria-hidden="true" />
                <span>{labelFor(en, it)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
