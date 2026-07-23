import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { caseStudies, getCaseStudy } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return caseStudies.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = getCaseStudy(slug); return item ? { title: `${item.title} — Case Study`, description: item.summary, alternates: { canonical: `/work/${slug}` } } : {}; }

export default async function CaseStudyPage({ params }: Props) {
  const item = getCaseStudy((await params).slug);
  if (!item) notFound();
  return (
    <div className="pt-16">
      <ArticleJsonLd title={item.title} description={item.summary} path={`/work/${item.slug}`} />
      <BreadcrumbJsonLd items={[{ name: "Work", path: "/work" }, { name: item.title, path: `/work/${item.slug}` }]} />
      <article className="max-w-6xl mx-auto px-6 md:px-10">
        <Link href="/work" className="text-xs font-mono text-muted hover:text-foreground">← Selected work</Link>
        <div className="label-mono mt-10">Case study / {item.category}</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">{item.title}</h1>
        <p className="mt-6 text-xl text-muted leading-relaxed max-w-4xl">{item.summary}</p>
        <div className="mt-10 grid sm:grid-cols-3 gap-3">{item.metrics.map((metric) => <div key={metric} className="card p-5"><div className="label-mono">Production context</div><strong className="mt-2 block text-lg">{metric}</strong></div>)}</div>

        <div className="mt-16 grid lg:grid-cols-2 gap-5">
          <section className="card p-7 md:p-9"><div className="label-mono">The challenge</div><h2 className="mt-3 text-3xl font-semibold">The operating problem.</h2><p className="mt-5 text-foreground/85 leading-8">{item.challenge}</p></section>
          <section className="card p-7 md:p-9"><div className="label-mono">The engineering</div><h2 className="mt-3 text-3xl font-semibold">What was built.</h2><p className="mt-5 text-foreground/85 leading-8">{item.solution}</p></section>
        </div>

        <section className="mt-16 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7"><div className="label-mono">Outcomes</div><h2 className="mt-3 text-3xl font-semibold">What the system made possible.</h2><ul className="mt-7 space-y-4">{item.outcomes.map((outcome) => <li key={outcome} className="flex gap-3"><CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" /><span>{outcome}</span></li>)}</ul></div>
          <aside className="lg:col-span-5 card p-6"><div className="label-mono">Engineering scope</div><div className="mt-5 flex flex-wrap gap-2">{item.capabilities.map((capability) => <span key={capability} className="px-3 py-1.5 rounded-full border border-border bg-surface text-xs text-muted">{capability}</span>)}</div><p className="mt-6 text-sm text-muted leading-relaxed">Client confidentiality limits some identifying details. The architecture, engineering role, and production context shown here are representative of the delivered work.</p></aside>
        </section>

        <section className="mt-20 card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><div className="label-mono">Have a related problem?</div><h2 className="mt-2 text-3xl font-semibold">Talk directly with an engineer.</h2><p className="mt-3 text-muted">Bring the messy version. We will help identify the smallest credible path to production.</p></div><Link href="/book" className="shrink-0 px-5 py-3 rounded-md bg-accent text-black font-medium inline-flex items-center gap-2">Talk to an engineer <ArrowRight size={16} /></Link></section>
      </article>
    </div>
  );
}
