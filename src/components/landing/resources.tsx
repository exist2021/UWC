import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, DollarSign, Filter } from 'lucide-react';

const resourceItems = [
  {
    icon: Filter,
    title: "Understanding Sales Funnels",
    description: "A sales funnel visualizes the journey from prospect to customer. Understanding each stage helps identify where potential customers drop off, allowing you to optimize your strategy for higher conversions."
  },
  {
    icon: DollarSign,
    title: "Cost Evaluation Across Channels",
    description: "Not all sales channels are created equal. We analyze the Customer Acquisition Cost (CAC) for each channel to determine which ones provide the best return on investment, ensuring your marketing budget is spent effectively."
  },
  {
    icon: Lightbulb,
    title: "How Our Approach Works",
    description: "By applying Markov probability theory, we move beyond simple funnel metrics. We model the complex interactions between channels and stages, giving you a dynamic and predictive view of your GTM performance."
  }
];

export function Resources() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
              Resources
            </h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Educational snippets on key concepts in go-to-market strategy.
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {resourceItems.map((item, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-headline">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
