'use server';

/**
 * @fileOverview A Red Flag Agent that detects potential lifestyle conflicts between roommates.
 *
 * - detectLifestyleConflicts - Detects lifestyle conflicts between two profiles.
 * - DetectLifestyleConflictsInput - The input type for the detectLifestyleConflicts function.
 * - DetectLifestyleConflictsOutput - The return type for the detectLifestyleConflicts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DetectLifestyleConflictsInputSchema = z.object({
  profile1: z.string().describe('The first roommate profile as a JSON string.'),
  profile2: z.string().describe('The second roommate profile as a JSON string.'),
});
export type DetectLifestyleConflictsInput = z.infer<typeof DetectLifestyleConflictsInputSchema>;

const DetectLifestyleConflictsOutputSchema = z.object({
  has_conflict: z.boolean().describe('Whether a significant lifestyle conflict exists.'),
  conflict_description: z.string().optional().describe('A description of the conflict if one is detected.'),
});
export type DetectLifestyleConflictsOutput = z.infer<typeof DetectLifestyleConflictsOutputSchema>;

export async function detectLifestyleConflicts(input: DetectLifestyleConflictsInput): Promise<DetectLifestyleConflictsOutput> {
  return detectLifestyleConflictsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectLifestyleConflictsPrompt',
  input: { schema: DetectLifestyleConflictsInputSchema },
  output: { schema: DetectLifestyleConflictsOutputSchema },
  prompt: `You are the Red Flag Agent. Your job is to detect significant lifestyle conflicts between two potential roommates.
A significant conflict would be something that could cause serious friction, e.g., a very tidy person with a very messy one, or a light sleeper with a night owl who makes noise.

Profile 1: {{{profile1}}}
Profile 2: {{{profile2}}}

Analyze the profiles for major conflicts. If a conflict is found, set has_conflict to true and describe it. Otherwise, set has_conflict to false.`,
});

const detectLifestyleConflictsFlow = ai.defineFlow(
  {
    name: 'detectLifestyleConflictsFlow',
    inputSchema: DetectLifestyleConflictsInputSchema,
    outputSchema: DetectLifestyleConflictsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
