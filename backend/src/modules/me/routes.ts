import { Router } from 'express';
import { FavoriteTargetType, ReservationTargetType, SubscriptionTier, TripItemType } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { ApiError, ok, parse } from '../../lib/http.js';
import { authenticate, csrfProtection } from '../../middleware/auth.js';
import { activeEntitlements, enforceQuota } from '../subscriptions/service.js';

export const meRouter = Router();
meRouter.use(authenticate, csrfProtection);

async function assertTargetExists(type: FavoriteTargetType | TripItemType, id: string) {
  const exists = type === 'DESTINATION'
    ? await prisma.destination.count({ where: { id, status: 'PUBLISHED' } })
    : type === 'HOTEL'
      ? await prisma.hotel.count({ where: { id, status: 'PUBLISHED' } })
      : await prisma.experience.count({ where: { id, status: 'PUBLISHED' } });
  if (!exists) throw new ApiError(404, 'CATALOG_ITEM_NOT_FOUND', 'The selected catalog item does not exist.');
}

meRouter.get('/profile', async (req, res) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: req.auth!.userId }, select: { id: true, email: true, role: true, profile: true } });
  ok(res, user);
});

meRouter.patch('/profile', async (req, res) => {
  const input = parse(z.object({
    firstName: z.string().trim().min(1).max(80).optional(),
    lastName: z.string().trim().min(1).max(80).optional(),
    phone: z.string().trim().max(30).nullable().optional(),
    country: z.string().trim().max(100).nullable().optional(),
    city: z.string().trim().max(100).nullable().optional(),
    preferredStyle: z.string().trim().max(120).nullable().optional(),
    marketingOptIn: z.boolean().optional(),
  }), req.body);
  const profile = await prisma.userProfile.upsert({ where: { userId: req.auth!.userId }, create: { userId: req.auth!.userId, ...input }, update: input });
  ok(res, profile);
});

meRouter.get('/favorites', async (req, res) => {
  const favorites = await prisma.favorite.findMany({ where: { userId: req.auth!.userId }, orderBy: { createdAt: 'desc' } });
  const destinationIds = favorites.filter((item) => item.targetType === 'DESTINATION').map((item) => item.targetId);
  const hotelIds = favorites.filter((item) => item.targetType === 'HOTEL').map((item) => item.targetId);
  const experienceIds = favorites.filter((item) => item.targetType === 'EXPERIENCE').map((item) => item.targetId);
  const [destinations, hotels, experiences] = await prisma.$transaction([
    prisma.destination.findMany({ where: { id: { in: destinationIds } }, select: { id: true, slug: true, name: true, country: true, heroImageUrl: true } }),
    prisma.hotel.findMany({ where: { id: { in: hotelIds } }, select: { id: true, slug: true, name: true, heroImageUrl: true, destination: { select: { name: true } } } }),
    prisma.experience.findMany({ where: { id: { in: experienceIds } }, select: { id: true, slug: true, title: true, location: true, heroImageUrl: true } }),
  ]);
  const records = new Map<string, unknown>([...destinations, ...hotels, ...experiences].map((item) => [item.id, item]));
  ok(res, favorites.map((favorite) => ({ ...favorite, item: records.get(favorite.targetId) ?? null })));
});

meRouter.post('/favorites', async (req, res) => {
  const input = parse(z.object({ targetType: z.nativeEnum(FavoriteTargetType), targetId: z.string().cuid() }), req.body);
  await assertTargetExists(input.targetType, input.targetId);
  await enforceQuota(req.auth!.userId, 'favorites');
  const favorite = await prisma.favorite.create({ data: { userId: req.auth!.userId, ...input } });
  res.status(201).json({ success: true, data: favorite });
});

meRouter.delete('/favorites/:id', async (req, res) => {
  const result = await prisma.favorite.deleteMany({ where: { id: req.params.id, userId: req.auth!.userId } });
  if (!result.count) throw new ApiError(404, 'FAVORITE_NOT_FOUND', 'Favorite not found.');
  ok(res, { deleted: true });
});

meRouter.get('/trips', async (req, res) => {
  ok(res, await prisma.savedTrip.findMany({ where: { userId: req.auth!.userId }, include: { items: { orderBy: { sortOrder: 'asc' } } }, orderBy: { updatedAt: 'desc' } }));
});

const tripSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(1000).nullable().optional(),
  startDate: z.coerce.date().nullable().optional(),
  endDate: z.coerce.date().nullable().optional(),
  items: z.array(z.object({ itemType: z.nativeEnum(TripItemType), itemId: z.string().cuid(), sortOrder: z.number().int().nonnegative().default(0), notes: z.string().max(500).optional() })).max(100).optional(),
});

meRouter.post('/trips', async (req, res) => {
  const input = parse(tripSchema, req.body);
  if (input.items) await Promise.all(input.items.map((item) => assertTargetExists(item.itemType, item.itemId)));
  await enforceQuota(req.auth!.userId, 'trips');
  const { items, ...data } = input;
  const trip = await prisma.savedTrip.create({ data: { userId: req.auth!.userId, ...data, ...(items ? { items: { create: items } } : {}) }, include: { items: true } });
  res.status(201).json({ success: true, data: trip });
});

meRouter.patch('/trips/:id', async (req, res) => {
  const input = parse(tripSchema.partial().omit({ items: true }), req.body);
  const result = await prisma.savedTrip.updateMany({ where: { id: req.params.id, userId: req.auth!.userId }, data: input });
  if (!result.count) throw new ApiError(404, 'TRIP_NOT_FOUND', 'Trip not found.');
  ok(res, await prisma.savedTrip.findUniqueOrThrow({ where: { id: req.params.id }, include: { items: true } }));
});

meRouter.delete('/trips/:id', async (req, res) => {
  const result = await prisma.savedTrip.deleteMany({ where: { id: req.params.id, userId: req.auth!.userId } });
  if (!result.count) throw new ApiError(404, 'TRIP_NOT_FOUND', 'Trip not found.');
  ok(res, { deleted: true });
});

meRouter.get('/reservations', async (req, res) => {
  ok(res, await prisma.reservation.findMany({ where: { userId: req.auth!.userId }, include: { history: { orderBy: { createdAt: 'asc' } } }, orderBy: { createdAt: 'desc' } }));
});

meRouter.post('/reservations', async (req, res) => {
  const input = parse(z.object({
    targetType: z.nativeEnum(ReservationTargetType),
    targetId: z.string().cuid().nullable().optional(),
    partySize: z.number().int().min(1).max(50),
    preferredStart: z.coerce.date().nullable().optional(),
    preferredEnd: z.coerce.date().nullable().optional(),
    notes: z.string().trim().max(2000).nullable().optional(),
  }), req.body);
  const entitlement = await activeEntitlements(req.auth!.userId);
  const reservation = await prisma.reservation.create({
    data: {
      userId: req.auth!.userId,
      ...input,
      priority: entitlement.plan.code === SubscriptionTier.PREMIUM,
      history: { create: { toStatus: 'REQUESTED', changedById: req.auth!.userId } },
    },
    include: { history: true },
  });
  res.status(201).json({ success: true, data: reservation });
});

meRouter.get('/subscription', async (req, res) => ok(res, await activeEntitlements(req.auth!.userId)));
