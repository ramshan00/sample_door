import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Profile } from '@/lib/types';
import { getImageUrl } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Coins, MapPin, University } from 'lucide-react';

type ProfileCardProps = {
  profile: Profile;
};

export default function ProfileCard({ profile }: ProfileCardProps) {
  const avatarUrl = getImageUrl(profile.avatar);

  return (
    <Card className="glassmorphic group flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-lg">
      <CardHeader className="flex-row items-center gap-4 p-4">
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={profile.name || 'Profile picture'}
            fill
            className="rounded-full border-2 border-secondary object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">{profile.age} years old</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 p-4 pt-0">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <University className="h-4 w-4 text-primary" />
          <span>{profile.university}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{profile.city}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Coins className="h-4 w-4 text-primary" />
          <span>Budget: {profile.budget_PKR.toLocaleString()} PKR</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <BedDouble className="h-4 w-4 text-primary" />
          <span>Prefers a {profile.cleanliness} environment</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline">{profile.sleep_schedule}</Badge>
            <Badge variant="outline">{profile.food_pref}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full glow-primary">
          <Link href={`/profiles/${profile.id}`}>View Full Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
