// This is a server-side file.
'use server';

/**
 * @fileOverview Explains why a potential roommate is a good match and suggests compromises.
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
  explanation: z.string().describe('An explanation of why the two roommates are a good match, highlighting common interests and potential lifestyle compatibility.'),
  compromises: z.string().describe('Suggestions for potential compromises on areas of conflict.'),
});
export type ExplainRoommateMatchOutput = z.infer<typeof ExplainRoommateMatchOutputSchema>;

export async function explainRoommateMatch(input: ExplainRoommateMatchInput): Promise<ExplainRoommateMatchOutput> {
  return explainRoommateMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainRoommateMatchPrompt',
  input: {schema: ExplainRoommateMatchInputSchema},
  output: {schema: ExplainRoommateMatchOutputSchema},
  prompt: `You are the Wingman Agent, an AI roommate matching assistant. You are provided with two roommate profiles, and you must act as a friendly guide.

Your tasks are:
1. Provide a transparent, friendly, and concise explanation of why they would be a good match. Focus on shared interests, habits, and preferences.
2. Identify potential areas of conflict and suggest actionable compromises. For example, if one is a night owl and the other an early bird, suggest a compromise on quiet hours.

Profile 1: {{{profile1}}}

Profile 2: {{{profile2}}}
`,
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
