import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { accessibilityStatement } from '@/data/legalPages';

export const metadata: Metadata = {
  title: 'Accessibility | VOYA',
  description:
    'Explore VOYA’s current accessibility features, known limitations, and ways to request assistance or share feedback.',
};

export default function AccessibilityPage() {
  return <LegalPage content={accessibilityStatement} />;
}
