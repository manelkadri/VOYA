import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { ApiError, ok, parse } from '../../lib/http.js';
import { authenticate, csrfProtection } from '../../middleware/auth.js';

export const subscriptionRouter = Router();

subscriptionRouter.get('/plans', async (_req, res) => {
  ok(res, await prisma.subscriptionPlan.findMany({ where: { isActive: true }, orderBy: { priceMonthlyCents: 'asc' } }));
});

subscriptionRouter.post('/checkout', authenticate, csrfProtection, (req, _res, next) => {
  parse(z.object({ planCode: z.literal('PREMIUM') }), req.body);
  next(new ApiError(503, 'PAYMENTS_NOT_CONFIGURED', 'Paid upgrades are unavailable until a verified payment provider is configured.'));
});

subscriptionRouter.post('/cancel', authenticate, csrfProtection, async (req, res) => {
  const subscription = await prisma.subscription.findFirst({ where: { userId: req.auth!.userId, status: 'ACTIVE' }, include: { plan: true }, orderBy: { createdAt: 'desc' } });
  if (!subscription || subscription.plan.code === 'FREE') throw new ApiError(409, 'NO_PAID_SUBSCRIPTION', 'There is no paid subscription to cancel.');
  if (!subscription.providerSubscriptionId) throw new ApiError(503, 'PAYMENTS_NOT_CONFIGURED', 'This subscription must be managed by its payment provider.');
  throw new ApiError(503, 'PAYMENTS_NOT_CONFIGURED', 'Cancellation is unavailable until the payment provider is configured.');
});
