import { Router } from 'express';
import { ReservationStatus, UserRole } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { ApiError, ok, pagination, parse } from '../../lib/http.js';
import { audit } from '../../lib/audit.js';
import { authenticate, csrfProtection, requireRole } from '../../middleware/auth.js';
import { assertReservationTransition } from '../reservations/transitions.js';
import { destinationAdminSchema, experienceAdminSchema, hotelAdminSchema } from '../catalog/routes.js';

export const adminRouter = Router();
adminRouter.use(authenticate, requireRole(UserRole.ADMIN, UserRole.SUPER_ADMIN), csrfProtection);

adminRouter.get('/admin/destinations', async (req, res) => {
  const { page, pageSize, skip } = pagination(req.query);
  const [items, total] = await prisma.$transaction([
    prisma.destination.findMany({ skip, take: pageSize, orderBy: { updatedAt: 'desc' } }),
    prisma.destination.count(),
  ]);
  ok(res, items, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

adminRouter.get('/admin/hotels', async (req, res) => {
  const { page, pageSize, skip } = pagination(req.query);
  const [items, total] = await prisma.$transaction([
    prisma.hotel.findMany({ skip, take: pageSize, include: { destination: { select: { name: true } } }, orderBy: { updatedAt: 'desc' } }),
    prisma.hotel.count(),
  ]);
  ok(res, items, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

adminRouter.get('/admin/experiences', async (req, res) => {
  const { page, pageSize, skip } = pagination(req.query);
  const [items, total] = await prisma.$transaction([
    prisma.experience.findMany({ skip, take: pageSize, orderBy: { updatedAt: 'desc' } }),
    prisma.experience.count(),
  ]);
  ok(res, items, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

adminRouter.post('/destinations', async (req, res) => {
  const input = parse(destinationAdminSchema, req.body);
  const item = await prisma.destination.create({ data: { ...input, publishedAt: input.status === 'PUBLISHED' ? new Date() : null } });
  await audit(req, 'destination.create', 'Destination', item.id);
  res.status(201).json({ success: true, data: item });
});

adminRouter.patch('/destinations/:id', async (req, res) => {
  const input = parse(destinationAdminSchema.partial(), req.body);
  const item = await prisma.destination.update({ where: { id: req.params.id }, data: { ...input, ...(input.status === 'PUBLISHED' ? { publishedAt: new Date() } : {}) } });
  await audit(req, 'destination.update', 'Destination', item.id, { fields: Object.keys(input) });
  ok(res, item);
});

adminRouter.delete('/destinations/:id', async (req, res) => {
  const item = await prisma.destination.update({ where: { id: req.params.id }, data: { status: 'ARCHIVED' } });
  await audit(req, 'destination.archive', 'Destination', item.id);
  ok(res, item);
});

adminRouter.post('/hotels', async (req, res) => {
  const input = parse(hotelAdminSchema, req.body);
  const item = await prisma.hotel.create({ data: { ...input, publishedAt: input.status === 'PUBLISHED' ? new Date() : null } });
  await audit(req, 'hotel.create', 'Hotel', item.id);
  res.status(201).json({ success: true, data: item });
});

adminRouter.patch('/hotels/:id', async (req, res) => {
  const input = parse(hotelAdminSchema.partial(), req.body);
  const item = await prisma.hotel.update({ where: { id: req.params.id }, data: { ...input, ...(input.status === 'PUBLISHED' ? { publishedAt: new Date() } : {}) } });
  await audit(req, 'hotel.update', 'Hotel', item.id, { fields: Object.keys(input) });
  ok(res, item);
});

adminRouter.delete('/hotels/:id', async (req, res) => {
  const item = await prisma.hotel.update({ where: { id: req.params.id }, data: { status: 'ARCHIVED' } });
  await audit(req, 'hotel.archive', 'Hotel', item.id);
  ok(res, item);
});

adminRouter.post('/experiences', async (req, res) => {
  const input = parse(experienceAdminSchema, req.body);
  const item = await prisma.experience.create({ data: { ...input, publishedAt: input.status === 'PUBLISHED' ? new Date() : null } });
  await audit(req, 'experience.create', 'Experience', item.id);
  res.status(201).json({ success: true, data: item });
});

adminRouter.patch('/experiences/:id', async (req, res) => {
  const input = parse(experienceAdminSchema.partial(), req.body);
  const item = await prisma.experience.update({ where: { id: req.params.id }, data: { ...input, ...(input.status === 'PUBLISHED' ? { publishedAt: new Date() } : {}) } });
  await audit(req, 'experience.update', 'Experience', item.id, { fields: Object.keys(input) });
  ok(res, item);
});

adminRouter.delete('/experiences/:id', async (req, res) => {
  const item = await prisma.experience.update({ where: { id: req.params.id }, data: { status: 'ARCHIVED' } });
  await audit(req, 'experience.archive', 'Experience', item.id);
  ok(res, item);
});

adminRouter.get('/admin/users', async (req, res) => {
  const { page, pageSize, skip } = pagination(req.query);
  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({ skip, take: pageSize, select: { id: true, email: true, role: true, isActive: true, createdAt: true, lastLoginAt: true, profile: true }, orderBy: { createdAt: 'desc' } }),
    prisma.user.count(),
  ]);
  ok(res, users, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

adminRouter.patch('/admin/users/:id', async (req, res) => {
  const input = parse(z.object({ role: z.nativeEnum(UserRole).optional(), isActive: z.boolean().optional() }), req.body);
  if (input.role === UserRole.SUPER_ADMIN && req.auth!.role !== UserRole.SUPER_ADMIN) throw new ApiError(403, 'FORBIDDEN', 'Only a super administrator can grant this role.');
  if (req.params.id === req.auth!.userId && input.isActive === false) throw new ApiError(409, 'SELF_DEACTIVATION', 'You cannot deactivate your own account.');
  const user = await prisma.user.update({ where: { id: req.params.id }, data: input, select: { id: true, email: true, role: true, isActive: true } });
  await audit(req, 'user.update', 'User', user.id, input);
  ok(res, user);
});

adminRouter.get('/admin/reservations', async (req, res) => {
  const { page, pageSize, skip } = pagination(req.query);
  const status = typeof req.query.status === 'string' ? parse(z.nativeEnum(ReservationStatus), req.query.status) : undefined;
  const where = status ? { status } : {};
  const [items, total] = await prisma.$transaction([
    prisma.reservation.findMany({ where, skip, take: pageSize, include: { user: { select: { email: true, profile: true } }, history: { orderBy: { createdAt: 'asc' } } }, orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }] }),
    prisma.reservation.count({ where }),
  ]);
  ok(res, items, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

adminRouter.patch('/admin/reservations/:id/status', async (req, res) => {
  const input = parse(z.object({ status: z.nativeEnum(ReservationStatus), note: z.string().trim().max(1000).optional() }), req.body);
  const current = await prisma.reservation.findUnique({ where: { id: req.params.id } });
  if (!current) throw new ApiError(404, 'RESERVATION_NOT_FOUND', 'Reservation not found.');
  assertReservationTransition(current.status, input.status);
  const updated = await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.update({ where: { id: current.id }, data: { status: input.status } });
    await tx.reservationStatusHistory.create({ data: { reservationId: current.id, fromStatus: current.status, toStatus: input.status, note: input.note, changedById: req.auth!.userId } });
    return reservation;
  });
  await audit(req, 'reservation.status', 'Reservation', current.id, { from: current.status, to: input.status });
  ok(res, updated);
});

adminRouter.get('/admin/subscriptions', async (req, res) => {
  const { page, pageSize, skip } = pagination(req.query);
  const [items, total] = await prisma.$transaction([
    prisma.subscription.findMany({ skip, take: pageSize, include: { user: { select: { email: true, profile: true } }, plan: true }, orderBy: { updatedAt: 'desc' } }),
    prisma.subscription.count(),
  ]);
  ok(res, items, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

adminRouter.get('/admin/analytics', async (_req, res) => {
  const [users, destinations, hotels, experiences, openReservations, premiumSubscriptions, recentReservations] = await prisma.$transaction([
    prisma.user.count({ where: { isActive: true } }),
    prisma.destination.count({ where: { status: 'PUBLISHED' } }),
    prisma.hotel.count({ where: { status: 'PUBLISHED' } }),
    prisma.experience.count({ where: { status: 'PUBLISHED' } }),
    prisma.reservation.count({ where: { status: { in: ['REQUESTED', 'REVIEWING', 'APPROVED'] } } }),
    prisma.subscription.count({ where: { status: 'ACTIVE', plan: { code: 'PREMIUM' } } }),
    prisma.reservation.findMany({ take: 10, include: { user: { select: { email: true } } }, orderBy: { createdAt: 'desc' } }),
  ]);
  ok(res, { users, destinations, hotels, experiences, openReservations, premiumSubscriptions, recentReservations });
});
