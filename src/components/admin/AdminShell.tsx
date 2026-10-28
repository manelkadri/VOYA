'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3,
  BedDouble,
  CalendarCheck,
  Compass,
  CreditCard,
  Gauge,
  Images,
  LogOut,
  Menu,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { apiFetch, clearCsrf } from '@/lib/api';

const links = [
  ['/admin', 'Overview', Gauge],
  ['/admin/destinations', 'Destinations', Compass],
  ['/admin/hotels', 'Hotels', BedDouble],
  ['/admin/experiences', 'Experiences', Sparkles],
  ['/admin/reservations', 'Reservations', CalendarCheck],
  ['/admin/users', 'Travelers', Users],
  ['/admin/subscriptions', 'Subscriptions', CreditCard],
  ['/admin/media', 'Media library', Images],
  ['/admin/analytics', 'Analytics', BarChart3],
] as const;

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  useEffect(() => {
    apiFetch<{ email: string; role: string }>('/api/v1/auth/me')
      .then((value) => {
        if (value.role === 'CUSTOMER') router.replace('/account');
        else setUser(value);
      })
      .catch(() => router.replace('/login'));
  }, [router]);
  async function logout() {
    await apiFetch('/api/v1/auth/logout', { method: 'POST' }).catch(() => null);
    clearCsrf();
    router.replace('/login');
  }
  const nav = (
    <>
      <div className="flex h-24 items-center justify-between px-7">
        <Link href="/" className="flex items-center gap-3">
          <AppLogo size={38} />
          <div>
            <span className="font-display text-2xl tracking-[.18em]">VOYA</span>
            <p className="text-[9px] uppercase tracking-[.25em] text-primary">Studio</p>
          </div>
        </Link>
        <button onClick={() => setOpen(false)} className="lg:hidden">
          <X />
        </button>
      </div>
      <nav className="flex-1 px-4 py-4">
        {links.map(([href, label, Icon]) => {
          const active = href === '/admin' ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${active ? 'bg-primary text-ink' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-5">
        <p className="truncate px-4 text-xs text-white/40">{user?.email}</p>
        <button
          onClick={logout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 hover:text-white"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </>
  );
  return (
    <div className="min-h-screen bg-[#f3f0e9] lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[17rem] flex-col bg-ink text-white lg:flex">
        {nav}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-ink/60" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-[17rem] flex-col bg-ink text-white">{nav}</aside>
        </div>
      )}
      <div className="lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-[#f3f0e9]/90 px-5 backdrop-blur lg:px-10">
          <button onClick={() => setOpen(true)} className="lg:hidden">
            <Menu />
          </button>
          <div>
            <p className="eyebrow text-primary">Operations</p>
            <p className="font-display text-xl">VOYA travel studio</p>
          </div>
          <span className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold">
            {user?.role?.replace('_', ' ') ?? 'ADMIN'}
          </span>
        </header>
        <main className="p-4 sm:p-7 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
