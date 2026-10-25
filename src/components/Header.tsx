'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { navLinks } from '@/data/homepageData';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const textTone = scrolled ? 'text-foreground' : 'text-ink-foreground';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_0_rgba(0,0,0,0.02)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-6 lg:px-10 2xl:px-16">
          <Link href="/" aria-label="VOYA home" className={`flex items-center gap-2.5 ${textTone} transition-colors duration-300`}>
            <AppLogo size={40} />
            <span className="font-display text-3xl font-semibold tracking-[0.18em] hidden sm:block">
              VOYA
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks?.map((link) => (
                <li key={link?.id}>
                  <Link
                    href={link?.href}
                    aria-current={pathname === link?.href ? 'page' : undefined}
                    className={`link-underline pb-1 text-sm font-medium tracking-wide ${textTone} transition-colors duration-300 ${pathname === link?.href ? 'text-primary' : ''}`}
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search VOYA"
              onClick={() => setSearchOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-95 ${
                scrolled ? 'hover:bg-muted text-foreground' : 'hover:bg-ink-foreground/10 text-ink-foreground'
              }`}
            >
              <Search size={19} />
            </button>
            <Link
              href="/concierge#planner"
              className="hidden items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-105 hover:shadow-lg active:scale-95 md:inline-flex"
            >
              Plan Your Journey
              <ArrowUpRight size={16} />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-95 lg:hidden ${
                scrolled ? 'hover:bg-muted text-foreground' : 'hover:bg-ink-foreground/10 text-ink-foreground'
              }`}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background animate-fade-up">
            <form
              onSubmit={(e) => {
                e?.preventDefault();
                const query = new FormData(e.currentTarget).get('q')?.toString().trim();
                setSearchOpen(false);
                if (query) router.push(`/destinations?q=${encodeURIComponent(query)}`);
              }}
              className="mx-auto flex max-w-screen-2xl items-center gap-4 px-6 py-4 lg:px-10 2xl:px-16"
            >
              <Search size={18} className="text-muted-foreground" />
              <label htmlFor="site-search" className="sr-only">
                Search destinations, experiences and stays
              </label>
              <input
                id="site-search"
                name="q"
                autoFocus
                type="search"
                placeholder="Search destinations, experiences, stays…"
                className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
              >
                <X size={16} />
              </button>
            </form>
          </div>
        )}
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Main menu">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm animate-drawer-in flex-col bg-ink text-ink-foreground">
            <div className="flex h-20 items-center justify-between px-6">
              <div className="flex items-center gap-2.5">
                <Link href="/" onClick={() => setDrawerOpen(false)} aria-label="VOYA home"><AppLogo size={36} /></Link>
                <span className="font-display text-2xl font-semibold tracking-[0.18em]">VOYA</span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink-foreground/10"
              >
                <X size={22} />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-6">
              <ul className="flex flex-col">
                {navLinks?.map((link) => (
                  <li key={`drawer-${link?.id}`} className="border-b border-ink-foreground/10">
                    <Link
                      href={link?.href}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center justify-between py-5 font-display text-3xl"
                    >
                      {link?.label}
                      <ArrowUpRight size={20} className="text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-6">
              <Link
                href="/concierge#planner"
                onClick={() => setDrawerOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground active:scale-95"
              >
                Plan Your Journey
                <ArrowUpRight size={16} />
              </Link>
              <p className="mt-4 text-center text-xs text-ink-foreground/60">
                Concierge available 7 days · replies in under 2 hours
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
