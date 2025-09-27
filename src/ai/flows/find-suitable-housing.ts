'use server';

/**
 * @fileOverview The Room Hunter Agent, which finds suitable housing for matched roommates.
 *
 * - findSuitableHousing - Finds housing based on two profiles.
 * - FindSuitableHousingInput - Input type for the findSuitableHousing function.
 * - FindSuitableHousingOutput - Output type for the findSuitableHousing function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import listings from '@/data/listings.json';

const FindSuitableHousingInputSchema = z.object({
  profile1: z.string().describe('The first roommate profile as a JSON string.'),
  profile2: z.string().describe('The second roommate profile as a JSON string.'),
});
export type FindSuitableHousingInput = z.infer<typeof FindSuitableHousingInputSchema>;

const ListingSchema = z.object({
  listing_id: z.string(),
  city: z.string(),
  area: z.string(),
  monthly_rent_PKR: z.number(),
  rooms_available: z.number(),
});

const FindSuitableHousingOutputSchema = z.object({
  shared_city: z.string().describe('The city where both users are looking for housing.'),
  combined_budget: z.number().describe('The combined monthly budget of both users in PKR.'),
  recommended_listings: z.array(z.string()).describe('An array of listing_ids that are a good match for the pair.'),
  reasoning: z.string().describe('A brief explanation of why these listings were recommended.'),
});
export type FindSuitableHousingOutput = z.infer<typeof FindSuitableHousingOutputSchema>;

// This is a simple tool to get available listings.
// In a real app, this would query a database.
const getAvailableListingsTool = ai.defineTool(
    {
      name: 'getAvailableListings',
      description: 'Get a list of available housing listings.',
      inputSchema: z.object({
          city: z.string().optional().describe('The city to filter listings by.'),
          max_rent: z.number().optional().describe('The maximum monthly rent.'),
          min_rooms: z.number().optional().describe('The minimum number of rooms required.'),
      }),
      outputSchema: z.array(ListingSchema),
    },
    async (input) => {
        let filteredListings = listings;

        if (input.city) {
            filteredListings = filteredListings.filter(l => l.city.toLowerCase() === input.city!.toLowerCase());
        }
        if (input.max_rent) {
            filteredListings = filteredListings.filter(l => l.monthly_rent_PKR <= input.max_rent!);
        }
        if (input.min_rooms) {
            filteredListings = filteredListings.filter(l => l.rooms_available >= input.min_rooms!);
        }

        return filteredListings.map(({ listing_id, city, area, monthly_rent_PKR, rooms_available }) => ({
            listing_id, city, area, monthly_rent_PKR, rooms_available
        }));
    }
);


export async function findSuitableHousing(input: FindSuitableHousingInput): Promise<FindSuitableHousingOutput> {
  return findSuitableHousingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findSuitableHousingPrompt',
  input: { schema: FindSuitableHousingInputSchema },
  output: { schema: FindSuitableHousingOutputSchema },
  tools: [getAvailableListingsTool],
  prompt: `You are the Room Hunter Agent. Your job is to find suitable housing for a pair of matched roommates based on their profiles.

Profiles:
Profile 1: {{{profile1}}}
Profile 2: {{{profile2}}}

Follow these steps:
1. Determine the shared city and combined budget. If cities are different, you cannot find a match.
2. Use the 'getAvailableListings' tool to find listings that match their shared city, combined budget, and require at least 2 rooms.
3. From the filtered listings, select the top 3 most suitable options.
4. Populate the 'recommended_listings' array with the listing_ids of your top 3 choices.
5. Provide a brief reasoning for your recommendation.
`,
});

const findSuitableHousingFlow = ai.defineFlow(
  {
    name: 'findSuitableHousingFlow',
    inputSchema: FindSuitableHousingInputSchema,
    outputSchema: FindSuitableHousingOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
