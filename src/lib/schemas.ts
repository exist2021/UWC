import { z } from 'zod';

export const GtmRequestSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  contact: z.string().min(5, { message: 'Please enter a valid contact (email/phone).' }),
  website: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .or(z.literal('')),
});
