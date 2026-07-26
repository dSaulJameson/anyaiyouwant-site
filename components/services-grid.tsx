import Link from "next/link";
import { BarChart3, BrainCircuit, Code2, Compass, Megaphone, ShieldCheck } from "lucide-react";
import { services } from "@/lib/site-content";

const icons = [Code2, BarChart3, BrainCircuit, ShieldCheck, Megaphone, Compass];

export function ServicesGrid({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {withHeader && <div className="max-w-3xl mb-12"><div className="label-mono">What we do</div><h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Strategy through execution. <span className="text-gradient">The same accountable team.</span></h2><p className="mt-4 text-muted text-lg leading-relaxed">The people shaping the answer remain close to the marketing, design, engineering, and operating work required to make it real. Senior U.S.-based engineers are assembled around the work without adding a nontechnical handoff layer.</p></div>}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = icons[index];
            return <Link href={`/services/${service.slug}`} id={service.slug} key={service.slug} className="card p-6 transition-all hover:-translate-y-0.5 scroll-mt-24"><div className="w-10 h-10 rounded-md bg-surface-2 flex items-center justify-center text-accent"><Icon size={21} /></div><h3 className="mt-4 text-lg font-semibold">{service.title}</h3><p className="mt-2 text-sm text-muted leading-relaxed">{service.short}</p><ul className="mt-4 space-y-1.5">{service.bullets.map((bullet) => <li key={bullet} className="text-sm text-foreground/85 flex gap-2"><span className="text-accent">›</span><span>{bullet}</span></li>)}</ul><span className="mt-5 inline-block text-xs font-mono text-accent">Explore capability →</span></Link>;
          })}
        </div>
        {withHeader && <div className="mt-10 flex justify-center"><Link href="/services" className="px-5 py-3 rounded-md border border-border hover:bg-surface transition-colors text-sm">See capabilities and engagement options →</Link></div>}
      </div>
    </section>
  );
}
