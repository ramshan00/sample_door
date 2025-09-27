// This is a server-side file.
'use server';

/**
 * @fileOverview Explains why a potential roommate is a good match.
 *
 * - explainRoommateMatch - A function that takes two roommate profiles and returns an explanation of why they are a good match.
 * - ExplainRoommateMatchInput - The input type for the explainRoommateMatch function.
 * - ExplainRoommateMatchOutput - The return type for the explainRoommateMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainRoommateMatchInputSchema = z.object({
  profile1: z.string().describe('The first roommate profile as a JSON string.'),
  profile2: z.string().describe('The second roommate profile as a JSON string.'),
});
export type ExplainRoommateMatchInput = z.infer<typeof ExplainRoommateMatchInputSchema>;

const ExplainRoommateMatchOutputSchema = z.object({
  explanation: z.string().describe('An explanation of why the two roommates are a good match.'),
});
export type ExplainRoommateMatchOutput = z.infer<typeof ExplainRoommateMatchOutputSchema>;

export async function explainRoommateMatch(input: ExplainRoommateMatchInput): Promise<ExplainRoommateMatchOutput> {
  return explainRoommateMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainRoommateMatchPrompt',
  input: {schema: ExplainRoommateMatchInputSchema},
  output: {schema: ExplainRoommateMatchOutputSchema},
  prompt: `You are an AI roommate matching assistant. You are provided with two roommate profiles, and you must explain why they are a good match.

Profile 1: {{{profile1}}}

Profile 2: {{{profile2}}}

Based on the two profiles, provide a concise and friendly explanation of why they would be a good match, focusing on shared interests, habits, and preferences.`,
});

const explainRoommateMatchFlow = ai.defineFlow(
  {
    name: 'explainRoommateMatchFlow',
    inputSchema: ExplainRoommateMatchInputSchema,
    outputSchema: ExplainRoommateMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
