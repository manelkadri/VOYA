import type { Metadata } from 'next';
import AuthForm from '@/components/portal/AuthForm';

export const metadata: Metadata = { title: 'Create an account | VOYA' };
export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
