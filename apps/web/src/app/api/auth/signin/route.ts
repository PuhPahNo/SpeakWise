import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { consumeRateLimit, getRequestIp, resetRateLimit } from '@/lib/security/rate-limit';
import { prisma } from '@speakwise/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  username: z.string().min(1).max(120),
  password: z.string().min(1).max(200),
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: z.infer<typeof Schema>;
  try {
    body = Schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const ipRate = consumeRateLimit('signin-ip', getRequestIp(req), 50, 15 * 60_000);
  const accountRate = consumeRateLimit(
    'signin-account',
    body.username.trim().toLowerCase(),
    10,
    15 * 60_000,
  );
  if (!ipRate.allowed || !accountRate.allowed) {
    return NextResponse.json(
      { error: 'too_many_requests' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.max(ipRate.retryAfterSeconds, accountRate.retryAfterSeconds)),
        },
      },
    );
  }

  // Look up by username (case-insensitive). Constant-time-ish: always run
  // verifyPassword against either the real hash or a dummy to avoid timing
  // signal on whether the user exists.
  const user = await prisma.user.findFirst({
    where: { username: { equals: body.username, mode: 'insensitive' } },
  });
  const dummyHash = '$2a$12$abcdefghijklmnopqrstuv0123456789ABCDEFGHIJKLMN0123456789';
  const ok = await verifyPassword(body.password, user?.passwordHash ?? dummyHash);

  if (!user || !ok) {
    return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
  }

  resetRateLimit('signin-account', body.username.trim().toLowerCase());

  await prisma.user.update({
    where: { id: user.id },
    data: { lastActiveAt: new Date() },
  });
  await createSession(user.id, user.passwordHash, user.role);

  return NextResponse.json({
    ok: true,
    user: { id: user.id, username: user.username, name: user.name, role: user.role },
  });
}
