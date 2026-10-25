'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export default function FavoriteButton({ label }: { label: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      aria-label={`${active ? 'Remove' : 'Add'} ${label} ${active ? 'from' : 'to'} favorites`}
      aria-pressed={active}
      onClick={(event) => { event.preventDefault(); event.stopPropagation(); setActive((value) => !value); }}
      className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 active:scale-90 ${active ? 'border-primary bg-primary text-primary-foreground' : 'border-white/35 bg-ink/30 text-white hover:border-primary hover:text-primary'}`}
    >
      <Heart size={18} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}

