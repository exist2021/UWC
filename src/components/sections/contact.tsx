import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold font-headline">Ready to take the next step?</CardTitle>
              <CardDescription className="text-muted-foreground pt-2 md:text-lg">
                Drop us a message and let’s get your vision moving.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
