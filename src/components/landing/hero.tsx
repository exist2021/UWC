import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="space-y-2">
              <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-primary">
                GTM Lab
              </h1>
              <p className="max-w-[600px] font-headline text-foreground/80 md:text-xl lg:text-2xl animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                Where Go-To-Market Meets Scientific Business Modeling
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 pt-4">
              <a href="#form-section">
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                  Request Your GTM Probability Assessment
                </Button>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right animate-in fade-in slide-in-from-top-12 duration-1000">
            <div className="inline-block rounded-lg bg-card p-6 shadow-lg">
              <h3 className="text-lg font-bold font-headline text-primary">Contact Us</h3>
              <p className="text-muted-foreground mt-2">Dr. Evelyn Reed</p>
              <p className="text-muted-foreground">(555) 123-4567</p>
              <p className="text-muted-foreground">contact@gtmlab.dev</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
