const pillars = [
  {
    eyebrow: "01 / FULL TOOLKIT",
    title: "Same person, every layer.",
    body:
      "Model, app, pipeline, integration, dashboard, board update — same operator on each. Hire me for any one of them and you don't lose access to the others.",
  },
  {
    eyebrow: "02 / CUSTOM-BUILT",
    title: "Real code where it matters.",
    body:
      "n8n and Zapier when the problem genuinely fits. Custom Python, Airflow, Cloud Build, GitHub Actions when it doesn't — and that's most of the time.",
  },
  {
    eyebrow: "03 / BUILT TO LAST",
    title: "Still in production, years later.",
    body:
      "One of my predictive models has been running for 9 years. Same algorithm, same coefficients, same client. Things I ship are built to keep working long after I'm gone.",
  },
];

export function HowDifferent() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          <div className="label-mono">Why hire me, specifically</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Three things that make a difference.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <div key={p.title} className="card p-6">
              <div className="label-mono text-accent">{p.eyebrow}</div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Zapier-fails-here callout */}
        <div className="mt-12 card p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-3">
              <div className="label-mono">Real example</div>
              <div className="mt-2 text-[11px] font-mono text-accent">where Zapier breaks</div>
            </div>
            <div className="md:col-span-9">
              <p className="text-foreground/90 leading-relaxed text-[15px]">
                A client wanted to track <span className="text-foreground">every individual click</span>{" "}
                across their email campaigns — with deduplication, attribution logic, and a rolling
                analytics layer. That&apos;s not a Zapier problem. It&apos;s a custom Python pipeline,
                in GitHub, running on Cloud Build, with idempotent logic that doesn&apos;t double-count.
              </p>
              <p className="mt-3 text-muted text-sm">
                Most of my engagements look like this — somewhere on the path from &ldquo;we&apos;ll
                glue these tools together&rdquo; to &ldquo;wait, this needs real engineering.&rdquo;
                That&apos;s the line I sit on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
