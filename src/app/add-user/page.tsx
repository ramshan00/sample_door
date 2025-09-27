import OnboardingForm from '@/components/auth/OnboardingForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Profile - DeraNext',
};

export default function AddUserPage() {
  return (
    <div className="container mx-auto px-4 py-12">
        <OnboardingForm />
    </div>
  );
}
