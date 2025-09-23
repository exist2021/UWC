
'use server';

import type { z } from 'zod';
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

  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!googleScriptUrl) {
    console.error('Google Script URL is not configured.');
    return { success: false, message: 'Server configuration error. Please contact support.' };
  }

  try {
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
      redirect: 'follow',
    });
    
    const result = await response.json();

    if (result.success) {
        console.log(`Successfully sent GTM Request for: ${validatedFields.data.name} to Google Sheet.`);
        return {
          success: true,
          message: 'Thanks for reaching out! We’ll review your details and contact you soon to schedule a free consultation call.',
        };
    } else {
       throw new Error(result.message || 'Unknown error from Google Script');
    }
  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
    return { success: false, message: 'An unexpected error occurred while saving your request. Please try again.' };
  }
}
