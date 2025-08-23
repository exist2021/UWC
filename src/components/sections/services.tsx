import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Scissors, Users, Zap, Briefcase } from 'lucide-react';
import React from 'react';

const services = [
  {
    icon: <Scissors className="h-10 w-10 text-accent" />,
    title: 'Cut through the complexity',
    description: 'We simplify your big ideas into clear, actionable messages everyone understands.',
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: 'Align your team',
    description: 'We create a shared language so your team moves together toward the same goals.',
  },
  {
    icon: <Zap className="h-10 w-10 text-accent" />,
    title: 'Communicate with impact',
    description: 'We craft messages that get results and keep your stakeholders confident.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-accent" />,
    title: 'Ongoing support',
    description: 'We stay available to help you adapt messaging as your plans evolve.',
  }
];

export default function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How We Help</h2>
            <p className="max-w-[900px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Making your vision something your whole team can move forward with.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-card text-card-foreground h-full">
              <CardHeader className="items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="pt-2 text-center">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
