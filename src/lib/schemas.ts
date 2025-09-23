
import { z } from 'zod';

const channelDetailSchema = z.object({
  leadToProspect: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Rate must be between 0 and 100").max(100, "Rate must be between 0 and 100")
  ).optional(),
  prospectToCustomer: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Rate must be between 0 and 100").max(100, "Rate must be between 0 and 100")
  ).optional(),
  salesCost: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Cost must be a positive number")
  ).optional(),
  marketingCost: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Cost must be a positive number")
  ).optional(),
});


export const GtmFitReportSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  productName: z.string().min(2, { message: 'Company/Product name must be at least 2 characters.' }),
  website: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  role: z.enum(['founder', 'sales_manager', 'marketing_manager', 'product_manager', 'other'], {
    errorMap: () => ({ message: 'Please select your role.' }),
  }),
  roleOther: z.string().optional(),
  salesChannels: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one sales channel.',
  }),
  channelDetails: z.record(z.string(), channelDetailSchema).optional(),
  challenge: z.string().min(10, { message: 'Please describe your challenge in at least 10 characters.' }),
  goals: z.string().min(10, { message: 'Please describe your goals in at least 10 characters.' }),
}).refine(data => {
    // If "Other" is selected for role, roleOther must be filled.
    if (data.role === 'other') {
        return data.roleOther && data.roleOther.length > 0;
    }
    return true;
}, {
    message: 'Please specify your role.',
    path: ['roleOther'],
});


export const ConsultationRequestSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }).optional().or(z.literal('')),
  businessName: z.string().optional(),
});
