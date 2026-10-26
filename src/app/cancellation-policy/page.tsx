import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { cancellationPolicy } from '@/data/legalPages';

export const metadata: Metadata = {
  title: 'Cancellation Policy | VOYA',
  description:
    'Understand how cancellation, amendment, supplier conditions, and refund eligibility may apply to a VOYA journey.',
};

export default function CancellationPolicyPage() {
  return <LegalPage content={cancellationPolicy} />;
}
