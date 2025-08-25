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

// 1. Define the validation schema for the form fields.
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

  //
  // INSTRUCTIONS: How to connect this form to your Google Form
  //
  // Step 1: Create a Google Form with fields for: Name, Email, Phone (Optional), and Vision.
  //
  // Step 2: Get your Google Form's Action URL.
  //    a. Open your Google Form, click "Send".
  //    b. Go to the "Send via link" tab (🔗).
  //    c. Copy the link. It will look like: https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=sf_link
  //    d. Modify the URL by replacing "/viewform?usp=sf_link" with "/formResponse".
  //    e. Paste the modified URL below.
  //
  const googleFormActionUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdeweZRTAM74gfSpTEW9UEzwvAitULg67c0puZW7dqq41TuiQ/formResponse';


  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    //
    // Step 3: Get the "name" attribute for each field from a pre-filled link.
    //    a. In your Google Form, click the 3-dot menu and "Get pre-filled link".
    //    b. Fill in sample data and click "Get link".
    //    c. Copy the link and paste it in a text editor.
    //    d. Find the `entry.xxxxxxxxx` values in the URL and paste them below.
    //
    const formData = new FormData();
    formData.append('entry.78448593', data.name);
    formData.append('entry.1448024452', data.email);
    formData.append('entry.647299928', data.phone || '');
    formData.append('entry.1107769049', data.vision);

    // Do not modify below this line
    if (googleFormActionUrl.includes('PASTE_YOUR_FORM_ID_HERE')) {
        toast({
            title: 'Form Not Connected',
            description: 'Please follow the instructions in src/components/sections/contact.tsx to connect your Google Form.',
            variant: 'destructive',
        });
        return;
    }

    setIsSubmitting(true);
    try {
      await fetch(googleFormActionUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // This is required for Google Forms submissions
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
