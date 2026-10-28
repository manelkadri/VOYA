'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import FavoriteButton from '@/components/FavoriteButton';
import ScrollReveal from '@/components/ScrollReveal';
import { useHotels } from '@/hooks/useCatalog';
import {
  ArrowUpRight,
  CalendarDays,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  X,
} from 'lucide-react';

const types = [
  'All stays',
  'Luxury Hotels',
  'Private Villas',
  'Beach Resorts',
  'Boutique Hotels',
  'Mountain Chalets',
  'Overwater Bungalows',
];
export default function StayExplorer() {
  const stays = useHotels();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All stays');
  const [price, setPrice] = useState(2500);
  const [rating, setRating] = useState('Any rating');
  const [amenity, setAmenity] = useState('Any amenity');
  const [guests, setGuests] = useState('2');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = filtersOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [filtersOpen]);
  const results = useMemo(
    () =>
      stays.filter(
        (stay) =>
          `${stay.name} ${stay.location} ${stay.destination}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (type === 'All stays' || stay.type === type) &&
          stay.price <= price &&
          (rating === 'Any rating' || stay.rating >= Number(rating)) &&
          (amenity === 'Any amenity' || stay.amenities.includes(amenity))
      ),
    [query, type, price, rating, amenity]
  );
  return (
    <>
      <section id="discover" className="py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 2xl:px-16">
          <ScrollReveal className="rounded-[2rem] bg-card p-5 shadow-[0_20px_70px_rgba(15,17,21,.08)] md:p-7">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.35fr_1fr_1fr_.7fr_auto]">
              <label className="relative">
                <span className="eyebrow ml-1 text-muted-foreground">Destination or property</span>
                <Search size={17} className="absolute bottom-4 left-4 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where would you like to stay?"
                  className="mt-2 w-full rounded-xl border-border bg-background py-3 pl-11"
                />
              </label>
              <label>
                <span className="eyebrow ml-1 text-muted-foreground">Check in</span>
                <input
                  type="date"
                  value={dates.start}
                  onChange={(e) => setDates({ ...dates, start: e.target.value })}
                  className="mt-2 w-full rounded-xl border-border bg-background py-3"
                />
              </label>
              <label>
                <span className="eyebrow ml-1 text-muted-foreground">Check out</span>
                <input
                  type="date"
                  min={dates.start}
                  value={dates.end}
                  onChange={(e) => setDates({ ...dates, end: e.target.value })}
                  className="mt-2 w-full rounded-xl border-border bg-background py-3"
                />
              </label>
              <label>
                <span className="eyebrow ml-1 text-muted-foreground">Guests</span>
                <span className="relative block">
                  <Users size={17} className="absolute bottom-4 left-4 text-muted-foreground" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="mt-2 w-full rounded-xl border-border bg-background py-3 pl-11"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <button
                type="button"
                className="mt-auto h-[46px] rounded-xl bg-primary px-7 text-sm font-semibold"
              >
                Search
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              <CalendarDays size={13} className="mr-1 inline" />
              Dates help us prepare your inquiry; live availability is confirmed by your concierge.
            </p>
          </ScrollReveal>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal size={17} />
            Filter properties
          </button>
          {filtersOpen && (
            <button
              type="button"
              aria-label="Close property filters"
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm lg:hidden"
            />
          )}
          <div className="mt-10 grid gap-8 lg:grid-cols-[15rem_1fr]">
            <aside
              aria-label="Property filters"
              className={`${filtersOpen ? 'fixed inset-x-4 bottom-4 z-[80] block max-h-[85dvh] overflow-y-auto rounded-[2rem] bg-background p-6 shadow-2xl' : 'hidden'} space-y-7 lg:sticky lg:top-28 lg:block lg:max-h-none lg:self-start lg:overflow-visible lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none`}
            >
              <div className="flex items-center justify-between lg:hidden">
                <div>
                  <p className="eyebrow text-primary">Refine your stay</p>
                  <h2 className="mt-1 font-display text-3xl">Filters</h2>
                </div>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setFiltersOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border"
                >
                  <X size={19} />
                </button>
              </div>
              <label className="block">
                <span className="eyebrow text-muted-foreground">Property type</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-2 w-full rounded-xl border-border bg-transparent text-sm"
                >
                  {types.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="eyebrow text-muted-foreground">
                  Up to ${price.toLocaleString()} / night
                </span>
                <input
                  type="range"
                  min="500"
                  max="2500"
                  step="100"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-4 w-full accent-[#C9A86A]"
                />
              </label>
              <label className="block">
                <span className="eyebrow text-muted-foreground">Amenity</span>
                <select
                  value={amenity}
                  onChange={(e) => setAmenity(e.target.value)}
                  className="mt-2 w-full rounded-xl border-border bg-transparent text-sm"
                >
                  <option>Any amenity</option>
                  {[...new Set(stays.flatMap((s) => s.amenities))].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="eyebrow text-muted-foreground">Guest rating</span>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="mt-2 w-full rounded-xl border-border bg-transparent text-sm"
                >
                  <option>Any rating</option>
                  <option value="4.8">4.8+</option>
                  <option value="4.9">4.9</option>
                </select>
              </label>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setType('All stays');
                  setPrice(2500);
                  setRating('Any rating');
                  setAmenity('Any amenity');
                }}
                className="text-sm font-semibold text-primary"
              >
                Clear all filters
              </button>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="sticky bottom-0 flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold shadow-lg lg:hidden"
              >
                Show {results.length} {results.length === 1 ? 'stay' : 'stays'}
              </button>
            </aside>
            <div>
              <div className="mb-7 flex items-end justify-between">
                <div>
                  <p className="eyebrow text-primary">VOYA selection</p>
                  <h2 className="mt-2 font-display text-3xl">{results.length} exceptional stays</h2>
                </div>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Demo listings · availability by inquiry
                </p>
              </div>
              {results.length ? (
                <ScrollReveal
                  stagger
                  key={`${query}-${type}-${price}-${rating}-${amenity}`}
                  className="grid gap-7 md:grid-cols-2 xl:grid-cols-3"
                >
                  {results.map((stay) => (
                    <article
                      key={stay.slug}
                      className="group overflow-hidden rounded-[1.5rem] bg-card shadow-[0_14px_45px_rgba(15,17,21,.07)]"
                    >
                      <Link href={`/stays/${stay.slug}`}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <AppImage
                            src={stay.image}
                            alt={stay.name}
                            fill
                            sizes="(max-width:768px) 100vw, 33vw"
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                          <div className="absolute right-4 top-4">
                            <FavoriteButton
                              label={stay.name}
                              targetId={stay.id}
                              targetType="HOTEL"
                            />
                          </div>
                          <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-[.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur">
                            {stay.type}
                          </span>
                        </div>
                        <div className="p-5">
                          <p className="text-xs text-muted-foreground">{stay.location}</p>
                          <h3 className="mt-2 font-display text-2xl">{stay.name}</h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {stay.amenities.slice(0, 3).map((a) => (
                              <span
                                key={a}
                                className="rounded-full bg-muted px-2.5 py-1 text-[.65rem] text-muted-foreground"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                          <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                            <p>
                              <strong className="font-display text-2xl">
                                ${stay.price.toLocaleString()}
                              </strong>
                              <span className="text-xs text-muted-foreground"> / night</span>
                            </p>
                            <div className="text-right">
                              <p className="text-sm font-semibold">
                                <Star
                                  size={13}
                                  fill="currentColor"
                                  className="mr-1 inline text-primary"
                                />
                                {stay.rating}
                              </p>
                              <span className="text-xs font-semibold text-primary">
                                View property <ArrowUpRight size={12} className="inline" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </ScrollReveal>
              ) : (
                <div className="rounded-[2rem] border border-dashed border-border py-24 text-center">
                  <h3 className="font-display text-3xl">No stays match those details</h3>
                  <p className="mt-3 text-muted-foreground">
                    Try increasing your nightly budget or clearing a filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 2xl:px-16">
          <ScrollReveal className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div className="lg:pr-12">
              <p className="eyebrow text-primary">The edit</p>
              <h2 className="mt-5 font-display text-display-lg">
                Handpicked for <span className="italic text-primary">Extraordinary Stays</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We look beyond thread counts and star categories. A VOYA stay earns its place
                through character, location, generosity and the people who bring it to life.
              </p>
              <Link
                href="/stays/aether-house"
                className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold"
              >
                Explore the latest find <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="relative min-h-[26rem] sm:min-h-[35rem]">
              <div className="absolute left-0 top-0 h-[82%] w-[72%] overflow-hidden rounded-[2rem]">
                <AppImage
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d"
                  alt="Cliffside luxury hotel"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 h-[52%] w-[48%] overflow-hidden rounded-[1.5rem] border-[8px] border-muted">
                <AppImage
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                  alt="Quiet luxury suite"
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
