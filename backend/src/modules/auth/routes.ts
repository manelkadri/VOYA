import { Router } from 'express';
import argon2 from 'argon2';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { ApiError, ok, parse } from '../../lib/http.js';
import { authenticate, clearSession, issueSession } from '../../middleware/auth.js';
import { createFreeSubscription } from '../subscriptions/service.js';

const credentialsSchema = z.object({
  email: z.email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(12).max(128),
});

const publicUser = (user: { id: string; email: string; role: string; profile?: unknown }) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  profile: user.profile ?? null,
});

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const input = parse(credentialsSchema.extend({ firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().min(1).max(80) }), req.body);
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new ApiError(409, 'EMAIL_TAKEN', 'An account already uses this email address.');
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash: await argon2.hash(input.password, { type: argon2.argon2id }),
      profile: { create: { firstName: input.firstName, lastName: input.lastName } },
    },
    include: { profile: true },
  });
  try {
    await createFreeSubscription(user.id);
  } catch (error) {
    await prisma.user.delete({ where: { id: user.id } });
    throw error;
  }
  const csrfToken = issueSession(res, user);
  res.status(201).json({ success: true, data: { user: publicUser(user), csrfToken } });
});

authRouter.post('/login', async (req, res) => {
  const input = parse(credentialsSchema, req.body);
  const user = await prisma.user.findUnique({ where: { email: input.email }, include: { profile: true } });
  if (!user || !user.isActive || !(await argon2.verify(user.passwordHash, input.password))) {
    throw new ApiError(401, 'INVALID_CREDENTIALS', 'The email or password is incorrect.');
  }
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  const csrfToken = issueSession(res, user);
  ok(res, { user: publicUser(user), csrfToken });
});

authRouter.post('/logout', authenticate, (_req, res) => {
  clearSession(res);
  ok(res, { loggedOut: true });
});

authRouter.get('/me', authenticate, async (req, res) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: req.auth!.userId },
    include: { profile: true, subscriptions: { where: { status: 'ACTIVE' }, include: { plan: true }, take: 1 } },
  });
  ok(res, { ...publicUser(user), subscription: user.subscriptions[0] ?? null });
});

authRouter.get('/csrf', authenticate, async (req, res) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: req.auth!.userId }, select: { id: true, role: true } });
  ok(res, { csrfToken: issueSession(res, user) });
});
