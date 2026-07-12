// Tutor-facing service layer. Wraps everything a tutor account needs:
// fetching their own profile + invite code, listing the students they
// manage with summary stats, viewing a single student's detail, and
// authoring/archiving directives.
//
// Mirrors the existing service shape (`getDashboard`, `wiseTurn`, etc.):
// all functions take a userId, do their own auth-scope checks against
// Prisma, and emit `UserEvent`s on state changes so the audit log
// captures tutor activity the same way it captures learner activity.
import { randomBytes } from 'node:crypto';
import { ConflictError, ForbiddenError, NotFoundError } from '@/lib/api/errors';
import { type DirectiveStatus, type TutorStudentStatus, prisma } from '@speakwise/db';
import { emitUserEvent } from '@speakwise/events';

/** Generate an 8-char base32 invite code with visually-distinct chars. */
function generateInviteCode(): string {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const buf = randomBytes(8);
  let code = '';
  for (let i = 0; i < 8; i++) code += alphabet[(buf[i] ?? 0) % alphabet.length];
  return code;
}

export class NotATutorError extends ForbiddenError {
  constructor() {
    super('User is not a tutor');
    this.name = 'NotATutorError';
  }
}

export class StudentNotLinkedError extends ForbiddenError {
  constructor() {
    super('Student is not linked to this tutor');
    this.name = 'StudentNotLinkedError';
  }
}

export class InviteCodeNotFoundError extends NotFoundError {
  constructor() {
    super('Invite code not found');
    this.name = 'InviteCodeNotFoundError';
  }
}

/**
 * Fetch the TutorProfile for a user, creating one if missing. Useful
 * after the admin CLI provisions a tutor but the row got dropped (or
 * to defensively self-heal). Throws if the user isn't `role: 'tutor'`.
 */
export async function getTutorProfile(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  if (user.role !== 'tutor') throw new NotATutorError();
  const existing = await prisma.tutorProfile.findUnique({ where: { userId } });
  if (existing) return existing;
  // Self-heal: provision a profile with a fresh code if somehow missing.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await prisma.tutorProfile.create({
        data: { userId, inviteCode: generateInviteCode() },
      });
    } catch (e) {
      if (attempt === 4) throw e;
    }
  }
  // Unreachable — loop always returns or throws
  throw new Error('Unable to provision tutor profile');
}

export async function rotateInviteCode(tutorUserId: string) {
  const profile = await getTutorProfile(tutorUserId);
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = generateInviteCode();
    try {
      const updated = await prisma.tutorProfile.update({
        where: { id: profile.id },
        data: { inviteCode: candidate },
      });
      return updated;
    } catch (e) {
      if (attempt === 4) throw e;
    }
  }
  throw new Error('Unable to rotate invite code');
}

/**
 * Student-side action: redeem an invite code to link to a tutor.
 * Idempotent — if the link already exists, status is set back to
 * 'active' (un-pausing or un-ending the prior link).
 */
export async function linkStudentByCode(studentUserId: string, code: string) {
  const [student, tutor] = await Promise.all([
    prisma.user.findUnique({ where: { id: studentUserId }, select: { role: true } }),
    prisma.tutorProfile.findFirst({
      where: { inviteCode: code, user: { role: 'tutor' } },
      include: { user: { select: { id: true, name: true } } },
    }),
  ]);
  if (!student || (student.role !== 'learner' && student.role !== 'student')) {
    throw new ForbiddenError('Only learner accounts can connect to a tutor');
  }
  if (!tutor) throw new InviteCodeNotFoundError();
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await prisma.$transaction(async (tx) => {
        await tx.tutorStudent.updateMany({
          where: { studentId: studentUserId, status: 'active' },
          data: { status: 'ended', endedAt: new Date() },
        });
        await tx.tutorStudent.upsert({
          where: { tutorId_studentId: { tutorId: tutor.id, studentId: studentUserId } },
          update: { status: 'active', endedAt: null, connectedAt: new Date() },
          create: { tutorId: tutor.id, studentId: studentUserId, status: 'active' },
        });
      });
      break;
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (attempt === 0 && (code === 'P2002' || code === 'P2034')) continue;
      if (code === 'P2002' || code === 'P2034') {
        throw new ConflictError('Tutor connection changed concurrently; please retry');
      }
      throw error;
    }
  }
  await emitUserEvent(studentUserId, 'TutorLinked', {
    tutorUserId: tutor.userId,
    tutorName: tutor.user.name,
  });
  return {
    tutorUserId: tutor.userId,
    tutorName: tutor.user.name,
    tutorDisplayName: tutor.displayName,
  };
}

/**
 * Student-side action: end the link. Sets status to 'ended' (we keep
 * the row for audit). Re-linking later with the same code reactivates it.
 */
export async function disconnectTutor(studentUserId: string) {
  const active = await prisma.tutorStudent.findFirst({
    where: { studentId: studentUserId, status: 'active' },
    include: { tutor: { select: { userId: true } } },
  });
  await prisma.tutorStudent.updateMany({
    where: { studentId: studentUserId, status: 'active' },
    data: { status: 'ended', endedAt: new Date() },
  });
  await emitUserEvent(studentUserId, 'TutorUnlinked', {
    tutorUserId: active?.tutor.userId ?? null,
  });
}

/** Returns the student's currently-active tutor link (or null). */
export async function getActiveTutorForStudent(studentUserId: string) {
  const link = await prisma.tutorStudent.findFirst({
    where: { studentId: studentUserId, status: 'active' },
    include: {
      tutor: {
        include: { user: { select: { id: true, name: true, username: true } } },
      },
    },
  });
  if (!link) return null;
  return {
    linkId: link.id,
    tutorUserId: link.tutor.userId,
    tutorName: link.tutor.user.name,
    tutorUsername: link.tutor.user.username,
    tutorDisplayName: link.tutor.displayName,
    connectedAt: link.connectedAt,
  };
}

export interface StudentSummary {
  studentId: string;
  username: string;
  name: string;
  currentLevel: string | null;
  streakDays: number;
  xpTotal: number;
  lastSessionAt: Date | null;
  activeDirectiveCount: number;
}

/**
 * Tutor-side list view. One row per linked student with the at-a-glance
 * stats a tutor wants to see in their classroom landing page.
 */
export async function listStudentsForTutor(tutorUserId: string): Promise<StudentSummary[]> {
  const tutor = await getTutorProfile(tutorUserId);
  const links = await prisma.tutorStudent.findMany({
    where: { tutorId: tutor.id, status: 'active' },
    include: {
      student: {
        select: {
          id: true,
          username: true,
          name: true,
          profile: { select: { currentLevel: true } },
          streak: { select: { currentDays: true } },
          xpLedger: { select: { amount: true } },
          sessions: {
            where: { status: 'completed' },
            orderBy: { completedAt: 'desc' },
            take: 1,
            select: { completedAt: true },
          },
          directivesReceived: {
            where: { status: 'active', tutorId: tutor.id },
            select: { id: true },
          },
        },
      },
    },
    orderBy: { connectedAt: 'desc' },
  });
  return links.map((l) => ({
    studentId: l.student.id,
    username: l.student.username,
    name: l.student.name,
    currentLevel: l.student.profile?.currentLevel ?? null,
    streakDays: l.student.streak?.currentDays ?? 0,
    xpTotal: l.student.xpLedger.reduce((s, x) => s + x.amount, 0),
    lastSessionAt: l.student.sessions[0]?.completedAt ?? null,
    activeDirectiveCount: l.student.directivesReceived.length,
  }));
}

/**
 * Tutor-side detail view. Verifies the link is active before exposing
 * any data — keeps tutors from snooping students they're not connected
 * to even if they hit the API directly.
 */
export async function getStudentDetailForTutor(tutorUserId: string, studentId: string) {
  const tutor = await getTutorProfile(tutorUserId);
  const link = await prisma.tutorStudent.findUnique({
    where: { tutorId_studentId: { tutorId: tutor.id, studentId } },
  });
  if (!link || link.status !== 'active') throw new StudentNotLinkedError();

  const [student, recentLessons, skillProgress, recentMistakes, directives] = await Promise.all([
    prisma.user.findUniqueOrThrow({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        username: true,
        profile: true,
        streak: { select: { currentDays: true, longestDays: true } },
        xpLedger: { select: { amount: true } },
      },
    }),
    prisma.lesson.findMany({
      where: { userId: studentId },
      orderBy: [{ completedAt: 'desc' }, { createdAt: 'desc' }],
      take: 10,
      select: {
        id: true,
        title: true,
        lessonType: true,
        status: true,
        createdBy: true,
        tutorDirectiveId: true,
        createdAt: true,
        completedAt: true,
      },
    }),
    prisma.userSkillProgress.findMany({
      where: { userId: studentId },
      include: { skill: { select: { slug: true, name: true, level: true, category: true } } },
      orderBy: { updatedAt: 'desc' },
      take: 30,
    }),
    prisma.userResponse.findMany({
      where: { session: { userId: studentId }, isCorrect: false },
      orderBy: { createdAt: 'desc' },
      take: 8,
      select: {
        id: true,
        userAnswer: true,
        correctedAnswer: true,
        createdAt: true,
        skillIds: true,
      },
    }),
    prisma.tutorDirective.findMany({
      where: { tutorId: tutor.id, studentId },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return {
    student: {
      id: student.id,
      name: student.name,
      username: student.username,
      profile: student.profile,
      streak: student.streak,
      xpTotal: student.xpLedger.reduce((s, x) => s + x.amount, 0),
    },
    recentLessons,
    skillProgress: skillProgress.map((p) => ({
      skillSlug: p.skill.slug,
      skillName: p.skill.name,
      level: p.skill.level,
      category: p.skill.category,
      status: p.status,
      masteryScore: Number(p.masteryScore),
      productionScore: Number(p.productionScore),
      comprehensionScore: Number(p.comprehensionScore),
      lastPracticedAt: p.lastPracticedAt,
      nextReviewAt: p.nextReviewAt,
    })),
    recentMistakes,
    directives,
  };
}

export interface CreateDirectiveInput {
  body: string;
  pinnedSkillIds?: string[];
  expiresAt?: Date | null;
  /**
   * If true, any other active directives for this student get archived.
   * Default true — "one active focus area at a time" is the simpler UX.
   */
  replaceExisting?: boolean;
}

async function validatePinnedSkills(pinned: string[]) {
  if (pinned.length === 0) return;
  const found = await prisma.curriculumSkill.findMany({
    where: { id: { in: pinned }, isActive: true },
    select: { id: true },
  });
  const foundSet = new Set(found.map((skill) => skill.id));
  const missing = pinned.filter((id) => !foundSet.has(id));
  if (missing.length > 0) throw new NotFoundError('One or more pinned skills do not exist');
}

export async function createDirective(
  tutorUserId: string,
  studentId: string,
  input: CreateDirectiveInput,
) {
  const tutor = await getTutorProfile(tutorUserId);
  const link = await prisma.tutorStudent.findUnique({
    where: { tutorId_studentId: { tutorId: tutor.id, studentId } },
  });
  if (!link || link.status !== 'active') throw new StudentNotLinkedError();

  // Validate pinned skills exist (defense in depth — the UI picker
  // shouldn't be able to send garbage but we don't trust the client).
  const pinned = input.pinnedSkillIds ?? [];
  await validatePinnedSkills(pinned);

  const created = await prisma.$transaction(async (tx) => {
    if (input.replaceExisting !== false) {
      await tx.tutorDirective.updateMany({
        where: { tutorId: tutor.id, studentId, status: 'active' },
        data: { status: 'archived', updatedAt: new Date() },
      });
    }
    return tx.tutorDirective.create({
      data: {
        tutorId: tutor.id,
        studentId,
        body: input.body,
        pinnedSkillIds: pinned,
        expiresAt: input.expiresAt ?? null,
        status: 'active',
      },
    });
  });

  await emitUserEvent(studentId, 'TutorDirectiveIssued', {
    directiveId: created.id,
    tutorUserId,
    body: created.body,
    pinnedSkillIds: created.pinnedSkillIds,
  });
  return created;
}

export async function archiveDirective(tutorUserId: string, directiveId: string) {
  const tutor = await getTutorProfile(tutorUserId);
  const dir = await prisma.tutorDirective.findUnique({ where: { id: directiveId } });
  if (!dir || dir.tutorId !== tutor.id) throw new NotFoundError('Directive not found');
  const updated = await prisma.tutorDirective.update({
    where: { id: directiveId },
    data: { status: 'archived' },
  });
  await emitUserEvent(dir.studentId, 'TutorDirectiveArchived', {
    directiveId: dir.id,
    tutorUserId,
  });
  return updated;
}

export async function updateDirective(
  tutorUserId: string,
  directiveId: string,
  patch: {
    body?: string;
    pinnedSkillIds?: string[];
    expiresAt?: Date | null;
    status?: DirectiveStatus;
  },
) {
  const tutor = await getTutorProfile(tutorUserId);
  const directive = await prisma.tutorDirective.findUnique({ where: { id: directiveId } });
  if (!directive || directive.tutorId !== tutor.id) {
    throw new NotFoundError('Directive not found');
  }
  if (patch.pinnedSkillIds) await validatePinnedSkills(patch.pinnedSkillIds);
  return prisma.tutorDirective.update({
    where: { id: directiveId },
    data: patch,
  });
}

/**
 * Called by the lesson generator and Wise greeting/turn to pick up
 * whatever the tutor wants the student to focus on right now. Returns
 * the most recent active directive (or null). Also auto-archives any
 * directive whose `expiresAt` has passed, in line.
 */
export async function getActiveDirectiveForStudent(studentId: string) {
  // Auto-archive expired directives so we never return stale focus.
  await prisma.tutorDirective.updateMany({
    where: { studentId, status: 'active', expiresAt: { lt: new Date() } },
    data: { status: 'archived' },
  });
  const dir = await prisma.tutorDirective.findFirst({
    where: {
      studentId,
      status: 'active',
      tutor: {
        user: { role: 'tutor' },
        students: { some: { studentId, status: 'active' } },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  if (!dir) return null;
  // Resolve pinned skill slugs so the prompt can mention them by name.
  const pinnedSkills =
    dir.pinnedSkillIds.length > 0
      ? await prisma.curriculumSkill.findMany({
          where: { id: { in: dir.pinnedSkillIds } },
          select: { id: true, slug: true, name: true },
        })
      : [];
  return {
    directiveId: dir.id,
    body: dir.body,
    pinnedSkillIds: dir.pinnedSkillIds,
    pinnedSkills,
    expiresAt: dir.expiresAt,
  };
}

/** Re-export Prisma types callers might want to reference. */
export type { DirectiveStatus, TutorStudentStatus };
