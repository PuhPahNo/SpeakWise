import { prisma } from '@speakwise/db';
import { readSession, sessionFingerprint } from './session';

const SAFE_USER_SELECT = {
  id: true,
  username: true,
  name: true,
  email: true,
  role: true,
  nativeLanguage: true,
  targetLanguage: true,
  timezone: true,
  createdAt: true,
  updatedAt: true,
  lastActiveAt: true,
} as const;

export class UnauthenticatedError extends Error {
  constructor() {
    super('Unauthenticated');
    this.name = 'UnauthenticatedError';
  }
}

export async function requireUserId(): Promise<string> {
  return (await getCurrentUser()).id;
}

/** Resolve the current authenticated user from the session cookie. Throws if unauthenticated. */
export async function getCurrentUser() {
  const session = await readSession();
  if (!session?.userId || !session.fingerprint) throw new UnauthenticatedError();
  const credential = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { ...SAFE_USER_SELECT, passwordHash: true },
  });
  if (!credential) throw new UnauthenticatedError();
  const expected = sessionFingerprint(credential.id, credential.passwordHash, credential.role);
  if (session.fingerprint !== expected) throw new UnauthenticatedError();
  const { passwordHash, ...user } = credential;
  void passwordHash;
  return user;
}

export { SAFE_USER_SELECT };

/**
 * Backwards-compat alias used by older route handlers. New code should call
 * getCurrentUser(). Keeping the name avoids touching every API route.
 */
export const getOrCreateUser = getCurrentUser;
