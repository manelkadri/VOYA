import { SubscriptionStatus, SubscriptionTier } from '@prisma/client';
import { ApiError } from '../../lib/http.js';
import { prisma } from '../../lib/prisma.js';

export async function activeEntitlements(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: { userId, status: SubscriptionStatus.ACTIVE },
    include: { plan: true },
    orderBy: { createdAt: 'desc' },
  });
  if (!subscription) throw new ApiError(500, 'SUBSCRIPTION_MISSING', 'The user has no active plan.');
  return subscription;
}

export async function enforceQuota(userId: string, resource: 'favorites' | 'trips') {
  const { plan } = await activeEntitlements(userId);
  const limit = resource === 'favorites' ? plan.favoriteLimit : plan.tripLimit;
  if (limit === null) return;
  const count = resource === 'favorites'
    ? await prisma.favorite.count({ where: { userId } })
    : await prisma.savedTrip.count({ where: { userId } });
  if (count >= limit) {
    throw new ApiError(403, 'PLAN_LIMIT_REACHED', `Your ${plan.name} plan allows ${limit} ${resource}.`);
  }
}

export async function createFreeSubscription(userId: string) {
  const plan = await prisma.subscriptionPlan.findUnique({ where: { code: SubscriptionTier.FREE } });
  if (!plan) throw new ApiError(503, 'PLANS_NOT_SEEDED', 'Subscription plans have not been initialized.');
  return prisma.subscription.create({ data: { userId, planId: plan.id } });
}
