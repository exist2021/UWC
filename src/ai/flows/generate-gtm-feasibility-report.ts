
'use server';
/**
 * @fileOverview This file is currently not in use. The form submission is handled by a Google Apps Script.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { GtmRequestSchema } from '@/lib/schemas';


export type GenerateGTMFeasibilityReportInput = z.infer<
  typeof GtmRequestSchema
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
  // This flow is currently not being used by the application.
  // The form submission logic has been updated to send data to a Google Sheet.
  // To re-enable this, you would need to update the `submitGtmRequest` function in `src/app/actions.ts`.
  return Promise.resolve({ report: 'This AI flow is currently disabled.' });
}

const prompt = ai.definePrompt({
  name: 'generateGTMFeasibilityReportPrompt',
  input: {schema: GtmRequestSchema},
  output: {schema: GenerateGTMFeasibilityReportOutputSchema},
  prompt: `You are an expert Go-To-Market (GTM) consultant for businesses.
  Based on the information provided, generate a custom GTM feasibility report.
  The tone should be professional, data-driven, and insightful.

  User Name: {{{name}}}
  Company/Product: {{{productName}}}
  Role: {{{role}}}
  Contact Information: {{{contact}}}
  Key GTM Challenge: {{{challenge}}}
  Sales Channels: {{{salesChannels}}}

  The report should be a "GTM Feasibility Assessment" and include:
  1. A brief introduction acknowledging their GTM challenge.
  2. An analysis of the selected sales channels, considering their role and challenge.
  3. Discuss potential pros and cons for the selected channels.
  4. Provide clear, actionable first steps based on data-driven principles.
  5. An explanation of why a scientific GTM evaluation is critical.
  6. A concluding paragraph offering further, more detailed analysis.
  `,
});

const generateGTMFeasibilityReportFlow = ai.defineFlow(
  {
    name: 'generateGTMFeasibilityReportFlow',
    inputSchema: GtmRequestSchema,
    outputSchema: GenerateGTMFeasibilityReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
