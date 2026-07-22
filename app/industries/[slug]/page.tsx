import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BarChart3, CheckCircle2 } from "lucide-react";
import { getIndustry, industries } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return industries.map((industry) => ({ slug: industry.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return { title: `${industry.name} Software, Analytics & AI`, description: `${industry.summary} Explore practical use cases, business KPIs, and a live three-year analytics dashboard.`, alternates: { canonical: `/industries/${slug}` } };
}

export default async function IndustryPage({ params }: Props) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();
  return <div className="pt-16"><section className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10"><div className="lg:col-span-7"><div className="label-mono">Industry / {industry.name}</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">Software and intelligence for <span className="text-gradient">{industry.name.toLowerCase()}.</span></h1><p className="mt-5 text-muted text-lg leading-relaxed max-w-3xl">{industry.summary}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={`/demos/${industry.dashboard}`} className="px-5 py-3 rounded-md bg-accent text-black font-medium inline-flex items-center gap-2"><BarChart3 size={17} /> Open the live dashboard</Link><Link href={`/book?industry=${industry.slug}`} className="px-5 py-3 rounded-md border border-border hover:bg-surface inline-flex items-center gap-2">Discuss a project <ArrowRight size={16} /></Link></div></div><aside className="lg:col-span-5 card p-6"><div className="label-mono">KPIs that belong in the room</div><div className="mt-5 grid sm:grid-cols-2 gap-3">{industry.kpis.map((kpi) => <div key={kpi} className="flex gap-2 text-sm"><CheckCircle2 size={15} className="text-success shrink-0 mt-0.5" />{kpi}</div>)}</div></aside></section><section className="max-w-7xl mx-auto px-6 md:px-10 mt-20"><div className="label-mono">High-value use cases</div><h2 className="mt-2 text-3xl font-semibold">Where engineering changes the operating decision.</h2><div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">{industry.useCases.map((useCase, index) => <article key={useCase} className="card p-5"><div className="label-mono text-accent">0{index + 1}</div><h3 className="mt-3 font-semibold">{useCase}</h3><p className="mt-2 text-sm text-muted">Built around your systems, definitions, security requirements, and workflow—not a generic industry template.</p></article>)}</div></section><section className="max-w-5xl mx-auto px-6 md:px-10 mt-20"><div className="card p-8 md:p-10 text-center"><h2 className="text-3xl font-semibold">Bring us the messy version.</h2><p className="mt-3 text-muted max-w-2xl mx-auto">Disconnected systems, uncertain metrics, spreadsheet operations, or an AI idea that needs a reality check are all valid starting points.</p><Link href={`/book?industry=${industry.slug}`} className="mt-6 inline-flex px-5 py-3 rounded-md bg-accent text-black font-medium">Send a {industry.name.toLowerCase()} project brief →</Link></div></section></div>;
}

