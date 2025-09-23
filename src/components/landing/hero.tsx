import { Button } from '@/components/ui/button';
import { Atom } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 bg-background overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233F51B5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-1000">
          <div className="flex items-center justify-center gap-4 text-primary">
            <Atom className="w-16 h-16" />
            <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              GTM Lab
            </h1>
          </div>
          <p className="max-w-[800px] font-headline text-2xl font-semibold text-foreground/90 md:text-3xl lg:text-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Scientific Evaluation of Your Go-To-Market Fit
          </p>
          <p className="max-w-[700px] text-lg text-foreground/70 md:text-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            Data-driven probabilistic modeling to forecast your sales channel profitability and GTM feasibility — so you invest with confidence.
          </p>
          <div className="pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <a href="#form-section">
              <Button 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12 py-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:pulse"
              >
                Book Your Free GTM Consultation Call
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
