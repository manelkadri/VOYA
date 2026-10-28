import { Router } from 'express';
import { Prisma, PublishStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { ApiError, ok, pagination, parse } from '../../lib/http.js';
import { optionalAuthenticate } from '../../middleware/auth.js';

const querySchema = z.object({
  q: z.string().trim().max(100).optional(),
  region: z.string().trim().max(80).optional(),
  category: z.string().trim().max(80).optional(),
  featured: z.enum(['true', 'false']).optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
});

const destinationInput = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(120),
  country: z.string().trim().min(2).max(100),
  region: z.string().trim().min(2).max(80),
  category: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(500),
  longDescription: z.string().trim().min(20).max(5000),
  heroImageUrl: z.url().nullable().optional(),
  gallery: z.array(z.url()).max(30).default([]),
  priceFromCents: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5).nullable().optional(),
  season: z.string().max(120).nullable().optional(),
  duration: z.string().max(120).nullable().optional(),
  highlights: z.array(z.string().max(200)).max(30).default([]),
  itinerary: z.array(z.string().max(300)).max(30).default([]),
  coordinates: z.record(z.string(), z.number()).optional(),
  featured: z.boolean().default(false),
  premiumOnly: z.boolean().default(false),
  status: z.nativeEnum(PublishStatus).default(PublishStatus.DRAFT),
});

const hotelInput = z.object({
  destinationId: z.string().cuid(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(140),
  category: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(5000),
  address: z.string().max(300).nullable().optional(),
  heroImageUrl: z.url().nullable().optional(),
  gallery: z.array(z.url()).max(30).default([]),
  priceFromCents: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5).nullable().optional(),
  amenities: z.array(z.string().max(120)).max(50).default([]),
  rooms: z.array(z.string().max(160)).max(50).default([]),
  featured: z.boolean().default(false),
  premiumOnly: z.boolean().default(false),
  status: z.nativeEnum(PublishStatus).default(PublishStatus.DRAFT),
});

const experienceInput = z.object({
  destinationId: z.string().cuid().nullable().optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(2).max(140),
  location: z.string().trim().min(2).max(180),
  category: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(5000),
  heroImageUrl: z.url().nullable().optional(),
  gallery: z.array(z.url()).max(30).default([]),
  priceFromCents: z.number().int().nonnegative(),
  duration: z.string().max(120).nullable().optional(),
  inclusions: z.array(z.string().max(200)).max(50).default([]),
  featured: z.boolean().default(false),
  premiumOnly: z.boolean().default(false),
  status: z.nativeEnum(PublishStatus).default(PublishStatus.DRAFT),
});

export const destinationAdminSchema = destinationInput;
export const hotelAdminSchema = hotelInput;
export const experienceAdminSchema = experienceInput;
export const catalogRouter = Router();
catalogRouter.use(optionalAuthenticate);

async function canAccessPremium(userId?: string) {
  if (!userId) return false;
  return (await prisma.subscription.count({ where: { userId, status: 'ACTIVE', plan: { code: 'PREMIUM' } } })) > 0;
}

async function enforcePremium(item: { premiumOnly: boolean }, userId?: string) {
  if (item.premiumOnly && !(await canAccessPremium(userId))) {
    throw new ApiError(403, 'PREMIUM_REQUIRED', 'This collection is reserved for VOYA Premium members.');
  }
}

catalogRouter.get('/destinations', async (req, res) => {
  const q = parse(querySchema, req.query);
  const { page, pageSize, skip } = pagination(q);
  const where: Prisma.DestinationWhereInput = {
    status: PublishStatus.PUBLISHED,
    ...(q.region ? { region: q.region } : {}),
    ...(q.category ? { category: q.category } : {}),
    ...(q.featured ? { featured: q.featured === 'true' } : {}),
    ...(q.q ? { OR: ['name', 'country', 'region', 'category'].map((field) => ({ [field]: { contains: q.q, mode: 'insensitive' } })) } : {}),
  };
  const [items, total] = await prisma.$transaction([
    prisma.destination.findMany({ where, skip, take: pageSize, orderBy: [{ featured: 'desc' }, { name: 'asc' }] }),
    prisma.destination.count({ where }),
  ]);
  ok(res, items, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

catalogRouter.get('/destinations/:slug', async (req, res) => {
  const item = await prisma.destination.findFirst({
    where: { slug: req.params.slug, status: PublishStatus.PUBLISHED },
    include: { hotels: { where: { status: PublishStatus.PUBLISHED } }, experiences: { where: { status: PublishStatus.PUBLISHED } } },
  });
  if (!item) throw new ApiError(404, 'DESTINATION_NOT_FOUND', 'Destination not found.');
  await enforcePremium(item, req.auth?.userId);
  if (!(await canAccessPremium(req.auth?.userId))) {
    item.hotels = item.hotels.filter((hotel) => !hotel.premiumOnly);
    item.experiences = item.experiences.filter((experience) => !experience.premiumOnly);
  }
  ok(res, item);
});

catalogRouter.get('/hotels', async (req, res) => {
  const q = parse(querySchema, req.query);
  const { page, pageSize, skip } = pagination(q);
  const where: Prisma.HotelWhereInput = {
    status: PublishStatus.PUBLISHED,
    ...(q.featured ? { featured: q.featured === 'true' } : {}),
    ...(q.q ? { OR: [{ name: { contains: q.q, mode: 'insensitive' } }, { description: { contains: q.q, mode: 'insensitive' } }] } : {}),
    ...(q.region ? { destination: { region: q.region } } : {}),
  };
  const [items, total] = await prisma.$transaction([
    prisma.hotel.findMany({ where, include: { destination: { select: { name: true, slug: true, country: true } } }, skip, take: pageSize, orderBy: [{ featured: 'desc' }, { name: 'asc' }] }),
    prisma.hotel.count({ where }),
  ]);
  ok(res, items, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

catalogRouter.get('/hotels/:id', async (req, res) => {
  const item = await prisma.hotel.findFirst({ where: { OR: [{ id: req.params.id }, { slug: req.params.id }], status: PublishStatus.PUBLISHED }, include: { destination: true } });
  if (!item) throw new ApiError(404, 'HOTEL_NOT_FOUND', 'Hotel not found.');
  await enforcePremium(item, req.auth?.userId);
  ok(res, item);
});

catalogRouter.get('/experiences', async (req, res) => {
  const q = parse(querySchema, req.query);
  const { page, pageSize, skip } = pagination(q);
  const where: Prisma.ExperienceWhereInput = {
    status: PublishStatus.PUBLISHED,
    ...(q.category ? { category: q.category } : {}),
    ...(q.featured ? { featured: q.featured === 'true' } : {}),
    ...(q.q ? { OR: [{ title: { contains: q.q, mode: 'insensitive' } }, { location: { contains: q.q, mode: 'insensitive' } }] } : {}),
  };
  const [items, total] = await prisma.$transaction([
    prisma.experience.findMany({ where, include: { destination: { select: { name: true, slug: true } } }, skip, take: pageSize, orderBy: [{ featured: 'desc' }, { title: 'asc' }] }),
    prisma.experience.count({ where }),
  ]);
  ok(res, items, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

catalogRouter.get('/experiences/:id', async (req, res) => {
  const item = await prisma.experience.findFirst({ where: { OR: [{ id: req.params.id }, { slug: req.params.id }], status: PublishStatus.PUBLISHED }, include: { destination: true } });
  if (!item) throw new ApiError(404, 'EXPERIENCE_NOT_FOUND', 'Experience not found.');
  await enforcePremium(item, req.auth?.userId);
  ok(res, item);
});
