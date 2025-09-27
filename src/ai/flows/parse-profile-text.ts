'use server';

/**
 * @fileOverview Parses messy, unstructured roommate ads into structured profile attributes.
 *
 * - parseProfileText - A function that takes raw text and extracts structured profile data.
 * - ParseProfileTextInput - The input type for the parseProfileText function.
 * - ParseProfileTextOutput - The return type for the parseProfileText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ParseProfileTextInputSchema = z.object({
  raw_profile_text: z.string().describe('The messy, unstructured ad text for a roommate, potentially in Urdu/English mix (Roman Urdu).'),
});
export type ParseProfileTextInput = z.infer<typeof ParseProfileTextInputSchema>;

const ParseProfileTextOutputSchema = z.object({
  name: z.string().optional().describe('The name of the person.'),
  age: z.number().optional().describe('The age of the person.'),
  gender: z.enum(['Male', 'Female', 'Other']).optional().describe('The gender of the person.'),
  university: z.string().optional().describe('The university the person attends.'),
  city: z.string().optional().describe('The city where the person is looking for housing.'),
  budget_PKR: z.number().optional().describe('The monthly budget in Pakistani Rupees.'),
  cleanliness: z.enum(['Tidy', 'Average', 'Messy']).optional().describe('The cleanliness preference.'),
  sleep_schedule: z.enum(['Early bird', 'Night owl', 'Flexible']).optional().describe('The typical sleep schedule.'),
  study_habits: z.enum(['In-person classes', 'Online classes', 'Group studies', 'Quiet study']).optional().describe('The person\'s study habits.'),
  food_pref: z.enum(['Cooks at home', 'Eats out', 'Flexible']).optional().describe('The food preference.'),
});
export type ParseProfileTextOutput = z.infer<typeof ParseProfileTextOutputSchema>;


export async function parseProfileText(input: ParseProfileTextInput): Promise<ParseProfileTextOutput> {
  return parseProfileTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseProfileTextPrompt',
  input: { schema: ParseProfileTextInputSchema },
  output: { schema: ParseProfileTextOutputSchema },
  prompt: `You are the Profile Reader Agent. Your job is to parse messy, unstructured, and mixed-language (Roman Urdu/English) text from roommate ads and extract structured information.

Analyze the following text and fill in the attributes. If a piece of information is not present, leave it blank.

Ad Text: {{{raw_profile_text}}}
`,
});

const parseProfileTextFlow = ai.defineFlow(
  {
    name: 'parseProfileTextFlow',
    inputSchema: ParseProfileTextInputSchema,
    outputSchema: ParseProfileTextOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
