"use server";

import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";

export type ContactFormState = {
  message: string;
  success: boolean;
};

export async function sendContactMessage(
  data: ContactFormValues
): Promise<ContactFormState> {
  const validatedData = contactFormSchema.safeParse(data);

  if (!validatedData.success) {
    // This case should ideally not be hit if client-side validation is working,
    // but it's a good safeguard.
    return {
      success: false,
      message: "Invalid data provided. Please check the form and try again.",
    };
  }
  
  // Here you would integrate with an email sending service like Resend, SendGrid, etc.
  // For this example, we'll just log to the console.
  console.log("New contact form submission for manoj@manojnayak.com:");
  console.log(validatedData.data);

  // Example:
  // try {
  //   await resend.emails.send({
  //     from: 'onboarding@resend.dev',
  //     to: 'manoj@manojnayak.com',
  //     subject: 'New Contact Form Submission from ClarityLink',
  //     html: `<p>Name: ${validatedData.data.name}</p>
  //            <p>Email: ${validatedData.data.email}</p>
  //            <p>Phone: ${validatedData.data.phone}</p>
  //            <p>Message: ${validatedData.data.message}</p>`,
  //   });
  // } catch (error) {
  //   console.error("Failed to send email:", error);
  //   return {
  //     success: false,
  //     message: "Sorry, there was an error sending your message. Please try again later.",
  //   };
  // }

  return {
    success: true,
    message: "Thank you for your message! We'll be in touch soon.",
  };
}
