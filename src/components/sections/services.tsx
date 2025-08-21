import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Scissors, Users, Zap } from 'lucide-react';
import React from 'react';

const services = [
  {
    icon: <Scissors className="h-10 w-10 text-primary" />,
    title: 'Cut through the complexity',
    description: 'We break down your big ideas into simple, clear messages that everyone gets.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Align your team',
    description: 'We create a shared language so your employees and stakeholders work toward the same goals.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: 'Communicate with impact',
    description: 'From planning to creating content, we make sure your message drives action and gets results.',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How We Help</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Making your vision something your whole team can move forward with.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="items-center text-center">
                <div className="mb-4 rounded-full bg-accent p-4">
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="pt-2">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
