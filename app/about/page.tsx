import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Any AI You Want — Senior U.S. Product Engineers",
  description: "Any AI You Want is a senior U.S.-based product engineering company led by D. Saul Jameson and built around hands-on software delivery.",
  alternates: { canonical: "/about" },
};

const principles = [
  ["Engineering stays in the room", "The people learning the business can also make the architecture decisions, write the code, and operate the system."],
  ["Teams fit the work", "A trusted network of senior U.S.-based engineering partners adds the product, software, data, ML, security, and cloud capacity the engagement needs."],
  ["Delivery creates the strategy", "Roadmaps and technical decisions remain accountable to working software, production behavior, and business outcomes."],
  ["Clients retain ownership", "Code, infrastructure, documentation, and operating knowledge are built to remain understandable and ownable after the engagement."],
] as const;

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8">
          <div className="label-mono">About Any AI You Want</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">A product engineering company built around people who execute.</h1>
          <div className="mt-8 space-y-5 text-foreground/90 leading-relaxed max-w-4xl">
            <p>Any AI You Want designs, builds, modernizes, and operates full-stack software, data systems, machine learning, and secure AI. All engineering work is performed by U.S.-based engineers.</p>
            <p>We are engineering-heavy by design. Product thinking, technical discovery, architecture, implementation, deployment, and production ownership stay connected instead of moving through separate sales, strategy, and delivery organizations.</p>
            <p>Engagements are led by senior engineers and supported by a trusted network of U.S.-based engineering partners assembled around the work. That provides the capacity of a team while preserving direct access to the people responsible for the result.</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/book" className="px-5 py-3 rounded-md bg-accent text-black font-medium">Talk to an engineer →</Link><Link href="/work" className="px-5 py-3 rounded-md border border-border hover:bg-surface">See selected work</Link></div>
        </div>
        <aside className="lg:col-span-4">
          <div className="card p-2"><Image src="/media/headshot.png" alt="D. Saul Jameson, founder and technical director of Any AI You Want" width={520} height={520} className="rounded-[12px] w-full" priority /></div>
          <div className="mt-4 grid grid-cols-2 gap-2">{[["Experience","9+ years"],["Engineering","U.S.-based"],["Production","$1B+ supported"],["Community","Builders & Backers"]].map(([key,value]) => <div key={key} className="bg-surface-2/60 border border-border rounded-md p-3"><div className="label-mono text-[10px]">{key}</div><div className="mt-1 text-sm font-mono">{value}</div></div>)}</div>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
        <div className="label-mono">Operating model</div><h2 className="mt-2 text-3xl md:text-4xl font-semibold">Senior judgment connected to working software.</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">{principles.map(([title, body]) => <article key={title} className="card p-6"><CheckCircle2 size={19} className="text-success" /><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm text-muted leading-relaxed">{body}</p></article>)}</div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7"><div className="label-mono">Technical leadership</div><h2 className="mt-2 text-3xl md:text-4xl font-semibold">Led by D. Saul Jameson.</h2><div className="mt-5 space-y-4 text-muted leading-relaxed"><p>Saul is a machine-learning engineer and technical operator with more than nine years turning messy business problems into production systems. His early work included multi-model supply-and-demand forecasting for a leading avocado supplier and a recommendation and bidding-optimization engine supporting a national auction business processing more than $300 million annually.</p><p>Across engagements, shipped systems have supported businesses processing more than $1 billion in revenue. The work now spans full-stack products, data platforms, forecasting, recommendation, secure AI, automation, integrations, technical growth systems, and engineering leadership.</p></div></div>
        <aside className="lg:col-span-5 card p-7"><div className="label-mono">Community</div><h2 className="mt-2 text-2xl font-semibold">Builders & Backers Network</h2><p className="mt-3 text-muted leading-relaxed">Saul serves as Chairman of the Board of Builders & Backers Network, a 501(c)(6) connecting Southern California founders, operators, and capital through in-person events and practical programs.</p><a href="https://buildersandbackers.org" target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-mono text-accent">Visit Builders & Backers ↗</a><div className="mt-8 pt-7 border-t border-border"><div className="label-mono">Open resources</div><p className="mt-3 text-sm text-muted leading-relaxed">Engineering insights, a practical technical glossary, analytics examples, and live AI and technology event guides give the broader community useful reasons to return.</p><Link href="/community" className="mt-4 inline-block text-sm font-mono text-accent">Explore community resources →</Link></div></aside>
      </section>
    </div>
  );
}
