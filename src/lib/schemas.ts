import { z } from 'zod';

export const GtmRequestSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  contact: z.string().min(5, { message: 'Please enter a valid contact (email/phone).' }),
  challenge: z.string().min(10, { message: 'Please describe your challenge in at least 10 characters.' }),
});
