'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { parseProfileText, ParseProfileTextOutput } from '@/ai/flows/parse-profile-text';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';

const exampleText = `Assalam-o-Alaikum, I'm looking for a room near NUST, Islamabad. My name is Ali and I am 22 years old. Budget is around 20k. I am a tidy person and a night owl, usually study late. Prefer to cook my own meals. Please contact me if you have a lead. Shukriya.`;

export default function ExtractProfilePage() {
  const [rawText, setRawText] = useState(exampleText);
  const [structuredProfile, setStructuredProfile] = useState<ParseProfileTextOutput | null>(null);
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleExtract = () => {
    setError(null);
    setStructuredProfile(null);
    startTransition(async () => {
      try {
        const result = await parseProfileText({ raw_profile_text: rawText });
        setStructuredProfile(result);
      } catch (e) {
        console.error(e);
        setError('Failed to parse profile. Please try again.');
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Profile Reader Agent
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Paste a messy roommate ad (in English or Roman Urdu) and watch our AI convert it into a structured profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle>Unstructured Ad Text</CardTitle>
            <CardDescription>Paste the raw text from an ad here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={12}
              className="bg-background/50"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleExtract} disabled={isLoading}>
              {isLoading ? 'Extracting...' : 'Extract Profile'}
              {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>

        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle>Structured Profile Output</CardTitle>
            <CardDescription>The AI will populate the fields below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && <ProfileSkeleton />}
            {error && <p className="text-destructive">{error}</p>}
            {structuredProfile && <ProfileDetails profile={structuredProfile} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProfileDetails({ profile }: { profile: ParseProfileTextOutput }) {
  const details = [
    { label: 'Name', value: profile.name },
    { label: 'Age', value: profile.age },
    { label: 'Gender', value: profile.gender },
    { label: 'City', value: profile.city },
    { label: 'University', value: profile.university },
    { label: 'Budget (PKR)', value: profile.budget_PKR?.toLocaleString() },
    { label: 'Cleanliness', value: profile.cleanliness },
    { label: 'Sleep Schedule', value: profile.sleep_schedule },
    { label: 'Study Habits', value: profile.study_habits },
    { label: 'Food Preference', value: profile.food_pref },
  ].filter(d => d.value);

  if (details.length === 0) {
      return <p className="text-muted-foreground">No details could be extracted. Try a more descriptive ad text.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {details.map(detail => (
        <div key={detail.label} className="rounded-lg bg-background/30 p-3">
          <p className="text-sm font-medium text-muted-foreground">{detail.label}</p>
          <p className="text-md font-semibold text-foreground">{detail.value}</p>
        </div>
      ))}
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg bg-background/30 p-3 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-32" />
        </div>
      ))}
    </div>
  );
}
