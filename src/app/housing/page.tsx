import HousingCard from '@/components/HousingCard';
import { getListings } from '@/lib/data';
import type { Listing } from '@/lib/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Housing - DeraNext',
};

export default async function HousingPage() {
    const listings = await getListings();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Available Housing
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse rooms, apartments, and hostels. Use our AI tools to find the best fit for you.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((listing: Listing) => (
          <HousingCard key={listing.listing_id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
