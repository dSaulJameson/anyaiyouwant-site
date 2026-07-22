import type { Metadata } from "next";
import Link from "next/link";
import { glossaryTerms } from "@/lib/site-content";

export const metadata: Metadata = { title: "Practical AI & Machine Learning Glossary", description: "Clear definitions for ARIMA, Bayesian regression, clustering, embeddings, incrementality, marketing mix modeling, Monte Carlo simulation, RAG, and more.", alternates: { canonical: "/glossary" } };

export default function GlossaryPage() {
  return <div className="pt-16"><section className="max-w-5xl mx-auto px-6 md:px-10"><div className="label-mono">Community resource</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">The practical AI and ML glossary.</h1><p className="mt-5 text-muted text-lg max-w-3xl">Definitions written for people making decisions about software, data, machine learning, and AI—not for people trying to win a jargon contest.</p><div className="mt-12 divide-y divide-border border-y border-border">{glossaryTerms.map(([slug,name,definition]) => <Link key={slug} href={`/glossary/${slug}`} className="grid md:grid-cols-12 gap-3 py-6 group"><h2 className="md:col-span-4 text-lg font-semibold group-hover:text-accent">{name}</h2><p className="md:col-span-8 text-muted leading-relaxed">{definition}</p></Link>)}</div></section></div>;
}

