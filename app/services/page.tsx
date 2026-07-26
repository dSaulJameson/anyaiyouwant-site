import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServicesGrid } from "@/components/services-grid";

export const metadata: Metadata = {
  title: "Strategy, Growth Marketing, AI, Automation & Product Engineering",
  description: "Senior business strategy, growth marketing and media, U.S.-based product engineering, websites, automation, data systems, applied machine learning, and secure AI—with execution built in.",
  alternates: { canonical: "/services" },
};

const engagements = [
  {
    title: "Operator Decision Sprint",
    body: "Resolve one expensive, urgent, or ambiguous business decision, then leave with the tradeoffs and next actions made clear.",
    examples: ["New offer or revenue path", "Operating-model decision", "Growth constraint", "Technology or vendor choice"],
    featured: true,
  },
  {
    title: "Launch & Business Blueprint",
    body: "Turn an idea, new offer, or changing business into a credible operating plan and a practical path to market.",
    examples: ["Business model", "Launch sequence", "90-day operating plan", "Formal business plan when required"],
    featured: false,
  },
  {
    title: "Product, AI or Automation Build",
    body: "A senior U.S.-based engineering team owns product shaping, architecture, implementation, deployment, and the systems required to keep it working.",
    examples: ["Website or full-stack product", "AI or automation system", "Data-intensive application", "Modernization or rescue"],
    featured: false,
  },
  {
    title: "Growth Marketing & Media",
    body: "Connect content, social, paid media, landing pages, follow-up, and measurement under one accountable team.",
    examples: ["Social media operations", "Meta and Google campaigns", "Conversion system", "Ongoing growth management"],
    featured: false,
  },
] as const;

const standards = [
  "Senior U.S.-based engineering from discovery through production",
  "Strategy tied to measurable business action",
  "Marketing connected to content, media, conversion, and measurement",
  "The people defining the plan remain accountable through execution",
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <div className="label-mono">Capabilities</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">
            Strategy, marketing, and engineering—with <span className="text-gradient">execution built in.</span>
          </h1>
          <p className="mt-5 text-muted text-lg max-w-3xl leading-relaxed">
            The same senior people diagnose the problem, shape the answer, and remain accountable as it becomes campaigns, operating decisions, software, or measurable business results.
          </p>
        </div>
        <aside className="lg:col-span-4 card p-6">
          <div className="label-mono">Execution-heavy by design</div>
          <ul className="mt-4 space-y-3">
            {standards.map((standard) => <li key={standard} className="flex gap-2 text-sm"><CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />{standard}</li>)}
          </ul>
        </aside>
      </section>

      <ServicesGrid withHeader={false} />

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-4">
        <div className="label-mono">How we engage</div>
        <h2 className="mt-2 text-3xl font-semibold">Start with the outcome, then choose the smallest useful engagement.</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {engagements.map((item) => (
            <article key={item.title} className={`card p-6 ${item.featured ? "ring-1 ring-accent/40" : ""}`}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.body}</p>
              <ul className="mt-4 space-y-1.5">{item.examples.map((example) => <li key={example} className="text-sm flex gap-2"><span className="text-accent">›</span>{example}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="mt-8 card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div><div className="label-mono">Focused work is welcome</div><h3 className="mt-2 text-2xl font-semibold">A difficult problem does not always require a large engagement.</h3><p className="mt-2 text-sm text-muted max-w-3xl">A decision, launch plan, campaign reset, prototype, broken integration, or production repair can begin as focused work and expand only when the evidence supports it.</p></div>
          <Link href="/book" className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-black font-medium">Talk through the problem <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-24">
        <div className="card p-8 md:p-12 text-center">
          <div className="label-mono">Efficient by design</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">More senior execution. Less overhead.</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">You work directly with the senior people responsible for the outcome. Strategy stays close to the operators, marketers, designers, and U.S.-based engineers doing the work, so context is not lost in a chain of handoffs.</p>
          <Link href="/book" className="mt-7 inline-flex px-5 py-3 rounded-md bg-accent text-black font-medium">Talk through the problem →</Link>
        </div>
      </section>
    </div>
  );
}
