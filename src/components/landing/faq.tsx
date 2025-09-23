import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What is Go-To-Market (GTM) Strategy?",
    answer: "A Go-To-Market (GTM) strategy is a comprehensive plan that outlines how a company will launch a new product or service, enter a new market, or reach new customer segments. It covers everything from pricing and sales channels to marketing and customer support."
  },
  {
    question: "How does probability modeling apply to GTM?",
    answer: "We use probability models, specifically Markov theory, to simulate the customer journey. Each step in your sales funnel—from initial lead to final conversion—is assigned a probability. By modeling these interconnected probabilities, we can forecast outcomes, identify bottlenecks, and predict the financial viability of your strategy."
  },
  {
    question: "What are the expected outcomes?",
    answer: "You will receive a detailed feasibility report that provides a data-driven forecast of your GTM strategy's potential. This includes key performance metrics, profitability projections per channel, risk assessments, and actionable recommendations to optimize your approach for success."
  },
  {
    question: "Who is this service for?",
    answer: "Our service is designed for founders, marketing managers, sales leaders, and product managers at small and medium-sized enterprises (MSMEs) who want to make informed, data-backed decisions about their go-to-market strategies."
  }
]


export function Faq() {
  return (
    <section className="w-full py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-foreground/80 md:text-xl">
            Find answers to common questions about our scientific GTM evaluation process.
          </p>
        </div>
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-headline text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-foreground/70">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
