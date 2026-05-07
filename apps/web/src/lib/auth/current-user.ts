import { auth, currentUser as clerkCurrentUser } from '@clerk/nextjs/server';
import { prisma } from '@speakwise/db';

export class UnauthenticatedError extends Error {
  constructor() {
    super('Unauthenticated');
    this.name = 'UnauthenticatedError';
  }
}

export async function requireUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new UnauthenticatedError();
  return userId;
}

/**
 * Resolve the internal Speakwise user row for the currently authenticated
 * Clerk user. Creates one on first encounter (lazy provisioning) — Clerk's
 * webhook also creates one, but lazy provisioning means a user logging in
 * before the webhook fires still works.
 */
export async function getOrCreateUser() {
  const clerkId = await requireUserId();
  const existing = await prisma.user.findUnique({ where: { clerkUserId: clerkId } });
  if (existing) return existing;

  const cu = await clerkCurrentUser();
  const email = cu?.emailAddresses?.[0]?.emailAddress ?? `${clerkId}@unknown.local`;
  const name = [cu?.firstName, cu?.lastName].filter(Boolean).join(' ') || 'Learner';

  return prisma.user.create({
    data: {
      clerkUserId: clerkId,
      email,
      name,
      role: 'learner',
      nativeLanguage: 'en',
      targetLanguage: 'it',
    },
  });
}
