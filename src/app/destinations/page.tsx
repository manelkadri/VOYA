import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteriorHero from '@/components/InteriorHero';
import EditorialCta from '@/components/EditorialCta';
import DestinationExplorer from './DestinationExplorer';

export const metadata: Metadata = { title: 'Extraordinary Destinations | VOYA', description: 'Explore VOYA’s curated collection of remarkable destinations.' };

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <InteriorHero eyebrow="The world, thoughtfully curated" title="Discover Extraordinary" italic="Destinations" subtitle="From quiet islands to storied cities, find the place that meets the way you want to travel." image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" />
        <DestinationExplorer />
        <EditorialCta title="A destination is only the beginning" text="Our travel designers connect the places you love with stays, experiences and details that make the journey entirely yours." />
      </main>
      <Footer />
    </div>
  );
}

