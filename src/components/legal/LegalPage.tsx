'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import type { LegalLink, LegalPageContent } from '@/data/legalPages';

function SmartLink({ link, className }: { link: LegalLink; className: string }) {
  if (link.href.startsWith('mailto:')) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export default function LegalPage({ content }: { content: LegalPageContent }) {
  const [activeId, setActiveId] = useState(content.sections[0]?.id ?? '');
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const sections = content.sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    let frame = 0;
    const updateActiveSection = () => {
      const passed = sections.filter((section) => section.getBoundingClientRect().top <= 144);
      setActiveId((passed.at(-1) ?? sections[0])?.id ?? '');
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        updateActiveSection();
        frame = 0;
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [content.sections]);

  const toc = (
    <ol className="space-y-1.5">
      {content.sections.map((section, index) => {
        const active = activeId === section.id;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active ? 'location' : undefined}
              onClick={() => setTocOpen(false)}
              className={`group flex items-start gap-3 border-l py-2 pl-4 text-sm leading-snug transition-all duration-200 ${
                active
                  ? 'border-primary font-semibold text-foreground'
                  : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
              }`}
            >
              <span className="mt-px shrink-0 text-[0.65rem] font-semibold tabular text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{section.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#legal-content"
        className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      <Header />

      <main id="legal-content">
        <section
          aria-labelledby="legal-page-title"
          className="relative overflow-hidden bg-ink px-4 pb-20 pt-36 text-ink-foreground sm:px-6 md:pb-24 md:pt-44"
        >
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-36 h-[28rem] w-[28rem] rounded-full border border-primary/15"
          />
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-24 h-[20rem] w-[20rem] rounded-full border border-primary/10"
          />

          <div className="relative mx-auto max-w-7xl">
            <nav
              aria-label="Breadcrumb"
              className="legal-hero-reveal text-xs font-medium text-ink-foreground/60"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="link-underline pb-0.5 hover:text-ink-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-primary">
                  /
                </li>
                <li aria-current="page" className="text-ink-foreground/85">
                  {content.title}
                </li>
              </ol>
            </nav>

            <div className="mt-12 max-w-4xl md:mt-16">
              <p className="eyebrow legal-hero-reveal legal-delay-1 text-primary">
                {content.eyebrow}
              </p>
              <h1
                id="legal-page-title"
                className="legal-hero-reveal legal-delay-2 mt-5 font-display text-[clamp(3rem,8vw,6.75rem)] font-medium leading-[0.92] tracking-[-0.025em]"
              >
                {content.title}
              </h1>
              <p className="legal-hero-reveal legal-delay-3 mt-7 max-w-2xl font-display text-xl italic leading-relaxed text-ink-foreground/75 sm:text-2xl">
                “{content.description}”
              </p>
            </div>

            <div className="legal-hero-reveal legal-delay-4 mt-12 flex items-center gap-5">
              <span aria-hidden="true" className="h-px w-16 bg-primary sm:w-24" />
              <p className="text-xs uppercase tracking-[0.16em] text-ink-foreground/55">
                Last updated{' '}
                <time dateTime="2026-10-26" className="text-ink-foreground/80">
                  {content.lastUpdated}
                </time>
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mb-12 lg:hidden">
            <button
              type="button"
              aria-expanded={tocOpen}
              aria-controls="mobile-legal-toc"
              onClick={() => setTocOpen((open) => !open)}
              className="flex w-full items-center justify-between border-y border-border py-5 text-left"
            >
              <span>
                <span className="eyebrow block text-primary">On this page</span>
                <span className="mt-1 block font-display text-xl">{content.title}</span>
              </span>
              <ChevronDown
                aria-hidden="true"
                size={20}
                className={`text-primary transition-transform duration-300 ${tocOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              id="mobile-legal-toc"
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                tocOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <nav aria-label="Table of contents" className="py-5">
                  {toc}
                </nav>
              </div>
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-[17rem_minmax(0,1fr)] xl:gap-24">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="eyebrow mb-5 text-primary">On this page</p>
                <nav aria-label="Table of contents">{toc}</nav>
              </div>
            </aside>

            <article className="min-w-0 max-w-3xl">
              <div className="border-b border-border pb-10">
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  This page is written for clarity and reflects the features currently present in
                  the VOYA website. Highlighted notes identify details that still need business or
                  legal confirmation.
                </p>
              </div>

              {content.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  tabIndex={-1}
                  aria-labelledby={`${section.id}-heading`}
                  className="scroll-mt-28 border-b border-border py-12 outline-none first:pt-14 md:py-16"
                >
                  <ScrollReveal y={22}>
                    <div className="flex items-baseline gap-4">
                      <span className="shrink-0 text-xs font-semibold tabular tracking-widest text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2
                        id={`${section.id}-heading`}
                        className="font-display text-3xl font-medium leading-tight sm:text-4xl"
                      >
                        {section.title}
                      </h2>
                    </div>

                    <div className="mt-7 space-y-5 text-[0.98rem] leading-8 text-muted-foreground sm:text-base">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}

                      {section.items && (
                        <ul className="space-y-3 pt-1">
                          {section.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-[0.78rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.links && (
                        <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                          {section.links.map((link) => (
                            <SmartLink
                              key={`${link.href}-${link.label}`}
                              link={link}
                              className="link-underline inline-flex items-center gap-1.5 pb-1 text-sm font-semibold text-foreground"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {section.note && (
                      <aside className="mt-8 border-l-2 border-primary bg-primary/[0.08] px-5 py-5 sm:px-6">
                        <div className="flex gap-3">
                          <Info
                            aria-hidden="true"
                            size={18}
                            className="mt-1 shrink-0 text-primary"
                          />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                              {section.note.label}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                              {section.note.text}
                            </p>
                          </div>
                        </div>
                      </aside>
                    )}
                  </ScrollReveal>
                </section>
              ))}

              {content.cta && (
                <ScrollReveal className="py-16 md:py-20" y={24}>
                  <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-ink-foreground sm:px-10 sm:py-12">
                    <div
                      aria-hidden="true"
                      className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-primary/20"
                    />
                    <div className="relative max-w-xl">
                      <p className="eyebrow text-primary">{content.cta.eyebrow}</p>
                      <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
                        {content.cta.title}
                      </h2>
                      <p className="mt-5 leading-7 text-ink-foreground/70">{content.cta.text}</p>
                      <Link
                        href={content.cta.href}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lg"
                      >
                        {content.cta.label}
                        <ArrowUpRight aria-hidden="true" size={16} />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              <nav aria-label="Related legal pages" className="pt-14 md:pt-16">
                <p className="eyebrow text-primary">Related information</p>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
                  {content.relatedLinks.map((link) => (
                    <li key={link.href} className="bg-background">
                      <SmartLink
                        link={link}
                        className="group flex h-full items-center justify-between gap-4 px-5 py-5 text-sm font-semibold transition-colors hover:bg-muted"
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
