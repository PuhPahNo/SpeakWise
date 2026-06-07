import { Providers } from '@/components/providers';
import type { Metadata, Viewport } from 'next';
import { Albert_Sans, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

// Brina direction — Space Grotesk (display) + Albert Sans (body).
const albertSans = Albert_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Speakwise',
  description: 'Learn Italian with an AI tutor that remembers you.',
  applicationName: 'Speakwise',
  appleWebApp: { capable: true, title: 'Speakwise', statusBarStyle: 'black-translucent' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0c1014',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${albertSans.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full antialiased bg-ink-800 text-ink-50">
        <div className="fixed inset-0 -z-10 bg-wise-aurora pointer-events-none" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
