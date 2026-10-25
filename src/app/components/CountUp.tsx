'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
};

export default function CountUp({ value, prefix = '', suffix = '', decimals = 0, duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(value * eased);
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            setDisplay(0);
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  const rounded = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();
  const formatted = decimals > 0 ? rounded : Number(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}