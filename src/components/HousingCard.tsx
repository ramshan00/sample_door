'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Listing } from '@/lib/types';
import { getImageUrl } from '@/lib/data';
import Image from 'next/image';
import { MapPin, Coins, Bed, ShieldCheck, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState, useTransition } from 'react';
import { summarizeHousingDetails } from '@/ai/flows/summarize-housing-details';
import { flagUnsafeListings } from '@/ai/flows/flag-unsafe-listings';
import { Skeleton } from './ui/skeleton';

type HousingCardProps = {
  listing: Listing;
};

function AISummary({ listing }: { listing: Listing }) {
  const [summary, setSummary] = useState('');
  const [isLoading, startTransition] = useTransition();

  const getSummary = () => {
    startTransition(async () => {
      const result = await summarizeHousingDetails({
        city: listing.city,
        area: listing.area,
        monthly_rent_PKR: listing.monthly_rent_PKR,
        rooms_available: listing.rooms_available,
        amenities: listing.amenities,
      });
      setSummary(result.summary);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={getSummary}>
          <Sparkles className="mr-2 h-4 w-4" /> AI Summary
        </Button>
      </DialogTrigger>
      <DialogContent className="glassmorphic">
        <DialogHeader>
          <DialogTitle className="text-primary">AI-Generated Summary</DialogTitle>
        </DialogHeader>
        {isLoading ? <Skeleton className="h-24 w-full" /> : <p className="text-muted-foreground">{summary}</p>}
      </DialogContent>
    </Dialog>
  );
}

function SafetyCheck({ listing }: { listing: Listing }) {
    const [safetyInfo, setSafetyInfo] = useState<{ isUnsafe: boolean; reason: string } | null>(null);
    const [isLoading, startTransition] = useTransition();

    const checkSafety = () => {
        if (safetyInfo) return; // Don't re-run
        startTransition(async () => {
            const result = await flagUnsafeListings({
                listingDescription: listing.description,
            });
            setSafetyInfo(result);
        });
    }

    if (isLoading) {
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500"><AlertCircle className="mr-1 h-3 w-3 animate-spin" />Checking...</Badge>
    }
    
    if (safetyInfo?.isUnsafe) {
        return (
             <Dialog>
                <DialogTrigger asChild>
                    <Badge variant="destructive" className="cursor-pointer"><ShieldAlert className="mr-1 h-3 w-3" /> Potential Risk</Badge>
                </DialogTrigger>
                <DialogContent className="glassmorphic">
                    <DialogHeader>
                    <DialogTitle className="text-destructive">AI Safety Warning</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">{safetyInfo.reason}</p>
                </DialogContent>
            </Dialog>
        )
    }

    if (safetyInfo && !safetyInfo.isUnsafe) {
        return <Badge className="border-green-500 bg-transparent text-green-500"><ShieldCheck className="mr-1 h-3 w-3" /> Looks Good</Badge>
    }

    return (
        <button onClick={checkSafety} className="text-xs text-muted-foreground hover:text-primary transition-colors">Run AI Safety Check</button>
    )

}

export default function HousingCard({ listing }: HousingCardProps) {
  const imageUrl = getImageUrl(listing.image_url);

  return (
    <Card className="glassmorphic group flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={listing.area}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
            <SafetyCheck listing={listing} />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="truncate text-xl text-primary">{listing.area}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{listing.city}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center gap-2 text-foreground">
          <Coins className="h-4 w-4 text-secondary" />
          <span className="font-semibold">{listing.monthly_rent_PKR.toLocaleString()} PKR/month</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Bed className="h-4 w-4" />
          <span>{listing.rooms_available} room(s) available</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {listing.amenities.slice(0, 3).map(amenity => (
            <Badge key={amenity} variant="secondary">{amenity}</Badge>
          ))}
          {listing.amenities.length > 3 && <Badge variant="outline">+{listing.amenities.length - 3} more</Badge>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AISummary listing={listing} />
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  );
}
