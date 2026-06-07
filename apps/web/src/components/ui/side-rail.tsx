'use client';

import {
  BarChart3,
  BookOpen,
  Flame,
  GraduationCap,
  Home,
  type LucideIcon,
  MessageSquareText,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  chat: MessageSquareText,
  progress: BarChart3,
  course: BookOpen,
  profile: User,
  classroom: GraduationCap,
  students: Users,
};

export interface RailItem {
  href: string;
  label: string;
  icon: string;
}

interface Props {
  brandHref: string;
  items: RailItem[];
  learnerName: string;
  levelCode?: string;
  streakDays?: number;
}

function initials(name: string): string {
  return (
    name
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?'
  );
}

export function SideRail({ brandHref, items, learnerName, levelCode, streakDays }: Props) {
  const pathname = usePathname();
  return (
    <aside
      className="hidden md:flex flex-col gap-2.5 border-r hairline bg-ink-700/60 px-3.5 py-5"
      style={{ background: 'var(--bg-2)' }}
    >
      <Link href={brandHref} className="flex items-center gap-3 px-2.5 pb-4 pt-1.5">
        <span
          className="h-7 w-7 flex-none rounded-[9px]"
          style={{
            background:
              'radial-gradient(circle at 32% 30%, color-mix(in oklch, var(--accent) 90%, white), var(--accent) 60%, color-mix(in oklch, var(--accent) 60%, black))',
            boxShadow: '0 0 18px -2px var(--accent-glow)',
          }}
          aria-hidden
        />
        <span className="font-display text-[1.28rem] font-medium tracking-tight text-ink-50">
          Speakwise
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map((n) => {
          const Icon = ICONS[n.icon] ?? Home;
          const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? 'page' : undefined}
              className={`relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[.95rem] font-medium transition ${
                active
                  ? 'bg-ink-600 text-ink-50'
                  : 'text-ink-200 hover:bg-ink-600/60 hover:text-ink-50'
              }`}
            >
              <span
                aria-hidden
                className={`absolute -left-3.5 top-1/2 w-[3px] -translate-y-1/2 rounded-full bg-wise-500 transition-all ${
                  active ? 'h-5 opacity-100' : 'h-0 opacity-0'
                }`}
                style={{ boxShadow: '0 0 10px var(--accent)' }}
              />
              <Icon size={20} className={active ? 'text-wise-400' : ''} aria-hidden />
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-3 rounded-2xl border hairline bg-ink-600/70 p-3">
          <span
            className="grid h-10 w-10 flex-none place-items-center rounded-full border text-sm font-semibold text-wise-400"
            style={{
              background: 'var(--accent-soft)',
              borderColor: 'var(--accent-line)',
            }}
            aria-hidden
          >
            {initials(learnerName)}
          </span>
          <div className="min-w-0">
            <div className="truncate text-[.85rem] font-semibold text-ink-50">{learnerName}</div>
            <div className="mt-0.5 flex items-center gap-2 text-[.74rem] text-ink-200">
              {levelCode && (
                <span
                  className="rounded-md px-1.5 py-px font-display text-[.72rem] font-semibold text-wise-400"
                  style={{ background: 'var(--accent-soft)' }}
                >
                  {levelCode}
                </span>
              )}
              {typeof streakDays === 'number' && streakDays > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Flame size={13} className="text-wise-400" aria-hidden />
                  {streakDays}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
