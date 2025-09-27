import AuthForm from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login - DeraNext',
};

export default function LoginPage() {
  return <AuthForm type="login" />;
}
