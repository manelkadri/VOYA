'use client';
import React, { useState } from 'react'; import { Plus } from 'lucide-react';
const faqs = [
  ['How far in advance should I begin planning?', 'For complex journeys, six to nine months gives us the widest choice. We can often shape beautiful trips with less notice, especially when dates are flexible.'],
  ['Is there a minimum trip budget?', 'VOYA focuses on tailored, high-touch travel. Most journeys begin around $5,000 per person, though the right scope depends on destination, duration and season.'],
  ['Can you work with arrangements I have already made?', 'Yes. We can build around confirmed flights, a property you love or a special event, then make the rest of the journey feel seamless.'],
  ['What happens after I submit the planner?', 'The planner prepares a concise brief. Because this demo has no delivery backend, you can email that brief directly to the concierge from the confirmation screen.'],
  ['Will someone assist me while I travel?', 'Your dedicated contact remains available throughout the journey, supported by trusted partners in each destination.'],
];
export default function FaqAccordion() { const [open, setOpen] = useState(0); return <div className="mt-12 divide-y divide-border border-y border-border">{faqs.map(([q, a], index) => <div key={q}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} className="flex w-full items-center justify-between gap-5 py-6 text-left"><span className="font-display text-xl md:text-2xl">{q}</span><Plus size={20} className={`shrink-0 text-primary transition-transform duration-300 ${open === index ? 'rotate-45' : ''}`} /></button><div className={`grid transition-[grid-template-rows] duration-300 ${open === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="max-w-3xl pb-6 leading-7 text-muted-foreground">{a}</p></div></div></div>)}</div>; }

