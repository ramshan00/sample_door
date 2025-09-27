import AuthForm from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up - DeraNext',
};

export default function SignupPage() {
  return <AuthForm type="signup" />;
}
