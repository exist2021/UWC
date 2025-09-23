
import { Atom } from 'lucide-react';

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
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            <a href="https://manojnayak.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Vibe coded by Manoj Nayak
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
