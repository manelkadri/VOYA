import { PrismaClient, UserRole } from '@prisma/client';

const email = process.argv[2]?.trim().toLowerCase();
if (!email || !email.includes('@')) {
  throw new Error('Usage: npm run admin:promote -- owner@example.com');
}

const prisma = new PrismaClient();
try {
  const user = await prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { email },
      data: { role: UserRole.SUPER_ADMIN },
      select: { id: true, email: true, role: true },
    });
    await tx.adminAuditLog.create({
      data: {
        action: 'user.bootstrap-super-admin',
        entityType: 'User',
        entityId: updated.id,
        metadata: { email: updated.email },
      },
    });
    return updated;
  });
  console.info(`Promoted ${user.email} to ${user.role}.`);
} finally {
  await prisma.$disconnect();
}
