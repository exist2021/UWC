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
    return {
      success: false,
      message: "Invalid data provided. Please check the form and try again.",
    };
  }

  // This is a prototype. In a real application, you would send an email here.
  // For now, we'll just log it to the console and return a success message.
  console.log("New contact form submission:", validatedData.data);

  return {
    success: true,
    message: "Thank you for your message! This is a demo and no email has been sent, but in a real application, we would be in touch soon.",
  };
}
