import type { Request } from 'express';
import type { Prisma } from '@prisma/client';
import { prisma } from './prisma.js';

export async function audit(
  req: Request,
  action: string,
  entityType: string,
  entityId?: string,
  metadata?: Record<string, unknown>
) {
  await prisma.adminAuditLog.create({
    data: {
      actorId: req.auth?.userId,
      action,
      entityType,
      entityId,
      metadata: metadata as Prisma.InputJsonValue | undefined,
      ipAddress: req.ip,
    },
  });
}
