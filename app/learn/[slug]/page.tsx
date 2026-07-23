import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { getInsight, insights } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return insights.map((insight) => ({ slug: insight.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const insight = getInsight(slug); return insight ? { title: insight.title, description: insight.description, alternates: { canonical: `/learn/${slug}` } } : {}; }

export default async function InsightPage({ params }: Props) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();
  return <div className="pt-16"><ArticleJsonLd title={insight.title} description={insight.description} path={`/learn/${insight.slug}`} /><BreadcrumbJsonLd items={[{ name: "Insights", path: "/learn" }, { name: insight.title, path: `/learn/${insight.slug}` }]} /><article className="max-w-5xl mx-auto px-6 md:px-10"><Link href="/learn" className="text-xs font-mono text-muted hover:text-foreground">← Engineering insights</Link><div className="label-mono mt-10">{insight.eyebrow}</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">{insight.title}</h1><p className="mt-5 text-muted text-xl leading-relaxed max-w-4xl">{insight.description}</p><div className="mt-12 grid lg:grid-cols-12 gap-10"><div className="lg:col-span-8 space-y-10">{insight.sections.map(([title, body]) => <section key={title}><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-3 text-foreground/85 leading-8">{body}</p></section>)}</div><aside className="lg:col-span-4"><div className="card p-6 lg:sticky lg:top-24"><div className="label-mono">A production workflow</div><ol className="mt-5 space-y-4">{insight.steps.map((step, index) => <li key={step} className="flex gap-3 text-sm"><span className="w-6 h-6 rounded-full bg-accent/15 text-accent font-mono text-xs grid place-items-center shrink-0">{index + 1}</span><span>{step}</span></li>)}</ol></div></aside></div><div className="mt-14 card p-7 md:p-9 flex flex-col md:flex-row md:items-center justify-between gap-5"><div><div className="flex gap-2 items-center text-success text-sm"><Check size={16} /> Built around a real operating decision</div><h2 className="mt-2 text-2xl font-semibold">Want to apply this to a real system?</h2></div><Link href={insight.cta.href} className="px-5 py-3 rounded-md bg-accent text-black font-medium text-center shrink-0">{insight.cta.label} →</Link></div></article></div>;
}
