import { Github, Linkedin, Twitter, Atom } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary/50 p-6 md:px-8 md:py-12 w-full border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
            <Atom className="h-8 w-8 text-primary" />
            <div className="text-left">
              <p className="text-lg font-semibold text-primary font-headline">GTM Lab</p>
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} GTM Lab. All rights reserved.
              </p>
            </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3 text-sm text-muted-foreground">
           <p className="font-semibold">Dr. Evelyn Reed</p>
            <a
              href="mailto:contact@gtmlab.dev"
              className="hover:text-primary transition-colors"
            >
              contact@gtmlab.dev
            </a>
             <a
              href="tel:5551234567"
              className="hover:text-primary transition-colors"
            >
              (555) 123-4567
            </a>
             <a
              href="https://www.gtmlab.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              www.gtmlab.dev
            </a>
        </div>
      </div>
    </footer>
  );
}
