'use client';

import React, { useState } from 'react';
import AppImage from './ui/AppImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const all = images.filter(Boolean);
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-muted sm:rounded-[2rem] md:aspect-[16/7]">
        <AppImage
          key={all[active]}
          src={all[active]}
          alt={`${title} gallery image ${active + 1}`}
          fill
          sizes="100vw"
          className="object-cover animate-fade-up"
        />
        <div className="absolute bottom-3 right-3 flex gap-2 sm:bottom-5 sm:right-5">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => setActive((active - 1 + all.length) % all.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur transition hover:bg-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setActive((active + 1) % all.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur transition hover:bg-primary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {all.map((image, index) => (
          <button
            type="button"
            key={image}
            onClick={() => setActive(index)}
            aria-label={`View image ${index + 1}`}
            className={`relative aspect-[16/8] overflow-hidden rounded-xl border-2 transition ${active === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
          >
            <AppImage src={image} alt="" fill sizes="33vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
