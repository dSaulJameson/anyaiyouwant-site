import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/lib/site-content";

export const metadata: Metadata = { title: "Industry Product Engineering, Data, ML & Secure AI", description: "Full-stack software, data, applied ML, and secure AI informed by the operating decisions and economics of each industry.", alternates: { canonical: "/industries" } };

export default function IndustriesPage() {
  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="label-mono">Industries</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">Engineering depth that learns <span className="text-gradient">the operating model.</span></h1>
        <p className="mt-5 text-muted text-lg max-w-3xl">We bring full-stack product engineering, data, ML, and secure AI to the systems that drive each business, shaped around its users, economics, constraints, and operating decisions.</p>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {industries.map((industry) => (
            <article key={industry.slug} className="card p-6">
              <div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-semibold">{industry.name}</h2><p className="mt-3 text-sm text-muted leading-relaxed">{industry.summary}</p></div><span className="label-mono shrink-0">{industry.systems.length} system patterns</span></div>
              <div className="mt-5 grid sm:grid-cols-2 gap-2">{industry.systems.slice(0, 4).map((system) => <span key={system} className="text-xs text-foreground/85 flex gap-2"><span className="text-accent">›</span>{system}</span>)}</div>
              <Link href={`/industries/${industry.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-mono text-accent">Explore {industry.name.toLowerCase()} engineering <ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
