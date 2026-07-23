import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServicesGrid } from "@/components/services-grid";

export const metadata: Metadata = {
  title: "Product Engineering, Data, ML & Secure AI Capabilities",
  description: "Senior U.S.-based engineers delivering full-stack products, data systems, applied machine learning, secure AI, modernization, and technical leadership.",
  alternates: { canonical: "/services" },
};

const engagements = [
  {
    title: "Build a product or platform",
    body: "A senior engineering team owns product shaping, architecture, implementation, deployment, and the systems required to keep the product working.",
    examples: ["New full-stack product", "Customer or internal platform", "Data-intensive application", "Secure AI product"],
    featured: false,
  },
  {
    title: "Modernize or rescue",
    body: "Recover context, stabilize the critical path, and improve a system in production without assuming the only answer is a risky rewrite.",
    examples: ["Stalled software project", "Legacy application", "Fragile integrations", "Manual operating workflow"],
    featured: true,
  },
  {
    title: "Add focused engineering capacity",
    body: "Bring senior product, data, ML, cloud, or technical-leadership capacity into an existing team without a nontechnical handoff layer.",
    examples: ["Complex feature delivery", "Architecture and execution", "Fractional CTO", "Technical diligence"],
    featured: false,
  },
] as const;

const standards = [
  "Senior U.S.-based engineering from discovery through production",
  "The people shaping the product also write and review the code",
  "Working software delivered in visible, testable increments",
  "Source code, documentation, infrastructure, and IP remain ownable",
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <div className="label-mono">Capabilities</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">
            Product engineering with <span className="text-gradient">delivery built in.</span>
          </h1>
          <p className="mt-5 text-muted text-lg max-w-3xl leading-relaxed">
            We are not a product-strategy shop that hands a deck to a separate development team. The engineers in the room shape the product, make the architecture decisions, write the code, and remain accountable through production.
          </p>
        </div>
        <aside className="lg:col-span-4 card p-6">
          <div className="label-mono">Engineering-heavy by design</div>
          <ul className="mt-4 space-y-3">
            {standards.map((standard) => <li key={standard} className="flex gap-2 text-sm"><CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />{standard}</li>)}
          </ul>
        </aside>
      </section>

      <ServicesGrid withHeader={false} />

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-4">
        <div className="label-mono">How we engage</div>
        <h2 className="mt-2 text-3xl font-semibold">Start with the outcome, then size the team.</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {engagements.map((item) => (
            <article key={item.title} className={`card p-6 ${item.featured ? "ring-1 ring-accent/40" : ""}`}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.body}</p>
              <ul className="mt-4 space-y-1.5">{item.examples.map((example) => <li key={example} className="text-sm flex gap-2"><span className="text-accent">›</span>{example}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="mt-8 card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div><div className="label-mono">Focused technical work is welcome</div><h3 className="mt-2 text-2xl font-semibold">A small problem can still deserve senior engineering.</h3><p className="mt-2 text-sm text-muted max-w-3xl">Architecture reviews, security decisions, prototypes, broken integrations, data gateways, and production repairs can begin as focused engagements and expand only when the evidence supports it.</p></div>
          <Link href="/book" className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-black font-medium">Talk to an engineer <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-24">
        <div className="card p-8 md:p-12 text-center">
          <div className="label-mono">Efficient by design</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">More engineering. Less agency overhead.</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">You work directly with the senior people responsible for the outcome. A trusted U.S.-based engineering network adds the capacity the project needs without separating discovery from delivery.</p>
          <Link href="/book" className="mt-7 inline-flex px-5 py-3 rounded-md bg-accent text-black font-medium">Talk to an engineer →</Link>
        </div>
      </section>
    </div>
  );
}
