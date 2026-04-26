import Link from "next/link";

type Service = {
  title: string;
  blurb: string;
  bullets: string[];
  glyph: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Machine Learning",
    blurb: "Real models for real problems — not LLM wrapper theater.",
    bullets: [
      "Forecasting, recommendation, lead scoring",
      "Bayesian regression, gradient boosting, deep learning",
      "Productionized with monitoring, retraining, MLOps",
    ],
    glyph: <Glyph d="M3 17l6-6 4 4 8-8" />,
  },
  {
    title: "Automation",
    blurb: "If you do it twice, it shouldn't need humans the third time.",
    bullets: [
      "CRM, voice agents, n8n / Zapier / custom",
      "Reporting stacks: 20 sources → one source of truth",
      "Power BI, Tableau, Looker — or custom dashboards",
    ],
    glyph: <Glyph d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />,
  },
  {
    title: "Web & App Dev",
    blurb: "Full-stack apps that handle real revenue and real users.",
    bullets: [
      "Next.js, Node, Python, Stripe integrations",
      "Multi-tenant, auth, payments, revenue splits",
      "Live products: storywarz.win, songselfie.com",
    ],
    glyph: <Glyph d="M3 4h18v14H3zM8 20h8M12 18v2" />,
  },
  {
    title: "Integration",
    blurb: "Make every system speak the same language — your way.",
    bullets: [
      "CRMs, clouds, AI/LLMs, social, payments",
      "Event-driven pipelines, webhooks, queues",
      "GCP / AWS / Azure / Hetzner — agnostic",
    ],
    glyph: <Glyph d="M9 7h6M9 12h6M9 17h6M5 7h.01M5 12h.01M5 17h.01" />,
  },
  {
    title: "AI Ad Studio",
    blurb: "Studio-quality ads in hours, not weeks.",
    bullets: [
      "Empty venue → photo ad → video ad",
      "Tuned models, brand-aware, on-platform sizing",
      "Per-campaign cost a fraction of an agency",
    ],
    glyph: <Glyph d="M2 6h20M2 12h20M2 18h20" />,
  },
  {
    title: "Fractional CTO",
    blurb: "An engineer who can also talk to your board.",
    bullets: [
      "Architecture review, hiring, vendor selection",
      "Roadmap → execution → measurement",
      "Comfortable with founders, ICs, and Fortune 500s",
    ],
    glyph: <Glyph d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  },
];

function Glyph({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export function ServicesGrid({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {withHeader && (
          <div className="max-w-3xl mb-12">
            <div className="label-mono">What I do</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              Six capabilities. <span className="text-gradient">One operator.</span>
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              Most consultants do one thing. I&apos;ve been writing algorithms since before the LLM hype,
              shipping web apps that handle payments, and re-architecting reporting stacks the same week.
              You don&apos;t need to coordinate five vendors.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.title} className="card p-6 transition-all hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-md bg-surface-2 flex items-center justify-center text-accent">
                {s.glyph}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.blurb}</p>
              <ul className="mt-4 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="text-sm text-foreground/85 flex gap-2">
                    <span className="text-accent">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="px-5 py-3 rounded-md border border-border text-foreground hover:bg-surface transition-colors text-sm"
          >
            Explore all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
