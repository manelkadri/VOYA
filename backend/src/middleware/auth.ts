import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import type { UserRole } from '@prisma/client';
import { env, isProduction } from '../config/env.js';
import { ApiError } from '../lib/http.js';
import { prisma } from '../lib/prisma.js';

const ACCESS_COOKIE = 'voya_access';
const CSRF_COOKIE = 'voya_csrf';
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax',
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 7,
  ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
};

export function issueSession(res: Response, user: { id: string; role: UserRole }) {
  const token = jwt.sign({ role: user.role }, env.AUTH_SECRET, {
    subject: user.id,
    expiresIn: '7d',
    issuer: 'voya-api',
    audience: 'voya-web',
  });
  const csrfToken = randomBytes(32).toString('base64url');
  res.cookie(ACCESS_COOKIE, token, cookieOptions);
  res.cookie(CSRF_COOKIE, csrfToken, {
    ...cookieOptions,
    httpOnly: false,
  });
  return csrfToken;
}

export function clearSession(res: Response) {
  const base = { secure: isProduction, sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax', path: '/', ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}) };
  res.clearCookie(ACCESS_COOKIE, { ...base, httpOnly: true });
  res.clearCookie(CSRF_COOKIE, { ...base, httpOnly: false });
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const bearer = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : undefined;
    const token = bearer ?? req.cookies?.[ACCESS_COOKIE];
    if (!token) throw new ApiError(401, 'UNAUTHENTICATED', 'Authentication is required.');
    const payload = jwt.verify(token, env.AUTH_SECRET, {
      issuer: 'voya-api',
      audience: 'voya-web',
    });
    if (typeof payload === 'string' || !payload.sub || typeof payload.role !== 'string') {
      throw new ApiError(401, 'INVALID_SESSION', 'The session is invalid.');
    }
    const user = await prisma.user.findUnique({ select: { id: true, role: true, isActive: true }, where: { id: payload.sub } });
    if (!user?.isActive) throw new ApiError(401, 'INVALID_SESSION', 'The session is no longer active.');
    req.auth = { userId: user.id, role: user.role, viaCookie: !bearer };
    next();
  } catch (error) {
    if (error instanceof ApiError) return next(error);
    return next(new ApiError(401, 'INVALID_SESSION', 'The session is invalid or expired.'));
  }
}

export async function optionalAuthenticate(req: Request, _res: Response, next: NextFunction) {
  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : undefined;
  const token = bearer ?? req.cookies?.[ACCESS_COOKIE];
  if (!token) return next();
  try {
    const payload = jwt.verify(token, env.AUTH_SECRET, { issuer: 'voya-api', audience: 'voya-web' });
    if (typeof payload !== 'string' && payload.sub && typeof payload.role === 'string') {
      const user = await prisma.user.findUnique({ select: { id: true, role: true, isActive: true }, where: { id: payload.sub } });
      if (user?.isActive) req.auth = { userId: user.id, role: user.role, viaCookie: !bearer };
    }
  } catch {
    // Public catalog requests remain anonymous when a stale optional cookie is present.
  }
  next();
}

export function requireRole(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return next(new ApiError(403, 'FORBIDDEN', 'You do not have permission to perform this action.'));
    }
    next();
  };
}

export function csrfProtection(req: Request, _res: Response, next: NextFunction) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method) || !req.auth?.viaCookie) return next();
  const cookie = req.cookies?.[CSRF_COOKIE];
  const header = req.headers['x-csrf-token'];
  if (typeof cookie !== 'string' || typeof header !== 'string') {
    return next(new ApiError(403, 'CSRF_FAILED', 'The CSRF token is missing.'));
  }
  const left = Buffer.from(cookie);
  const right = Buffer.from(header);
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return next(new ApiError(403, 'CSRF_FAILED', 'The CSRF token is invalid.'));
  }
  next();
}
