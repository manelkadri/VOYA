'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useExperiences } from '@/hooks/useCatalog';
import ExperienceTiles from './ExperienceTiles';

export default function CuratedExperiences() {
  const iconNames = ['Heart', 'Leaf', 'Ship', 'Landmark'] as const;
  const experiences = useExperiences()
    .slice(0, 4)
    .map((item, index) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      blurb: item.description,
      image: item.image,
      alt: item.title,
      count: item.duration,
      from: `From $${item.price.toLocaleString()}`,
      icon: iconNames[index % iconNames.length],
    }));
  return (
    <section
      className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-32"
      aria-labelledby="experiences-heading"
    >
      <div className="blob-gold pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem]" />
      <div className="relative mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16">
        <ScrollReveal className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3 text-primary">
              <span className="h-px w-10 bg-primary" />
              Curated experiences
            </p>
            <h2 id="experiences-heading" className="font-display text-display-lg font-medium">
              Travel shaped by <span className="italic text-primary">how you want to feel</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-foreground/70 lg:justify-self-end">
            Begin with the experience, and we will find the place. Every journey below is built
            around a single idea and perfected over a decade of repeat travelers.
          </p>
        </ScrollReveal>

        <ExperienceTiles items={experiences} />
      </div>
    </section>
  );
}
