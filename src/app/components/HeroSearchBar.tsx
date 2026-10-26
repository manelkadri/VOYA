'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  CalendarDays,
  Users,
  Compass,
  Search,
  Minus,
  Plus,
  ChevronDown,
} from 'lucide-react';
import { experienceTypes, searchDestinationOptions } from '@/data/homepageData';
import { useRouter } from 'next/navigation';

type FieldKey = 'destination' | 'dates' | 'travelers' | 'experience' | null;

const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);

export default function HeroSearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState<FieldKey>(null);
  const [destination, setDestination] = useState('');
  const [experience, setExperience] = useState(experienceTypes[0]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [startDay, setStartDay] = useState<number | null>(null);
  const [endDay, setEndDay] = useState<number | null>(null);
  const [searching, setSearching] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const filtered = searchDestinationOptions.filter((d) =>
    d.toLowerCase().includes(destination.toLowerCase())
  );

  const pickDay = (day: number) => {
    if (startDay === null || (startDay !== null && endDay !== null)) {
      setStartDay(day);
      setEndDay(null);
    } else if (day > startDay) {
      setEndDay(day);
      setOpen(null);
    } else {
      setStartDay(day);
    }
  };

  const datesLabel =
    startDay && endDay
      ? `Nov ${startDay} – Nov ${endDay}`
      : startDay
        ? `Nov ${startDay} – …`
        : 'Add dates';
  const travelersLabel = `${adults + children} traveler${adults + children === 1 ? '' : 's'}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    const params = new URLSearchParams();
    if (destination) params.set('q', destination.split(',')[0]);
    if (experience && experience !== experienceTypes[0]) params.set('style', experience);
    params.set('travelers', String(adults + children));
    if (startDay && endDay) params.set('dates', `Nov ${startDay}-${endDay}`);
    router.push(`/destinations${params.size ? `?${params.toString()}` : ''}`);
  };

  const fieldBase =
    'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors duration-200 hover:bg-muted focus-visible:bg-muted';

  return (
    <div ref={wrapRef} className="relative">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 gap-1 rounded-3xl border border-border bg-card p-2 shadow-[0_24px_60px_-20px_rgba(15,17,21,0.45)] md:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_1fr_1.1fr_auto] lg:items-center"
      >
        <div className="relative">
          <label htmlFor="hero-destination" className="sr-only">
            Destination
          </label>
          <div className={`${fieldBase} ${open === 'destination' ? 'bg-muted' : ''}`}>
            <MapPin size={19} className="shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <span className="eyebrow block text-[0.65rem] text-muted-foreground">
                Destination
              </span>
              <input
                id="hero-destination"
                value={destination}
                onFocus={() => setOpen('destination')}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setOpen('destination');
                }}
                placeholder="Where to?"
                autoComplete="off"
                className="w-full truncate bg-transparent text-sm font-semibold text-foreground placeholder:font-medium placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
          {open === 'destination' && (
            <ul className="absolute left-0 top-full z-30 mt-2 w-[min(100%,calc(100vw-2rem))] min-w-0 animate-fade-up overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl sm:min-w-[16rem]">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-muted-foreground">
                  No destinations match “{destination}”. Ask a concierge about it.
                </li>
              )}
              {filtered.map((d) => (
                <li key={`dest-opt-${d}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setDestination(d);
                      setOpen('dates');
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <MapPin size={15} className="text-primary" />
                    {d}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open === 'dates'}
            onClick={() => setOpen(open === 'dates' ? null : 'dates')}
            className={`${fieldBase} ${open === 'dates' ? 'bg-muted' : ''}`}
          >
            <CalendarDays size={19} className="shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-[0.65rem] text-muted-foreground">Dates</span>
              <span className="block truncate text-sm font-semibold text-foreground tabular">
                {datesLabel}
              </span>
            </span>
          </button>
          {open === 'dates' && (
            <div className="absolute left-0 top-full z-30 mt-2 w-[min(19rem,calc(100vw-2rem))] animate-fade-up rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-xl font-semibold text-foreground">November 2026</p>
                <p className="text-xs text-muted-foreground">Select check-in, then check-out</p>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day) => {
                  const isStart = day === startDay;
                  const isEnd = day === endDay;
                  const inRange =
                    startDay !== null && endDay !== null && day > startDay && day < endDay;
                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      onClick={() => pickDay(day)}
                      aria-pressed={isStart || isEnd}
                      className={`tabular flex h-9 items-center justify-center rounded-full text-sm transition-all duration-150 ${
                        isStart || isEnd
                          ? 'bg-primary font-bold text-primary-foreground'
                          : inRange
                            ? 'bg-primary/20 text-foreground'
                            : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => {
                  setStartDay(null);
                  setEndDay(null);
                }}
                className="mt-4 text-xs font-semibold text-muted-foreground underline-offset-4 hover:underline"
              >
                Clear dates
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open === 'travelers'}
            onClick={() => setOpen(open === 'travelers' ? null : 'travelers')}
            className={`${fieldBase} ${open === 'travelers' ? 'bg-muted' : ''}`}
          >
            <Users size={19} className="shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-[0.65rem] text-muted-foreground">Travelers</span>
              <span className="block truncate text-sm font-semibold text-foreground">
                {travelersLabel}
              </span>
            </span>
          </button>
          {open === 'travelers' && (
            <div className="absolute left-0 top-full z-30 mt-2 w-[min(18rem,calc(100vw-2rem))] animate-fade-up rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-5">
              {[
                {
                  id: 'adults',
                  label: 'Adults',
                  hint: 'Ages 13+',
                  value: adults,
                  set: setAdults,
                  min: 1,
                },
                {
                  id: 'children',
                  label: 'Children',
                  hint: 'Ages 0–12',
                  value: children,
                  set: setChildren,
                  min: 0,
                },
              ].map((row) => (
                <div
                  key={`travelers-${row.id}`}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{row.label}</p>
                    <p className="text-xs text-muted-foreground">{row.hint}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Decrease ${row.label}`}
                      disabled={row.value <= row.min}
                      onClick={() => row.set(row.value - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-input text-foreground transition-all hover:border-primary disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="tabular w-5 text-center text-sm font-bold">{row.value}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${row.label}`}
                      disabled={row.value >= 12}
                      onClick={() => row.set(row.value + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-input text-foreground transition-all hover:border-primary disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open === 'experience'}
            onClick={() => setOpen(open === 'experience' ? null : 'experience')}
            className={`${fieldBase} ${open === 'experience' ? 'bg-muted' : ''}`}
          >
            <Compass size={19} className="shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-[0.65rem] text-muted-foreground">Experience</span>
              <span className="block truncate text-sm font-semibold text-foreground">
                {experience}
              </span>
            </span>
            <ChevronDown
              size={16}
              className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                open === 'experience' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {open === 'experience' && (
            <ul
              role="listbox"
              className="absolute left-0 top-full z-30 mt-2 w-[min(16rem,calc(100vw-2rem))] animate-fade-up overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl lg:left-auto lg:right-0"
            >
              {experienceTypes.map((type) => (
                <li key={`exp-opt-${type}`} role="option" aria-selected={type === experience}>
                  <button
                    type="button"
                    onClick={() => {
                      setExperience(type);
                      setOpen(null);
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted ${
                      type === experience ? 'bg-primary/15 text-foreground' : 'text-foreground'
                    }`}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={searching}
          className="mt-1 flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-8 text-sm font-semibold text-ink-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:scale-95 disabled:cursor-wait disabled:opacity-80 md:col-span-2 lg:col-span-1 lg:mt-0 lg:min-w-[10.5rem]"
        >
          {searching ? (
            <span
              className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-label="Searching"
            />
          ) : (
            <>
              <Search size={17} />
              Search
            </>
          )}
        </button>
      </form>
    </div>
  );
}
