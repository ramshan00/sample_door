'use server';

/**
 * @fileOverview A flow to identify potentially unsafe or unverified housing listings.
 *
 * - flagUnsafeListings - A function that flags potentially unsafe listings.
 * - FlagUnsafeListingsInput - The input type for the flagUnsafeListings function.
 * - FlagUnsafeListingsOutput - The return type for the flagUnsafeListings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlagUnsafeListingsInputSchema = z.object({
  listingDescription: z
    .string()
    .describe('The description of the housing listing.'),
});
export type FlagUnsafeListingsInput = z.infer<typeof FlagUnsafeListingsInputSchema>;

const FlagUnsafeListingsOutputSchema = z.object({
  isUnsafe: z
    .boolean()
    .describe(
      'Whether the listing is potentially unsafe or unverified, based on the description.'
    ),
  reason: z
    .string()
    .describe('The reason why the listing is flagged as potentially unsafe.'),
});
export type FlagUnsafeListingsOutput = z.infer<typeof FlagUnsafeListingsOutputSchema>;

export async function flagUnsafeListings(
  input: FlagUnsafeListingsInput
): Promise<FlagUnsafeListingsOutput> {
  return flagUnsafeListingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flagUnsafeListingsPrompt',
  input: {schema: FlagUnsafeListingsInputSchema},
  output: {schema: FlagUnsafeListingsOutputSchema},
  prompt: `You are an AI agent specializing in identifying potentially unsafe or unverified housing listings.

  Based on the listing description, determine if the listing is potentially unsafe or unverified.
  Consider factors such as unusually low prices, lack of detailed information, requests for upfront payments without proper verification, and any other suspicious details.

  Listing Description: {{{listingDescription}}}

  Respond with whether the listing is unsafe, and the reason why you believe it to be unsafe.`,
});

const flagUnsafeListingsFlow = ai.defineFlow(
  {
    name: 'flagUnsafeListingsFlow',
    inputSchema: FlagUnsafeListingsInputSchema,
    outputSchema: FlagUnsafeListingsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
