import type { Metadata } from "next";
import Link from "next/link";
import { glossaryTerms } from "@/lib/site-content";

export const metadata: Metadata = { title: "Practical Software, Data, AI & ML Glossary", description: "Clear definitions and practical examples for software engineering, data, machine learning, secure AI, technical SEO, and GEO concepts.", alternates: { canonical: "/glossary" } };

export default function GlossaryPage() {
  return <div className="pt-16"><section className="max-w-5xl mx-auto px-6 md:px-10"><div className="label-mono">Open technical reference</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">The practical software, data, and AI glossary.</h1><p className="mt-5 text-muted text-lg max-w-3xl">Definitions for people making decisions about products, data, machine learning, secure AI, and technical growth systems—with a reason each concept matters and an example of how it appears in real software.</p><div className="mt-12 divide-y divide-border border-y border-border">{glossaryTerms.map((term) => <Link key={term.slug} href={`/glossary/${term.slug}`} className="grid md:grid-cols-12 gap-3 py-6 group"><h2 className="md:col-span-4 text-lg font-semibold group-hover:text-accent">{term.name}</h2><div className="md:col-span-8"><p className="text-muted leading-relaxed">{term.definition}</p><span className="mt-2 inline-block text-xs font-mono text-accent">Definition, why it matters, and example →</span></div></Link>)}</div></section></div>;
}
