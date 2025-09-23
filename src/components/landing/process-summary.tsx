import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, DollarSign, Target, Users } from 'lucide-react';

export function ProcessSummary() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Method</div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
              A Scientific Approach to Growth
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance">
              At GTM Lab, we combine business intuition with data science. Utilizing Markov
              probability theory, we model your sales funnel as a series of probabilistic states —
              from lead to prospect, prospect to buyer. We feed in lead conversion rates, sales and
              marketing cost variables, and channel-specific data to forecast profitable GTM
              scenarios.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-5 lg:gap-12">
          <div className="flex justify-center">
            <Card className="w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-accent" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-headline">Lead</CardTitle>
              </CardContent>
            </Card>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <ArrowRight className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="flex justify-center">
            <Card className="w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <Target className="w-12 h-12 mx-auto text-accent" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-headline">Prospect</CardTitle>
              </CardContent>
            </Card>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <ArrowRight className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="flex justify-center">
            <Card className="w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <DollarSign className="w-12 h-12 mx-auto text-accent" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-headline">Buyer</CardTitle>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="text-center">
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
            Harness the predictive power of Markov probability theory to scientifically plan your
            sales channels and GTM strategy. GTM Lab converts your business data into probabilistic
            profit insights — so you know where to focus sales efforts for maximum return.
          </p>
        </div>
      </div>
    </section>
  );
}
