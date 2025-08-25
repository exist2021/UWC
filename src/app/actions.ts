
"use server";

import { z } from "zod";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schemas";

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export async function sendContactMessage(data: ContactFormInputs) {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, message: "Invalid form data." };
  }

  // Check for the API key first
  if (!process.env.RESEND_API_KEY) {
    console.error("Resend API key is missing from environment variables.");
    return { success: false, message: "Email service is not configured. The API key is missing." };
  }

  try {
    // Initialize Resend inside the function
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: "onboarding@resend.dev", // IMPORTANT: Must be a verified domain on Resend for production
      to: "manoj@manojnayak.com",
      subject: "New Contact Form Submission",
      html: `
        <p>You have a new contact form submission:</p>
        <p><strong>Name:</strong> ${result.data.name}</p>
        <p><strong>Email:</strong> ${result.data.email}</p>
        <p><strong>Phone:</strong> ${result.data.phone}</p>
        <p><strong>Vision:</strong></p>
        <p>${result.data.message}</p>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send message. Please check the server logs." };
  }

  return { success: true, message: "Message sent successfully." };
}
