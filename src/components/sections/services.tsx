import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Scissors, Users, Zap, Briefcase } from 'lucide-react';
import React from 'react';

const services = [
  {
    icon: <Scissors className="h-10 w-10 text-primary" />,
    title: 'Cut through the complexity',
    description: 'We take your high-level vision and break it down into practical, straightforward language. No jargon. No confusion. Just clear messaging that helps everyone—from your senior team to frontline employees—understand what really matters and what needs to get done.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Align your team',
    description: 'It’s easy for miscommunication to get in the way of progress. We help you create a unified language for your organization, so everyone is moving toward the same objective with purpose. This means faster decisions, fewer mistakes, and a stronger culture of execution.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: 'Communicate with impact',
    description: 'A great message doesn’t just sound good—it drives results. We help create the presentations, documents, emails, and stories that get your whole team on the same page and give your stakeholders confidence and clarity. Whether it’s for a big rollout or daily updates, your message will always land.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'Ongoing support',
    description: 'We don’t just walk away after delivering the strategy. Need to adjust your messaging as plans evolve? We’re always available for quick corrections, new project launches, or continuous improvement—so your communication always stays sharp and relevant.',
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
              Making your vision something your whole team can now move forward with.
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
