import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-housing-details.ts';
import '@/ai/flows/explain-roommate-matches.ts';
import '@/ai/flows/flag-unsafe-listings.ts';