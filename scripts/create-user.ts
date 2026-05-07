/* eslint-disable no-console */
/**
 * Admin CLI: create a Speakwise user.
 *
 * Usage (run from monorepo root):
 *   pnpm tsx scripts/create-user.ts <username> [password] [--admin] [--name "Display Name"] [--email user@example.com]
 *
 * If password is omitted, a 16-char random password is generated and printed
 * once. (You will not be able to recover it later — write it down.)
 *
 * Without pnpm:
 *   node --experimental-strip-types --env-file=.env scripts/create-user.ts <username>
 */

import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

interface Args {
  username: string;
  password?: string;
  name?: string;
  email?: string;
  admin: boolean;
}

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const positional: string[] = [];
  let admin = false;
  let name: string | undefined;
  let email: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--admin') admin = true;
    else if (a === '--name') name = argv[++i];
    else if (a === '--email') email = argv[++i];
    else if (a?.startsWith('-')) {
      console.error(`unknown flag: ${a}`);
      process.exit(2);
    } else if (a) positional.push(a);
  }
  const [username, password] = positional;
  if (!username) {
    console.error('usage: create-user.ts <username> [password] [--admin] [--name "..."] [--email "..."]');
    process.exit(2);
  }
  return { username, password, name, email, admin };
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
  const passwordHash = await bcrypt.hash(password, 12);

  const prisma = new PrismaClient();
  try {
    const existing = await prisma.user.findUnique({ where: { username: args.username } });
    if (existing) {
      console.error(`✗ user "${args.username}" already exists (id: ${existing.id})`);
      process.exit(1);
    }

    const user = await prisma.user.create({
      data: {
        username: args.username,
        passwordHash,
        name: args.name ?? args.username,
        email: args.email ?? null,
        role: args.admin ? 'admin' : 'learner',
        nativeLanguage: 'en',
        targetLanguage: 'it',
      },
    });

    // Initialize an empty learner profile so first login lands on onboarding cleanly
    await prisma.learnerProfile.create({ data: { userId: user.id } });

    console.log('✓ user created');
    console.log(`  id:       ${user.id}`);
    console.log(`  username: ${user.username}`);
    console.log(`  role:     ${user.role}`);
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
