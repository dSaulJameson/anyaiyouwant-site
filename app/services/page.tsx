import type { Metadata } from "next";
import Link from "next/link";
import { ServicesGrid } from "@/components/services-grid";
import { TIDYCAL_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services — Custom AI, Automation, Web, Fractional CTO",
  description:
    "Full-stack capabilities from one operator: Machine Learning, Automation, Web & App Development, Integration, AI Ad Studio, and Fractional CTO. Stack-agnostic across GCP, AWS, Azure, and Hetzner. Project-based or retainer-based engagements.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — ML, Automation, Web, Fractional CTO",
    description: "Six capabilities. One operator. Stack-agnostic.",
    url: "/services",
  },
};

const engagements = [
  {
    title: "Sprint",
    range: "2 – 40 hrs",
    blurb: "A specific thing that needs to ship this week. Reports, scrapers, integrations, ML proof-of-concepts.",
    examples: ["Reporting fix", "Single integration", "PoC model", "Audit + plan"],
  },
  {
    title: "Project",
    range: "40 – 400 hrs",
    blurb: "A real deliverable with a deadline. Net-new app, full pipeline, dashboards, or a feature your team can&rsquo;t schedule.",
    examples: ["MVP web app", "ML pipeline", "Reporting overhaul", "Ad studio rollout"],
    featured: true,
  },
  {
    title: "Fractional CTO",
    range: "ongoing",
    blurb: "Strategic + hands-on. Architecture, hiring, vendor selection, and the parts no one else can ship.",
    examples: ["Roadmap", "Hiring loop", "Vendor & cloud", "Board updates"],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="label-mono">Services</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
          One operator. <span className="text-gradient">Full-stack capabilities.</span>
        </h1>
        <p className="mt-5 text-muted text-lg max-w-2xl">
          You don&apos;t need to coordinate five vendors. Whether the work is a one-off script or
          a multi-quarter platform, it&apos;s the same person — me — choosing the stack and shipping the result.
        </p>
      </section>

      <ServicesGrid withHeader={false} />

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-8">
        <div className="label-mono">How we work</div>
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold mb-8">Three engagement shapes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {engagements.map((e) => (
            <div
              key={e.title}
              className={`card p-6 ${e.featured ? "ring-1 ring-accent/40" : ""}`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <span className="text-xs font-mono text-muted">{e.range}</span>
              </div>
              <p
                className="mt-3 text-sm text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: e.blurb }}
              />
              <ul className="mt-4 space-y-1.5">
                {e.examples.map((x) => (
                  <li key={x} className="text-sm flex gap-2">
                    <span className="text-accent">›</span>
                    <span className="text-foreground/85">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
        <div className="card p-8 md:p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="label-mono">Stack-agnostic</div>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold">Comfortable everywhere it matters</h2>
              <p className="mt-3 text-muted leading-relaxed">
                Cloud, database, language, framework, BI tool — pick what fits the problem.
                No religious wars, just shipped systems.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 self-start">
              {[
                ["Clouds", "GCP · AWS · Azure · Hetzner · Vercel"],
                ["Databases", "Postgres · BigQuery · Snowflake · Mongo · Redis"],
                ["Languages", "Python · TypeScript · Go · Rust · SQL"],
                ["BI", "Power BI · Tableau · Looker · custom"],
              ].map(([k, v]) => (
                <div key={k} className="col-span-2 bg-surface-2/60 border border-border rounded-md p-3">
                  <div className="label-mono text-[10px]">{k}</div>
                  <div className="mt-1 text-sm font-mono text-foreground/90">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-24">
        <div className="card p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Tell me what&apos;s breaking.
          </h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Fifteen minutes. By the end you&apos;ll have a recommended approach, a rough estimate, and a
            timeline.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href={TIDYCAL_URL}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-md bg-accent text-black font-medium hover:bg-accent/90 transition-colors"
            >
              Book 15 minutes →
            </a>
            <Link href="/work" className="px-5 py-3 rounded-md border border-border hover:bg-surface transition-colors">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
