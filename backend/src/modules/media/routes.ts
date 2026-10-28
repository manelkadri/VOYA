import { Router } from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { UserRole } from '@prisma/client';
import { z } from 'zod';
import { env } from '../../config/env.js';
import { prisma } from '../../lib/prisma.js';
import { ApiError, ok, pagination, parse } from '../../lib/http.js';
import { audit } from '../../lib/audit.js';
import { authenticate, csrfProtection, requireRole } from '../../middleware/auth.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => callback(null, ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.mimetype)),
});
const s3 = new S3Client({
  endpoint: env.S3_ENDPOINT,
  region: env.S3_REGION,
  forcePathStyle: true,
  credentials: { accessKeyId: env.S3_ACCESS_KEY_ID, secretAccessKey: env.S3_SECRET_ACCESS_KEY },
});

function hasValidSignature(file: Express.Multer.File) {
  const b = file.buffer;
  if (file.mimetype === 'image/jpeg') return b[0] === 0xff && b[1] === 0xd8;
  if (file.mimetype === 'image/png') return b.subarray(0, 8).toString('hex') === '89504e470d0a1a0a';
  if (file.mimetype === 'image/webp') return b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP';
  if (file.mimetype === 'image/avif') return b.subarray(4, 12).toString().includes('ftyp');
  return false;
}

export const mediaRouter = Router();
mediaRouter.use(authenticate, requireRole(UserRole.ADMIN, UserRole.SUPER_ADMIN), csrfProtection);

mediaRouter.get('/', async (req, res) => {
  const { page, pageSize, skip } = pagination(req.query);
  const [items, total] = await prisma.$transaction([
    prisma.mediaAsset.findMany({ skip, take: pageSize, orderBy: { createdAt: 'desc' } }),
    prisma.mediaAsset.count(),
  ]);
  const signed = await Promise.all(items.map(async (item) => ({ ...item, url: await getSignedUrl(s3, new GetObjectCommand({ Bucket: item.bucket, Key: item.objectKey }), { expiresIn: 3600 }) })));
  ok(res, signed, { page, pageSize, total, totalPages: Math.ceil(total / pageSize) });
});

mediaRouter.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) throw new ApiError(400, 'FILE_REQUIRED', 'A supported image file is required.');
  if (!hasValidSignature(req.file)) throw new ApiError(400, 'INVALID_FILE', 'The file content does not match its image type.');
  const fields = parse(z.object({ altText: z.string().trim().max(300).optional(), entityType: z.string().trim().max(80).optional(), entityId: z.string().trim().max(100).optional() }), req.body);
  const extension = extname(req.file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, '') || `.${req.file.mimetype.split('/')[1]}`;
  const objectKey = `media/${new Date().getUTCFullYear()}/${randomUUID()}${extension}`;
  await s3.send(new PutObjectCommand({ Bucket: env.S3_BUCKET, Key: objectKey, Body: req.file.buffer, ContentType: req.file.mimetype, CacheControl: 'public, max-age=31536000, immutable' }));
  const asset = await prisma.mediaAsset.create({ data: { bucket: env.S3_BUCKET, objectKey, contentType: req.file.mimetype, byteSize: req.file.size, uploadedById: req.auth!.userId, ...fields } });
  await audit(req, 'media.upload', 'MediaAsset', asset.id, { objectKey, byteSize: req.file.size });
  const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: env.S3_BUCKET, Key: objectKey }), { expiresIn: 3600 });
  res.status(201).json({ success: true, data: { ...asset, url } });
});
