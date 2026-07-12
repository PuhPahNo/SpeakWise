import { createHmac } from 'node:crypto';
import { sealData, unsealData } from 'iron-session';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'sw_session';
const SESSION_TTL_DAYS = 30;
const SESSION_TTL_SECONDS = SESSION_TTL_DAYS * 24 * 60 * 60;

export interface SessionData {
  userId: string;
  /** Issued-at timestamp (seconds). Used to detect old sessions. */
  iat: number;
  /** Changes whenever the user's password or authorization role changes. */
  fingerprint: string;
}

function sessionPassword(): string {
  const pw = process.env.AUTH_SESSION_SECRET;
  if (!pw || pw.length < 32) {
    throw new Error(
      'AUTH_SESSION_SECRET is missing or shorter than 32 chars. Generate with `openssl rand -base64 32`.',
    );
  }
  return pw;
}

const sealOpts = () => ({ password: sessionPassword(), ttl: SESSION_TTL_SECONDS });

export function sessionFingerprint(userId: string, passwordHash: string, role: string): string {
  return createHmac('sha256', sessionPassword())
    .update(`${userId}\0${passwordHash}\0${role}`)
    .digest('base64url');
}

export async function createSession(
  userId: string,
  passwordHash: string,
  role: string,
): Promise<void> {
  const data: SessionData = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    fingerprint: sessionFingerprint(userId, passwordHash, role),
  };
  const sealed = await sealData(data, sealOpts());
  const jar = await cookies();
  jar.set(SESSION_COOKIE, sealed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function readSession(): Promise<SessionData | null> {
  const jar = await cookies();
  const c = jar.get(SESSION_COOKIE);
  if (!c) return null;
  try {
    return await unsealData<SessionData>(c.value, sealOpts());
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}
