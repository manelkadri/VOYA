'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Heart, Star, Clock, Sun } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import type { DestinationCard } from '@/data/homepageData';

export default function DestinationCarousel({ items }: { items: DestinationCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState<string[]>(['dest-maldives']);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const toggleSave = (id: string) =>
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="mt-14">
      <div
        ref={trackRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0"
      >
        {items.map((d, i) => {
          const isSaved = saved.includes(d.id);
          return (
            <article
              key={d.id}
              className="group relative aspect-[3/4.2] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl bg-ink sm:w-[46%] lg:w-auto"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <AppImage
                src={d.image}
                alt={d.alt}
                fill
                sizes="(max-width: 1024px) 78vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="card-scrim absolute inset-0 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                {d.peakNow ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-primary-foreground">
                    <Sun size={12} />
                    Peak season now
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-foreground backdrop-blur-md">
                    {d.category}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => toggleSave(d.id)}
                  aria-pressed={isSaved}
                  aria-label={isSaved ? `Remove ${d.name} from saved` : `Save ${d.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/45 text-ink-foreground backdrop-blur-md transition-all duration-200 hover:bg-ink/70 active:scale-90"
                >
                  <Heart
                    size={17}
                    className={isSaved ? 'text-primary' : ''}
                    fill={isSaved ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
                <p className="eyebrow text-primary">{d.country}</p>
                <h3 className="mt-2 font-display text-4xl font-medium leading-none">{d.name}</h3>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-foreground/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={13} className="text-primary" fill="currentColor" />
                    <span className="tabular font-bold text-ink-foreground">{d.rating.toFixed(1)}</span>
                    <span className="tabular">({d.reviews})</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} />
                    {d.nights}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sun size={13} />
                    {d.bestSeason}
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-ink-foreground/20 pt-4">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-wider text-ink-foreground/65">From, per person</p>
                    <p className="tabular font-display text-3xl font-semibold">${d.fromPrice.toLocaleString('en-US')}</p>
                  </div>
                  <Link
                    href={`/destinations/${d.id.replace('dest-', '')}`}
                    aria-label={`View ${d.name} journeys`}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-foreground/40 transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous destination"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-input text-foreground transition-all duration-200 hover:border-primary hover:bg-primary active:scale-95"
          >
            <ArrowLeft size={19} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next destination"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-input text-foreground transition-all duration-200 hover:border-primary hover:bg-primary active:scale-95"
          >
            <ArrowRight size={19} />
          </button>
        </div>
        <p className="hidden text-sm text-muted-foreground lg:block">
          Santorini and Marrakech are at peak right now. Swiss Alps opens for ski season in December.
        </p>
        <Link
          href="/destinations"
          className="link-underline inline-flex items-center gap-2 pb-1 text-sm font-semibold text-foreground"
        >
          View all destinations
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
