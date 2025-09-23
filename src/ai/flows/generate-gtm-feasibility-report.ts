
'use server';
/**
 * @fileOverview Generates a custom GTM feasibility report using AI based on user-submitted business data.
 *
 * - generateGTMFeasibilityReport - A function that triggers the GTM feasibility report generation process.
 * - GenerateGTMFeasibilityReportInput - The input type for the generateGTMFeasibilityReport function.
 * - GenerateGTMFeasibilityReportOutput - The return type for the generateGTMFeasibilityReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGTMFeasibilityReportInputSchema = z.object({
  name: z.string().describe('The name of the user requesting the report.'),
  contact: z.string().describe('The contact information (phone/email) of the user.'),
  website: z.string().optional().describe('The business name of the user (optional).'),
  challenge: z.string().describe('The user\'s biggest sales challenge.'),
});
export type GenerateGTMFeasibilityReportInput = z.infer<
  typeof GenerateGTMFeasibilityReportInputSchema
>;

const GenerateGTMFeasibilityReportOutputSchema = z.object({
  report: z.string().describe('The generated GTM feasibility report.'),
});
export type GenerateGTMFeasibilityReportOutput = z.infer<
  typeof GenerateGTMFeasibilityReportOutputSchema
>;

export async function generateGTMFeasibilityReport(
  input: GenerateGTMFeasibilityReportInput
): Promise<GenerateGTMFeasibilityReportOutput> {
  return generateGTMFeasibilityReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGTMFeasibilityReportPrompt',
  input: {schema: GenerateGTMFeasibilityReportInputSchema},
  output: {schema: GenerateGTMFeasibilityReportOutputSchema},
  prompt: `You are an expert Go-To-Market (GTM) consultant for small businesses.
  Based on the information provided, generate a custom GTM feasibility report (a sales channel checkup).
  The tone should be simple, encouraging, and easy for a non-expert to understand.

  User Name: {{{name}}}
  Business Name: {{{website}}}
  Contact Information: {{{contact}}}
  Biggest Sales Challenge: {{{challenge}}}

  The report should be a "Free Sales Channel Checkup" and include:
  1. A brief, encouraging introduction acknowledging their sales challenge.
  2. An explanation of which sales channels might be best for their business and why. Use simple terms.
  3. Clear, actionable first steps they can take.
  4. An explanation of why focusing on profitable channels is important.
  5. A concluding paragraph offering further help.
  `,
});

const generateGTMFeasibilityReportFlow = ai.defineFlow(
  {
    name: 'generateGTMFeasibilityReportFlow',
    inputSchema: GenerateGTMFeasibilityReportInputSchema,
    outputSchema: GenerateGTMFeasibilityReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
