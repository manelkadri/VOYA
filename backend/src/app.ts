import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { errorHandler, notFound, ok } from './lib/http.js';
import { authRouter } from './modules/auth/routes.js';
import { catalogRouter } from './modules/catalog/routes.js';
import { meRouter } from './modules/me/routes.js';
import { subscriptionRouter } from './modules/subscriptions/routes.js';
import { adminRouter } from './modules/admin/routes.js';
import { mediaRouter } from './modules/media/routes.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(pinoHttp({ redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers.set-cookie'] }));
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors({ origin: env.FRONTEND_URL, credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'] }));
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  app.use(rateLimit({ windowMs: 60_000, limit: 180, standardHeaders: 'draft-8', legacyHeaders: false }));
  app.use('/api/v1/auth', rateLimit({ windowMs: 15 * 60_000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false }), authRouter);
  app.get('/health', (_req, res) => ok(res, { status: 'ok', timestamp: new Date().toISOString() }));
  app.use('/api/v1', adminRouter);
  app.use('/api/v1', catalogRouter);
  app.use('/api/v1/me', meRouter);
  app.use('/api/v1/subscription', subscriptionRouter);
  app.use('/api/v1/admin/media', mediaRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
