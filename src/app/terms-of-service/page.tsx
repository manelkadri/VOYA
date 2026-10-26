import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { termsOfService } from '@/data/legalPages';

export const metadata: Metadata = {
  title: 'Terms of Service | VOYA',
  description:
    'Review the terms for using the VOYA travel website and preparing a journey enquiry with the concierge.',
};

export default function TermsOfServicePage() {
  return <LegalPage content={termsOfService} />;
}
