'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = root.closest('section');
    const image = section?.querySelector('[data-hero-image]') as HTMLElement | null;

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll('[data-hero-line]');
      gsap.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.14, delay: 0.25 }
      );

      if (image && section) {
        gsap.fromTo(
          image,
          { scale: 1.18 },
          { scale: 1.06, duration: 2.6, ease: 'power2.out' }
        );
        gsap.to(image, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}