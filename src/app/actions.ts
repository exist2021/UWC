
'use server';

import type { z } from 'zod';
import { Resend } from 'resend';
import { GtmFitReportSchema, ConsultationRequestSchema } from '@/lib/schemas';


export async function submitGtmRequest(data: z.infer<typeof GtmFitReportSchema>) {
  const validatedFields = GtmFitReportSchema.safeParse(data);

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
  
  const { channelDetails, ...restOfData } = validatedFields.data;

  const payload = {
    ...restOfData,
    salesChannels: restOfData.salesChannels.join(', '),
    channelDetails: JSON.stringify(channelDetails), // Flatten nested object for Google Sheets
  };


  try {
    // By creating a temporary URL and then a new Request object, we can avoid issues
    // with Google Apps Script redirects that can cause the POST body to be lost.
    const url = new URL(googleScriptUrl);
    const response = await fetch(new Request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }));
    
    const result = await response.json();

    if (result.success) {
        console.log(`Successfully sent GTM Request for: ${validatedFields.data.name} to Google Sheet.`);
        return {
          success: true,
          message: 'Thank you for submitting your details! We will analyze your information and send you a personalized GTM Fit Report within 3 business days.',
        };
    } else {
       throw new Error(result.message || 'Unknown error from Google Script');
    }
  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
    return { success: false, message: 'An unexpected error occurred while saving your request. Please try again.' };
  }
}

export async function submitConsultationRequest(data: z.infer<typeof ConsultationRequestSchema>) {
  const validatedFields = ConsultationRequestSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data provided.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.RESEND_EMAIL_TO;

  if (!resendApiKey || !emailTo) {
    console.error('Resend API Key or recipient email is not configured.');
    return { success: false, message: 'Server configuration error. Please contact support.' };
  }

  const resend = new Resend(resendApiKey);

  try {
    const { data: validatedData } = validatedFields;
    await resend.emails.send({
      from: 'GTM Lab <onboarding@resend.dev>',
      to: emailTo,
      subject: 'New Consultation Request from GTM Lab',
      html: `
        <h1>New Consultation Request</h1>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Email:</strong> ${validatedData.email || 'Not provided'}</p>
        <p><strong>Business Name:</strong> ${validatedData.businessName || 'Not provided'}</p>
      `,
    });

    return {
      success: true,
      message: 'Thanks for reaching out! We’ll be in touch to schedule your call.',
    };
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    return { success: false, message: 'An unexpected error occurred while sending your request. Please try again.' };
  }
}
