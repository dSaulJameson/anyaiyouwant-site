import type { Metadata } from "next";
import Link from "next/link";
import { BiDashboard } from "@/components/bi-dashboard";
import { TIDYCAL_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work — Case studies & live demos",
  description:
    "Selected work from D. Saul Jameson: a Bayesian avocado demand forecaster, a $300M+ bidding engine, an enterprise reporting overhaul, and shipped web apps including storywarz.win and songselfie.com — plus an interactive BI dashboard demo.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — Case studies & live demos",
    description: "ML, automation, and web apps shipped by D. Saul Jameson.",
    url: "/work",
  },
};

const caseStudies = [
  {
    label: "ML / RUNNING 9 YEARS",
    title: "ZIP-Code Lead Prioritization",
    summary:
      "Tobit regression on American Community Survey data — built for a home-services call center to prioritize incoming leads when granular data wasn't available. Still in production nine years later. Same algorithm. Same model.",
    metrics: [
      { k: "Years in production", v: "9" },
      { k: "Industry", v: "Home services" },
      { k: "Stack", v: "Python · Tobit regression · ACS" },
    ],
  },
  {
    label: "ML / COMMODITY FORECASTING",
    title: "Avocado Demand Forecasting",
    summary:
      "Bayesian regression on a real-world commodity. Beat the open market three years running for one of the largest US avocado suppliers.",
    metrics: [
      { k: "Annual commodity volume", v: "$100M+" },
      { k: "Years beating the market", v: "3" },
      { k: "Stack", v: "Python · Bayesian regression" },
    ],
  },
  {
    label: "ML / OPTIMIZATION",
    title: "$300M Bidding Engine",
    summary:
      "Designed and shipped a recommendation + bidding optimization engine for a national auction platform. Real money, real-time bidding, real stakes.",
    metrics: [
      { k: "Annual GMV", v: "$300M+" },
      { k: "Role", v: "Lead ML / engineer-of-record" },
      { k: "Stack", v: "Python · GBM · real-time bidding" },
    ],
  },
  {
    label: "AUTOMATION / ENTERPRISE",
    title: "Reporting Stack Overhaul",
    summary:
      "Took a multi-team operation from 20+ source spreadsheets to a single automated pipeline feeding Power BI, Tableau, and Looker — in roughly 20 hours of work.",
    metrics: [
      { k: "Sources unified", v: "20+" },
      { k: "Time to ship", v: "~20 hrs" },
      { k: "Stack", v: "dbt · Power BI · Tableau · Looker" },
    ],
  },
];

const apps = [
  {
    title: "Storywarz",
    domain: "storywarz.win",
    href: "https://storywarz.win",
    blurb:
      "Comedic deceptive-storytelling party game. Players submit true stories, bluff with confidence, and try to figure out who really lived each moment. Real-time rooms, no-account play, truth-or-bluff voting.",
    stack: ["Next.js", "Real-time rooms", "WebSockets"],
  },
  {
    title: "Song Selfie",
    domain: "songselfie.com",
    href: "https://songselfie.com",
    blurb:
      "AI songs about you. Built for venues — partner activations, automated revenue splits, share-ready audio, and viral mechanics. Architected end-to-end from auth to payouts.",
    stack: ["Next.js", "AWS", "Real-time audio"],
  },
];

export default function WorkPage() {
  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="label-mono">Work</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
          Production systems. <span className="text-gradient">Live demos.</span>
        </h1>
        <p className="mt-5 text-muted text-lg max-w-2xl">
          Selected work spanning ML, automation, and full-stack apps. Many engagements are
          under NDA — these are the ones I can talk about.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="label-mono">Live demo</div>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold">Interactive BI Dashboard</h2>
          </div>
          <div className="text-xs font-mono text-muted hidden md:block">
            change range · re-roll data · watch the forecast move
          </div>
        </div>
        <BiDashboard />
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
        <div className="label-mono">Case studies</div>
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold mb-8">Real systems, real outcomes</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {caseStudies.map((c) => (
            <div key={c.title} className="card p-6">
              <div className="label-mono">{c.label}</div>
              <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{c.summary}</p>
              <dl className="mt-4 border-t border-border pt-4 space-y-2">
                {c.metrics.map((m) => (
                  <div key={m.k} className="flex items-baseline justify-between gap-3">
                    <dt className="text-xs font-mono text-muted">{m.k}</dt>
                    <dd className="text-sm text-foreground text-right">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
        <div className="label-mono">Apps I&apos;ve built</div>
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold mb-8">Things you can click on right now</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {apps.map((a) => (
            <a
              key={a.title}
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className="card p-6 group transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{a.title}</h3>
                  <div className="mt-1 text-xs font-mono text-accent">{a.domain} ↗</div>
                </div>
                <span className="opacity-60 group-hover:opacity-100 transition-opacity text-muted">→</span>
              </div>
              <p className="mt-4 text-sm text-muted leading-relaxed">{a.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {a.stack.map((s) => (
                  <span key={s} className="px-2 py-1 rounded-md bg-surface-2 border border-border text-[11px] font-mono text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-24">
        <div className="card p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Got a system that needs to ship?</h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Book a 15-minute call. By the end of it, you&apos;ll know exactly what it costs and how
            long it takes — no fluff, no &quot;discovery phase.&quot;
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href={TIDYCAL_URL}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-md bg-accent text-black font-medium hover:bg-accent/90 transition-colors"
            >
              Book 15 minutes →
            </a>
            <Link href="/services" className="px-5 py-3 rounded-md border border-border hover:bg-surface transition-colors">
              See services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
