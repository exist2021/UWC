import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container flex flex-col h-16 items-center justify-center text-center">
        <p className="text-sm">
          &copy; {currentYear} UrbanWiz Communications. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Made via AI 🤖 Vibe-coding by{' '}
          <Link
            href="https://manojnayak.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent"
          >
            Manoj Nayak
          </Link>
        </p>
      </div>
    </footer>
  );
}
