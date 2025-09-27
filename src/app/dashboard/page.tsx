import ProfileCard from '@/components/ProfileCard';
import { getProfiles } from '@/lib/data';
import { Profile } from '@/lib/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - DeraNext',
};

export default async function DashboardPage() {
    const profiles = await getProfiles();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Find Your Match
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse profiles of students looking for roommates. Our AI has curated this list for you.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profiles.map((profile: Profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
