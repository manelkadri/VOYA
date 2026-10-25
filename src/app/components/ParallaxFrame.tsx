'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

export default function ParallaxFrame({ children, className = '', speed = 30 }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { y: -speed },
        {
          y: speed,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, frame);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={frameRef} className={`relative ${className}`}>
      <div ref={innerRef} className="absolute inset-x-0 -inset-y-[10%] h-[120%]">
        {children}
      </div>
    </div>
  );
}