import { z } from 'zod';

export const GtmRequestSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  productName: z.string().min(2, { message: 'Company/Product name must be at least 2 characters.' }),
  contact: z.string().min(5, { message: 'Please enter a valid contact (email/phone).' }),
  role: z.enum(['founder', 'sales_manager', 'marketing_manager', 'product_manager', 'other'], {
    errorMap: () => ({ message: 'Please select your role.' }),
  }),
  challenge: z.string().min(10, { message: 'Please describe your challenge in at least 10 characters.' }),
  salesChannels: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one sales channel.',
  }),
});
