'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useTransition, useState } from 'react';
import { submitGtmRequest } from '@/app/actions';
import { GtmRequestSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

const salesChannels = [
  { id: 'field_sales', label: 'Field Sales' },
  { id: 'inside_sales', label: 'Inside Sales' },
  { id: 'channel_partners', label: 'Channel Partners' },
  { id: 'digital_marketing', label: 'Digital Marketing' },
  { id: 'social_media', label: 'Social Media' },
  { id: 'events', label: 'Events' },
  { id: 'other', label: 'Other' },
];


type FormValues = z.infer<typeof GtmRequestSchema>;

export function LeadForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(GtmRequestSchema),
    defaultValues: {
      name: '',
      contact: '',
      productName: '',
      challenge: '',
      role: undefined,
      salesChannels: [],
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await submitGtmRequest(values);
      if (result.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: result.message,
        });
      }
    });
  };

  return (
    <section id="form-section" className="w-full py-20 md:py-28 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-2xl border-t-4 border-primary bg-white/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-headline text-primary">Request Your GTM Feasibility Report</CardTitle>
              <CardDescription className="pt-2 text-lg">
                Enter your details to get your feasibility report.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center p-8 flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
                  <CheckCircle className="h-20 w-20 text-green-500" />
                  <h3 className="text-3xl font-bold font-headline text-primary">Request Received!</h3>
                  <p className="text-muted-foreground text-lg">
                    Thank you! We will analyze your data and get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
                    Submit Another
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Jane Doe" {...field} className="py-6 text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="productName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Company/Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Acme Inc." {...field} className="py-6 text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Email or Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., jane@example.com" {...field} className="py-6 text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Your Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="py-6 text-base">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="founder">Founder</SelectItem>
                              <SelectItem value="sales_manager">Sales Manager</SelectItem>
                              <SelectItem value="marketing_manager">Marketing Manager</SelectItem>
                              <SelectItem value="product_manager">Product Manager</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="challenge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Key GTM Challenge or Objective</FormLabel>
                          <FormControl>
                            <Textarea placeholder="e.g., Increase conversion rates for digital channels." {...field} className="py-4 text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="salesChannels"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-lg">Sales Channels</FormLabel>
                            <FormDescription>
                              Select the sales channels you are using or considering.
                            </FormDescription>
                          </div>
                          {salesChannels.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="salesChannels"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Request My GTM Feasibility Report"
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
