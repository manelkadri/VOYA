import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Route, ConciergeBell, CalendarCheck, Clock } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxFrame from './ParallaxFrame';
import Icon from '@/components/ui/AppIcon';


const benefits = [
{
  id: 'benefit-itinerary',
  icon: Route,
  title: 'Itineraries drawn by hand',
  text: 'No templates. Your concierge builds each day around your pace, tastes and people.'
},
{
  id: 'benefit-concierge',
  icon: ConciergeBell,
  title: 'A concierge who stays on call',
  text: 'One direct line, from your first idea to the moment you land back home.'
},
{
  id: 'benefit-flex',
  icon: CalendarCheck,
  title: 'Flexible until the last minute',
  text: 'Change a dinner, swap a villa or extend a night without a penalty conversation.'
}];


export default function TailorMadeSection() {
  return (
    <section className="bg-background py-24 md:py-32" aria-labelledby="tailor-heading">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10 2xl:px-16">
        <ScrollReveal>
          <p className="eyebrow mb-5 flex items-center gap-3 text-primary">
            <span className="h-px w-10 bg-primary" />
            Tailor-made travel
          </p>
          <h2 id="tailor-heading" className="font-display text-display-lg font-medium text-foreground">
            Your journey, <span className="italic text-primary">composed</span> not assembled
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Tell us the feeling you are after. We handle the villas, the private transfers, the
            reservation that was supposed to be impossible, and the small details you never have to
            think about.
          </p>

          <ul className="mt-10 space-y-7">
            {benefits?.map((b) => {
              const Icon = b?.icon;
              return (
                <li key={b?.id} className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{b?.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b?.text}</p>
                  </div>
                </li>);

            })}
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="/concierge#planner"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-105 hover:shadow-lg active:scale-95">
              
              Talk to a Concierge
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/destinations/santorini" className="link-underline pb-1 text-sm font-semibold text-foreground">
              See a sample itinerary
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="relative">
          <div className="grid grid-cols-[1.15fr_1fr] gap-5">
            <ParallaxFrame speed={-40} className="aspect-[3/4.4] overflow-hidden rounded-3xl">
              <AppImage
                src="https://images.unsplash.com/photo-1657049871092-092b2bfd4094"
                alt="Private villa terrace with a breakfast table overlooking the Mediterranean"
                fill
                sizes="(max-width: 1024px) 55vw, 28vw"
                className="object-cover" />
              
            </ParallaxFrame>
            <ParallaxFrame speed={40} className="mt-16 aspect-[3/4.4] overflow-hidden rounded-3xl">
              <AppImage
                src="https://images.unsplash.com/photo-1582549463886-42a6b2661473"
                alt="Pristine white-sand beach with turquoise water seen from above"
                fill
                sizes="(max-width: 1024px) 45vw, 24vw"
                className="object-cover" />
              
            </ParallaxFrame>
          </div>

          <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-xl md:left-auto md:right-6 md:w-80">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_10a5f2da6-1785077428888.png"
                alt="Portrait of Camille Laurent, senior VOYA concierge, smiling in a tailored blazer"
                fill
                sizes="56px"
                className="object-cover" />
              
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-card-foreground">Camille Laurent</p>
              <p className="text-xs text-muted-foreground">Senior Concierge · Aegean &amp; Med</p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <Clock size={12} />
                Replies in ~40 min
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>);

}
