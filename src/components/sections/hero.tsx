import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="w-full py-20 md:py-32 lg:py-40 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
              Giving Vision Solid Ground
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              We help leaders translate their big ideas into language everyone can understand—and act on.
            </p>
          </div>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="#services">Explore Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
