
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
  website: z.string().optional().describe('The website of the user (optional).'),
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
  prompt: `You are an expert Go-To-Market (GTM) consultant.
  Based on the information provided, generate a custom GTM feasibility report.
  Consider various sales channels and their potential profitability using Markov probability theory.
  Explain which type of Markov Model is most applicable in this situation, and why.

  User Name: {{{name}}}
  Contact Information: {{{contact}}}
  Website: {{{website}}}

  Report should include actionable insights and recommendations.
  The report should be concise, clear, and easy to understand for founders, marketing leaders, and investors.
  Focus on practical outcomes and potential ROI.
  The report should be structured as follows:

  1. Executive Summary
  2. Methodology (Markov Probability Theory Explanation)
  3. Sales Channel Analysis
  4. Profitability Forecast
  5. Recommendations
  6. Conclusion
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
