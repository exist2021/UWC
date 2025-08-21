import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Real Communication That Works
            </h2>
            <p className="text-muted-foreground md:text-lg">
              You have a clear vision at the 30,000-foot level, but making your team, employees, and stakeholders understand the same vision isn’t easy. The curse of knowledge can get in the way. We get that. At Urbanwiz Communications, we break down your message so it connects with everyone who matters, enabling the organization to achieve its objectives.
            </p>
            <Button variant="link" size="lg" asChild className="p-0 text-lg text-destructive hover:text-destructive/80">
              <Link href="#contact">Let’s start the conversation &rarr;</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://i.postimg.cc/1tsd1xMx/AE6-CE211-4967-4-F17-962-D-5-B353-BA33911.png"
              alt="Team collaborating"
              data-ai-hint="team meeting collaboration"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
