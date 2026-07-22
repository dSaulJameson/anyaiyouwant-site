import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Code2,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { dashboardConfigs } from "@/lib/dashboard-data.mjs";

export const metadata: Metadata = {
  title: "Work — BI, secure AI, machine learning & software",
  description:
    "Explore nine interactive BI dashboards, deployed secure AI case studies, production machine-learning systems, forecasting work, and software from Any AI You Want.",
  alternates: { canonical: "/work" },
};

const categories = [
  { href: "#business-intelligence", number: "01", title: "BI", detail: "9 live dashboards", icon: BarChart3 },
  { href: "#ai", number: "02", title: "AI", detail: "3 secure case studies", icon: ShieldCheck },
  { href: "#machine-learning", number: "03", title: "ML", detail: "Forecasting + optimization", icon: BrainCircuit },
  { href: "#software", number: "04", title: "Software", detail: "Products + platforms", icon: Code2 },
] as const;

const secureAi = [
  {
    icon: Server,
    label: "TEAM ACCESS",
    title: "Codex and Claude inside Slack",
    description: "Coding and reasoning agents in the interface teams already use, with access, workspaces, and routing controlled outside the conversation.",
  },
  {
    icon: Code2,
    label: "ISOLATED EXECUTION",
    title: "Codex in secure cloud workspaces",
    description: "Scoped repositories, short-lived credentials, network boundaries, review gates, and reproducible builds for cloud coding agents.",
  },
  {
    icon: ShieldCheck,
    label: "ZERO PERSISTENCE",
    title: "LLM workflows for SSNs and PII",
    description: "Sensitive values can be processed without writing them to application storage, prompt history, or ordinary logs.",
  },
] as const;

const mlSystems = [
  {
    label: "OPTIMIZATION / PRODUCTION",
    title: "$300M bidding engine",
    description: "Recommendation and bidding optimization for a national auction platform making real-time financial decisions.",
    metrics: ["$300M+ annual GMV", "Real-time ranking", "Python · GBM"],
  },
  {
    label: "REGRESSION / 9+ YEARS",
    title: "ZIP-code lead prioritization",
    description: "Tobit regression using American Community Survey data to prioritize home-services leads.",
    metrics: ["9+ years in production", "Home services", "Python · Tobit · ACS"],
  },
  {
    label: "BAYESIAN FORECASTING",
    title: "Avocado demand forecasting",
    description: "Supply-and-demand forecasting for one of the country’s leading avocado suppliers, evaluated against real purchasing decisions.",
    metrics: ["$100M+ commodity volume", "3 years beating market", "Bayesian regression"],
  },
] as const;

const software = [
  {
    label: "PRIVATE / PRE-LAUNCH",
    title: "AI DJ platform",
    description: "A private event-hosting system combining music recognition, generated voice, guest requests, media, and scheduled venue experiences.",
    stack: ["Next.js", "Postgres", "Spotify", "Voice AI", "AWS"],
    href: null,
    domain: null,
  },
  {
    label: "LIVE PRODUCT",
    title: "Song Selfie",
    description: "A customer-facing music product with venue activations, share-ready generated audio, automated partner economics, authentication, and payouts.",
    stack: ["Next.js", "AWS", "Audio generation", "Payments"],
    href: "https://songselfie.com",
    domain: "songselfie.com",
  },
] as const;

export default function WorkPage() {
  return (
    <div className="compact-work-page">
      <header className="work-index">
        <div className="work-index-copy">
          <span>SELECTED WORK</span>
          <h1>What we build.</h1>
          <p>Choose a capability. Each section shows the work directly—without another sales-page introduction.</p>
        </div>
        <nav className="work-category-cards" aria-label="Work categories">
          {categories.map(({ icon: Icon, ...category }) => (
            <a href={category.href} key={category.href}>
              <div><small>{category.number}</small><Icon aria-hidden="true" /></div>
              <h2>{category.title}</h2>
              <p>{category.detail}</p>
              <ArrowRight className="work-category-arrow" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </header>

      <section className="compact-work-section compact-bi" id="business-intelligence">
        <header className="compact-section-heading">
          <div><span>01</span><BarChart3 aria-hidden="true" /></div>
          <h2>Business intelligence</h2>
          <p>Nine industries, three years of synthetic history each, and KPI logic designed for the actual operating model.</p>
          <small>20,736 modeled observations</small>
        </header>
        <div className="compact-dashboard-grid">
          {dashboardConfigs.map((dashboard) => (
            <Link
              href={`/demos/${dashboard.slug}`}
              style={{ "--dashboard-accent": dashboard.accent } as React.CSSProperties}
              key={dashboard.slug}
            >
              <small>{dashboard.category}</small>
              <h3>{dashboard.title}</h3>
              <div>{dashboard.metrics.slice(0, 3).map((metric) => <span key={metric.key}>{metric.label}</span>)}</div>
              <strong>Open <ArrowUpRight size={14} /></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="compact-work-section compact-ai" id="ai">
        <header className="compact-section-heading">
          <div><span>02</span><ShieldCheck aria-hidden="true" /></div>
          <h2>Secure AI</h2>
          <p>Deployed ways to make Codex, Claude, and hosted models useful without making sensitive data public or permanent.</p>
          <Link href="/learn/secure-private-ai">How the security works <ArrowRight size={14} /></Link>
        </header>
        <div className="compact-ai-grid">
          {secureAi.map(({ icon: Icon, ...item }) => (
            <article key={item.title}>
              <div><Icon aria-hidden="true" /><small>CASE STUDY / {item.label}</small></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="compact-work-section compact-ml" id="machine-learning">
        <header className="compact-section-heading">
          <div><span>03</span><BrainCircuit aria-hidden="true" /></div>
          <h2>Machine learning</h2>
          <p>Forecasting, regression, and optimization judged by production results—not model vocabulary.</p>
          <Link href="/learn/demand-forecasting">Forecasting explainer <ArrowRight size={14} /></Link>
        </header>
        <div className="compact-ml-grid">
          {mlSystems.map((system) => (
            <article key={system.title}>
              <small>{system.label}</small>
              <h3>{system.title}</h3>
              <p>{system.description}</p>
              <ul>{system.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="compact-ml-resources">
          <Link href="/demos/cpg-analytics">CPG forecasting demo <ArrowRight size={14} /></Link>
          <Link href="/learn/demand-forecasting">ARIMA + Prophet <ArrowRight size={14} /></Link>
          <Link href="/learn/marketing-mix-modeling">Bayesian marketing mix modeling <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="compact-work-section compact-software" id="software">
        <header className="compact-section-heading">
          <div><span>04</span><Code2 aria-hidden="true" /></div>
          <h2>Software</h2>
          <p>Customer products, internal tools, APIs, integrations, and infrastructure—from a one-day build to the whole platform.</p>
        </header>
        <div className="compact-software-grid">
          {software.map((item) => {
            const content = (
              <>
                <div><Sparkles aria-hidden="true" /><small>{item.label}</small></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="compact-stack">{item.stack.map((technology) => <span key={technology}>{technology}</span>)}</div>
                {item.domain && <strong>{item.domain} <ArrowUpRight size={14} /></strong>}
              </>
            );

            return item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer" key={item.title}>{content}</a>
            ) : (
              <article key={item.title}>{content}</article>
            );
          })}
        </div>
      </section>

      <section className="compact-work-cta">
        <div><span>BRING US THE PROBLEM</span><h2>What needs to ship?</h2></div>
        <p>A senior engineer reviews every brief. No sales layer and no game of telephone.</p>
        <Link href="/book">Start a project <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}
