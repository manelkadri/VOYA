import { beforeAll, describe, expect, it } from 'vitest';

beforeAll(() => {
  process.env.DATABASE_URL ??= 'postgresql://test:test@127.0.0.1:5432/voya_test';
  process.env.PORT ??= '3001';
  process.env.NODE_ENV = 'test';
  process.env.FRONTEND_URL ??= 'http://localhost:4028';
  process.env.AUTH_SECRET ??= 'test-secret-that-is-at-least-thirty-two-characters';
  process.env.S3_ENDPOINT ??= 'https://storage.example.test';
  process.env.S3_REGION ??= 'us-east-1';
  process.env.S3_BUCKET ??= 'voya-test';
  process.env.S3_ACCESS_KEY_ID ??= 'test';
  process.env.S3_SECRET_ACCESS_KEY ??= 'test';
});

describe('API basics', () => {
  it('reports health with the standard response envelope', async () => {
    const { createApp } = await import('../src/app.js');
    const app = createApp();
    const server = app.listen(0);
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Test server did not bind.');
    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    const body = await response.json();
    server.close();
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.status).toBe('ok');
  });

  it('returns a structured 404 error', async () => {
    const { createApp } = await import('../src/app.js');
    const app = createApp();
    const server = app.listen(0);
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Test server did not bind.');
    const response = await fetch(`http://127.0.0.1:${address.port}/does-not-exist`);
    const body = await response.json();
    server.close();
    expect(response.status).toBe(404);
    expect(body.error.code).toBe('NOT_FOUND');
  });
});
