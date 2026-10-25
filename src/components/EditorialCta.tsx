import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function EditorialCta({ eyebrow = 'The next chapter', title = 'Let us shape the journey around you', text = 'Tell our travel designers what moves you. We will turn it into a considered, entirely personal itinerary.', button = 'Plan Your Journey' }: { eyebrow?: string; title?: string; text?: string; button?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-32">
      <div className="blob-gold pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem]" />
      <ScrollReveal className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h2 className="mt-6 font-display text-display-lg font-medium">{title}</h2>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ink-foreground/70">{text}</p>
        <Link href="/concierge#planner" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl">
          {button}<ArrowUpRight size={17} />
        </Link>
      </ScrollReveal>
    </section>
  );
}

