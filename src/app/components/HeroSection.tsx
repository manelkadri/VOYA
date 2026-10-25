import React from 'react';
import AppImage from '@/components/ui/AppImage';
import HeroMotion from './HeroMotion';
import HeroSearchBar from './HeroSearchBar';
import StoryButton from './StoryButton';

export default function HeroSection() {
  return (
    <section className="relative bg-ink" aria-labelledby="hero-heading">
      <div className="relative min-h-[100svh] w-full overflow-hidden">
        <div data-hero-image className="absolute inset-0 scale-110">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_180d38964-1772538356369.png"
            alt="Luxury cliffside resort with infinity pool overlooking the Aegean Sea at sunset in Santorini"
            fill
            priority
            sizes="100vw"
            className="object-cover" />
          
        </div>
        <div className="hero-scrim absolute inset-0" />

        <HeroMotion>
          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-screen-2xl flex-col justify-center px-6 pb-48 pt-32 lg:px-10 2xl:px-16">
            <div className="max-w-5xl">
              <p data-hero-line className="eyebrow mb-7 flex items-center gap-3 text-primary">
                <span className="h-px w-10 bg-primary" />
                Peak season now · Santorini, Greece
              </p>
              <h1
                id="hero-heading"
                className="font-display text-hero-xl font-medium text-ink-foreground">
                
                <span className="block overflow-hidden">
                  <span data-hero-line className="block">Explore the</span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block italic text-primary">extraordinary</span>
                </span>
              </h1>
              <p
                data-hero-line
                className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/80 md:text-lg">
                
                Curated journeys to the world’s most remarkable places, for a more meaningful kind
                of luxury.
              </p>
            </div>

            <div data-hero-line className="absolute bottom-52 right-6 hidden md:block lg:right-10 2xl:right-16">
              <StoryButton />
            </div>
          </div>
        </HeroMotion>

      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-4 md:px-6 lg:px-10 2xl:px-16">
        <div className="mx-auto max-w-screen-xl">
          <HeroSearchBar />
        </div>
      </div>
    </section>);

}
