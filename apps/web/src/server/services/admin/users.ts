import { randomBytes } from 'node:crypto';
import { ConflictError, NotFoundError } from '@/lib/api/errors';
import { hashPassword } from '@/lib/auth/password';
import { ensureProfile, updateProfile } from '@/server/services/profile';
import { type Prisma, prisma } from '@speakwise/db';
import type { AdminCreateUserRequest, AdminUpdateUserRequest } from '@speakwise/schemas';

type Role = 'learner' | 'admin' | 'tutor' | 'student' | 'organization_admin';

/** Audit-log an admin action as a UserEvent on the acting admin. */
async function audit(actorId: string, eventType: string, payload: Record<string, unknown>) {
  await prisma.userEvent.create({
    data: { userId: actorId, eventType, payload: payload as Prisma.InputJsonValue },
  });
}

/** 8-char base32 invite code, skipping visually-ambiguous chars. */
function generateInviteCode(): string {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const buf = randomBytes(8);
  let code = '';
  for (let i = 0; i < 8; i++) code += alphabet[(buf[i] ?? 0) % alphabet.length];
  return code;
}

/** Strong url-safe temporary password. */
export function generatePassword(length = 16): string {
  return randomBytes(Math.ceil((length * 3) / 4))
    .toString('base64url')
    .slice(0, length);
}

async function ensureTutorProfile(userId: string): Promise<void> {
  const existing = await prisma.tutorProfile.findUnique({ where: { userId } });
  if (existing) return;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await prisma.tutorProfile.create({
        data: { userId, inviteCode: generateInviteCode() },
      });
      return;
    } catch (e) {
      if (attempt === 4) throw e;
    }
  }
}

export interface AdminUserSummary {
  id: string;
  username: string;
  name: string;
  email: string | null;
  role: Role;
  level: string | null;
  streakDays: number | null;
  onboardingCompleted: boolean | null;
  lastActiveAt: string | null;
  createdAt: string;
}

export async function listUsers(filter: { q?: string; role?: Role }): Promise<AdminUserSummary[]> {
  const where: Prisma.UserWhereInput = {};
  if (filter.role) where.role = filter.role;
  if (filter.q) {
    where.OR = [
      { username: { contains: filter.q, mode: 'insensitive' } },
      { name: { contains: filter.q, mode: 'insensitive' } },
      { email: { contains: filter.q, mode: 'insensitive' } },
    ];
  }
  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 500,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      role: true,
      lastActiveAt: true,
      createdAt: true,
      profile: { select: { currentLevel: true, onboardingCompleted: true } },
      streak: { select: { currentDays: true } },
    },
  });
  return users.map((u) => ({
    id: u.id,
    username: u.username,
    name: u.name,
    email: u.email,
    role: u.role as Role,
    level: u.profile?.currentLevel ?? null,
    streakDays: u.streak?.currentDays ?? null,
    onboardingCompleted: u.profile?.onboardingCompleted ?? null,
    lastActiveAt: u.lastActiveAt?.toISOString() ?? null,
    createdAt: u.createdAt.toISOString(),
  }));
}

export async function getUserDetail(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      tutorProfile: true,
      streak: true,
    },
  });
  if (!user) throw new NotFoundError('User not found');
  const xpAgg = await prisma.xpEntry.aggregate({
    where: { userId },
    _sum: { amount: true },
  });
  const p = user.profile;
  // Plain, client-serializable shapes (Prisma Decimal/Date → number/string).
  const profile = p
    ? {
        currentLevel: p.currentLevel as string,
        levelConfidence: p.levelConfidence != null ? Number(p.levelConfidence) : null,
        goals: p.goals,
        interests: p.interests,
        preferredLearningStyle: p.preferredLearningStyle as string,
        preferredCorrectionStyle: p.preferredCorrectionStyle as string,
        preferredWisePersonality: p.preferredWisePersonality as string,
        preferredSessionLengthMinutes: p.preferredSessionLengthMinutes,
        preferredFrequency: p.preferredFrequency,
        motivationNotes: p.motivationNotes,
        wiseVoiceId: p.wiseVoiceId,
        languageRatio: Number(p.languageRatio),
        immersionMode: p.immersionMode,
        languageRatioOverridden: p.languageRatioOverridden,
        preferredInteractionMode: p.preferredInteractionMode as string,
        onboardingCompleted: p.onboardingCompleted,
      }
    : null;
  return {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role as Role,
      nativeLanguage: user.nativeLanguage,
      targetLanguage: user.targetLanguage,
      timezone: user.timezone,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      lastActiveAt: user.lastActiveAt?.toISOString() ?? null,
    },
    profile,
    tutorProfile: user.tutorProfile
      ? {
          displayName: user.tutorProfile.displayName,
          bio: user.tutorProfile.bio,
          specialties: user.tutorProfile.specialties,
          inviteCode: user.tutorProfile.inviteCode,
        }
      : null,
    streak: user.streak
      ? { currentDays: user.streak.currentDays, longestDays: user.streak.longestDays }
      : null,
    xpTotal: xpAgg._sum.amount ?? 0,
  };
}

export type AdminUserDetail = Awaited<ReturnType<typeof getUserDetail>>;

export async function createUser(
  input: AdminCreateUserRequest,
  actorId: string,
): Promise<{ id: string; username: string; role: Role; generatedPassword?: string }> {
  const username = input.username.trim();
  const dupe = await prisma.user.findFirst({
    where: { username: { equals: username, mode: 'insensitive' } },
    select: { id: true },
  });
  if (dupe) throw new ConflictError(`Username "${username}" is already taken`);

  const email = input.email?.trim() ? input.email.trim().toLowerCase() : null;
  if (email) {
    const emailDupe = await prisma.user.findFirst({ where: { email }, select: { id: true } });
    if (emailDupe) throw new ConflictError(`Email "${email}" is already in use`);
  }

  const password = input.password ?? generatePassword();
  const passwordHash = await hashPassword(password);
  const role = (input.role ?? 'learner') as Role;

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
      name: input.name.trim(),
      email,
      role,
      nativeLanguage: input.nativeLanguage ?? 'en',
      targetLanguage: input.targetLanguage ?? 'it',
      timezone: input.timezone ?? null,
    },
  });

  // Role-appropriate profile rows (admins get neither).
  if (role === 'tutor') await ensureTutorProfile(user.id);
  else if (role === 'learner' || role === 'student' || role === 'organization_admin') {
    await prisma.learnerProfile.create({ data: { userId: user.id } });
  }

  await audit(actorId, 'AdminUserCreated', { targetUserId: user.id, role });

  return {
    id: user.id,
    username: user.username,
    role: user.role as Role,
    // Only surfaced when WE generated it (so the admin can hand it over once).
    generatedPassword: input.password ? undefined : password,
  };
}

export async function updateUser(
  userId: string,
  patch: AdminUpdateUserRequest,
  actorId: string,
): Promise<{ id: string }> {
  const target = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (!target) throw new NotFoundError('User not found');

  if (patch.username) {
    const dupe = await prisma.user.findFirst({
      where: { username: { equals: patch.username, mode: 'insensitive' }, NOT: { id: userId } },
      select: { id: true },
    });
    if (dupe) throw new ConflictError(`Username "${patch.username}" is already taken`);
  }

  const data: Prisma.UserUpdateInput = {};
  if (patch.username !== undefined) data.username = patch.username;
  if (patch.name !== undefined) data.name = patch.name;
  if (patch.email !== undefined) data.email = patch.email ? patch.email.trim().toLowerCase() : null;
  if (patch.role !== undefined) data.role = patch.role;
  if (patch.timezone !== undefined) data.timezone = patch.timezone;
  if (patch.nativeLanguage !== undefined) data.nativeLanguage = patch.nativeLanguage;
  if (patch.targetLanguage !== undefined) data.targetLanguage = patch.targetLanguage;

  if (data.email) {
    const emailDupe = await prisma.user.findFirst({
      where: { email: data.email as string, NOT: { id: userId } },
      select: { id: true },
    });
    if (emailDupe) throw new ConflictError('Email is already in use');
  }

  await prisma.user.update({ where: { id: userId }, data });

  // Make sure a role change lands the user a sensible profile row.
  if (patch.role && patch.role !== target.role) {
    if (patch.role === 'tutor') await ensureTutorProfile(userId);
    else if (
      patch.role === 'learner' ||
      patch.role === 'student' ||
      patch.role === 'organization_admin'
    ) {
      const has = await prisma.learnerProfile.findUnique({ where: { userId } });
      if (!has) await prisma.learnerProfile.create({ data: { userId } });
    }
  }

  await audit(actorId, 'AdminUserUpdated', {
    targetUserId: userId,
    fields: Object.keys(data),
  });
  return { id: userId };
}

export async function resetUserPassword(
  userId: string,
  password: string | undefined,
  actorId: string,
): Promise<{ password?: string }> {
  const exists = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!exists) throw new NotFoundError('User not found');
  const plain = password ?? generatePassword();
  const passwordHash = await hashPassword(plain);
  await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
  await audit(actorId, 'AdminPasswordReset', { targetUserId: userId });
  return { password: password ? undefined : plain };
}

export async function updateUserProfile(
  userId: string,
  patch: Prisma.LearnerProfileUpdateInput,
  actorId: string,
) {
  await ensureProfile(userId);
  const updated = await updateProfile(userId, patch);
  await audit(actorId, 'AdminProfileUpdated', {
    targetUserId: userId,
    fields: Object.keys(patch),
  });
  return updated;
}

export async function deleteUser(userId: string, actorId: string): Promise<{ id: string }> {
  if (userId === actorId) {
    throw new ConflictError('You cannot delete your own admin account');
  }
  const exists = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!exists) throw new NotFoundError('User not found');
  // All per-user rows cascade (onDelete: Cascade on every relation).
  await prisma.user.delete({ where: { id: userId } });
  await audit(actorId, 'AdminUserDeleted', { targetUserId: userId });
  return { id: userId };
}
