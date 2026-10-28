'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  Bookmark,
  CalendarCheck,
  Compass,
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X,
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { apiFetch, clearCsrf } from '@/lib/api';

const links = [
  { href: '/account', label: 'Overview', icon: LayoutDashboard },
  { href: '/account/profile', label: 'Profile', icon: UserRound },
  { href: '/account/favorites', label: 'Favorites', icon: Heart },
  { href: '/account/trips', label: 'Saved trips', icon: Bookmark },
  { href: '/account/reservations', label: 'Reservations', icon: CalendarCheck },
  { href: '/account/subscription', label: 'Membership', icon: CreditCard },
  { href: '/account/settings', label: 'Settings', icon: Settings },
];

type User = { email: string; profile?: { firstName?: string; lastName?: string } | null };

export default function PortalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    apiFetch<User>('/api/v1/auth/me')
      .then(setUser)
      .catch(() => router.replace('/login'));
  }, [router]);

  async function logout() {
    await apiFetch('/api/v1/auth/logout', { method: 'POST' }).catch(() => null);
    clearCsrf();
    router.replace('/login');
  }

  const navigation = (
    <>
      <div className="flex h-24 items-center justify-between px-7">
        <Link href="/" className="flex items-center gap-3">
          <AppLogo size={38} />
          <span className="font-display text-2xl font-semibold tracking-[.18em]">VOYA</span>
        </Link>
        <button onClick={() => setOpen(false)} className="lg:hidden" aria-label="Close navigation">
          <X />
        </button>
      </div>
      <nav className="flex-1 px-4 py-6">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === '/account' ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${active ? 'bg-primary text-primary-foreground' : 'text-white/65 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-5">
        <Link
          href="/destinations"
          className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/65 hover:text-white"
        >
          <Compass size={18} />
          Explore VOYA
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/65 hover:text-white"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[17rem] flex-col bg-ink text-white lg:flex">
        {navigation}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-ink/60"
            onClick={() => setOpen(false)}
          />
          <aside className="relative flex h-full w-[17rem] flex-col bg-ink text-white">
            {navigation}
          </aside>
        </div>
      )}
      <div className="lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur-xl sm:px-8 lg:px-12">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
            <Menu />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs text-muted-foreground">Private travel office</p>
            <p className="font-display text-lg">
              {user?.profile?.firstName ? `Welcome, ${user.profile.firstName}` : 'Welcome to VOYA'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
            >
              <Bell size={17} />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-lg">
              {user?.email?.[0]?.toUpperCase() ?? 'V'}
            </div>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</main>
      </div>
    </div>
  );
}
