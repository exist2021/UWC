'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  vision: z.string(),
  consent: z.boolean(),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export async function sendContactMessage(data: ContactFormInputs) {
  const validatedData = contactFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { success: false, message: 'Invalid data.' };
  }

  const { name, email, phone, vision } = validatedData.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'ClarityLink <onboarding@resend.dev>',
      to: ['manoj@manojnayak.com'],
      subject: 'New Vision Submission from ClarityLink Website',
      html: `
        <p>You have a new contact form submission:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Vision:</strong></p>
        <p>${vision}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return { success: false, message: 'Failed to send message due to a server error.' };
    }

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
