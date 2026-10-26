import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { privacyPolicy } from '@/data/legalPages';

export const metadata: Metadata = {
  title: 'Privacy Policy | VOYA',
  description:
    'Learn how the VOYA website handles journey enquiries, locally saved travel briefs, analytics, and privacy requests.',
};

export default function PrivacyPolicyPage() {
  return <LegalPage content={privacyPolicy} />;
}
