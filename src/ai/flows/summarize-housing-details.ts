// Summarize housing details flow.
'use server';
/**
 * @fileOverview Summarizes key details of housing listings.
 *
 * - summarizeHousingDetails - A function that summarizes housing listing details.
 * - SummarizeHousingDetailsInput - The input type for the summarizeHousingDetails function.
 * - SummarizeHousingDetailsOutput - The return type for the summarizeHousingDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeHousingDetailsInputSchema = z.object({
  city: z.string().describe('The city where the housing is located.'),
  area: z.string().describe('The area within the city where the housing is located.'),
  monthly_rent_PKR: z.number().describe('The monthly rent in Pakistani Rupees.'),
  rooms_available: z.number().describe('The number of rooms available.'),
  amenities: z.array(z.string()).describe('A list of amenities available in the housing.'),
});
export type SummarizeHousingDetailsInput = z.infer<
  typeof SummarizeHousingDetailsInputSchema
>;

const SummarizeHousingDetailsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the housing details.'),
});
export type SummarizeHousingDetailsOutput = z.infer<
  typeof SummarizeHousingDetailsOutputSchema
>;

export async function summarizeHousingDetails(
  input: SummarizeHousingDetailsInput
): Promise<SummarizeHousingDetailsOutput> {
  return summarizeHousingDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeHousingDetailsPrompt',
  input: {schema: SummarizeHousingDetailsInputSchema},
  output: {schema: SummarizeHousingDetailsOutputSchema},
  prompt: `Summarize the following housing details in a concise manner for a student:

City: {{{city}}}
Area: {{{area}}}
Monthly Rent (PKR): {{{monthly_rent_PKR}}}
Rooms Available: {{{rooms_available}}}
Amenities: {{#each amenities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Summary:`,
});

const summarizeHousingDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeHousingDetailsFlow',
    inputSchema: SummarizeHousingDetailsInputSchema,
    outputSchema: SummarizeHousingDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
