import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BarChart3, CheckCircle2, Code2 } from "lucide-react";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { getIndustry, industries } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return industries.map((industry) => ({ slug: industry.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const industry = getIndustry(slug); return industry ? { title: `${industry.name} Product Engineering, Data & AI`, description: `${industry.summary} Explore full-stack systems, operating use cases, KPIs, and a representative analytics example.`, alternates: { canonical: `/industries/${slug}` } } : {}; }

export default async function IndustryPage({ params }: Props) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();
  const path = `/industries/${industry.slug}`;
  return (
    <div className="pt-16">
      <ServiceJsonLd name={`${industry.name} product engineering`} description={industry.summary} path={path} />
      <BreadcrumbJsonLd items={[{ name: "Industries", path: "/industries" }, { name: industry.name, path }]} />
      <section className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7"><div className="label-mono">Industry / {industry.name}</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">Software and decision systems for <span className="text-gradient">{industry.name.toLowerCase()}.</span></h1><p className="mt-5 text-muted text-lg leading-relaxed max-w-3xl">{industry.summary}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={`/book?industry=${industry.slug}`} className="px-5 py-3 rounded-md bg-accent text-black font-medium inline-flex items-center gap-2">Talk to an engineer <ArrowRight size={16} /></Link><Link href={`/demos/${industry.dashboard}`} className="px-5 py-3 rounded-md border border-border hover:bg-surface inline-flex items-center gap-2"><BarChart3 size={17} /> View analytics example</Link></div></div>
        <aside className="lg:col-span-5 card p-6"><div className="label-mono">Operating measures</div><div className="mt-5 grid sm:grid-cols-2 gap-3">{industry.kpis.map((kpi) => <div key={kpi} className="flex gap-2 text-sm"><CheckCircle2 size={15} className="text-success shrink-0 mt-0.5" />{kpi}</div>)}</div><p className="mt-5 pt-5 border-t border-border text-xs text-muted">KPIs guide the product and data model. They are not a substitute for understanding the workflow, incentives, and cost of a wrong decision.</p></aside>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20"><div className="label-mono">Software and platform opportunities</div><h2 className="mt-2 text-3xl font-semibold">Systems that fit the way the business operates.</h2><div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">{industry.systems.map((system, index) => <article key={system} className="card p-5"><Code2 size={18} className="text-accent" /><div className="label-mono text-accent mt-4">0{index + 1}</div><h3 className="mt-3 font-semibold">{system}</h3><p className="mt-2 text-sm text-muted">Designed around your users, systems, permissions, data, and operating constraints.</p></article>)}</div></section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20 grid lg:grid-cols-12 gap-10"><div className="lg:col-span-7"><div className="label-mono">Data and intelligence</div><h2 className="mt-2 text-3xl font-semibold">Where better decisions compound.</h2><div className="mt-6 grid sm:grid-cols-2 gap-3">{industry.useCases.map((useCase) => <div key={useCase} className="card p-5"><h3 className="font-semibold">{useCase}</h3><p className="mt-2 text-sm text-muted">Connected to the production workflow, not left as an isolated analysis.</p></div>)}</div></div><aside className="lg:col-span-5 card p-7"><div className="label-mono">Representative analytics lab</div><h2 className="mt-2 text-2xl font-semibold">Explore three years of synthetic operating data.</h2><p className="mt-3 text-muted text-sm leading-relaxed">The interactive dashboard demonstrates industry-specific KPI logic and interface patterns. Client systems also include the source integrations, data model, security, quality controls, and deployment behind the screen.</p><Link href={`/demos/${industry.dashboard}`} className="mt-6 inline-flex items-center gap-2 text-sm font-mono text-accent">Open the {industry.name.toLowerCase()} example <ArrowRight size={14} /></Link></aside></section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-20"><div className="card p-8 md:p-10 text-center"><h2 className="text-3xl font-semibold">Bring us the messy operating version.</h2><p className="mt-3 text-muted max-w-2xl mx-auto">Disconnected systems, spreadsheet operations, a stalled product, uncertain metrics, or an AI opportunity that needs an engineering reality check are all valid starting points.</p><Link href={`/book?industry=${industry.slug}`} className="mt-6 inline-flex px-5 py-3 rounded-md bg-accent text-black font-medium">Talk to an engineer about {industry.name.toLowerCase()} →</Link></div></section>
    </div>
  );
}
