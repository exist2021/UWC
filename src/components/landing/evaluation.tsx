
const evaluationPoints = [
  'Move beyond guesswork to confident decisions',
  'Optimize budget by focusing on profitable channels',
  'Avoid costly missteps with data-backed forecasting',
  'Understand the full GTM funnel from leads through sales conversions',
]

export function Evaluation() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-primary">
              How We Evaluate GTM Fit
            </h2>
            <p className="text-lg text-foreground/80">
              GTM Lab applies probability theory to model your sales funnel as a series of conversion probabilities and associated costs across various sales channels. By simulating profitability and feasibility, we provide a clear forecast of your strategy's potential before you invest heavily in launching or scaling.
            </p>
            <p className="text-lg text-foreground/80">
              Using Markov theory, we quantify the chances of success and profitability, giving you clear, actionable insights on which channels to prioritize and where risks lie.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-primary">
              Why Choose Scientific GTM Evaluation?
            </h2>
            <div className="grid gap-4 mt-6">
              {evaluationPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <CheckIcon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg text-foreground/80">{point}</p>
                </div>
              ))}
            </div>
          </div>
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
