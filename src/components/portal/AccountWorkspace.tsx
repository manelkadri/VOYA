'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Bookmark,
  CalendarCheck,
  Check,
  Crown,
  Heart,
  MapPin,
  Plus,
  Sparkles,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';

type RecordValue = Record<string, unknown>;

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mb-9">
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-medium sm:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

function Empty({
  title,
  text,
  href,
  label,
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-border bg-card px-6 py-16 text-center">
      <Sparkles className="mx-auto text-primary" />
      <h2 className="mt-5 font-display text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{text}</p>
      {href && (
        <Link
          href={href}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          {label}
          <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}

export default function AccountWorkspace({
  view,
}: {
  view:
    | 'overview'
    | 'profile'
    | 'favorites'
    | 'trips'
    | 'reservations'
    | 'subscription'
    | 'settings';
}) {
  const [data, setData] = useState<unknown>(null);
  const [message, setMessage] = useState('');
  const endpoint =
    view === 'profile'
      ? '/api/v1/me/profile'
      : view === 'favorites'
        ? '/api/v1/me/favorites'
        : view === 'trips'
          ? '/api/v1/me/trips'
          : view === 'reservations'
            ? '/api/v1/me/reservations'
            : view === 'subscription'
              ? '/api/v1/me/subscription'
              : null;

  async function refresh() {
    if (view === 'overview') {
      const [me, favorites, trips, reservations] = await Promise.all([
        apiFetch<RecordValue>('/api/v1/auth/me'),
        apiFetch<unknown[]>('/api/v1/me/favorites'),
        apiFetch<unknown[]>('/api/v1/me/trips'),
        apiFetch<unknown[]>('/api/v1/me/reservations'),
      ]);
      setData({ me, favorites, trips, reservations });
    } else if (endpoint) setData(await apiFetch(endpoint));
  }
  useEffect(() => {
    refresh().catch((error) => setMessage(error.message));
  }, [view]);

  async function submit(
    path: string,
    event: React.FormEvent<HTMLFormElement>,
    transform?: (value: Record<string, FormDataEntryValue>) => unknown
  ) {
    event.preventDefault();
    setMessage('');
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await apiFetch(path, {
        method: path.includes('/profile') ? 'PATCH' : 'POST',
        body: JSON.stringify(transform ? transform(raw) : raw),
      });
      setMessage('Saved successfully.');
      event.currentTarget.reset();
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save.');
    }
  }

  if (view === 'overview') {
    const value = data as {
      me?: RecordValue;
      favorites?: unknown[];
      trips?: unknown[];
      reservations?: unknown[];
    } | null;
    const cards = [
      {
        label: 'Saved favorites',
        value: value?.favorites?.length ?? '—',
        icon: Heart,
        href: '/account/favorites',
      },
      {
        label: 'Journeys in progress',
        value: value?.trips?.length ?? '—',
        icon: Bookmark,
        href: '/account/trips',
      },
      {
        label: 'Reservation requests',
        value: value?.reservations?.length ?? '—',
        icon: CalendarCheck,
        href: '/account/reservations',
      },
    ];
    return (
      <>
        <Heading
          eyebrow="Your private travel office"
          title="Where shall we go next?"
          text="Your saved places, planned journeys and concierge requests live here."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map(({ label, value: count, icon: Icon, href }) => (
            <Link
              href={href}
              key={label}
              className="group rounded-[1.5rem] border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon size={19} />
                </span>
                <ArrowUpRight
                  size={17}
                  className="text-muted-foreground transition group-hover:text-primary"
                />
              </div>
              <p className="mt-8 font-display text-4xl">{count}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </Link>
          ))}
        </div>
        <div className="mt-7 overflow-hidden rounded-[2rem] bg-ink text-white">
          <div className="grid lg:grid-cols-[1fr_.8fr]">
            <div className="p-7 sm:p-10">
              <p className="eyebrow text-primary">Made for you</p>
              <h2 className="mt-4 font-display text-4xl">Build a journey around a feeling.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">
                Begin with a place you love, then shape stays and private experiences into one
                considered itinerary.
              </p>
              <Link
                href="/destinations"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-ink"
              >
                Explore destinations
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="min-h-64 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center" />
          </div>
        </div>
      </>
    );
  }

  if (view === 'profile') {
    const value = data as { email?: string; profile?: Record<string, string | boolean> } | null;
    return (
      <>
        <Heading
          eyebrow="Your details"
          title="Personal profile"
          text="Help your travel designer understand how you like to move through the world."
        />
        <form
          onSubmit={(event) => submit('/api/v1/me/profile', event)}
          className="max-w-3xl rounded-[2rem] border border-border bg-card p-6 sm:p-9"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ['firstName', 'First name'],
              ['lastName', 'Last name'],
              ['phone', 'Phone'],
              ['country', 'Country'],
              ['city', 'City'],
              ['preferredStyle', 'Preferred travel style'],
            ].map(([name, label]) => (
              <label key={name} className="text-sm font-medium">
                {label}
                <input
                  name={name}
                  defaultValue={String(value?.profile?.[name] ?? '')}
                  className="input mt-2"
                />
              </label>
            ))}
          </div>
          <label className="mt-6 flex items-center gap-3 text-sm">
            <input
              name="marketingOptIn"
              type="checkbox"
              defaultChecked={Boolean(value?.profile?.marketingOptIn)}
              className="rounded border-border text-primary"
            />
            Send me occasional travel inspiration
          </label>
          <button className="mt-8 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white">
            Save profile
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
      </>
    );
  }

  if (view === 'favorites') {
    const items = (data as RecordValue[] | null) ?? [];
    return (
      <>
        <Heading
          eyebrow="Saved for later"
          title="Your favorites"
          text="A private collection of destinations, stays and experiences that caught your eye."
        />
        {items.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div key={String(item.id)} className="rounded-2xl border border-border bg-card p-6">
                <Heart className="text-primary" />
                <p className="mt-5 font-display text-2xl">
                  {String(
                    (item.item as RecordValue | undefined)?.name ??
                      (item.item as RecordValue | undefined)?.title ??
                      item.targetType
                  )}
                </p>
                <p className="mt-2 truncate text-xs text-muted-foreground">
                  {String(
                    (item.item as RecordValue | undefined)?.country ??
                      (item.item as RecordValue | undefined)?.location ??
                      'Saved to your private collection'
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Empty
            title="Your collection is waiting"
            text="Tap the heart on any destination, hotel or experience to keep it here."
            href="/destinations"
            label="Start exploring"
          />
        )}
      </>
    );
  }

  if (view === 'trips') {
    const items = (data as RecordValue[] | null) ?? [];
    return (
      <>
        <Heading
          eyebrow="Shape the journey"
          title="Saved trips"
          text="Bring favorite places together into itineraries you can share with your VOYA concierge."
        />
        <form
          onSubmit={(event) => submit('/api/v1/me/trips', event)}
          className="mb-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row"
        >
          <input required name="name" placeholder="Name a new journey" className="input" />
          <input name="description" placeholder="A short note (optional)" className="input" />
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-white">
            <Plus size={16} />
            Create trip
          </button>
        </form>
        {items.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {items.map((item) => (
              <article
                key={String(item.id)}
                className="rounded-[1.5rem] border border-border bg-card p-6"
              >
                <MapPin className="text-primary" />
                <h2 className="mt-5 font-display text-3xl">{String(item.name)}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {String(item.description ?? 'Ready for ideas')}
                </p>
                <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                  {Array.isArray(item.items) ? item.items.length : 0} saved items
                </p>
              </article>
            ))}
          </div>
        ) : (
          <Empty
            title="No journeys yet"
            text="Create a trip above, then add destinations, stays and experiences."
          />
        )}
        {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
      </>
    );
  }

  if (view === 'reservations') {
    const items = (data as RecordValue[] | null) ?? [];
    return (
      <>
        <Heading
          eyebrow="Concierge requests"
          title="Reservations"
          text="Request a tailored reservation and follow every stage from review to confirmation."
        />
        <form
          onSubmit={(event) =>
            submit('/api/v1/me/reservations', event, (raw) => ({
              targetType: 'CUSTOM',
              partySize: Number(raw.partySize),
              preferredStart: raw.preferredStart || null,
              notes: raw.notes,
            }))
          }
          className="mb-8 grid gap-4 rounded-[2rem] border border-border bg-card p-6 md:grid-cols-[.5fr_1fr_1.5fr_auto]"
        >
          <label className="text-sm font-medium">
            Travelers
            <input
              name="partySize"
              type="number"
              min="1"
              max="50"
              defaultValue="2"
              className="input mt-2"
            />
          </label>
          <label className="text-sm font-medium">
            Preferred date
            <input name="preferredStart" type="date" className="input mt-2" />
          </label>
          <label className="text-sm font-medium">
            What can we arrange?
            <input
              required
              name="notes"
              placeholder="A stay, table, guide or complete journey"
              className="input mt-2"
            />
          </label>
          <button className="mt-auto h-[46px] rounded-xl bg-primary px-5 text-sm font-semibold">
            Request
          </button>
        </form>
        {items.length ? (
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={String(item.id)}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-display text-2xl">
                    {String(item.targetType).toLowerCase()} request
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {String(item.notes ?? 'Private reservation')}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
                  {String(item.status)}
                </span>
              </article>
            ))}
          </div>
        ) : (
          <Empty
            title="No reservation requests"
            text="When you are ready, tell us what you have in mind above."
          />
        )}
        {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
      </>
    );
  }

  if (view === 'subscription') {
    const value = data as { plan?: RecordValue } | null;
    return (
      <>
        <Heading
          eyebrow="VOYA membership"
          title="Travel with more possibility"
          text="Your plan determines saving limits, reservation priority and access to private releases."
        />
        <div className="grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border-2 border-primary bg-card p-7">
            <p className="eyebrow text-primary">Current plan</p>
            <h2 className="mt-4 font-display text-4xl">{String(value?.plan?.name ?? 'Free')}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Thoughtful planning essentials, included.
            </p>
            <ul className="mt-7 space-y-3 text-sm">
              {[
                '10 favorites',
                '3 saved trips',
                'Standard reservations',
                'Standard destination access',
              ].map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check size={17} className="text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-ink p-7 text-white">
            <Crown className="text-primary" />
            <p className="eyebrow mt-5 text-primary">Premium</p>
            <h2 className="mt-3 font-display text-4xl">Beyond the ordinary</h2>
            <ul className="mt-7 space-y-3 text-sm text-white/75">
              {[
                'Unlimited collections',
                'Priority concierge requests',
                'Exclusive journeys',
                'Premium travel benefits',
              ].map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check size={17} className="text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              disabled
              className="mt-8 w-full rounded-full border border-white/15 py-3 text-sm text-white/55"
            >
              Upgrades opening soon
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Heading
        eyebrow="Privacy and access"
        title="Account settings"
        text="Manage account security and communication preferences."
      />
      <div className="max-w-3xl space-y-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Password & security</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Password changes and verified email recovery will be available through the secure
            identity flow.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Your data</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Contact the VOYA concierge to request an account export or deletion.
          </p>
        </div>
      </div>
    </>
  );
}
