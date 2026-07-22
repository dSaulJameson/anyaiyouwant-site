import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Code2,
  LockKeyhole,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { dashboardConfigs } from "@/lib/dashboard-data.mjs";

export const metadata: Metadata = {
  title: "Work — Software, analytics, ML & secure AI",
  description:
    "Explore software products, nine interactive BI dashboards, production machine-learning systems, forecasting work, and secure AI reference builds from Any AI You Want.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — Software, analytics, ML & secure AI",
    description: "Software products, live BI dashboards, production ML, forecasting, and secure AI engineering.",
    url: "/work",
  },
};

const software = [
  {
    title: "AI Hype Host",
    domain: "aihypehost.com",
    href: "https://aihypehost.com",
    description:
      "An AI DJ and event-hosting platform combining music recognition, Spotify, generated voice, guest requests, media, and scheduled venue experiences.",
    stack: ["Next.js", "Postgres", "Spotify", "ElevenLabs", "AWS"],
  },
  {
    title: "Song Selfie",
    domain: "songselfie.com",
    href: "https://songselfie.com",
    description:
      "A customer-facing music product with venue activations, share-ready generated audio, automated partner economics, authentication, and payouts.",
    stack: ["Next.js", "AWS", "Audio generation", "Payments"],
  },
] as const;

const mlSystems = [
  {
    label: "OPTIMIZATION / PRODUCTION",
    title: "$300M bidding engine",
    description:
      "A recommendation and bidding-optimization system for a national auction platform—built around real-time decisions with real financial stakes.",
    metrics: ["$300M+ annual GMV", "Real-time ranking", "Python · GBM"],
  },
  {
    label: "REGRESSION / 9+ YEARS",
    title: "ZIP-code lead prioritization",
    description:
      "A Tobit-regression model using American Community Survey data to prioritize home-services leads when granular first-party data was unavailable.",
    metrics: ["9+ years in production", "Home services", "Python · Tobit · ACS"],
  },
  {
    label: "BAYESIAN FORECASTING",
    title: "Avocado demand forecasting",
    description:
      "A Bayesian supply-and-demand forecasting system for one of the country’s leading avocado suppliers, evaluated against real purchasing decisions.",
    metrics: ["$100M+ commodity volume", "3 years beating market", "Python · Bayesian regression"],
  },
] as const;

const secureAi = [
  {
    icon: Server,
    label: "CASE STUDY / TEAM ACCESS",
    title: "Codex and Claude inside Slack",
    description:
      "Coding and reasoning agents available through the interface teams already use, with model access, workspace permissions, and routing controlled outside the conversation.",
  },
  {
    icon: Code2,
    label: "CASE STUDY / ISOLATED EXECUTION",
    title: "Codex in secure cloud workspaces",
    description:
      "Cloud coding agents run inside isolated workspaces with scoped repositories, short-lived credentials, network boundaries, review gates, and reproducible builds.",
  },
  {
    icon: ShieldCheck,
    label: "CASE STUDY / ZERO PERSISTENCE",
    title: "LLM workflows for SSNs and sensitive data",
    description:
      "A zero-persistence path processes SSNs and equivalent PII without writing the sensitive values to application storage, prompt history, or ordinary logs.",
  },
] as const;

export default function WorkPage() {
  return (
    <div className="work-page">
      <header className="work-hero">
        <span className="work-kicker">Selected work / systems you can inspect</span>
        <h1>Built to operate.<br /><em>Not just demonstrate.</em></h1>
        <p>
          Software products, decision-ready analytics, production machine learning,
          and secure AI architecture. Some client work remains under NDA; everything
          below is either directly inspectable or a deployed architecture explained
          without exposing private client data.
        </p>
        <nav className="work-jump-nav" aria-label="Work categories">
          <a href="#software">Software</a>
          <a href="#dashboards">BI dashboards</a>
          <a href="#machine-learning">ML + forecasting</a>
          <a href="#secure-ai">Secure AI</a>
        </nav>
      </header>

      <section className="work-section work-software" id="software">
        <div className="work-section-heading">
          <span>01 / SOFTWARE</span>
          <h2>Products people<br /><em>actually use.</em></h2>
          <p>Customer-facing software, internal operating systems, APIs, infrastructure, and the integrations that make the whole product work.</p>
        </div>
        <div className="work-software-grid">
          {software.map((item, index) => (
            <a href={item.href} target="_blank" rel="noreferrer" className="work-software-card" key={item.title}>
              <div className="work-card-index">0{index + 1}</div>
              <div className="work-software-icon"><Code2 aria-hidden="true" /></div>
              <span>{item.domain} <ArrowUpRight size={14} /></span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div>{item.stack.map((technology) => <small key={technology}>{technology}</small>)}</div>
            </a>
          ))}
          <div className="work-software-note">
            <Sparkles aria-hidden="true" />
            <div>
              <strong>From a one-day tool to the whole platform.</strong>
              <p>Any sensible language or stack. The person learning the business can also write the code.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="work-section work-dashboards" id="dashboards">
        <div className="work-dashboard-intro">
          <span className="work-kicker">02 / BUSINESS INTELLIGENCE</span>
          <h2>Nine industries.<br /><em>Nine operating models.</em></h2>
          <p>Every dashboard has three years of realistic synthetic history and KPI logic designed for that industry. Open any one directly.</p>
          <div><BarChart3 size={16} /> 20,736 modeled observations</div>
        </div>
        <div className="work-dashboard-grid">
          {dashboardConfigs.map((dashboard, index) => (
            <Link
              href={`/demos/${dashboard.slug}`}
              className="work-dashboard-card"
              style={{ "--dashboard-accent": dashboard.accent } as React.CSSProperties}
              key={dashboard.slug}
            >
              <div className="work-card-index">{String(index + 1).padStart(2, "0")}</div>
              <small>{dashboard.category}</small>
              <h3>{dashboard.title}</h3>
              <p>{dashboard.description}</p>
              <div className="work-dashboard-kpis">
                {dashboard.metrics.slice(0, 3).map((metric) => <span key={metric.key}>{metric.label}</span>)}
              </div>
              <strong>Open dashboard <ArrowUpRight size={15} /></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="work-section work-ml" id="machine-learning">
        <div className="work-section-heading">
          <span>03 / MACHINE LEARNING + FORECASTING</span>
          <h2>Models judged by<br /><em>what happened next.</em></h2>
          <p>Production examples with long operating histories, plus public demonstrations that explain how the methods work.</p>
        </div>
        <div className="work-ml-content">
          <div className="work-ml-grid">
            {mlSystems.map((system, index) => (
              <article className="work-ml-card" key={system.title}>
                <div className="work-ml-orbit"><BrainCircuit aria-hidden="true" /><span>0{index + 1}</span></div>
                <small>{system.label}</small>
                <h3>{system.title}</h3>
                <p>{system.description}</p>
                <ul>{system.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="work-ml-links">
            <div>
              <span>LIVE SYNTHETIC DEMO</span>
              <strong>CPG growth and forecasting</strong>
              <Link href="/demos/cpg-analytics">Open the forecasting dashboard <ArrowRight size={15} /></Link>
            </div>
            <div>
              <span>TECHNICAL EXPLAINER</span>
              <strong>ARIMA, Prophet, and production forecasting</strong>
              <Link href="/learn/demand-forecasting">Understand the approach <ArrowRight size={15} /></Link>
            </div>
            <div>
              <span>TECHNICAL EXPLAINER</span>
              <strong>Bayesian marketing mix modeling</strong>
              <Link href="/learn/marketing-mix-modeling">See how budget simulation works <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="work-section work-secure" id="secure-ai">
        <div className="work-secure-heading">
          <span className="work-kicker">04 / SECURE AI</span>
          <LockKeyhole aria-hidden="true" />
          <h2>Useful AI inside<br /><em>real boundaries.</em></h2>
          <p>Deployed case studies for making powerful models available without making sensitive data public or permanent. The same patterns can support Codex, Claude, a hosted LLM, or a model inside your own cloud.</p>
        </div>
        <div className="work-secure-grid">
          {secureAi.map(({ icon: Icon, ...item }, index) => (
            <article key={item.title}>
              <div><span>0{index + 1}</span><Icon aria-hidden="true" /></div>
              <small>{item.label}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className="work-secure-actions">
          <Link href="/learn/secure-private-ai">Read the secure AI architecture <ArrowRight size={15} /></Link>
          <Link href="/book?project=secure-ai">Discuss a private build <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="work-cta">
        <span>START WITH AN ENGINEER</span>
        <h2>What needs to ship?</h2>
        <p>Bring the business problem, the broken system, or the half-defined idea. We can help scope it without handing you to a sales team.</p>
        <Link href="/book">Send a project brief <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}
