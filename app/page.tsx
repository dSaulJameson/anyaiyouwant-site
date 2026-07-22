import Link from "next/link";
import { ArrowRight, CalendarDays, Database, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/hero";
import { CapabilityStrip } from "@/components/capability-strip";
import { ServicesGrid } from "@/components/services-grid";
import { FeaturedWork } from "@/components/featured-work";
import { ProjectBriefForm } from "@/components/project-brief-form";
import { AnimatedGrid } from "@/components/animated-grid";
import { industries, insights } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <div className="relative"><AnimatedGrid /><Hero /></div>
      <CapabilityStrip />
      <ServicesGrid />

      <section className="py-20 border-y border-border bg-surface/25">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5"><div className="label-mono">A lean engineering model</div><h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Pay for people who build.</h2><p className="mt-5 text-muted text-lg leading-relaxed">We do not carry a large business-development and administrative layer. The person in discovery can inspect the database, choose the model, and implement the system. When a project needs more hands, we assemble senior partners around the work.</p></div>
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {[{ icon: ArrowRight, title: "No game of telephone", body: "Technical context stays with the people writing and reviewing the code." }, { icon: Database, title: "Code-first delivery", body: "Durable software and data systems stay central. Automation tools are optional edges." }, { icon: ShieldCheck, title: "Right-sized team", body: "One-day project or platform build: staffing follows the real scope." }].map((item) => <article className="card p-5" key={item.title}><item.icon size={20} className="text-accent" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm text-muted leading-relaxed">{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <FeaturedWork />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl"><div className="label-mono">Industry systems</div><h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">The KPIs change. <span className="text-gradient">The engineering travels.</span></h2><p className="mt-4 text-muted text-lg">Explore decision systems and live dashboard examples built around each operating model.</p></div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">{industries.map((industry) => <Link key={industry.slug} href={`/industries/${industry.slug}`} className="card p-5 group"><h3 className="font-semibold group-hover:text-accent">{industry.name}</h3><p className="mt-2 text-sm text-muted leading-relaxed">{industry.summary}</p><span className="mt-4 inline-block text-xs font-mono text-accent">KPIs + use cases →</span></Link>)}</div>
          <div className="mt-8 text-center"><Link href="/industries" className="text-sm text-muted hover:text-foreground">View all industry solutions →</Link></div>
        </div>
      </section>

      <section className="py-20 border-y border-border bg-surface/25">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5"><div className="max-w-3xl"><div className="label-mono">True machine learning</div><h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Understand the model before you buy the buzzword.</h2></div><Link href="/learn" className="text-sm font-mono text-accent">All technical explainers →</Link></div>
          <div className="mt-10 grid md:grid-cols-2 gap-4">{insights.map((insight) => <Link key={insight.slug} href={`/learn/${insight.slug}`} className="card p-6 group"><div className="label-mono">{insight.eyebrow}</div><h3 className="mt-3 text-xl font-semibold group-hover:text-accent">{insight.title}</h3><p className="mt-3 text-sm text-muted leading-relaxed">{insight.description}</p><span className="mt-5 inline-block text-xs font-mono text-accent">Read the explainer →</span></Link>)}</div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5"><div className="label-mono">Start with the real problem</div><h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Tell an engineer what is stuck.</h2><p className="mt-4 text-muted text-lg leading-relaxed">A useful brief is enough to start. We will review it directly, identify the likely approach, and tell you whether a focused sprint or a larger build makes sense.</p><div className="mt-6 flex items-center gap-3 text-sm text-muted"><CalendarDays size={17} className="text-accent" /><span>Prefer a conversation? <Link href="/book#calendar" className="text-foreground underline underline-offset-4">Book 15 minutes.</Link></span></div></div>
          <div className="lg:col-span-7 card p-6 md:p-8"><ProjectBriefForm compact /></div>
        </div>
      </section>
    </>
  );
}
