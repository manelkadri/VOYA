'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** stagger direct children instead of the wrapper */
  stagger?: boolean;
  delay?: number;
  y?: number;
};

export default function ScrollReveal({ children, className = '', stagger = false, delay = 0, y = 36 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const targets = stagger ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}