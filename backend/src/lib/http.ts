import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError, type ZodType } from 'zod';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

export function parse<T>(schema: ZodType<T>, value: unknown): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'The request is invalid.', result.error.flatten());
  }
  return result.data;
}

export const ok = (res: Response, data: unknown, meta?: unknown) =>
  res.json({ success: true, data, ...(meta ? { meta } : {}) });

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, 'NOT_FOUND', 'The requested resource was not found.'));
}

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction) {
  let normalized = error;
  if (error instanceof ZodError) {
    normalized = new ApiError(400, 'VALIDATION_ERROR', 'The request is invalid.', error.flatten());
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    normalized = new ApiError(409, 'CONFLICT', 'A record with this value already exists.');
  }
  const apiError = normalized instanceof ApiError ? normalized : null;
  if (!apiError) req.log?.error?.({ err: normalized }, 'Unhandled request error');
  res.status(apiError?.status ?? 500).json({
    success: false,
    error: {
      code: apiError?.code ?? 'INTERNAL_ERROR',
      message: apiError?.message ?? 'An unexpected error occurred.',
      ...(apiError?.details ? { details: apiError.details } : {}),
    },
  });
}

export function pagination(query: unknown) {
  const input = (query ?? {}) as Record<string, unknown>;
  const page = Math.max(1, Number(input.page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(input.pageSize) || 20));
  return { page, pageSize, skip: (page - 1) * pageSize };
}
