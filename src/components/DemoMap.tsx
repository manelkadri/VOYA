'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

type Point = { slug: string; name: string; country?: string; coordinates: { x: number; y: number } };

export default function DemoMap({ points, basePath = '/destinations' }: { points: Point[]; basePath?: string }) {
  return (
    <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-border bg-[#e8e3d7]" role="region" aria-label="Destination map">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(#8e897e_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(247,244,238,.55)_80%)]" />
      <p className="absolute left-6 top-6 rounded-full bg-background/90 px-4 py-2 text-xs font-semibold uppercase tracking-[.15em] text-muted-foreground backdrop-blur">Curated world map · illustrative</p>
      {points.map((point) => (
        <Link key={point.slug} href={`${basePath}/${point.slug}`} style={{ left: `${point.coordinates.x}%`, top: `${point.coordinates.y}%` }} className="group absolute -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110"><MapPin size={16} /></span>
          <span className="absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-ink-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100">{point.name}</span>
        </Link>
      ))}
    </div>
  );
}

