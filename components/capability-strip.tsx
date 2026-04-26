const stack = [
  "Python", "TypeScript", "Go", "Rust", "SQL", "PyTorch", "TensorFlow",
  "Next.js", "FastAPI", "Postgres", "BigQuery", "Snowflake", "Redis",
  "GCP", "AWS", "Azure", "Hetzner", "Vercel", "Docker", "Kubernetes",
  "n8n", "Zapier", "Stripe", "Twilio", "OpenAI", "Anthropic", "Claude",
  "Power BI", "Tableau", "Looker", "Recharts", "dbt", "Airflow",
];

export function CapabilityStrip() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
        <div className="text-center label-mono mb-4">
          A polyglot stack — pick a tool, I&apos;ve probably shipped with it
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[...stack, ...stack].map((s, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-md border border-border bg-surface text-xs font-mono text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
