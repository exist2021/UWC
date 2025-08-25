"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

// 1. Create your Google Form.
// 2. Get the pre-filled link for each field to find the 'name' attribute.
//    It will look like 'entry.xxxxxxx'.
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().optional(),
  vision: z.string().min(10, { message: 'Vision must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      vision: '',
    },
  });
  
  // 3. Replace this with your Google Form's action URL.
  //    It should end in '/formResponse'.
  const googleFormActionUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';


  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    // 4. Replace these with the 'name' attributes from your Google Form fields.
    formData.append('entry.xxxxxxxxx', data.name); // Replace with Name field ID
    formData.append('entry.xxxxxxxxx', data.email); // Replace with Email field ID
    formData.append('entry.xxxxxxxxx', data.phone || ''); // Replace with Phone field ID
    formData.append('entry.xxxxxxxxx', data.vision); // Replace with Vision field ID

    try {
      await fetch(googleFormActionUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Important: Google Forms requires this
      });
      
      toast({
        title: 'Success!',
        description: "Your vision has been shared. We'll be in touch soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold font-headline">Ready to own the ground?</CardTitle>
              <CardDescription className="text-muted-foreground pt-2 md:text-lg">
                Drop us a message and let’s get your vision moving.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
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
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vision"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vision</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your Vision as succinctly as possible" {...field} className="min-h-[120px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Vision'}
                  </Button>
                </form>
              </Form>
               <p className="mt-4 text-center text-xs text-muted-foreground">
                This form submits to a Google Form. Please follow the instructions in{' '}
                <code className="bg-muted px-1 py-0.5 rounded">src/components/sections/contact.tsx</code> to connect your own form.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
