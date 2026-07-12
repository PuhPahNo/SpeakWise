import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { prisma } from '@speakwise/db';

const BASELINE = '00000000000000_baseline';
const requireFromDbPackage = createRequire(new URL('../packages/db/package.json', import.meta.url));
const prismaCli = requireFromDbPackage.resolve('prisma/build/index.js');

function runPrisma(args: string[]) {
  const result = spawnSync(
    process.execPath,
    [prismaCli, 'migrate', ...args, '--schema', 'packages/db/prisma/schema.prisma'],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: 'inherit',
    },
  );
  if (result.status !== 0) {
    throw new Error(`prisma migrate ${args.join(' ')} failed with ${result.status ?? 'unknown'}`);
  }
}

async function main() {
  const [state] = await prisma.$queryRaw<
    Array<{ app_schema: string | null; migration_schema: string | null }>
  >`SELECT to_regclass('public.users')::text AS app_schema,
           to_regclass('public._prisma_migrations')::text AS migration_schema`;

  if (state?.app_schema) {
    let baselineApplied = false;
    if (state.migration_schema) {
      const [row] = await prisma.$queryRaw<Array<{ applied: bigint }>>`
        SELECT COUNT(*)::bigint AS applied
        FROM "_prisma_migrations"
        WHERE "migration_name" = ${BASELINE} AND "finished_at" IS NOT NULL
      `;
      baselineApplied = Number(row?.applied ?? 0) > 0;
    }
    if (!baselineApplied) {
      runPrisma(['resolve', '--applied', BASELINE]);
    }
  }

  runPrisma(['deploy']);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
