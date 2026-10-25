import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteriorHero from '@/components/InteriorHero';
import EditorialCta from '@/components/EditorialCta';
import ExperienceExplorer from './ExperienceExplorer';

export const metadata: Metadata = { title: 'Extraordinary Experiences | VOYA', description: 'Moments worth traveling for, privately curated by VOYA.' };

export default function ExperiencesPage() {
  return <div className="min-h-screen bg-background text-foreground"><Header /><main><InteriorHero eyebrow="Curated around a feeling" title="Extraordinary" italic="Experiences" subtitle="Moments worth traveling for." image="https://images.unsplash.com/photo-1540946485063-a40da27545f8" /><ExperienceExplorer /><EditorialCta title="What would make this journey unforgettable?" text="Begin with the moment you want to experience. Our designers will build the destination and every detail around it." /></main><Footer /></div>;
}

