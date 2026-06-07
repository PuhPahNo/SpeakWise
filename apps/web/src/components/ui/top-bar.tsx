'use client';

import { UserMenu } from '@/components/ui/user-menu';
import { usePathname } from 'next/navigation';

// Eyebrow + title per top-level route, matching the design's topbar.
function titleFor(pathname: string): { eyebrow: string; title: string } {
  if (pathname.startsWith('/command-center')) return { eyebrow: 'Voice', title: 'Talk with Wise' };
  if (pathname.startsWith('/chat')) return { eyebrow: 'Conversation', title: 'Chat with Wise' };
  if (pathname.startsWith('/progress')) return { eyebrow: 'Fluency', title: 'Your progress' };
  if (pathname.startsWith('/course')) return { eyebrow: 'Curriculum', title: 'Your course' };
  if (pathname.startsWith('/lessons')) return { eyebrow: 'Curriculum', title: 'Lessons' };
  if (pathname.startsWith('/vocabulary')) return { eyebrow: 'Review', title: 'Vocabulary' };
  if (pathname.startsWith('/profile')) return { eyebrow: 'You & Wise', title: 'Your profile' };
  if (pathname.startsWith('/classroom')) return { eyebrow: 'Teaching', title: 'Classroom' };
  return { eyebrow: '', title: 'Speakwise' };
}

export function TopBar({ name }: { name: string }) {
  const pathname = usePathname();
  const { eyebrow, title } = titleFor(pathname);
  return (
    <header
      className="sticky top-0 z-30 flex flex-none items-center justify-between gap-4 border-b hairline px-4 py-3 backdrop-blur sm:px-6 md:px-8 md:py-4"
      style={{ background: 'color-mix(in oklch, var(--bg) 75%, transparent)' }}
    >
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-0.5 hidden text-[.68rem] font-semibold uppercase tracking-[0.18em] text-ink-300 md:block">
            {eyebrow}
          </div>
        )}
        <h1 className="truncate font-display text-xl font-medium tracking-tight text-ink-50 md:text-2xl">
          {title}
        </h1>
      </div>
      <div className="flex flex-none items-center gap-3">
        <UserMenu name={name} />
      </div>
    </header>
  );
}
