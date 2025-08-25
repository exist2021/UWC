"use client";

import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(1, { message: 'Phone number is required.' }),
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

  const googleFormActionUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdeweZRTAM74gfSpTEW9UEzwvAitULg67c0puZW7dqq41TuiQ/formResponse';
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    
    const tempForm = document.createElement('form');
    tempForm.method = 'POST';
    tempForm.action = googleFormActionUrl;
    tempForm.target = iframeRef.current!.name;
    
    const fields = {
      'entry.78448593': data.name,
      'entry.1448024452': data.email,
      'entry.647299928': data.phone,
      'entry.1107769049': data.vision,
    };
    
    for (const key in fields) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key as keyof typeof fields];
      tempForm.appendChild(input);
    }
    
    document.body.appendChild(tempForm);
    
    try {
      tempForm.submit();
      
      // Since form submission to an iframe doesn't give a direct success callback,
      // we'll optimistically show the success message after a short delay.
      setTimeout(() => {
        toast({
          title: 'Success!',
          description: "Your vision has been shared. We'll be in touch soon.",
        });
        form.reset();
        setIsSubmitting(false);
        document.body.removeChild(tempForm);
      }, 1000);

    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      document.body.removeChild(tempForm);
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
                        <FormLabel>Phone</FormLabel>
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
              <iframe 
                ref={iframeRef} 
                name="hidden-iframe" 
                style={{display: 'none'}} 
                onLoad={(e) => {
                  // The iframe has loaded the response from Google.
                  // This is another signal that the submission likely went through.
                }}
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}