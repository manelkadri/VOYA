import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { destinations } from '@/data/homepageData';
import DestinationCarousel from './DestinationCarousel';

export default function FeaturedDestinations() {
  return (
    <section className="bg-background py-24 md:py-32" aria-labelledby="destinations-heading">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16">
        <ScrollReveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5 flex items-center gap-3 text-primary">
              <span className="h-px w-10 bg-primary" />
              Featured destinations
            </p>
            <h2 id="destinations-heading" className="font-display text-display-lg font-medium text-foreground">
              Places that stay with you <span className="italic text-primary">long after</span> you’ve left
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            Four destinations our concierges are booking most this month, with honest guidance on
            when each is at its very best.
          </p>
        </ScrollReveal>

        <DestinationCarousel items={destinations} />
      </div>
    </section>
  );
}