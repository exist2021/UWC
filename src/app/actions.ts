"use server";

import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { Resend } from "resend";

export type ContactFormState = {
  message: string;
  success: boolean;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendContactMessage(
  data: ContactFormValues
): Promise<ContactFormState> {
  const validatedData = contactFormSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Invalid data provided. Please check the form and try again.",
    };
  }

  if (!resend) {
    console.error("Resend is not configured. Missing RESEND_API_KEY.");
    return {
      success: false,
      message: "The email service is not configured correctly. Please contact the site administrator.",
    };
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // IMPORTANT: This must be a domain you've verified with Resend
      to: 'manoj@manojnayak.com',
      subject: 'New Contact Form Submission from UrbanWiz',
      html: `<p>Name: ${validatedData.data.name}</p>
             <p>Email: ${validatedData.data.email}</p>
             <p>Phone: ${validatedData.data.phone}</p>
             <p>Message: ${validatedData.data.message}</p>`,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Thank you for your message! We'll be in touch soon.",
  };
}
