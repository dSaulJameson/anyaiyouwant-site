import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/lib/site-content";

export const metadata: Metadata = { title: "Machine Learning & Secure AI Explainers", description: "Plain-English technical explainers covering Bayesian marketing mix models, Monte Carlo simulation, ARIMA and Prophet forecasting, clustering, and private AI.", alternates: { canonical: "/learn" } };

export default function LearnPage() {
  return <div className="pt-16"><section className="max-w-7xl mx-auto px-6 md:px-10"><div className="label-mono">Learn</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">Machine learning explained <span className="text-gradient">without the theater.</span></h1><p className="mt-5 text-muted text-lg max-w-3xl">Practical explanations of models, assumptions, uncertainty, security, and what production implementation really requires.</p><div className="mt-12 grid md:grid-cols-2 gap-5">{insights.map((insight) => <Link key={insight.slug} href={`/learn/${insight.slug}`} className="card p-7 group"><div className="label-mono">{insight.eyebrow}</div><h2 className="mt-3 text-2xl font-semibold group-hover:text-accent">{insight.title}</h2><p className="mt-3 text-muted leading-relaxed">{insight.description}</p><span className="mt-6 inline-block text-sm font-mono text-accent">Read the technical explainer →</span></Link>)}</div></section></div>;
}

