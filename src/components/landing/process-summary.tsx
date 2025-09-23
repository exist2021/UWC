import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare, Calculator, PieChart, Workflow } from 'lucide-react';

const processSteps = [
  {
    icon: PieChart,
    title: '1. Share your channel data — conversion rates, sales/marketing costs',
  },
  {
    icon: Workflow,
    title: '2. We model and simulate your GTM funnel using Markov probability theory',
  },
  {
    icon: Calculator,
    title: '3. Receive a tailored feasibility report with key metrics and recommendations',
  },
  {
    icon: BotMessageSquare,
    title: '4. Make confident decisions to launch or improve your GTM strategy',
  },
];

export function ProcessSummary() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
              The Process
            </h2>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Card
              key={index}
              className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-accent"
            >
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-headline">{step.title}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
