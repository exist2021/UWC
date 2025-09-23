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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
      website: '',
      salesChannel: 'direct-sales',
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
    <section id="form-section" className="w-full py-20 md:py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-2xl border-t-4 border-primary bg-white/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-headline text-primary">Get Your Feasibility Report</CardTitle>
              <CardDescription className="pt-2 text-lg">
                Enter your details to receive a scientific GTM assessment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center p-8 flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
                  <CheckCircle className="h-20 w-20 text-green-500" />
                  <h3 className="text-3xl font-bold font-headline text-primary">Analysis Request Received!</h3>
                  <p className="text-muted-foreground text-lg">
                    Thank you! We'll be in touch with your custom report shortly.
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
                          <FormDescription>Your full name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Contact (Phone/Email)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., jane@example.com" {...field} className="py-6 text-base" />
                          </FormControl>
                          <FormDescription>We'll send the report here.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Company/Website</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., https://yourcompany.com" {...field} className="py-6 text-base" />
                          </FormControl>
                          <FormDescription>Your company's official website.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salesChannel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Primary Sales Channel</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="py-6 text-base">
                                <SelectValue placeholder="Select a channel to analyze" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="direct-sales">Direct Sales</SelectItem>
                              <SelectItem value="content-marketing">Content Marketing</SelectItem>
                              <SelectItem value="paid-ads">Paid Ads</SelectItem>
                              <SelectItem value="affiliate">Affiliate/Partnerships</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Which sales channel are you most interested in modeling?
                          </FormDescription>
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
                        "Let's Analyze!"
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
