import { getProfileById, getProfiles, getImageUrl } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  ShieldAlert,
  BarChart,
} from 'lucide-react';
import { explainRoommateMatch } from '@/ai/flows/explain-roommate-matches';
import { scoreMatch } from '@/ai/flows/score-match';
import { detectLifestyleConflicts } from '@/ai/flows/detect-lifestyle-conflicts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';

export async function generateStaticParams() {
  const profiles = await getProfiles();
  return profiles.map(profile => ({ id: profile.id }));
}

async function MatchScorer({ profile1, profile2 }) {
  try {
    const result = await scoreMatch({
      profile1: JSON.stringify(profile1),
      profile2: JSON.stringify(profile2),
    });
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-foreground">Compatibility Score</span>
          <span className="text-sm font-bold text-primary">{result.compatibility_score}%</span>
        </div>
        <Progress value={result.compatibility_score} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">{result.summary}</p>
      </div>
    );
  } catch (error) {
    console.error('Error getting match score:', error);
    return <p className="text-sm text-destructive">Could not generate AI score.</p>;
  }
}

async function RedFlagDetector({ profile1, profile2 }) {
    try {
      const result = await detectLifestyleConflicts({
        profile1: JSON.stringify(profile1),
        profile2: JSON.stringify(profile2),
      });

      if (result.has_conflict) {
        return (
            <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-destructive" />
                    <h4 className="font-semibold text-destructive">Potential Conflict</h4>
                </div>
                <p className="text-sm text-destructive/80 mt-1 ml-7">{result.conflict_description}</p>
            </div>
        )
      }

      return null;

    } catch (error) {
      console.error('Error detecting conflicts:', error);
      return <p className="text-sm text-destructive">Could not run AI conflict detector.</p>;
    }
}


async function MatchExplanation({ profile1, profile2 }) {
    try {
      const result = await explainRoommateMatch({
        profile1: JSON.stringify(profile1),
        profile2: JSON.stringify(profile2),
      });
      return (
        <div className="space-y-4">
             <p className="text-sm text-muted-foreground">{result.explanation}</p>
             <div>
                <h4 className="font-semibold text-foreground mb-2">Compromise Suggestions</h4>
                <p className="text-sm text-muted-foreground">{result.compromises}</p>
             </div>
        </div>
      );
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
                        AI Wingman
                    </CardTitle>
                    <CardDescription>Compatibility analysis with you</CardDescription>
                </CardHeader>
                <CardContent>
                    {profile.id !== currentUser.id ? (
                        <div className="space-y-4">
                            <MatchScorer profile1={currentUser} profile2={profile} />
                            <RedFlagDetector profile1={currentUser} profile2={profile} />
                            <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>View Full AI Analysis</AccordionTrigger>
                                <AccordionContent>
                                    <MatchExplanation profile1={currentUser} profile2={profile} />
                                </AccordionContent>
                            </AccordionItem>
                            </Accordion>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">This is your own profile. The Wingman analysis will appear on other people's profiles.</p>
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
