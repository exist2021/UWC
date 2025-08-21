import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="w-full py-20 md:py-32 lg:py-40 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Turning Your Vision Into Clear Messages
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We help leaders translate their big ideas into language everyone can understand—and act on.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="#services">Explore Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
