const stack = [
  // Languages
  "Python", "TypeScript", "SQL",
  // ML / AI
  "PyTorch", "TensorFlow", "Hugging Face",
  "Vertex AI", "SageMaker", "Azure ML",
  "OpenAI", "Anthropic", "Claude",
  // Web / Backend
  "Next.js", "FastAPI",
  // Databases
  "Postgres", "MongoDB", "Prisma", "BigQuery", "Snowflake",
  // Cloud
  "GCP", "AWS", "Azure", "Hetzner", "Vercel",
  // DevOps
  "Docker", "Kubernetes", "GitHub",
  // Automation
  "n8n", "Zapier", "Any API", "Any CRM",
  // BI / Data
  "Power BI", "Tableau", "Looker", "dbt", "Airflow",
];

export function CapabilityStrip() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
        <div className="text-center label-mono mb-4">
          One operator · Pick a tool — I&apos;ve probably shipped with it
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
