import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = [
  '/',
  '/sign-in',
  '/api/health',
  '/api/auth/signin',
  '/api/auth/signout',
  '/api/cron',
];

const SESSION_COOKIE = 'sw_session';

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;
  // Static assets and Next internals
  if (pathname.startsWith('/_next/')) return true;
  if (pathname.startsWith('/favicon')) return true;
  // Favicon + Apple touch icon routes — Next.js serves these from
  // app/icon.svg and app/apple-icon.tsx as `/icon.svg`, `/apple-icon`,
  // and `/icon` (hashed variants too). They must be reachable without
  // a session or the browser tab never gets its little orb.
  if (pathname === '/icon.svg' || pathname.startsWith('/icon')) return true;
  if (pathname.startsWith('/apple-icon')) return true;
  return false;
}

function hasInvalidOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    // Next's request URL may be normalized to `localhost` by the runtime even
    // when the browser connected through 127.0.0.1 or a reverse proxy. Compare
    // against the actual request host instead, preferring Render's forwarded
    // values when present.
    const forwardedHost = req.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
    const host = forwardedHost || req.headers.get('host');
    const forwardedProto = req.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    const protocol = forwardedProto || req.nextUrl.protocol.replace(':', '');
    const requestOrigin = host ? `${protocol}://${host}` : req.nextUrl.origin;
    return new URL(origin).origin !== requestOrigin;
  } catch {
    return true;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    const fetchSite = req.headers.get('sec-fetch-site');
    if (fetchSite === 'cross-site' || hasInvalidOrigin(req)) {
      return NextResponse.json({ error: 'cross_origin_request' }, { status: 403 });
    }
  }
  if (isPublic(pathname)) return NextResponse.next();

  const hasSession = req.cookies.has(SESSION_COOKIE);
  if (hasSession) return NextResponse.next();

  // For API routes return 401; for pages, redirect to /sign-in.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = '/sign-in';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
