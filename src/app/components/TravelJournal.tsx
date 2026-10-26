import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import ScrollReveal from '@/components/ScrollReveal';
import { articles } from '@/data/homepageData';

export default function TravelJournal() {
  const [lead, ...rest] = articles;

  return (
    <section className="bg-background py-24 md:py-32" aria-labelledby="journal-heading">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16">
        <ScrollReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5 flex items-center gap-3 text-primary">
              <span className="h-px w-10 bg-primary" />
              The VOYA journal
            </p>
            <h2
              id="journal-heading"
              className="font-display text-display-lg font-medium text-foreground"
            >
              Stories, guides and <span className="italic text-primary">quiet inspiration</span>
            </h2>
          </div>
          <Link
            href="/journal"
            className="link-underline inline-flex items-center gap-2 self-start pb-1 text-sm font-semibold text-foreground md:self-auto"
          >
            Read the journal
            <ArrowUpRight size={16} />
          </Link>
        </ScrollReveal>

        <ScrollReveal stagger className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr]">
          <article className="group">
            <Link href={`/journal/${lead?.id?.replace('article-', '')}`} className="block">
              <div className="relative aspect-[16/11] overflow-hidden rounded-3xl bg-muted">
                <AppImage
                  src={lead?.image}
                  alt={lead?.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-ink/60 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-foreground backdrop-blur-md">
                  {lead?.category}
                </span>
              </div>
              <div className="mt-6">
                <h3 className="font-display text-3xl font-medium leading-tight text-foreground transition-colors group-hover:text-primary md:text-4xl">
                  {lead?.title}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {lead?.excerpt}
                </p>
                <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{lead?.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{lead?.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} />
                    {lead?.readTime}
                  </span>
                </p>
              </div>
            </Link>
          </article>

          <div className="flex flex-col gap-8">
            {rest?.map((a) => (
              <article key={a?.id} className="group">
                <Link
                  href={`/journal/${a?.id?.replace('article-', '')}`}
                  className="grid grid-cols-[7rem_1fr] gap-4 sm:grid-cols-[12rem_1fr] sm:gap-5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                    <AppImage
                      src={a?.image}
                      alt={a?.alt}
                      fill
                      sizes="(max-width: 640px) 144px, 192px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <p className="eyebrow text-primary">{a?.category}</p>
                    <h3 className="mt-3 font-display text-xl font-medium leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                      {a?.title}
                    </h3>
                    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">{a?.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{a?.readTime}</span>
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
