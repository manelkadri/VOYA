import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JournalExplorer from './JournalExplorer';

export const metadata: Metadata = { title: 'The VOYA Journal', description: 'Stories, places and perspectives worth discovering.' };
export default function JournalPage() { return <div className="min-h-screen bg-background text-foreground"><Header /><main><JournalExplorer /></main><Footer /></div>; }

