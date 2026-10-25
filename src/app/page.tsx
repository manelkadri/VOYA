import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import SignatureStrip from './components/SignatureStrip';
import FeaturedDestinations from './components/FeaturedDestinations';
import CuratedExperiences from './components/CuratedExperiences';
import TailorMadeSection from './components/TailorMadeSection';
import ProofStats from './components/ProofStats';
import TravelJournal from './components/TravelJournal';
import NewsletterSection from './components/NewsletterSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <SignatureStrip />
        <FeaturedDestinations />
        <CuratedExperiences />
        <TailorMadeSection />
        <ProofStats />
        <TravelJournal />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}