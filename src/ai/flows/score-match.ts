'use server';

/**
 * @fileOverview A Match Scorer Agent that rates compatibility between two students.
 *
 * - scoreMatch - Rates compatibility between students.
 * - ScoreMatchInput - The input type for the scoreMatch function.
 * - ScoreMatchOutput - The return type for the scoreMatch function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ScoreMatchInputSchema = z.object({
  profile1: z.string().describe('The first roommate profile as a JSON string.'),
  profile2: z.string().describe('The second roommate profile as a JSON string.'),
});
export type ScoreMatchInput = z.infer<typeof ScoreMatchInputSchema>;

const ScoreMatchOutputSchema = z.object({
  compatibility_score: z.number().min(0).max(100).describe('A compatibility score from 0 to 100.'),
  summary: z.string().describe('A brief justification for the score.'),
});
export type ScoreMatchOutput = z-infer<typeof ScoreMatchOutputSchema>;

export async function scoreMatch(input: ScoreMatchInput): Promise<ScoreMatchOutput> {
  return scoreMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreMatchPrompt',
  input: { schema: ScoreMatchInputSchema },
  output: { schema: ScoreMatchOutputSchema },
  prompt: `You are the Match Scorer Agent. Your task is to rate the compatibility between two students based on their profiles.
The final score should be between 0 and 100.

Consider these factors for scoring:
- **Sleep Schedule:** High compatibility if schedules match.
- **Cleanliness:** High compatibility if preferences are similar.
- **Study Habits:** Consider if habits are complementary or conflicting.
- **Budget Alignment:** High compatibility if budgets are close.
- **Food Preferences:** Minor factor, but consider it.

Profile 1: {{{profile1}}}
Profile 2: {{{profile2}}}

Provide a compatibility score and a very brief one-sentence summary explaining the score.`,
});

const scoreMatchFlow = ai.defineFlow(
  {
    name: 'scoreMatchFlow',
    inputSchema: ScoreMatchInputSchema,
    outputSchema: ScoreMatchOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
