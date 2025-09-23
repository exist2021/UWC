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
        <div className="flex flex-col items-center md:items-end gap-3">
           <p className="text-sm text-muted-foreground font-semibold">Dr. Evelyn Reed, PhD</p>
          <div className="flex gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
          <a
              href="mailto:contact@gtmlab.dev"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              contact@gtmlab.dev
            </a>
        </div>
      </div>
    </footer>
  );
}
