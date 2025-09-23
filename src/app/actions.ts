
'use server';

import type { z } from 'zod';
import { generateGTMFeasibilityReport } from '@/ai/flows/generate-gtm-feasibility-report';
import { GtmRequestSchema } from '@/lib/schemas';


export async function submitGtmRequest(data: z.infer<typeof GtmRequestSchema>) {
  const validatedFields = GtmRequestSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data provided.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const reportOutput = await generateGTMFeasibilityReport(validatedFields.data);
    console.log(`Generated GTM Report for: ${validatedFields.data.name}`);
    console.log(reportOutput.report); // Log for verification
    return {
      success: true,
      message: 'Thanks for reaching out! We’ll review your details and contact you soon to schedule a free consultation call.',
    };
  } catch (error) {
    console.error('Error generating report:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}
