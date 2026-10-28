import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteriorHero from '@/components/InteriorHero';
import Gallery from '@/components/Gallery';
import ScrollReveal from '@/components/ScrollReveal';
import { experienceBySlug } from '@/lib/serverCatalog';
import { ArrowLeft, ArrowUpRight, Check, Clock3, Info, MapPin } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await experienceBySlug(slug);
  return {
    title: item ? `${item.title} | VOYA` : 'Experience | VOYA',
    description: item?.description,
  };
}

export default async function ExperienceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await experienceBySlug(slug);
  if (!item) notFound();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <InteriorHero
          compact
          eyebrow={item.category}
          title={item.title}
          subtitle={item.description}
          image={item.image}
        >
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/25 bg-ink/25 px-4 py-2 backdrop-blur">
              <MapPin size={14} className="mr-2 inline text-primary" />
              {item.location}
            </span>
            <span className="rounded-full border border-white/25 bg-ink/25 px-4 py-2 backdrop-blur">
              <Clock3 size={14} className="mr-2 inline text-primary" />
              {item.duration}
            </span>
          </div>
        </InteriorHero>
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 2xl:px-16">
            <Link
              href="/experiences"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
            >
              <ArrowLeft size={16} />
              All experiences
            </Link>
            <Gallery images={[item.image, ...item.gallery]} title={item.title} />
            <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_22rem]">
              <ScrollReveal>
                <p className="eyebrow text-primary">The experience</p>
                <h2 className="mt-4 font-display text-display-md">A closer look</h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {item.description} Each element is privately arranged and can be adapted around
                  your wider journey.
                </p>
                <h3 className="mt-12 font-display text-3xl">What’s included</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.included.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 rounded-2xl border border-border p-4 text-sm"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check size={15} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex gap-4 rounded-2xl bg-muted p-5">
                  <Info className="shrink-0 text-primary" size={20} />
                  <div>
                    <p className="text-sm font-semibold">Important information</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.important}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-[2rem] bg-ink p-5 text-white sm:p-7">
                  <p className="eyebrow text-primary">Private experience</p>
                  <p className="mt-5 font-display text-3xl">From ${item.price.toLocaleString()}</p>
                  <label className="mt-7 block text-xs uppercase tracking-wider text-white/60">
                    Preferred date
                    <input
                      type="date"
                      className="mt-2 w-full rounded-xl border-white/15 bg-white/10 text-white [color-scheme:dark]"
                    />
                  </label>
                  <p className="mt-4 text-xs leading-relaxed text-white/55">
                    Date selection is a preference only. Availability is confirmed personally by
                    your concierge.
                  </p>
                  <Link
                    href="/concierge#planner"
                    className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground"
                  >
                    Add to itinerary
                    <ArrowUpRight size={16} />
                  </Link>
                  <a
                    href="mailto:concierge@voya.travel"
                    className="mt-3 flex items-center justify-center rounded-full border border-white/20 px-6 py-4 text-sm font-semibold"
                  >
                    Make an inquiry
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
        <section className="bg-muted py-20">
          <ScrollReveal className="mx-auto max-w-4xl px-6 text-center">
            <p className="eyebrow text-primary">Designed around you</p>
            <h2 className="mt-5 font-display text-display-md">
              The details are a beginning, not a boundary.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Duration, pace and inclusions can be shaped to fit the people you travel with and the
              wider journey around it.
            </p>
            <Link
              href="/concierge#planner"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white"
            >
              Speak with a designer
              <ArrowUpRight size={16} />
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
