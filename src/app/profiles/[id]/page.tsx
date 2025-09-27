import { getProfileById, getProfiles, getImageUrl } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  University,
  MapPin,
  Coins,
  BedDouble,
  Clock,
  BookOpen,
  Utensils,
  Phone,
  Sparkles,
  User,
} from 'lucide-react';
import { explainRoommateMatch } from '@/ai/flows/explain-roommate-matches';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export async function generateStaticParams() {
  const profiles = await getProfiles();
  return profiles.map(profile => ({ id: profile.id }));
}

async function MatchExplanation({ profile1, profile2 }) {
    try {
      const explanation = await explainRoommateMatch({
        profile1: JSON.stringify(profile1),
        profile2: JSON.stringify(profile2),
      });
      return <p className="text-sm text-muted-foreground">{explanation.explanation}</p>;
    } catch (error) {
      console.error('Error getting match explanation:', error);
      return <p className="text-sm text-destructive">Could not generate AI explanation at this time.</p>;
    }
}

export default async function ProfileDetailPage({ params }: { params: { id: string } }) {
  const profile = await getProfileById(params.id);
  const allProfiles = await getProfiles();
  // For demo, we assume the "logged in" user is the first profile.
  const currentUser = allProfiles[0]; 

  if (!profile) {
    notFound();
  }

  const avatarUrl = getImageUrl(profile.avatar);

  const profileDetails = [
    { icon: User, label: 'Gender', value: profile.gender },
    { icon: University, label: 'University', value: profile.university },
    { icon: MapPin, label: 'City', value: profile.city },
    { icon: Coins, label: 'Budget', value: `${profile.budget_PKR.toLocaleString()} PKR/month` },
    { icon: BedDouble, label: 'Cleanliness', value: profile.cleanliness },
    { icon: Clock, label: 'Sleep Schedule', value: profile.sleep_schedule },
    { icon: BookOpen, label: 'Study Habits', value: profile.study_habits },
    { icon: Utensils, label: 'Food Preference', value: profile.food_pref },
    { icon: Phone, label: 'Contact', value: profile.contact_number },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="glassmorphic overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-primary/50 to-secondary/50">
           <div className="absolute bottom-0 left-6 translate-y-1/2">
                <Image
                    src={avatarUrl}
                    alt={profile.name}
                    width={128}
                    height={128}
                    className="h-32 w-32 rounded-full border-4 border-background object-cover shadow-lg"
                />
           </div>
        </div>
        <CardHeader className="pt-20">
            <CardTitle className="text-4xl font-bold text-primary">{profile.name}</CardTitle>
            <p className="text-lg text-muted-foreground">{profile.age} years old</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-2xl font-semibold text-foreground">Details</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {profileDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-3 rounded-lg bg-background/30 p-3">
                  <detail.icon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{detail.label}</p>
                    <p className="text-md font-semibold text-foreground">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
             <Card className="bg-background/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                        <Sparkles className="h-6 w-6"/>
                        AI Compatibility
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {profile.id !== currentUser.id ? (
                        <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Why you might be a good match</AccordionTrigger>
                            <AccordionContent>
                                <MatchExplanation profile1={currentUser} profile2={profile} />
                            </AccordionContent>
                        </AccordionItem>
                        </Accordion>
                    ) : (
                        <p className="text-sm text-muted-foreground">This is your own profile.</p>
                    )}
                </CardContent>
             </Card>
             <Button size="lg" className="w-full glow-primary">Contact {profile.name}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
