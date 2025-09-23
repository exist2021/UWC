
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
    };
  }

  try {
    // In a real app, you might want to do something with the report, like email it.
    // For now, we'll just generate it and log it to the server console.
    const { name, contact, businessName, challenge } = validatedFields.data;
    const reportOutput = await generateGTMFeasibilityReport({ name, contact, website: businessName, challenge});
    console.log(`Generated GTM Report for: ${validatedFields.data.name}`);
    console.log(reportOutput.report); // Log for verification
    return {
      success: true,
      message: 'Thank you! We will be in touch with your custom analysis shortly.',
    };
  } catch (error) {
    console.error('Error generating report:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}
