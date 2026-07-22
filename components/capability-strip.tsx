const stack = ["Python", "TypeScript", "Go", "Rust", "SQL", "PyTorch", "scikit-learn", "Hugging Face", "OpenAI", "Anthropic", "Next.js", "FastAPI", "Postgres", "BigQuery", "Snowflake", "GCP", "AWS", "Azure", "Docker", "Kubernetes", "Power BI", "Tableau", "Looker", "dbt", "Airflow", "Any API", "Any CRM"];

export function CapabilityStrip() {
  return (
    <section className="border-y border-border bg-surface/40" aria-label="Engineering technologies">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
        <div className="text-center label-mono mb-4">Stack-agnostic engineering · tools follow the problem</div>
        <div className="relative overflow-hidden">
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[...stack, ...stack].map((item, index) => <span key={`${item}-${index}`} className="px-3 py-1.5 rounded-md border border-border bg-surface text-xs font-mono text-muted">{item}</span>)}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
