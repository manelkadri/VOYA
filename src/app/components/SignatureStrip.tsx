import React from 'react';
import { ShieldCheck, Headset, Gem, Leaf } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/ui/AppIcon';


const promises = [
  {
    id: 'promise-concierge',
    icon: Headset,
    title: 'One dedicated concierge',
    text: 'The same person from first call to final farewell.',
  },
  {
    id: 'promise-vetted',
    icon: ShieldCheck,
    title: 'Every property inspected',
    text: 'Our team stays in each hotel before it is recommended.',
  },
  {
    id: 'promise-access',
    icon: Gem,
    title: 'Access money can’t book',
    text: 'After-hours sites, private guides, tables held for us.',
  },
  {
    id: 'promise-responsible',
    icon: Leaf,
    title: 'Responsible by design',
    text: 'Locally owned partners and carbon-conscious routing.',
  },
];

export default function SignatureStrip() {
  return (
    <section className="bg-background pt-40 md:pt-36" aria-label="The VOYA promise">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16">
        <ScrollReveal
          stagger
          className="grid grid-cols-1 gap-8 border-b border-border pb-14 sm:grid-cols-2 xl:grid-cols-4"
        >
          {promises?.map((p) => {
            const Icon = p?.icon;
            return (
              <div key={p?.id} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/50 text-primary">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{p?.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p?.text}</p>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}