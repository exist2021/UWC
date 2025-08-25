import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Contact() {
  const googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true";

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold font-headline">Ready to own the ground? sign up</CardTitle>
              <CardDescription className="text-muted-foreground pt-2 md:text-lg">
                Drop us a message and let’s get your vision moving.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[800px] w-full">
                <iframe
                  src={googleFormUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="absolute left-0 top-0 h-full w-full"
                  title="Contact Form"
                >
                  Loading…
                </iframe>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Please create your own Google Form and replace the placeholder URL in{' '}
                <code className="bg-muted px-1 py-0.5 rounded">src/components/sections/contact.tsx</code>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
