import React from 'react';
import AppImage from '@/components/ui/AppImage';
import ScrollReveal from '@/components/ScrollReveal';
import NewsletterForm from './NewsletterForm';

export default function NewsletterSection() {
  return (
    <section className="relative bg-background pb-24 md:pb-32" aria-labelledby="newsletter-heading">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink">
            <AppImage
              src="https://images.unsplash.com/photo-1458320855592-38319b0c0d6d"
              alt="Alpine mountain ridge lit by soft morning light above a sea of clouds"
              fill
              sizes="100vw"
              className="object-cover opacity-50" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />

            <div className="relative grid grid-cols-1 gap-12 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-20">
              <div className="text-ink-foreground">
                <p className="eyebrow mb-5 flex items-center gap-3 text-primary">
                  <span className="h-px w-10 bg-primary" />
                  The Sunday Dispatch
                </p>
                <h2 id="newsletter-heading" className="font-display text-display-md font-medium">
                  One considered email a week, <span className="italic text-primary">no noise</span>
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-ink-foreground/75">
                  New hideaways, seasonal windows and the occasional unlisted offer, written by our
                  editors. Read by 41,000 travelers.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>);

}