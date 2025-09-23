import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare, Calculator, PieChart, Workflow } from 'lucide-react';

const processSteps = [
  {
    icon: PieChart,
    title: 'Feed Probabilities',
    description: 'Input your sales channel data and conversion rates.',
  },
  {
    icon: Workflow,
    title: 'Markov Modeling',
    description: 'Our AI visualizes leads flowing through probabilistic states.',
  },
  {
    icon: Calculator,
    title: 'Cost & Feasibility',
    description: 'Analyze costs and forecast profitability with mini-charts.',
  },
  {
    icon: BotMessageSquare,
    title: 'Get Business Insights',
    description: 'Receive actionable plans based on data-driven science.',
  },
];

export function ProcessSummary() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
              How GTM Lab Brings Data Science to Business Strategy
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance">
              We translate your channel probabilities, costs, and goals into actionable business
              plans—using Markov theory and creative modeling. Feel business science in action.
            </p>
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
              <CardContent className="space-y-2">
                <CardTitle className="text-xl font-headline">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
