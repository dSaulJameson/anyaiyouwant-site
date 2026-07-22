import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/lib/site-content";

export const metadata: Metadata = { title: "Industry Software, Analytics & AI Solutions", description: "Industry-specific software, analytics, machine-learning, and secure AI use cases with decision-ready KPIs and live dashboard examples.", alternates: { canonical: "/industries" } };

export default function IndustriesPage() {
  return <div className="pt-16"><section className="max-w-7xl mx-auto px-6 md:px-10"><div className="label-mono">Industries</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">Technical range informed by <span className="text-gradient">operating reality.</span></h1><p className="mt-5 text-muted text-lg max-w-3xl">We learn the economics, decisions, and constraints of each business rather than forcing every client into the same software or AI template.</p><div className="mt-12 grid md:grid-cols-2 gap-5">{industries.map((industry) => <article key={industry.slug} className="card p-6"><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-semibold">{industry.name}</h2><p className="mt-3 text-sm text-muted leading-relaxed">{industry.summary}</p></div><span className="label-mono shrink-0">{industry.kpis.length} KPIs</span></div><div className="mt-5 flex flex-wrap gap-2">{industry.kpis.slice(0,4).map((kpi) => <span key={kpi} className="px-2.5 py-1 rounded-full border border-border bg-surface text-xs text-muted">{kpi}</span>)}</div><div className="mt-6 flex gap-4 text-sm font-mono"><Link href={`/industries/${industry.slug}`} className="text-accent">Explore solutions →</Link><Link href={`/demos/${industry.dashboard}`} className="text-muted hover:text-foreground">Live dashboard →</Link></div></article>)}</div></section></div>;
}

