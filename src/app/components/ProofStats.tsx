import React from 'react';
import { proofStats } from '@/data/homepageData';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from './CountUp';

export default function ProofStats() {
  return (
    <section className="border-y border-border bg-muted py-20" aria-label="VOYA in numbers">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 2xl:px-16">
        <ScrollReveal stagger className="grid grid-cols-2 gap-x-6 gap-y-12 xl:grid-cols-4">
          {proofStats?.map((s, i) => (
            <div
              key={s?.id}
              className={`${i % 2 === 1 ? 'xl:border-l' : ''} ${i > 0 ? 'xl:border-l' : ''} border-border xl:pl-10`}
            >
              <p className="font-display text-display-md font-medium text-foreground">
                <CountUp value={s?.value} prefix={s?.prefix} suffix={s?.suffix} decimals={s?.decimals} />
              </p>
              <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">{s?.label}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}