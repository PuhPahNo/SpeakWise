import { prisma } from '@speakwise/db';
import { readSession } from './session';

export class UnauthenticatedError extends Error {
  constructor() {
    super('Unauthenticated');
    this.name = 'UnauthenticatedError';
  }
}

export async function requireUserId(): Promise<string> {
  const session = await readSession();
  if (!session?.userId) throw new UnauthenticatedError();
  return session.userId;
}

/** Resolve the current authenticated user from the session cookie. Throws if unauthenticated. */
export async function getCurrentUser() {
  const userId = await requireUserId();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new UnauthenticatedError();
  return user;
}

/**
 * Backwards-compat alias used by older route handlers. New code should call
 * getCurrentUser(). Keeping the name avoids touching every API route.
 */
export const getOrCreateUser = getCurrentUser;
