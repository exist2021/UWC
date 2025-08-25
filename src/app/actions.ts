'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  vision: z.string().min(10, 'Please describe your vision in a bit more detail.'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms.' }),
  }),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export async function sendContactMessage(data: ContactFormInputs) {
  const validatedData = contactFormSchema.safeParse(data);

  if (!validatedData.success) {
    // Construct a more detailed error message
    const errorMessages = validatedData.error.issues.map(i => i.message).join(', ');
    return { success: false, message: `Invalid data: ${errorMessages}` };
  }

  const { name, email, phone, vision } = validatedData.data;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'ClarityLink <onboarding@resend.dev>',
      to: ['manoj@manojnayak.com'],
      subject: 'New Vision Submission from ClarityLink Website',
      reply_to: email,
      html: `
        <p>You have a new contact form submission:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <p><strong>Vision:</strong></p>
        <p>${vision}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, message: 'Failed to send message. Please try again later.' };
    }

    return { success: true, message: 'Your message has been sent successfully!' };
  } catch (error) {
    console.error('Send Error:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}
