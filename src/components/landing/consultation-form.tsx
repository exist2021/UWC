'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useTransition, useState } from 'react';
import { submitConsultationRequest } from '@/app/actions';
import { ConsultationRequestSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';

type FormValues = z.infer<typeof ConsultationRequestSchema>;

export function ConsultationForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(ConsultationRequestSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      businessName: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await submitConsultationRequest(values);
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
    <section id="consultation-form" className="w-full py-20 md:py-28 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-2xl border-t-4 border-primary bg-white/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-headline text-primary">Book a Consultation</CardTitle>
              <CardDescription className="pt-2 text-lg">
                Fill out the form below and we'll contact you to schedule a call.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center p-8 flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
                  <CheckCircle className="h-20 w-20 text-green-500" />
                  <h3 className="text-3xl font-bold font-headline text-primary">Request Sent!</h3>
                  <p className="text-muted-foreground text-lg">
                    Thanks for reaching out! We’ll be in touch shortly to schedule your consultation.
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
                          <FormLabel className="text-lg">Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Priya Sharma" {...field} className="py-6 text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., +91 98765 43210" {...field} className="py-6 text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., priya@example.com" {...field} className="py-6 text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Sharma Enterprises" {...field} className="py-6 text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request Consultation"
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
