import type { Metadata } from "next";
import { CheckCircle2, LockKeyhole } from "lucide-react";
import { ProjectBriefForm } from "@/components/project-brief-form";
import { TIDYCAL_URL } from "@/lib/utils";

export const metadata: Metadata = { title: "Talk to a Senior U.S.-Based Software Engineer", description: "Send a project brief or book a focused 15-minute consultation directly with a senior U.S.-based product engineer.", alternates: { canonical: "/book" } };

const nextSteps = ["A senior engineer reviews the context", "We identify the most useful technical next step", "You receive a direct response—not an automated sales sequence"];

export default function BookPage() {
  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8"><div className="label-mono">Talk to an engineer</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">Bring the problem. Leave with a clearer technical path.</h1><p className="mt-5 text-muted text-lg max-w-3xl">Send enough context for a useful response or choose a 15-minute time. The person reviewing the problem can also help architect and build the answer.</p></div>
        <aside className="lg:col-span-4 card p-6"><div className="label-mono">What happens next</div><ul className="mt-4 space-y-3">{nextSteps.map((step) => <li key={step} className="flex gap-2 text-sm"><CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />{step}</li>)}</ul><div className="mt-5 pt-5 border-t border-border flex gap-2 text-xs text-muted"><LockKeyhole size={15} className="text-accent shrink-0" /><span>Briefs are stored privately. Do not include credentials, regulated records, or secrets in the initial message.</span></div></aside>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-12 grid lg:grid-cols-2 gap-6 items-start">
        <div className="card p-6 md:p-8"><div className="label-mono">Option 1 / Project brief</div><h2 className="mt-2 text-2xl font-semibold">Describe the operating problem.</h2><p className="mt-2 text-sm text-muted">You do not need to know which technology or service category fits.</p><div className="mt-6"><ProjectBriefForm /></div></div>
        <div id="calendar" className="card p-2 overflow-hidden scroll-mt-24"><div className="p-5"><div className="label-mono">Option 2 / Calendar</div><h2 className="mt-2 text-2xl font-semibold">Book 15 focused minutes.</h2><p className="mt-2 text-sm text-muted">Share the current state, the desired outcome, and what is blocking progress.</p></div><iframe src={TIDYCAL_URL} className="w-full h-[760px] rounded-[12px] bg-white" title="Book a 15-minute engineering consultation" /><p className="p-4 text-xs font-mono text-muted text-center">Calendar not loading? <a href={TIDYCAL_URL} target="_blank" rel="noreferrer" className="text-accent">Open it directly ↗</a></p></div>
      </section>
    </div>
  );
}
