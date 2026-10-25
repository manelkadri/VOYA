import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteriorHero from '@/components/InteriorHero';
import Gallery from '@/components/Gallery';
import ScrollReveal from '@/components/ScrollReveal';
import EditorialCta from '@/components/EditorialCta';
import AppImage from '@/components/ui/AppImage';
import { destinations, experiences, stays } from '@/data/travelData';
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock3, MapPin, Star } from 'lucide-react';

export function generateStaticParams() { return destinations.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = destinations.find((destination) => destination.slug === slug);
  return { title: item ? `${item.name}, ${item.country} | VOYA` : 'Destination | VOYA', description: item?.description };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = destinations.find((destination) => destination.slug === slug);
  if (!item) notFound();
  const nearbyExperiences = experiences.filter((experience) => experience.location.includes(item.name) || experience.location.includes(item.country)).slice(0, 3);
  const destinationStays = stays.filter((stay) => stay.destination === item.name).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <InteriorHero compact eyebrow={`${item.region} · ${item.country}`} title={item.name} subtitle={item.description} image={item.image}>
          <div className="flex flex-wrap gap-3 text-sm"><span className="rounded-full border border-white/25 bg-ink/25 px-4 py-2 backdrop-blur"><Star size={14} fill="currentColor" className="mr-2 inline text-primary" />{item.rating} guest rating</span><span className="rounded-full border border-white/25 bg-ink/25 px-4 py-2 backdrop-blur"><CalendarDays size={14} className="mr-2 inline text-primary" />{item.season}</span><span className="rounded-full border border-white/25 bg-ink/25 px-4 py-2 backdrop-blur"><Clock3 size={14} className="mr-2 inline text-primary" />{item.duration}</span></div>
        </InteriorHero>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16">
            <Link href="/destinations" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"><ArrowLeft size={16} />All destinations</Link>
            <Gallery images={[item.image, ...item.gallery]} title={item.name} />
            <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_22rem]">
              <ScrollReveal>
                <p className="eyebrow text-primary">A sense of place</p>
                <h2 className="mt-5 max-w-3xl font-display text-display-md font-medium">The essential <span className="italic text-primary">{item.name}</span></h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{item.longDescription}</p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-3xl border border-border p-6"><p className="eyebrow text-muted-foreground">Best time to visit</p><p className="mt-3 font-display text-2xl">{item.season}</p></div>
                  <div className="rounded-3xl border border-border p-6"><p className="eyebrow text-muted-foreground">Ideal stay</p><p className="mt-3 font-display text-2xl">{item.duration}</p></div>
                </div>
                <div className="mt-12"><h3 className="font-display text-3xl">Recommended experiences</h3><ul className="mt-6 grid gap-3 sm:grid-cols-2">{item.highlights.map((highlight) => <li key={highlight} className="flex items-center gap-3 border-b border-border py-3 text-sm"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary"><Check size={14} /></span>{highlight}</li>)}</ul></div>
              </ScrollReveal>
              <aside className="lg:sticky lg:top-28 lg:self-start"><div className="rounded-[2rem] bg-ink p-7 text-ink-foreground shadow-xl"><p className="eyebrow text-primary">Tailor-made journey</p><p className="mt-5 font-display text-3xl">From ${item.price.toLocaleString()}</p><p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">Indicative per-person price based on a private {item.duration.toLowerCase()} itinerary. Flights are not included.</p><Link href={`/concierge#planner`} className="mt-7 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground">Design this journey<ArrowUpRight size={16} /></Link></div></aside>
            </div>
          </div>
        </section>

        <section className="bg-muted py-20 md:py-28"><div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16"><ScrollReveal className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-primary">A suggested rhythm</p><h2 className="mt-5 font-display text-display-md">Four moments in <span className="italic text-primary">{item.name}</span></h2><p className="mt-5 max-w-md leading-relaxed text-muted-foreground">A starting point, never a fixed package. Every detail is adjusted around your pace and interests.</p></div><ol className="space-y-4">{item.itinerary.map((day, index) => <li key={day} className="flex items-center gap-5 rounded-2xl bg-card p-5"><span className="font-display text-3xl text-primary">0{index + 1}</span><div><p className="eyebrow text-muted-foreground">Chapter {index + 1}</p><h3 className="mt-1 font-display text-2xl">{day}</h3></div></li>)}</ol></ScrollReveal></div></section>

        <section className="py-20 md:py-28"><div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16"><ScrollReveal className="mb-10 flex items-end justify-between gap-6"><div><p className="eyebrow text-primary">Orientation</p><h2 className="mt-4 font-display text-display-md">Where you’ll be</h2></div><p className="hidden max-w-sm text-sm text-muted-foreground md:block">Your final itinerary includes precise transfers and meeting points. This map is an illustrative overview.</p></ScrollReveal><div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden rounded-[2rem] bg-[#e8e3d7] [background-image:radial-gradient(#9d978a_1px,transparent_1px)] [background-size:18px_18px]"><div className="absolute h-64 w-64 rounded-full border border-primary/30" /><div className="absolute h-40 w-40 rounded-full border border-primary/50" /><div className="relative flex h-20 w-20 items-center justify-center rounded-full border-8 border-background bg-primary shadow-xl"><MapPin /></div><div className="absolute bottom-7 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{item.name}, {item.country}</div></div></div></section>

        {(nearbyExperiences.length > 0 || destinationStays.length > 0) && <section className="bg-card py-20"><div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16"><p className="eyebrow text-primary">Complete the journey</p><h2 className="mt-4 font-display text-display-md">Selected for {item.name}</h2><div className="mt-10 grid gap-6 md:grid-cols-2">{destinationStays.map((stay) => <Link key={stay.slug} href={`/stays/${stay.slug}`} className="group relative aspect-[16/10] overflow-hidden rounded-3xl"><AppImage src={stay.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="card-scrim absolute inset-0" /><div className="absolute bottom-0 p-6 text-white"><p className="eyebrow text-primary">Stay</p><h3 className="mt-2 font-display text-3xl">{stay.name}</h3></div></Link>)}{nearbyExperiences.slice(0, Math.max(0, 2 - destinationStays.length)).map((experience) => <Link key={experience.slug} href={`/experiences/${experience.slug}`} className="group relative aspect-[16/10] overflow-hidden rounded-3xl"><AppImage src={experience.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="card-scrim absolute inset-0" /><div className="absolute bottom-0 p-6 text-white"><p className="eyebrow text-primary">Experience</p><h3 className="mt-2 font-display text-3xl">{experience.title}</h3></div></Link>)}</div></div></section>}
        <EditorialCta title={`Begin your ${item.name} story`} button="Create My Itinerary" />
      </main>
      <Footer />
    </div>
  );
}
