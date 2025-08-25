
"use server";

import { z } from "zod";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schemas";

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export async function sendContactMessage(data: ContactFormInputs) {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    console.error("Form validation failed:", result.error.flatten().fieldErrors);
    return { success: false, message: "Invalid form data." };
  }

  const { name, email, phone, message } = result.data;

  if (!process.env.RESEND_API_KEY) {
    console.error("Resend API key is missing from environment variables.");
    return { success: false, message: "Email service is not configured. The API key is missing." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data: sentData, error } = await resend.emails.send({
      from: "UrbanWiz Contact Form <onboarding@resend.dev>",
      to: "manoj@manojnayak.com",
      subject: "New Vision Submission from UrbanWiz Website",
      reply_to: email,
      html: `
        <p>You have a new contact form submission:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
        </ul>
        <p><strong>Vision:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Error sending email with Resend:", error);
      return { success: false, message: "Failed to send message due to a server error." };
    }

    console.log("Email sent successfully:", sentData);
    return { success: true, message: "Message sent successfully." };

  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
