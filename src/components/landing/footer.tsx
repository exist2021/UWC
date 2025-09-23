import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary/50 p-6 md:px-8 md:py-12 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-primary font-headline">GTM Lab</p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GTM Lab. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            <a
              href="mailto:contact@gtmlab.dev"
              className="hover:text-primary transition-colors"
            >
              contact@gtmlab.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
