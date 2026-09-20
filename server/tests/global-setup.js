import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

// Fresh throwaway DB every run — kills the "haunted tests" failure mode.
const DB = resolve(process.cwd(), 'prisma/test.db');
for (const f of [DB, `${DB}-journal`, `${DB}-wal`, `${DB}-shm`]) rmSync(f, { force: true });

// Runs once before tests. Uses the REAL migration chain — CI thereby also
// proves migrations apply cleanly. (Prisma 6 classic: no DATABASE_URL needed
// for generate; migrate deploy gets the test URL via env.)
export default function globalSetup() {
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: 'file:./test.db' },
  });
}