import { Footer } from '@/components/landing/footer';
import { Hero } from '@/components/landing/hero';
import { ProcessSummary } from '@/components/landing/process-summary';
import { Evaluation } from '@/components/landing/evaluation';
import { Faq } from '@/components/landing/faq';
import { Resources } from '@/components/landing/resources';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Evaluation />
        <ProcessSummary />
        <Resources />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
