import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-housing-details.ts';
import '@/ai/flows/explain-roommate-matches.ts';
import '@/ai/flows/flag-unsafe-listings.ts';
import '@/ai/flows/parse-profile-text.ts';
import '@/ai/flows/score-match.ts';
import '@/ai/flows/detect-lifestyle-conflicts.ts';
import '@/ai/flows/find-suitable-housing.ts';
