'use client';

import { useEffect, useState } from 'react';
import { Archive, ArrowUpRight, Check, ImagePlus, Plus, RefreshCw } from 'lucide-react';
import { apiFetch } from '@/lib/api';

type Row = Record<string, unknown>;
type View =
  | 'overview'
  | 'destinations'
  | 'hotels'
  | 'experiences'
  | 'reservations'
  | 'users'
  | 'subscriptions'
  | 'media'
  | 'analytics';
const endpoints: Record<View, string> = {
  overview: '/api/v1/admin/analytics',
  analytics: '/api/v1/admin/analytics',
  destinations: '/api/v1/admin/destinations',
  hotels: '/api/v1/admin/hotels',
  experiences: '/api/v1/admin/experiences',
  reservations: '/api/v1/admin/reservations',
  users: '/api/v1/admin/users',
  subscriptions: '/api/v1/admin/subscriptions',
  media: '/api/v1/admin/media',
};

const titles: Record<View, [string, string, string]> = {
  overview: [
    'Good morning, studio',
    'Operations overview',
    'A live view of VOYA content, travelers and requests.',
  ],
  analytics: [
    'Measured, not guessed',
    'Platform analytics',
    'Real database counts and recent reservation activity.',
  ],
  destinations: [
    'The collection',
    'Destinations',
    'Create, publish and retire places across the VOYA portfolio.',
  ],
  hotels: ['Places worth staying', 'Hotels', 'Manage the properties paired with every journey.'],
  experiences: [
    'Moments that matter',
    'Experiences',
    'Curate bookable private moments and premium releases.',
  ],
  reservations: [
    'Concierge desk',
    'Reservations',
    'Review requests in priority order and move them through valid stages.',
  ],
  users: ['Membership', 'Travelers', 'Control customer access and administrative roles.'],
  subscriptions: [
    'Plan operations',
    'Subscriptions',
    'Monitor active plans and provider-backed lifecycle state.',
  ],
  media: ['Private asset library', 'Media', 'Upload validated images to ISOGrid object storage.'],
};

function Header({ view, refresh }: { view: View; refresh: () => void }) {
  const [eyebrow, title, text] = titles[view];
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      </div>
      <button
        onClick={refresh}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold"
      >
        <RefreshCw size={15} />
        Refresh
      </button>
    </div>
  );
}

function date(value: unknown) {
  return value
    ? new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(String(value)))
    : '—';
}

export default function AdminWorkspace({ view }: { view: View }) {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  async function refresh() {
    setError('');
    try {
      setData(await apiFetch(endpoints[view]));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to load data.');
    }
  }
  useEffect(() => {
    refresh();
  }, [view]);

  if (view === 'overview' || view === 'analytics') {
    const value = (data ?? {}) as Row;
    const metrics = [
      ['Travelers', 'users'],
      ['Published destinations', 'destinations'],
      ['Hotels', 'hotels'],
      ['Experiences', 'experiences'],
      ['Open requests', 'openReservations'],
      ['Premium members', 'premiumSubscriptions'],
    ];
    return (
      <>
        <Header view={view} refresh={refresh} />
        {error && <p className="mb-5 text-sm text-destructive">{error}</p>}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map(([label, key]) => (
            <article key={key} className="rounded-2xl border border-border bg-white p-6">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-4 font-display text-5xl">{String(value[key] ?? '—')}</p>
              <div className="mt-6 h-1 rounded-full bg-muted">
                <div className="h-full w-2/3 rounded-full bg-primary" />
              </div>
            </article>
          ))}
        </div>
        {view === 'analytics' && (
          <div className="mt-6 rounded-2xl border border-border bg-white p-6">
            <h2 className="font-display text-3xl">Recent reservation activity</h2>
            <div className="mt-5 divide-y divide-border">
              {((value.recentReservations as Row[]) ?? []).map((item) => (
                <div key={String(item.id)} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{String(item.targetType)} request</p>
                    <p className="text-xs text-muted-foreground">{date(item.createdAt)}</p>
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {String(item.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  const rows = (Array.isArray(data) ? data : []) as Row[];
  async function action(path: string, method: string, body?: unknown) {
    try {
      await apiFetch(path, { method, ...(body ? { body: JSON.stringify(body) } : {}) });
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Action failed.');
    }
  }
  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const resource = view;
    const priceFromCents = Number(raw.priceFromCents || 0);
    const common = { ...raw, priceFromCents, status: 'DRAFT', gallery: [] };
    let body: Row = common;
    if (view === 'destinations')
      body = {
        ...common,
        longDescription: raw.description,
        highlights: [],
        itinerary: [],
        featured: false,
        premiumOnly: false,
      };
    if (view === 'hotels')
      body = { ...common, amenities: [], rooms: [], featured: false, premiumOnly: false };
    if (view === 'experiences')
      body = {
        ...common,
        inclusions: [],
        featured: false,
        premiumOnly: false,
        destinationId: raw.destinationId || null,
      };
    await action(`/api/v1/${resource}`, 'POST', body);
    setCreating(false);
  }

  return (
    <>
      <Header view={view} refresh={refresh} />
      {error && (
        <p className="mb-5 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
      )}
      {['destinations', 'hotels', 'experiences'].includes(view) && (
        <div className="mb-6">
          <button
            onClick={() => setCreating(!creating)}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus size={16} />
            New {view.slice(0, -1)}
          </button>
          {creating && (
            <form
              onSubmit={create}
              className="mt-4 grid gap-4 rounded-2xl border border-border bg-white p-5 md:grid-cols-2"
            >
              {view === 'destinations' ? (
                <>
                  <input required name="name" placeholder="Name" className="input" />
                  <input required name="slug" placeholder="slug" className="input" />
                  <input required name="country" placeholder="Country" className="input" />
                  <input required name="region" placeholder="Region" className="input" />
                  <input required name="category" placeholder="Category" className="input" />
                </>
              ) : view === 'hotels' ? (
                <>
                  <input required name="name" placeholder="Hotel name" className="input" />
                  <input required name="slug" placeholder="slug" className="input" />
                  <input
                    required
                    name="destinationId"
                    placeholder="Destination ID"
                    className="input"
                  />
                  <input required name="category" placeholder="Hotel category" className="input" />
                </>
              ) : (
                <>
                  <input required name="title" placeholder="Experience title" className="input" />
                  <input required name="slug" placeholder="slug" className="input" />
                  <input
                    name="destinationId"
                    placeholder="Destination ID (optional)"
                    className="input"
                  />
                  <input required name="location" placeholder="Location" className="input" />
                  <input required name="category" placeholder="Category" className="input" />
                </>
              )}
              <textarea
                required
                name="description"
                placeholder="Description"
                className="input md:col-span-2"
              />
              <input
                required
                name="priceFromCents"
                type="number"
                min="0"
                placeholder="Price from (cents)"
                className="input"
              />
              <button className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold">
                Create draft
              </button>
            </form>
          )}
        </div>
      )}
      {view === 'media' && (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            try {
              await apiFetch('/api/v1/admin/media', { method: 'POST', body: form });
              await refresh();
              event.currentTarget.reset();
            } catch (cause) {
              setError(cause instanceof Error ? cause.message : 'Upload failed.');
            }
          }}
          className="mb-6 flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 sm:flex-row"
        >
          <input
            required
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="input"
          />
          <input name="altText" placeholder="Accessible description" className="input" />
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-white">
            <ImagePlus size={16} />
            Upload
          </button>
        </form>
      )}
      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Record</th>
                <th className="px-5 py-4">Details</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={String(row.id)}>
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {String(
                        row.name ??
                          row.title ??
                          row.email ??
                          row.objectKey ??
                          row.targetType ??
                          row.id
                      )}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {String(row.slug ?? row.id)}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {String(
                      row.country ??
                        row.location ??
                        row.role ??
                        row.contentType ??
                        row.planId ??
                        row.notes ??
                        '—'
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                      {String(row.status ?? (row.isActive ? 'ACTIVE' : 'INACTIVE'))}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {['destinations', 'hotels', 'experiences'].includes(view) && (
                      <div className="flex justify-end gap-2">
                        {row.status !== 'PUBLISHED' && (
                          <button
                            title="Publish"
                            onClick={() =>
                              action(`/api/v1/${view}/${row.id}`, 'PATCH', { status: 'PUBLISHED' })
                            }
                            className="rounded-lg border border-border p-2 text-success"
                          >
                            <Check size={15} />
                          </button>
                        )}
                        <button
                          title="Archive"
                          onClick={() => action(`/api/v1/${view}/${row.id}`, 'DELETE')}
                          className="rounded-lg border border-border p-2 text-destructive"
                        >
                          <Archive size={15} />
                        </button>
                      </div>
                    )}
                    {view === 'reservations' && (
                      <select
                        value={String(row.status)}
                        onChange={(event) =>
                          action(`/api/v1/admin/reservations/${row.id}/status`, 'PATCH', {
                            status: event.target.value,
                          })
                        }
                        className="rounded-lg border-border text-xs"
                      >
                        <option>{String(row.status)}</option>
                        {['REVIEWING', 'APPROVED', 'DECLINED', 'CANCELLED', 'COMPLETED']
                          .filter((status) => status !== row.status)
                          .map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                      </select>
                    )}
                    {view === 'users' && (
                      <button
                        onClick={() =>
                          action(`/api/v1/admin/users/${row.id}`, 'PATCH', {
                            isActive: !row.isActive,
                          })
                        }
                        className="text-xs font-semibold text-primary"
                      >
                        {row.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                    {view === 'media' && (
                      <a
                        href={String(row.url)}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                      >
                        View
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-muted-foreground">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
