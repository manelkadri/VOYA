import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteriorHero from '@/components/InteriorHero';
import EditorialCta from '@/components/EditorialCta';
import StayExplorer from './StayExplorer';

export const metadata: Metadata = { title: 'Exceptional Places to Stay | VOYA', description: 'Discover characterful luxury stays selected by VOYA.' };
export default function StaysPage() { return <div className="min-h-screen bg-background text-foreground"><Header /><main><InteriorHero eyebrow="The art of staying well" title="Exceptional Places" italic="to Stay" subtitle="Discover spaces as extraordinary as the destinations themselves." image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" /><StayExplorer /><EditorialCta title="Stay somewhere worth remembering" text="We match each property to your pace, preferences and the story of your wider journey." /></main><Footer /></div>; }

