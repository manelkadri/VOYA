'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Leaf, Ship, Landmark, ArrowUpRight } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import type { ExperienceTile } from '@/data/homepageData';

const iconMap = { Heart, Leaf, Ship, Landmark };

export default function ExperienceTiles({ items }: { items: ExperienceTile[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');

  return (
    <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 xl:flex xl:h-[34rem] xl:gap-5">
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        const isActive = active === item.id;
        return (
          <Link
            key={item.id}
            href={`/experiences/${item.slug ?? (({ 'exp-romantic': 'amalfi-for-two', 'exp-wellness': 'bali-wellness', 'exp-yacht': 'aegean-private-yacht', 'exp-culture': 'kyoto-living-craft' } as Record<string, string>)[item.id] || '')}`}
            onMouseEnter={() => setActive(item.id)}
            onFocus={() => setActive(item.id)}
            aria-label={`${item.title} — ${item.count}`}
            className={`group relative min-h-[24rem] overflow-hidden rounded-3xl bg-ink transition-[flex] duration-500 ease-out xl:min-h-0 ${
              isActive ? 'xl:flex-[2.4]' : 'xl:flex-1'
            }`}
          >
            <AppImage
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 1280px) 50vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="card-scrim absolute inset-0" />
            <div
              className={`absolute inset-0 transition-colors duration-500 ${
                isActive ? 'bg-ink/0' : 'bg-ink/30'
              }`}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-7 text-ink-foreground">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-foreground/40 bg-ink/30 backdrop-blur-md">
                  <Icon size={20} className="text-primary" />
                </span>
                <span className="tabular rounded-full bg-ink/45 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider backdrop-blur-md">
                  {item.count}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl font-medium leading-tight md:text-4xl">
                  {item.title}
                </h3>
                <div
                  className={`grid transition-all duration-500 ease-out xl:grid-rows-[0fr] ${
                    isActive ? 'xl:grid-rows-[1fr] xl:opacity-100' : 'xl:opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/80">
                      {item.blurb}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-ink-foreground/20 pt-4">
                      <span className="tabular font-display text-2xl font-semibold text-primary">
                        {item.from}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
