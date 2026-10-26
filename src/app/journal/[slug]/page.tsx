import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import ScrollReveal from '@/components/ScrollReveal';
import { articles } from '@/data/travelData';
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((x) => x.slug === slug);
  return {
    title: article ? `${article.title} | The VOYA Journal` : 'The VOYA Journal',
    description: article?.excerpt,
  };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((x) => x.slug === slug);
  if (!article) notFound();
  const related = [
    ...articles.filter((x) => x.slug !== slug && x.category === article.category),
    ...articles.filter((x) => x.slug !== slug && x.category !== article.category),
  ].slice(0, 3);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <article>
          <header className="bg-ink px-4 pb-16 pt-32 text-center text-white sm:px-6 sm:pt-36 md:pb-24">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-primary"
            >
              <ArrowLeft size={15} />
              Back to Journal
            </Link>
            <p className="eyebrow mt-12 text-primary">{article.category}</p>
            <h1 className="mx-auto mt-6 max-w-5xl break-words font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[.95]">
              {article.title}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/65">
              {article.excerpt}
            </p>
            <p className="mt-8 text-xs text-white/45">
              By {article.author} · {article.date} · <Clock3 size={13} className="inline" />{' '}
              {article.readTime}
            </p>
          </header>
          <div className="relative mx-auto -mt-px aspect-[4/3] max-w-screen-2xl overflow-hidden sm:aspect-[16/9] md:aspect-[16/8] md:rounded-b-[2rem]">
            <AppImage
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
            <p className="font-display text-3xl leading-relaxed text-foreground md:text-4xl">
              {article.intro}
            </p>
            {article.sections.map((section, index) => (
              <React.Fragment key={section.heading}>
                {index === 1 && (
                  <div className="relative my-14 aspect-[16/10] overflow-hidden rounded-[1.5rem]">
                    <AppImage
                      src={article.secondaryImage}
                      alt=""
                      fill
                      sizes="768px"
                      className="object-cover"
                    />
                  </div>
                )}
                <section className="mt-14">
                  <h2 className="font-display text-3xl sm:text-4xl">{section.heading}</h2>
                  <p className="mt-5 text-lg leading-9 text-muted-foreground">{section.body}</p>
                </section>
              </React.Fragment>
            ))}
            <div className="mt-16 border-y border-border py-8 text-center">
              <p className="font-display text-3xl italic">Travel well. Stay curious.</p>
              <p className="mt-3 text-xs uppercase tracking-[.18em] text-primary">
                The VOYA Journal
              </p>
            </div>
          </div>
        </article>
        <section className="bg-muted py-20">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 2xl:px-16">
            <ScrollReveal className="flex items-end justify-between">
              <div>
                <p className="eyebrow text-primary">Continue reading</p>
                <h2 className="mt-4 font-display text-display-md">Related stories</h2>
              </div>
              <Link
                href="/journal"
                className="hidden items-center gap-2 text-sm font-semibold md:flex"
              >
                All stories <ArrowUpRight size={15} />
              </Link>
            </ScrollReveal>
            <ScrollReveal stagger className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/journal/${item.slug}`} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <AppImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="eyebrow mt-5 text-primary">{item.category}</p>
                  <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
