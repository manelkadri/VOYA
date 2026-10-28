'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import FavoriteButton from '@/components/FavoriteButton';
import ScrollReveal from '@/components/ScrollReveal';
import { useExperiences } from '@/hooks/useCatalog';
import { ArrowUpRight, Clock3, MapPin, Search } from 'lucide-react';

const categories = [
  'All Experiences',
  'Private Yacht Experiences',
  'Romantic Escapes',
  'Wellness & Spa',
  'Adventure & Nature',
  'Cultural Immersion',
  'Culinary Experiences',
  'Private Guided Tours',
  'Exclusive Luxury Experiences',
];

export default function ExperienceExplorer() {
  const experiences = useExperiences();
  const [category, setCategory] = useState('All Experiences');
  const [query, setQuery] = useState('');
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('category');
    if (value && categories.includes(value)) setCategory(value);
  }, []);
  const results = useMemo(
    () =>
      experiences.filter(
        (item) =>
          (category === 'All Experiences' || item.category === category) &&
          `${item.title} ${item.location} ${item.description}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [category, query]
  );

  return (
    <>
      <section id="discover" className="py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 2xl:px-16">
          <ScrollReveal className="flex flex-col gap-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow text-primary">Choose your beginning</p>
                <h2 className="mt-4 max-w-2xl font-display text-display-md">
                  Travel shaped by <span className="italic text-primary">how you want to feel</span>
                </h2>
              </div>
              <label className="relative w-full lg:max-w-sm">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <span className="sr-only">Search experiences</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by moment or place"
                  className="w-full rounded-full border-border bg-card py-3.5 pl-11 pr-5"
                />
              </label>
            </div>
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:px-0">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-sm transition ${category === item ? 'border-ink bg-ink text-white' : 'border-border bg-card hover:border-primary'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {results.length ? (
            <ScrollReveal
              stagger
              key={`${category}-${query}`}
              className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-4"
            >
              {results.map((item, index) => (
                <article
                  key={item.slug}
                  className={`group ${index % 3 === 1 ? 'xl:translate-y-10' : ''}`}
                >
                  <Link href={`/experiences/${item.slug}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-muted">
                      <AppImage
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width:768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="card-scrim absolute inset-0" />
                      <div className="absolute right-4 top-4">
                        <FavoriteButton
                          label={item.title}
                          targetId={item.id}
                          targetType="EXPERIENCE"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="eyebrow text-primary">{item.category}</p>
                        <h3 className="mt-2 font-display text-3xl leading-tight">{item.title}</h3>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/75">
                          <span className="flex items-center gap-1">
                            <MapPin size={13} />
                            {item.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock3 size={13} />
                            {item.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-1 pt-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <p>
                          <span className="text-xs text-muted-foreground">From </span>
                          <strong>${item.price.toLocaleString()}</strong>
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                          View details <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </ScrollReveal>
          ) : (
            <div className="mt-12 rounded-[2rem] border border-dashed border-border py-24 text-center">
              <h3 className="font-display text-3xl">No moments found yet</h3>
              <p className="mt-3 text-muted-foreground">
                Try another category or a broader search.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setCategory('All Experiences');
                }}
                className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold"
              >
                See all experiences
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        className="overflow-hidden bg-ink py-24 text-ink-foreground md:py-32"
        aria-labelledby="beyond-heading"
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 2xl:px-16">
          <ScrollReveal className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative pb-16">
              <div className="relative aspect-[4/5] w-[82%] overflow-hidden rounded-[2rem]">
                <AppImage
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
                  alt="A remote mountain landscape"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 aspect-square w-[48%] overflow-hidden rounded-[1.5rem] border-[8px] border-ink">
                <AppImage
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"
                  alt="Traditional Kyoto street"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:pl-10">
              <p className="eyebrow text-primary">The VOYA perspective</p>
              <h2 id="beyond-heading" className="mt-5 font-display text-display-lg">
                Moments Beyond <span className="italic text-primary">the Ordinary</span>
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-8 text-ink-foreground/70">
                The most memorable experiences are rarely found on a list. They come from knowing
                who to call, when to arrive, and when to leave space for surprise.
              </p>
              <div className="mt-10 border-l border-primary/50 pl-6">
                <p className="font-display text-2xl italic">
                  “Access matters. Timing matters more.”
                </p>
                <p className="mt-3 text-xs uppercase tracking-[.18em] text-primary">
                  The VOYA design principle
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
