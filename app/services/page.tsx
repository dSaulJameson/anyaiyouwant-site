import type { Metadata } from "next";
import Link from "next/link";
import { ServicesGrid } from "@/components/services-grid";

export const metadata: Metadata = {
  title: "Software, Machine Learning, Secure AI & Analytics Services",
  description: "U.S.-based senior engineers building software, machine learning, secure AI, analytics, automation, and technical strategy without a bloated agency layer.",
  alternates: { canonical: "/services" },
};

const engagements = [
  { title: "Focused sprint", range: "1 day–2 weeks", body: "A model assessment, secure AI prototype, integration, reporting fix, automation, or technical decision that needs a senior engineer now.", examples: ["Architecture or security review", "Forecasting proof of concept", "Data-masking gateway", "Broken integration repair"] },
  { title: "Project team", range: "2 weeks–6 months", body: "A defined product, platform, data system, or ML deployment with accountable delivery and a team assembled around the work.", examples: ["Web or mobile application", "Analytics platform", "Production ML pipeline", "Secure AI implementation"], featured: true },
  { title: "Embedded leadership", range: "Ongoing", body: "Hands-on technical leadership for organizations that need architecture, delivery judgment, hiring support, and implementation capacity.", examples: ["Fractional CTO", "Roadmap and delivery", "Vendor and cloud decisions", "Technical diligence"] },
];

export default function ServicesPage() {
  return <div className="pt-16"><section className="max-w-7xl mx-auto px-6 md:px-10"><div className="label-mono">Services</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">Any technical problem. <span className="text-gradient">The right-sized engineering team.</span></h1><p className="mt-5 text-muted text-lg max-w-3xl leading-relaxed">All engineering work is performed by U.S.-based engineers. Senior people stay close to discovery, implementation, and delivery, whether the engagement is a one-day sprint or a multi-quarter platform.</p></section><ServicesGrid withHeader={false} />
  <section className="max-w-7xl mx-auto px-6 md:px-10 mt-4"><div className="label-mono">Engagements</div><h2 className="mt-2 text-3xl font-semibold">Start at the size the problem deserves.</h2><div className="mt-8 grid md:grid-cols-3 gap-4">{engagements.map((item) => <article key={item.title} className={`card p-6 ${item.featured ? "ring-1 ring-accent/40" : ""}`}><div className="flex items-baseline justify-between gap-3"><h3 className="text-lg font-semibold">{item.title}</h3><span className="text-xs font-mono text-muted">{item.range}</span></div><p className="mt-3 text-sm text-muted leading-relaxed">{item.body}</p><ul className="mt-4 space-y-1.5">{item.examples.map((example) => <li key={example} className="text-sm flex gap-2"><span className="text-accent">›</span>{example}</li>)}</ul></article>)}</div></section>
  <section className="max-w-5xl mx-auto px-6 md:px-10 mt-24"><div className="card p-8 md:p-12 text-center"><div className="label-mono">Efficient by design</div><h2 className="mt-3 text-3xl md:text-4xl font-semibold">Less overhead. More engineering.</h2><p className="mt-4 text-muted max-w-2xl mx-auto">We price the people doing the work, not layers of account management. Discovery is technical, proposals are scoped around outcomes, and you can talk directly with someone who can implement the answer.</p><Link href="/book" className="mt-7 inline-flex px-5 py-3 rounded-md bg-accent text-black font-medium">Send a project brief →</Link></div></section></div>;
}
