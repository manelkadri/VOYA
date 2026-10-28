export const API_URL = (process.env.NEXT_PUBLIC_VOYA_API_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  ''
);

type ApiEnvelope<T> =
  | { success: true; data: T; meta?: Record<string, unknown> }
  | { success: false; error: { code: string; message: string; details?: unknown } };

export class VoyaApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

async function csrfToken() {
  let token = sessionStorage.getItem('voya_csrf');
  if (token) return token;
  const response = await fetch(`${API_URL}/api/v1/auth/csrf`, { credentials: 'include' });
  if (!response.ok) return null;
  const body = (await response.json()) as ApiEnvelope<{ csrfToken: string }>;
  if (body.success) {
    token = body.data.csrfToken;
    sessionStorage.setItem('voya_csrf', token);
    return token;
  }
  return null;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const method = (init.method ?? 'GET').toUpperCase();
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData))
    headers.set('Content-Type', 'application/json');
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    const token = await csrfToken();
    if (token) headers.set('X-CSRF-Token', token);
  }
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    method,
    headers,
    credentials: 'include',
  });
  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!response.ok || !body?.success) {
    const error = body && !body.success ? body.error : null;
    throw new VoyaApiError(
      response.status,
      error?.code ?? 'REQUEST_FAILED',
      error?.message ?? 'The request could not be completed.'
    );
  }
  return body.data;
}

export function storeCsrf(token: string) {
  sessionStorage.setItem('voya_csrf', token);
}

export function clearCsrf() {
  sessionStorage.removeItem('voya_csrf');
}
