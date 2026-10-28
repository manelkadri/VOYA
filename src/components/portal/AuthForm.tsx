'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { API_URL, storeCsrf, VoyaApiError } from '@/lib/api';

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/${mode}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const body = await response.json();
      if (!response.ok || !body.success)
        throw new VoyaApiError(
          response.status,
          body.error?.code,
          body.error?.message ?? 'Unable to continue.'
        );
      storeCsrf(body.data.csrfToken);
      router.push(body.data.user.role === 'CUSTOMER' ? '/account' : '/admin');
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to continue.');
    } finally {
      setBusy(false);
    }
  }

  const registering = mode === 'register';
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-ink lg:block">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')] bg-cover bg-center opacity-55" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white xl:p-16">
          <Link href="/" className="flex items-center gap-3">
            <AppLogo size={44} />
            <span className="font-display text-3xl tracking-[.18em]">VOYA</span>
          </Link>
          <div className="max-w-xl">
            <p className="eyebrow text-primary">Your journeys, remembered</p>
            <h1 className="mt-5 font-display text-display-lg">
              Travel made <span className="italic text-primary">personal.</span>
            </h1>
            <p className="mt-6 max-w-lg leading-7 text-white/70">
              Save extraordinary places, shape private itineraries, and keep every reservation in
              one considered space.
            </p>
          </div>
          <p className="text-sm text-white/55">Private by design · Concierge supported</p>
        </div>
      </section>
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-12 flex items-center gap-3 lg:hidden">
            <AppLogo size={40} />
            <span className="font-display text-3xl tracking-[.18em]">VOYA</span>
          </Link>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <LockKeyhole size={20} />
          </span>
          <p className="eyebrow mt-7 text-primary">
            {registering ? 'Begin your membership' : 'Welcome back'}
          </p>
          <h1 className="mt-3 font-display text-5xl">
            {registering ? 'Create your account' : 'Continue your journey'}
          </h1>
          <form onSubmit={submit} className="mt-9 space-y-5">
            {registering && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  First name
                  <input
                    required
                    name="firstName"
                    className="input mt-2"
                    autoComplete="given-name"
                  />
                </label>
                <label className="text-sm font-medium">
                  Last name
                  <input
                    required
                    name="lastName"
                    className="input mt-2"
                    autoComplete="family-name"
                  />
                </label>
              </div>
            )}
            <label className="block text-sm font-medium">
              Email address
              <input
                required
                name="email"
                type="email"
                className="input mt-2"
                autoComplete="email"
              />
            </label>
            <label className="block text-sm font-medium">
              Password
              <input
                required
                name="password"
                type="password"
                minLength={12}
                className="input mt-2"
                autoComplete={registering ? 'new-password' : 'current-password'}
              />
              <span className="mt-2 block text-xs font-normal text-muted-foreground">
                At least 12 characters
              </span>
            </label>
            {error && (
              <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary hover:text-ink disabled:opacity-60"
            >
              {busy ? 'Please wait…' : registering ? 'Create account' : 'Sign in'}
              <ArrowRight size={17} />
            </button>
          </form>
          <p className="mt-7 text-center text-sm text-muted-foreground">
            {registering ? 'Already a member?' : 'New to VOYA?'}{' '}
            <Link
              className="font-semibold text-foreground underline-offset-4 hover:underline"
              href={registering ? '/login' : '/register'}
            >
              {registering ? 'Sign in' : 'Create an account'}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
