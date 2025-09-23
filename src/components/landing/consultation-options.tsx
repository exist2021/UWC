'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle } from 'lucide-react';

export function ConsultationOptions() {
  const whatsappNumber = '919286039114';
  const email = 'contact@gtmlab.dev';
  const subject = 'GTM Consultation Request';
  const body = "Hello, I'd like to book a free GTM consultation call.";
  const encodedBody = encodeURIComponent(body);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedBody}`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          size="lg" 
          className="w-full text-lg px-8 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Book a Free Consultation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-primary">Book a Consultation</DialogTitle>
          <DialogDescription>
            Choose your preferred method to get in touch with us.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button className="w-full h-14 text-lg bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </a>
          <a href={mailtoUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="w-full h-14 text-lg">
              <Mail className="mr-2 h-5 w-5" />
              Send an Email
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
