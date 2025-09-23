import { Footer } from '@/components/landing/footer';
import { Hero } from '@/components/landing/hero';
import { LeadForm } from '@/components/landing/lead-form';
import { ProcessSummary } from '@/components/landing/process-summary';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <ProcessSummary />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
