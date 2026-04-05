'use server';
/**
 * @fileOverview An AI-powered tool that analyzes client business challenges and project requirements
 * and suggests relevant XgenIq services or a preliminary solution outline.
 *
 * - matchServices - A function that handles the AI service matching process.
 * - AIServiceMatchmakerInput - The input type for the matchServices function.
 * - AIServiceMatchmakerOutput - The return type for the matchServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIServiceMatchmakerInputSchema = z.object({
  businessChallenges: z
    .string()
    .describe('A detailed description of the client\u0027s current business challenges.'),
  projectRequirements: z
    .string()
    .describe('A detailed description of the client\u0027s project requirements and goals.'),
});
export type AIServiceMatchmakerInput = z.infer<typeof AIServiceMatchmakerInputSchema>;

const AIServiceMatchmakerOutputSchema = z.object({
  suggestedServices: z
    .array(z.string())
    .describe('A list of XgenIq services that are most relevant to the client\u0027s needs.'),
  preliminarySolutionOutline: z
    .string()
    .describe('A preliminary outline of a solution tailored to the client\u0027s challenges and requirements.'),
});
export type AIServiceMatchmakerOutput = z.infer<typeof AIServiceMatchmakerOutputSchema>;

export async function matchServices(
  input: AIServiceMatchmakerInput
): Promise<AIServiceMatchmakerOutput> {
  return aiServiceMatchmakerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiServiceMatchmakerPrompt',
  input: {schema: AIServiceMatchmakerInputSchema},
  output: {schema: AIServiceMatchmakerOutputSchema},
  prompt: `You are an expert AI service matchmaker for XgenIq Technologies Pvt. Ltd.
Your task is to analyze a prospective client's business challenges and project requirements and suggest the most relevant services offered by XgenIq, along with a preliminary solution outline.

Here are the services offered by XgenIq Technologies:
- Custom Software Development
- Web & Mobile App Development
- AI & Machine Learning Solutions
- Enterprise Application Development
- SAP Consulting & Integration
- Bid & Reverse Auction Systems
- Vendor Management Portals

Client's Business Challenges: {{{businessChallenges}}}
Client's Project Requirements and Goals: {{{projectRequirements}}}

Based on the information provided, suggest 2-4 most relevant XgenIq services and provide a concise preliminary solution outline (2-3 paragraphs) that addresses their needs.`,
});

const aiServiceMatchmakerFlow = ai.defineFlow(
  {
    name: 'aiServiceMatchmakerFlow',
    inputSchema: AIServiceMatchmakerInputSchema,
    outputSchema: AIServiceMatchmakerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
