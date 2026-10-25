'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

type FormValues = {
  email: string;
  consent: boolean;
};

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { email: '', consent: false } });

  const onSubmit = async (values: FormValues) => {
    // Backend integration: POST values.email to newsletter provider (e.g. Resend / Mailchimp)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="flex items-start gap-4 rounded-2xl border border-primary/40 bg-ink-foreground/5 p-6 text-ink-foreground backdrop-blur-md animate-fade-up"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check size={18} />
        </span>
        <div>
          <p className="font-display text-2xl font-medium">You’re on the list</p>
          <p className="mt-1 text-sm text-ink-foreground/70">
            Look out for the next Sunday Dispatch this weekend. Add concierge@voya.travel to your
            contacts so it lands in your inbox.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="link-underline mt-4 pb-0.5 text-xs font-semibold text-primary"
          >
            Subscribe another address
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="text-ink-foreground">
      <label htmlFor="newsletter-email" className="mb-2 block text-sm font-semibold">
        Email address
      </label>
      <p className="mb-3 text-xs text-ink-foreground/60">We send one email a week. Unsubscribe in one click.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
          {...register('email', {
            required: 'Enter your email address to subscribe.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              message: 'That email doesn’t look right. Check for typos and try again.',
            },
          })}
          className={`h-14 flex-1 rounded-full border bg-ink-foreground/10 px-6 text-sm text-ink-foreeground placeholder:text-ink-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.email ? 'border-destructive' : 'border-ink-foreground/25'
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 min-w-[10.5rem] items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-105 hover:shadow-lg active:scale-95 disabled:cursor-wait disabled:opacity-80"
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" aria-label="Subscribing" />
          ) : (
            <>
              Subscribe
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
      {errors.email && (
        <p id="newsletter-email-error" role="alert" className="mt-3 text-sm font-medium text-destructive">
          {errors.email.message}
        </p>
      )}

      <div className="mt-5">
        <label htmlFor="newsletter-consent" className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-ink-foreground/65">
          <input
            id="newsletter-consent"
            type="checkbox"
            aria-invalid={errors.consent ? 'true' : 'false'}
            {...register('consent', {
              required: 'Please confirm you agree to receive the weekly email.',
            })}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
          />
          <span>
            I agree to receive the Sunday Dispatch and accept the VOYA privacy policy. I can
            unsubscribe at any time.
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-2 text-sm font-medium text-destructive">
            {errors.consent.message}
          </p>
        )}
      </div>
    </form>
  );
}