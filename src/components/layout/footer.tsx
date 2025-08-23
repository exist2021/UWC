import React from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', href: 'https://x.com/UWCdigital', icon: <Twitter className="h-5 w-5" /> },
    { name: 'Instagram', href: 'https://instagram.com/UWCdigital', icon: <Instagram className="h-5 w-5" /> },
    { name: 'YouTube', href: 'https://youtube.com/@UWCdigital', icon: <Youtube className="h-5 w-5" /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/uwcdigital', icon: <Linkedin className="h-5 w-5" /> },
  ];

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container flex flex-col items-center justify-between py-6 text-center sm:flex-row">
        <div className="flex space-x-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground transition-colors hover:text-accent"
              aria-label={link.name}
            >
              {link.icon}
            </Link>
          ))}
        </div>
        <p className="text-sm mt-4 sm:mt-0">
          &copy; {currentYear} UrbanWiz Communications. All rights reserved.
        </p>
        <p className="text-xs mt-4 sm:mt-0">
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