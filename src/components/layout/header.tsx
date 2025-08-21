"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
];

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center justify-start">
          <Link href="#home" className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="font-bold">UrbanWiz Communications</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <nav className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button asChild variant="destructive" className="hidden md:inline-flex">
            <Link href="#contact">Contact</Link>
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-2">
                   <Link href="#home" className="flex items-center space-x-2" onClick={() => setMenuOpen(false)}>
                      <MessageSquare className="h-6 w-6 text-primary" />
                      <span className="font-bold">UrbanWiz</span>
                    </Link>
                </div>
                <nav className="mt-6 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                      href="#contact"
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      Contact
                    </Link>
                </nav>
                <Button asChild variant="destructive" className="mt-auto">
                    <Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
