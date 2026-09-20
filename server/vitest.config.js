import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Prisma resolves file:./test.db against prisma/schema.prisma,
    // so the throwaway DB lands at server/prisma/test.db.
    env: { DATABASE_URL: 'file:./test.db' },
    globalSetup: './tests/global-setup.js',
  },
});