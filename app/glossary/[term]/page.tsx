import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGlossaryTerm, glossaryTerms } from "@/lib/site-content";

type Props = { params: Promise<{ term: string }> };
export function generateStaticParams() { return glossaryTerms.map(([term]) => ({ term })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { term } = await params; const item = getGlossaryTerm(term); return item ? { title: `${item.name}: Definition`, description: item.definition, alternates: { canonical: `/glossary/${term}` } } : {}; }

export default async function GlossaryTermPage({ params }: Props) {
  const term = getGlossaryTerm((await params).term);
  if (!term) notFound();
  return <div className="pt-16"><article className="max-w-4xl mx-auto px-6 md:px-10"><Link href="/glossary" className="text-xs font-mono text-muted hover:text-foreground">← AI & ML glossary</Link><div className="label-mono mt-10">Definition</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">{term.name}</h1><p className="mt-7 text-xl md:text-2xl leading-relaxed text-foreground/90">{term.definition}</p><div className="mt-12 card p-7"><h2 className="text-xl font-semibold">Why this matters in practice</h2><p className="mt-3 text-muted leading-relaxed">The useful question is rarely whether a team can use the term. It is whether the method changes a decision, survives real data, respects security constraints, and can be monitored after launch.</p><Link href="/learn" className="mt-5 inline-block text-sm font-mono text-accent">Browse technical explainers →</Link></div></article></div>;
}
