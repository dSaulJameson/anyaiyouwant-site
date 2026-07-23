import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { capabilities, caseStudies, getCapability } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

const relatedWork: Record<string, string[]> = {
  "product-engineering": ["hospitality-operations-platform", "event-contact-platform", "local-discovery-platform"],
  "data-analytics": ["local-discovery-platform", "lead-prioritization", "avocado-demand-forecasting"],
  "applied-machine-learning": ["auction-bidding-engine", "lead-prioritization", "avocado-demand-forecasting"],
  "secure-ai": ["secure-coding-agents", "event-contact-platform"],
  "modernization-automation": ["hospitality-operations-platform", "event-contact-platform", "local-discovery-platform"],
  "technical-leadership": ["auction-bidding-engine", "secure-coding-agents", "local-discovery-platform"],
};

export function generateStaticParams() { return capabilities.map((capability) => ({ slug: capability.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return {};
  return {
    title: `${capability.title} — U.S.-Based Senior Engineers`,
    description: capability.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function CapabilityPage({ params }: Props) {
  const capability = getCapability((await params).slug);
  if (!capability) notFound();
  const work = caseStudies.filter((item) => relatedWork[capability.slug]?.includes(item.slug));

  return (
    <div className="pt-16">
      <ServiceJsonLd name={capability.title} description={capability.description} path={`/services/${capability.slug}`} />
      <BreadcrumbJsonLd items={[{ name: "Capabilities", path: "/services" }, { name: capability.title, path: `/services/${capability.slug}` }]} />

      <section className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <Link href="/services" className="text-xs font-mono text-muted hover:text-foreground">← All capabilities</Link>
          <div className="label-mono mt-9">{capability.title}</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">{capability.headline}</h1>
          <p className="mt-6 text-muted text-lg md:text-xl leading-relaxed max-w-4xl">{capability.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/book?project=${capability.slug}`} className="px-5 py-3 rounded-md bg-accent text-black font-medium inline-flex items-center gap-2">Talk to an engineer <ArrowRight size={16} /></Link>
            <Link href="/work" className="px-5 py-3 rounded-md border border-border hover:bg-surface">See selected work</Link>
          </div>
        </div>
        <aside className="lg:col-span-4 card p-6 self-start">
          <div className="label-mono">What this includes</div>
          <ul className="mt-5 space-y-3">{capability.bullets.map((bullet) => <li key={bullet} className="flex gap-2 text-sm"><CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />{bullet}</li>)}</ul>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20 grid lg:grid-cols-2 gap-5">
        <article className="card p-7 md:p-9"><div className="label-mono">Business outcomes</div><h2 className="mt-3 text-3xl font-semibold">What the work can change.</h2><ul className="mt-6 space-y-4">{capability.outcomes.map((outcome, index) => <li key={outcome} className="flex gap-4"><span className="text-xs font-mono text-accent pt-1">0{index + 1}</span><span>{outcome}</span></li>)}</ul></article>
        <article className="card p-7 md:p-9"><div className="label-mono">Delivery</div><h2 className="mt-3 text-3xl font-semibold">How engineering moves the work.</h2><ol className="mt-6 space-y-4">{capability.process.map((step, index) => <li key={step} className="flex gap-4"><span className="w-7 h-7 rounded-full bg-accent/15 text-accent font-mono text-xs grid place-items-center shrink-0">{index + 1}</span><span className="pt-0.5">{step}</span></li>)}</ol></article>
      </section>

      {work.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="label-mono">Representative work</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Proof in production context.</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">{work.map((item) => <Link href={`/work/${item.slug}`} key={item.slug} className="card p-6 group"><div className="label-mono">{item.category}</div><h3 className="mt-3 text-xl font-semibold group-hover:text-accent">{item.title}</h3><p className="mt-3 text-sm text-muted leading-relaxed">{item.summary}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-mono text-accent">Read case study <ArrowRight size={14} /></span></Link>)}</div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-24">
        <div className="card p-8 md:p-12 text-center"><div className="label-mono">Start with the real problem</div><h2 className="mt-3 text-3xl md:text-4xl font-semibold">Talk directly with an engineer who can help build it.</h2><p className="mt-4 text-muted max-w-2xl mx-auto">Bring the current system, the desired outcome, and whatever uncertainty remains. We will help identify the smallest credible path to production.</p><Link href={`/book?project=${capability.slug}`} className="mt-7 inline-flex px-5 py-3 rounded-md bg-accent text-black font-medium">Talk to an engineer →</Link></div>
      </section>
    </div>
  );
}
