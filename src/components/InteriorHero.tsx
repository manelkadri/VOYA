import React from 'react';
import AppImage from '@/components/ui/AppImage';
import HeroMotion from '@/app/components/HeroMotion';
import { ChevronDown } from 'lucide-react';

type Props = {
  eyebrow: string;
  title: string;
  italic?: string;
  subtitle: string;
  image: string;
  children?: React.ReactNode;
  compact?: boolean;
};

export default function InteriorHero({
  eyebrow,
  title,
  italic,
  subtitle,
  image,
  children,
  compact = false,
}: Props) {
  return (
    <section
      className="relative overflow-hidden bg-ink text-ink-foreground"
      aria-labelledby="page-hero-heading"
    >
      <div className={`relative ${compact ? 'min-h-[74svh]' : 'min-h-[88svh]'}`}>
        <div data-hero-image className="absolute inset-0 scale-110">
          <AppImage src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
        <HeroMotion>
          <div
            className={`relative z-10 mx-auto flex max-w-screen-2xl flex-col justify-end px-4 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-10 2xl:px-16 ${compact ? 'min-h-[74svh]' : 'min-h-[88svh]'}`}
          >
            <div className="max-w-5xl">
              <p data-hero-line className="eyebrow mb-6 flex items-center gap-3 text-primary">
                <span className="h-px w-10 bg-primary" />
                {eyebrow}
              </p>
              <h1
                id="page-hero-heading"
                data-hero-line
                className="max-w-5xl break-words font-display text-[clamp(2.7rem,8vw,7.5rem)] font-medium leading-[.92] tracking-[-.02em] sm:text-[clamp(3.2rem,8vw,7.5rem)]"
              >
                {title} {italic && <span className="italic text-primary">{italic}</span>}
              </h1>
              <p
                data-hero-line
                className="mt-7 max-w-2xl text-base leading-relaxed text-ink-foreground/80 md:text-xl"
              >
                {subtitle}
              </p>
              {children && (
                <div data-hero-line className="mt-9">
                  {children}
                </div>
              )}
            </div>
            <a
              href="#discover"
              data-hero-line
              className="absolute bottom-8 right-6 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-ink-foreground/70 md:flex lg:right-10 2xl:right-16"
            >
              Discover{' '}
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-foreground/30">
                <ChevronDown size={16} />
              </span>
            </a>
          </div>
        </HeroMotion>
      </div>
    </section>
  );
}
