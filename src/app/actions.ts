
'use server';

import type { z } from 'zod';
import { Resend } from 'resend';
import { GtmFitReportSchema } from '@/lib/schemas';


export async function submitGtmRequest(data: z.infer<typeof GtmFitReportSchema>) {
  const validatedFields = GtmFitReportSchema.safeParse(data);

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
    console.error('Resend API key or recipient email is not configured.');
    return { success: false, message: 'Server configuration error. Please contact support.' };
  }

  const resend = new Resend(resendApiKey);
  const { name, email, phone, productName, website, role, roleOther, salesChannels, channelDetails, challenge, goals } = validatedFields.data;

  // Build a readable email body
  const channelDetailsHtml = channelDetails 
    ? Object.entries(channelDetails).map(([channel, details]) => `
      <div style="margin-top: 10px; padding-left: 15px; border-left: 2px solid #eee;">
        <h4 style="margin-bottom: 5px; color: #333;">${channel.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
          ${details.leadToProspect ? `<li>Lead to Prospect Rate: <strong>${details.leadToProspect}%</strong></li>` : ''}
          ${details.prospectToCustomer ? `<li>Prospect to Customer Rate: <strong>${details.prospectToCustomer}%</strong></li>` : ''}
          ${details.salesCost ? `<li>Avg. Monthly Sales Cost: <strong>$${details.salesCost}</strong></li>` : ''}
          ${details.marketingCost ? `<li>Avg. Monthly Marketing Cost: <strong>$${details.marketingCost}</strong></li>` : ''}
        </ul>
      </div>
    `).join('')
    : '<p>No specific channel details provided.</p>';


  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0d47a1;">New GTM Fit Report Submission</h2>
      <p>A new submission has been received from <strong>${name}</strong>.</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      
      <h3 style="color: #1976d2;">Basic Information</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
        <li><strong>Company/Product:</strong> ${productName}</li>
        ${website ? `<li><strong>Website:</strong> <a href="${website}">${website}</a></li>` : ''}
      </ul>
      
      <h3 style="color: #1976d2;">Role</h3>
      <p>${role === 'other' ? roleOther : role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
      
      <h3 style="color: #1976d2;">Sales Channels</h3>
      <p>${salesChannels.join(', ')}</p>
      ${channelDetailsHtml}

      <h3 style="color: #1976d2;">Challenges & Goals</h3>
      <p><strong>Biggest GTM Challenge:</strong><br>${challenge}</p>
      <p><strong>Short-term GTM Goals:</strong><br>${goals}</p>

      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #777;">This email was generated from the GTM Lab website.</p>
    </div>
  `;


  try {
    const { data: resendData, error } = await resend.emails.send({
      from: 'GTM Lab <onboarding@resend.dev>', // You can change this once your domain is verified
      to: emailTo,
      subject: `New GTM Fit Report for ${productName}`,
      html: emailHtml,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    console.log(`Successfully sent GTM Request for: ${validatedFields.data.name} via Resend.`);
    return {
      success: true,
      message: 'Thank you for submitting your details! We will analyze your information and send you a personalized GTM Fit Report within 3 business days.',
    };

  } catch (error) {
    console.error('Error sending email with Resend:', error);
    return { success: false, message: 'An unexpected error occurred while sending your request. Please try again.' };
  }
}
