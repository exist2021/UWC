import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare, Calculator, PieChart, Workflow } from 'lucide-react';

const processSteps = [
  {
    icon: PieChart,
    title: '1. Tell us about your leads and sales channels',
  },
  {
    icon: Workflow,
    title: '2. We analyze your chances of success for each channel',
  },
  {
    icon: Calculator,
    title: '3. Together, we build a simple, affordable plan',
  },
  {
    icon: BotMessageSquare,
    title: '4. You focus on growing your business',
  },
];

const helpPoints = [
  'Understand which sales channels bring the best customers',
  'See your chances of turning leads into real buyers before spending money',
  'Get clear advice on where to focus your marketing budget',
  'Avoid wasted time and money on sales channels that don’t work for you',
]

export function ProcessSummary() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
              How We Help
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance">
              We study your sales paths and costs, so you can grow your business profitably and confidently.
            </p>
          </div>
        </div>

        <div className="grid gap-8 mb-20 md:grid-cols-2">
            {helpPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <CheckIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg text-foreground/80">{point}</p>
              </div>
            ))}
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
              Our Process
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
