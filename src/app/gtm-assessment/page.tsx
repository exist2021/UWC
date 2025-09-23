import { GtmAssessmentForm } from '@/components/gtm-assessment-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GtmAssessmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary font-headline">
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </header>
      <main className="flex-grow">
        <GtmAssessmentForm />
      </main>
    </div>
  );
}
