import type { Metadata } from 'next';
import AuthForm from '@/components/portal/AuthForm';

export const metadata: Metadata = { title: 'Sign in | VOYA' };
export default function LoginPage() {
  return <AuthForm mode="login" />;
}
