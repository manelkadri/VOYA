import { describe, expect, it } from 'vitest';
import { PrismaClient } from '@prisma/client';

const enabled = Boolean(process.env.TEST_DATABASE_URL);

describe.skipIf(!enabled)('PostgreSQL integration', () => {
  it('connects and has seeded plans', async () => {
    const prisma = new PrismaClient({ datasourceUrl: process.env.TEST_DATABASE_URL });
    try {
      await prisma.$queryRaw`SELECT 1`;
      const plans = await prisma.subscriptionPlan.findMany();
      expect(plans.map((plan) => plan.code).sort()).toEqual(['FREE', 'PREMIUM']);
    } finally {
      await prisma.$disconnect();
    }
  });
});
