import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to submit your inquiry." }),
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
