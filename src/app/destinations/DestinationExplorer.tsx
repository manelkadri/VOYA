'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import FavoriteButton from '@/components/FavoriteButton';
import DemoMap from '@/components/DemoMap';
import ScrollReveal from '@/components/ScrollReveal';
import { destinations } from '@/data/travelData';
import { ArrowUpRight, Grid2X2, Map, Search, SlidersHorizontal, Star, X } from 'lucide-react';

const initial = { query: '', region: 'All regions', season: 'Any season', budget: 'Any budget', duration: 'Any duration', category: 'All styles' };
type Filters = typeof initial;

export default function DestinationExplorer() {
  const [filters, setFilters] = useState<Filters>(initial);
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('q');
    if (query) setFilters((current) => ({ ...current, query }));
  }, []);

  const update = (key: keyof Filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const activeCount = Object.entries(filters).filter(([key, value]) => value !== initial[key as keyof Filters]).length;
  const results = useMemo(() => {
    const filtered = destinations.filter((item) => {
      const haystack = `${item.name} ${item.country} ${item.region} ${item.category}`.toLowerCase();
      const budgetLimit = filters.budget === 'Under $4,000' ? 4000 : filters.budget === 'Under $6,000' ? 6000 : filters.budget === '$6,000+' ? Infinity : Infinity;
      const budgetMatch = filters.budget === '$6,000+' ? item.price >= 6000 : item.price <= budgetLimit;
      return haystack.includes(filters.query.toLowerCase()) && (filters.region === 'All regions' || item.region === filters.region) && (filters.season === 'Any season' || item.season.includes(filters.season)) && budgetMatch && (filters.duration === 'Any duration' || item.duration === filters.duration) && (filters.category === 'All styles' || item.category === filters.category);
    });
    return [...filtered].sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'rating' ? b.rating - a.rating : b.price - a.price);
  }, [filters, sort]);

  const filterFields = (
    <>
      <label className="block"><span className="eyebrow text-muted-foreground">Region</span><select value={filters.region} onChange={(e) => update('region', e.target.value)} className="mt-2 w-full rounded-xl border-border bg-background text-sm"><option>All regions</option>{['Europe', 'Africa', 'Asia', 'Indian Ocean', 'Middle East'].map((v) => <option key={v}>{v}</option>)}</select></label>
      <label className="block"><span className="eyebrow text-muted-foreground">Season</span><select value={filters.season} onChange={(e) => update('season', e.target.value)} className="mt-2 w-full rounded-xl border-border bg-background text-sm"><option>Any season</option>{['March', 'April', 'May', 'November', 'December'].map((v) => <option key={v}>{v}</option>)}</select></label>
      <label className="block"><span className="eyebrow text-muted-foreground">Budget</span><select value={filters.budget} onChange={(e) => update('budget', e.target.value)} className="mt-2 w-full rounded-xl border-border bg-background text-sm"><option>Any budget</option><option>Under $4,000</option><option>Under $6,000</option><option>$6,000+</option></select></label>
      <label className="block"><span className="eyebrow text-muted-foreground">Travel duration</span><select value={filters.duration} onChange={(e) => update('duration', e.target.value)} className="mt-2 w-full rounded-xl border-border bg-background text-sm"><option>Any duration</option>{[...new Set(destinations.map((d) => d.duration))].map((v) => <option key={v}>{v}</option>)}</select></label>
      <label className="block"><span className="eyebrow text-muted-foreground">Travel style</span><select value={filters.category} onChange={(e) => update('category', e.target.value)} className="mt-2 w-full rounded-xl border-border bg-background text-sm"><option>All styles</option>{[...new Set(destinations.map((d) => d.category))].map((v) => <option key={v}>{v}</option>)}</select></label>
    </>
  );

  return (
    <section id="discover" className="py-20 md:py-28" aria-labelledby="destination-results">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16">
        <ScrollReveal className="grid gap-4 rounded-[2rem] border border-border bg-card p-4 shadow-[0_24px_80px_rgba(15,17,21,.08)] md:grid-cols-[1fr_auto] md:p-6">
          <label className="relative"><span className="sr-only">Search by destination, country or region</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={19} /><input value={filters.query} onChange={(e) => update('query', e.target.value)} type="search" placeholder="Search destination, country or region" className="h-14 w-full rounded-full border-border bg-background pl-12 pr-5" /></label>
          <button type="button" onClick={() => setDrawer(true)} className="flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-ink-foreground lg:hidden"><SlidersHorizontal size={17} />Filters {activeCount > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-primary-foreground">{activeCount}</span>}</button>
          <div className="hidden items-center gap-2 lg:flex">{['Europe', 'Asia', 'Africa'].map((region) => <button key={region} type="button" onClick={() => update('region', filters.region === region ? 'All regions' : region)} className={`rounded-full border px-4 py-3 text-sm transition ${filters.region === region ? 'border-primary bg-primary' : 'border-border hover:border-primary'}`}>{region}</button>)}</div>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[15rem_1fr]">
          <aside className="hidden lg:block"><div className="sticky top-28 space-y-7">{filterFields}<button type="button" onClick={() => setFilters(initial)} disabled={!activeCount} className="text-sm font-semibold text-primary disabled:opacity-40">Clear all filters</button></div></aside>
          <div>
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div><p className="eyebrow text-primary">Curated collection</p><h2 id="destination-results" className="mt-2 font-display text-3xl font-medium">{results.length} {results.length === 1 ? 'destination' : 'destinations'}</h2></div>
              <div className="flex items-center gap-2"><label className="sr-only" htmlFor="destination-sort">Sort destinations</label><select id="destination-sort" value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border-border bg-transparent text-sm"><option value="popular">Most popular</option><option value="price-low">Price: low to high</option><option value="rating">Highest rated</option></select><div className="flex rounded-full border border-border p-1"><button type="button" aria-label="Grid view" onClick={() => setView('grid')} className={`rounded-full p-2 ${view === 'grid' ? 'bg-ink text-white' : ''}`}><Grid2X2 size={17} /></button><button type="button" aria-label="Map view" onClick={() => setView('map')} className={`rounded-full p-2 ${view === 'map' ? 'bg-ink text-white' : ''}`}><Map size={17} /></button></div></div>
            </div>

            {results.length === 0 ? <div className="rounded-[2rem] border border-dashed border-border py-24 text-center"><p className="font-display text-3xl">The perfect place may need a wider view.</p><p className="mt-3 text-muted-foreground">Try changing or clearing your filters.</p><button type="button" onClick={() => setFilters(initial)} className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold">Clear filters</button></div> : view === 'map' ? <DemoMap points={results} /> : (
              <ScrollReveal stagger key={`${JSON.stringify(filters)}-${sort}`} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {results.map((item) => <article key={item.slug} className="group overflow-hidden rounded-[1.5rem] bg-card shadow-[0_16px_50px_rgba(15,17,21,.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,17,21,.12)]"><Link href={`/destinations/${item.slug}`} className="block"><div className="relative aspect-[4/5] overflow-hidden"><AppImage src={item.image} alt={`${item.name}, ${item.country}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="card-scrim absolute inset-0" /><div className="absolute right-4 top-4"><FavoriteButton label={item.name} /></div><div className="absolute inset-x-0 bottom-0 p-5 text-white"><p className="eyebrow text-primary">{item.category}</p><h3 className="mt-2 font-display text-3xl font-medium">{item.name}</h3><p className="mt-1 text-sm text-white/75">{item.country}</p></div></div><div className="p-5"><p className="min-h-12 text-sm leading-relaxed text-muted-foreground">{item.description}</p><div className="mt-5 flex items-end justify-between border-t border-border pt-4"><div><p className="text-xs text-muted-foreground">From</p><p className="font-display text-2xl font-semibold">${item.price.toLocaleString()}</p></div><div className="text-right"><p className="flex items-center gap-1 text-sm font-semibold"><Star size={14} fill="currentColor" className="text-primary" />{item.rating}</p><span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">Explore <ArrowUpRight size={13} /></span></div></div></div></Link></article>)}
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>

      {drawer && <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Destination filters"><button type="button" aria-label="Close filters" onClick={() => setDrawer(false)} className="absolute inset-0 bg-ink/60" /><div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-auto rounded-t-[2rem] bg-background p-6 animate-fade-up"><div className="mb-8 flex items-center justify-between"><h2 className="font-display text-3xl">Refine your search</h2><button type="button" aria-label="Close filters" onClick={() => setDrawer(false)} className="p-2"><X /></button></div><div className="space-y-6">{filterFields}</div><div className="sticky bottom-0 mt-8 flex gap-3 bg-background py-4"><button type="button" onClick={() => setFilters(initial)} className="flex-1 rounded-full border border-border py-3 text-sm font-semibold">Clear all</button><button type="button" onClick={() => setDrawer(false)} className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold">Show {results.length}</button></div></div></div>}
    </section>
  );
}
