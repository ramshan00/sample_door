'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

type AuthFormProps = {
  type: 'login' | 'signup';
};

export default function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === 'login';
  const title = isLogin ? 'Welcome Back' : 'Create an Account';
  const description = isLogin
    ? 'Sign in to find your perfect dera.'
    : 'Join DeraNext and start your search today.';
  const buttonText = isLogin ? 'Login' : 'Sign Up';
  const linkText = isLogin
    ? "Don't have an account?"
    : 'Already have an account?';
  const linkHref = isLogin ? '/signup' : '/login';

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Card className="w-full max-w-sm glassmorphic">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Ahmed Khan" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ahmed@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full glow-primary">
              {buttonText}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {linkText}{' '}
            <Link href={linkHref} className="underline hover:text-primary">
              {isLogin ? 'Sign up' : 'Login'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
