import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteriorHero from '@/components/InteriorHero';
import Gallery from '@/components/Gallery';
import ScrollReveal from '@/components/ScrollReveal';
import { stays } from '@/data/travelData';
import { ArrowLeft, ArrowUpRight, Check, MapPin, Star, Users } from 'lucide-react';

export function generateStaticParams() {
  return stays.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stay = stays.find((x) => x.slug === slug);
  return {
    title: stay ? `${stay.name} | VOYA Stays` : 'Stay | VOYA',
    description: stay?.description,
  };
}
export default async function StayDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stay = stays.find((x) => x.slug === slug);
  if (!stay) notFound();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <InteriorHero
          compact
          eyebrow={stay.type}
          title={stay.name}
          subtitle={stay.description}
          image={stay.image}
        >
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/25 bg-ink/25 px-4 py-2 backdrop-blur">
              <MapPin size={14} className="mr-2 inline text-primary" />
              {stay.location}
            </span>
            <span className="rounded-full border border-white/25 bg-ink/25 px-4 py-2 backdrop-blur">
              <Star size={14} fill="currentColor" className="mr-2 inline text-primary" />
              {stay.rating}
            </span>
          </div>
        </InteriorHero>
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 2xl:px-16">
            <Link
              href="/stays"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
            >
              <ArrowLeft size={16} />
              All stays
            </Link>
            <Gallery images={[stay.image, ...stay.gallery]} title={stay.name} />
            <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_23rem]">
              <ScrollReveal>
                <p className="eyebrow text-primary">The property</p>
                <h2 className="mt-5 font-display text-display-md">A considered place to pause</h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {stay.description}
                </p>
                <h3 className="mt-12 font-display text-3xl">Amenities</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {stay.amenities.map((a) => (
                    <li
                      key={a}
                      className="flex items-center gap-3 rounded-2xl border border-border p-4 text-sm"
                    >
                      <Check size={16} className="text-primary" />
                      {a}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-12 font-display text-3xl">Room categories</h3>
                <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
                  {stay.rooms.map((room, i) => (
                    <div key={room} className="flex items-center justify-between gap-4 p-4 sm:p-5">
                      <div className="min-w-0">
                        <p className="font-semibold">{room}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          <Users size={13} className="mr-1 inline" />
                          Up to {i + 2} guests
                        </p>
                      </div>
                      <Link
                        href="/concierge#planner"
                        className="shrink-0 text-sm font-semibold text-primary"
                      >
                        Inquire
                      </Link>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-[2rem] bg-ink p-7 text-white">
                  <p className="eyebrow text-primary">Demo property</p>
                  <p className="mt-5">
                    <span className="font-display text-3xl">${stay.price.toLocaleString()}</span>
                    <span className="text-sm text-white/60"> / night</span>
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <label className="text-xs text-white/60">
                      Check in
                      <input
                        type="date"
                        className="mt-2 w-full rounded-xl border-white/15 bg-white/10 p-3 text-white [color-scheme:dark]"
                      />
                    </label>
                    <label className="text-xs text-white/60">
                      Check out
                      <input
                        type="date"
                        className="mt-2 w-full rounded-xl border-white/15 bg-white/10 p-3 text-white [color-scheme:dark]"
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-white/55">
                    No live inventory is connected. Your concierge will confirm availability and the
                    final rate before any reservation.
                  </p>
                  <Link
                    href="/concierge#planner"
                    className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground"
                  >
                    Request this stay
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
        <section className="bg-muted py-20">
          <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10 2xl:px-16">
            <ScrollReveal>
              <p className="eyebrow text-primary">Location</p>
              <h2 className="mt-4 font-display text-display-md">
                In the heart of {stay.destination}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
                Exact transfer details and arrival notes are included once your stay is confirmed.
              </p>
            </ScrollReveal>
            <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-[2rem] bg-[#e5dfd2] [background-image:radial-gradient(#999286_1px,transparent_1px)] [background-size:16px_16px]">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-background bg-primary shadow-xl">
                <MapPin />
              </span>
              <p className="absolute bottom-6 max-w-[calc(100%-2rem)] rounded-full bg-ink px-5 py-2 text-center text-sm font-semibold text-white">
                {stay.location}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
