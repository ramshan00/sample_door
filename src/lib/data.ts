import profiles from '@/data/profiles.json';
import listings from '@/data/listings.json';
import { Profile, Listing } from './types';
import placeholderData from '@/lib/placeholder-images.json';
import { ImagePlaceholder } from './placeholder-images';

const placeholderImages = placeholderData.placeholderImages;

// Simulate an API call with a delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function getImageUrl(id: string): string {
    const image = placeholderImages.find(p => p.id === id);
    return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/200/200';
}

function getImagePlaceholder(id: string): ImagePlaceholder | undefined {
    return placeholderImages.find(p => p.id === id);
}

export async function getProfiles(): Promise<Profile[]> {
  await sleep(500); // Simulate network delay
  return profiles as Profile[];
}

export async function getProfileById(id: string): Promise<Profile | undefined> {
  await sleep(300);
  return (profiles as Profile[]).find(p => p.id === id);
}

export async function getListings(): Promise<Listing[]> {
    await sleep(500);
    return listings as Listing[];
}

export async function getListingById(id: string): Promise<Listing | undefined> {
    await sleep(300);
    return (listings as Listing[]).find(l => l.listing_id === id);
}

export { getImageUrl, getImagePlaceholder };


// Client-side data fetching functions
export const dataClient = {
    getProfiles: async (): Promise<Profile[]> => {
        return profiles as Profile[];
    },
    getProfileById: async (id: string): Promise<Profile | undefined> => {
        const profiles = await dataClient.getProfiles();
        return profiles.find(p => p.id === id);
    },
    getListings: async (): Promise<Listing[]> => {
        return listings as Listing[];
    },
    getListingById: async (id: string): Promise<Listing | undefined> => {
        const listings = await dataClient.getListings();
        return listings.find(l => l.listing_id === id);
    },
};
