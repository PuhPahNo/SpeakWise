/* eslint-disable no-console */
/**
 * Admin CLI: create a Speakwise user.
 *
 * Usage (run from monorepo root):
 *   pnpm tsx scripts/create-user.ts <username> [password] [--admin|--tutor] [--name "Display Name"] [--email user@example.com]
 *
 * Roles:
 *   (default) learner → also gets a LearnerProfile row
 *   --admin           → admin user (no LearnerProfile)
 *   --tutor           → tutor user; also gets a TutorProfile with a fresh
 *                       8-char invite code (printed at the end)
 *
 * If password is omitted, a 16-char random password is generated and printed
 * once. (You will not be able to recover it later — write it down.)
 *
 * Without pnpm:
 *   node --experimental-strip-types --env-file=.env scripts/create-user.ts <username>
 */

import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { AdminCreateUserRequestSchema } from '@speakwise/schemas';
import bcrypt from 'bcryptjs';

interface Args {
  username: string;
  password?: string;
  name?: string;
  email?: string;
  admin: boolean;
  tutor: boolean;
}

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const positional: string[] = [];
  let admin = false;
  let tutor = false;
  let name: string | undefined;
  let email: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--admin') admin = true;
    else if (a === '--tutor') tutor = true;
    else if (a === '--name') name = argv[++i];
    else if (a === '--email') email = argv[++i];
    else if (a?.startsWith('-')) {
      console.error(`unknown flag: ${a}`);
      process.exit(2);
    } else if (a) positional.push(a);
  }
  const [username, password] = positional;
  if (!username) {
    console.error(
      'usage: create-user.ts <username> [password] [--admin|--tutor] [--name "..."] [--email "..."]',
    );
    process.exit(2);
  }
  if (admin && tutor) {
    console.error('cannot pass both --admin and --tutor');
    process.exit(2);
  }
  return { username, password, name, email, admin, tutor };
}

/**
 * Generate an 8-char base32 invite code. Skips visually-ambiguous chars
 * (0/O, 1/I/L) so tutors can dictate codes verbally without confusion.
 */
function generateInviteCode(): string {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const buf = randomBytes(8);
  let code = '';
  for (let i = 0; i < 8; i++) code += alphabet[(buf[i] ?? 0) % alphabet.length];
  return code;
}

function generatePassword(length = 16): string {
  // url-safe base64; trim to length
  return randomBytes(Math.ceil((length * 3) / 4))
    .toString('base64url')
    .slice(0, length);
}

async function main() {
  const args = parseArgs();
  const password = args.password ?? generatePassword();
  const role: 'admin' | 'tutor' | 'learner' = args.admin
    ? 'admin'
    : args.tutor
      ? 'tutor'
      : 'learner';
  const input = AdminCreateUserRequestSchema.parse({
    username: args.username,
    password,
    name: args.name ?? args.username,
    email: args.email?.trim().toLowerCase(),
    role,
  });
  const passwordHash = await bcrypt.hash(password, 12);

  const prisma = new PrismaClient();
  try {
    const existing = await prisma.user.findFirst({
      where: { username: { equals: input.username, mode: 'insensitive' } },
    });
    if (existing) {
      console.error(`✗ user "${input.username}" already exists (id: ${existing.id})`);
      process.exit(1);
    }

    const user = await prisma.user.create({
      data: {
        username: input.username,
        passwordHash,
        name: input.name,
        email: input.email || null,
        role,
        nativeLanguage: 'en',
        targetLanguage: 'it',
      },
    });

    // Profile rows: tutors get a TutorProfile with an invite code;
    // learners get a LearnerProfile so onboarding lands cleanly; admins
    // get neither (they use the admin UI, not the learner/tutor flows).
    let inviteCode: string | null = null;
    if (args.tutor) {
      // Retry on the (extremely rare) collision in the 30^8 space.
      for (let attempt = 0; attempt < 5; attempt++) {
        const candidate = generateInviteCode();
        try {
          await prisma.tutorProfile.create({
            data: { userId: user.id, inviteCode: candidate },
          });
          inviteCode = candidate;
          break;
        } catch (e: unknown) {
          // Unique-constraint violation — try another code
          if (attempt === 4) throw e;
        }
      }
    } else if (!args.admin) {
      await prisma.learnerProfile.create({ data: { userId: user.id } });
    }

    console.log('✓ user created');
    console.log(`  id:       ${user.id}`);
    console.log(`  username: ${user.username}`);
    console.log(`  role:     ${user.role}`);
    if (inviteCode) {
      console.log(`  invite code (share with students to link): ${inviteCode}`);
    }
    if (!args.password) {
      console.log('');
      console.log('  generated password (write this down — it will not be shown again):');
      console.log(`  ${password}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
