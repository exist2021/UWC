"use server";

import { z } from "zod";
import { contactFormSchema } from "@/lib/schemas";

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export async function sendContactMessage(data: ContactFormInputs) {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, message: "Invalid form data." };
  }
  
  // Here is where you would integrate your email sending service (e.g., Resend, SendGrid).
  // For this demo, we will simulate a successful submission.
  console.log("New contact form submission:", result.data);

  // Example for Resend (requires RESEND_API_KEY environment variable)
  /*
  if (!process.env.RESEND_API_KEY) {
    console.error("Resend API key is missing.");
    return { success: false, message: "Email service is not configured." };
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev", // Must be a verified domain on Resend
      to: "your-email@example.com",
      subject: "New Contact Form Submission",
      html: `
        <p>You have a new contact form submission:</p>
        <p><strong>Name:</strong> ${result.data.name}</p>
        <p><strong>Email:</strong> ${result.data.email}</p>
        <p><strong>Phone:</strong> ${result.data.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${result.data.message}</p>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send message." };
  }
  */

  return { success: true, message: "Message sent successfully." };
}
