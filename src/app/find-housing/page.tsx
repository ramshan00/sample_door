
'use client';

import { useState, useTransition, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { findSuitableHousing, FindSuitableHousingOutput } from '@/ai/flows/find-suitable-housing';
import { dataClient } from '@/lib/data';
import { Profile, Listing } from '@/lib/types';
import { Sparkles, Home } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import HousingCard from '@/components/HousingCard';
import ProfileCard from '@/components/ProfileCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function FindHousingPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedProfile1Id, setSelectedProfile1Id] = useState<string | null>(null);
  const [selectedProfile2Id, setSelectedProfile2Id] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<FindSuitableHousingOutput | null>(null);
  const [recommendedListings, setRecommendedListings] = useState<Listing[]>([]);
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial data on the client
    const loadData = async () => {
        const [profilesData, listingsData] = await Promise.all([dataClient.getProfiles(), dataClient.getListings()]);
        setProfiles(profilesData);
        setListings(listingsData);
        if (profilesData.length >= 2) {
            setSelectedProfile1Id(profilesData[0].id);
            setSelectedProfile2Id(profilesData[1].id);
        }
    };
    loadData();
  }, []);
  
  const handleFindHousing = () => {
    if (!selectedProfile1Id || !selectedProfile2Id) {
      setError('Please select two different profiles.');
      return;
    }
    if (selectedProfile1Id === selectedProfile2Id) {
        setError('Please select two different profiles.');
        return;
    }

    setError(null);
    setRecommendations(null);
    setRecommendedListings([]);

    startTransition(async () => {
      try {
        const profile1 = await dataClient.getProfileById(selectedProfile1Id);
        const profile2 = await dataClient.getProfileById(selectedProfile2Id);

        if (!profile1 || !profile2) {
            setError('Could not load selected profiles.');
            return;
        }

        const result = await findSuitableHousing({
          profile1: JSON.stringify(profile1),
          profile2: JSON.stringify(profile2),
        });
        setRecommendations(result);

        if (result.recommended_listings && result.recommended_listings.length > 0) {
            const listings = await Promise.all(
                result.recommended_listings.map(id => dataClient.getListingById(id))
            );
            setRecommendedListings(listings.filter((l): l is Listing => l !== undefined));
        }

      } catch (e) {
        console.error(e);
        setError('Failed to find housing recommendations. Please try again.');
      }
    });
  };

  const selectedProfile1 = profiles.find(p => p.id === selectedProfile1Id);
  const selectedProfile2 = profiles.find(p => p.id === selectedProfile2Id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Room Hunter Agent
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Select two profiles and our AI will find the perfect home for them.
        </p>
      </div>

      <Card className="glassmorphic max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Select Roommates</CardTitle>
          <CardDescription>Choose two profiles to match with housing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="profile1">Roommate 1</Label>
                    <Select onValueChange={setSelectedProfile1Id} value={selectedProfile1Id || ''}>
                        <SelectTrigger id="profile1">
                            <SelectValue placeholder="Select a profile" />
                        </SelectTrigger>
                        <SelectContent>
                            {profiles.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="profile2">Roommate 2</Label>
                    <Select onValueChange={setSelectedProfile2Id} value={selectedProfile2Id || ''}>
                        <SelectTrigger id="profile2">
                            <SelectValue placeholder="Select a profile" />
                        </SelectTrigger>
                        <SelectContent>
                            {profiles.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                 </div>
            </div>
          <Button onClick={handleFindHousing} disabled={isLoading || !selectedProfile1Id || !selectedProfile2Id}>
            {isLoading ? 'Hunting for Rooms...' : 'Find Housing'}
            {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
          </Button>
           {error && <p className="text-destructive pt-4">{error}</p>}
        </CardContent>
      </Card>
      
      {(isLoading || recommendations) && (
        <div className="mt-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {isLoading && !selectedProfile1 ? <Skeleton className="h-[28rem] w-full"/> : selectedProfile1 && <ProfileCard profile={selectedProfile1} />}
                {isLoading && !selectedProfile2 ? <Skeleton className="h-[28rem] w-full"/> : selectedProfile2 && <ProfileCard profile={selectedProfile2} />}
            </div>

            <Card className="glassmorphic">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl text-primary"><Home /> AI Housing Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Skeleton className="h-96 w-full" />
                                <Skeleton className="h-96 w-full" />
                                <Skeleton className="h-96 w-full" />
                            </div>
                        </div>
                    )}
                    {recommendations && (
                        <div>
                             <p className="mb-4 text-muted-foreground">{recommendations.reasoning}</p>
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recommendedListings.map(listing => (
                                    <HousingCard key={listing.listing_id} listing={listing} />
                                ))}
                             </div>
                             {recommendedListings.length === 0 && <p>No suitable housing found for this pair.</p>}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      )}

    </div>
  );
}
