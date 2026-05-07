import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@speakwise/db';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';

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

  await prisma.user.update({
    where: { id: user.id },
    data: { lastActiveAt: new Date() },
  });
  await createSession(user.id);

  return NextResponse.json({
    ok: true,
    user: { id: user.id, username: user.username, name: user.name, role: user.role },
  });
}
