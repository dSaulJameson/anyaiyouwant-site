import Link from "next/link";
import { ArrowRight, BarChart3, Binary, CalendarDays, Code2, Database, LockKeyhole, Sparkles } from "lucide-react";
import { Hero } from "@/components/hero";
import { ProjectBriefForm } from "@/components/project-brief-form";
import { industries, insights, services } from "@/lib/site-content";

const serviceIcons = [Code2, Binary, LockKeyhole, BarChart3, Database, Sparkles];

const proof = [
  {
    eyebrow: "ML / OPTIMIZATION",
    title: "$300M bidding engine",
    body: "A production recommendation and bidding-optimization system designed around real-time decisions for a national auction platform.",
    href: "/work",
    action: "Read the case study →",
  },
  {
    eyebrow: "ML / NINE YEARS IN PRODUCTION",
    title: "ZIP-code lead prioritization",
    body: "A Tobit-regression model using public demographic data to help a home-services call center prioritize leads. Still running nine years later.",
    href: "/work",
    action: "See the production history →",
  },
  {
    eyebrow: "BAYESIAN ML / FORECASTING",
    title: "Three years beating the market",
    body: "A Bayesian supply-and-demand forecasting system for one of the country's leading avocado suppliers, tested against real purchasing decisions.",
    href: "/learn/demand-forecasting",
    action: "Understand the forecasting approach →",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="brand-capability-band" aria-label="Engineering capabilities">
        <span>SOFTWARE</span><i />
        <span>ANALYTICS</span><i />
        <span>MACHINE LEARNING</span><i />
        <span>SECURE AI</span><i />
        <span>AUTOMATION</span>
      </div>

      <section className="home-editorial-section">
        <div className="home-section-intro">
          <span className="home-kicker">01 / WHAT WE BUILD</span>
          <h2>Bring the problem.<br /><em>We assemble the answer.</em></h2>
          <p>
            Software is the core, not an afterthought. Models, dashboards, APIs,
            workflows, infrastructure, and interfaces are built as one operating system.
          </p>
        </div>

        <div className="home-service-ledger">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <Link href={`/services#${service.slug}`} className="home-service-row" key={service.slug}>
                <span className="home-service-number">0{index + 1}</span>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                </div>
                <ArrowRight className="home-service-arrow" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-proof-section">
        <div className="home-proof-heading">
          <span className="home-kicker">02 / PROOF THAT SHIPS</span>
          <h2>Measured in years.<br />Measured in revenue.</h2>
          <p>Commercial systems with long production lives—not prototypes arranged for a portfolio screenshot.</p>
          <Link href="/work">View the complete work <ArrowRight size={16} /></Link>
        </div>
        <div className="home-proof-grid">
          {proof.map((item, index) => {
            const external = item.href.startsWith("http");
            const content = (
              <>
                <span className="home-proof-index">0{index + 1}</span>
                <div className="home-proof-copy">
                  <small>{item.eyebrow}</small>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <strong>{item.action}</strong>
                </div>
              </>
            );
            return external ? (
              <a className="home-proof-item" href={item.href} target="_blank" rel="noreferrer" key={item.title}>{content}</a>
            ) : (
              <Link className="home-proof-item" href={item.href} key={item.title}>{content}</Link>
            );
          })}
        </div>
      </section>

      <section className="home-range-strip">
        <div>
          <span className="home-kicker">SOFTWARE RANGE</span>
          <h2>Still comfortable building the unusual.</h2>
        </div>
        <p>AI-hosted venue experiences, payments, audio generation, real-time multiplayer, customer-facing products, and the internal systems behind them.</p>
        <div className="home-range-links">
          <a href="https://aihypehost.com" target="_blank" rel="noreferrer">AI Hype Host ↗</a>
          <a href="https://songselfie.com" target="_blank" rel="noreferrer">Song Selfie ↗</a>
          <Link href="/demos">Analytics demos →</Link>
        </div>
      </section>

      <section className="home-model-section">
        <div className="home-model-header">
          <span className="home-kicker">03 / TRUE MACHINE LEARNING</span>
          <h2>Models with assumptions.<br /><em>Outputs with uncertainty.</em></h2>
          <p>Not AI as a buzzword. Understand what the method measures, where it can fail, and how it changes a decision.</p>
        </div>
        <div className="home-model-grid">
          {insights.map((insight, index) => (
            <Link href={`/learn/${insight.slug}`} className="home-model-item" key={insight.slug}>
              <div className="home-model-orbit"><span>{index + 1}</span></div>
              <small>{insight.eyebrow}</small>
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
              <strong>Read the technical explainer →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-industry-section">
        <div>
          <span className="home-kicker">04 / INDUSTRY INTELLIGENCE</span>
          <h2>The KPI changes.<br /><em>The engineering travels.</em></h2>
        </div>
        <div className="home-industry-list">
          {industries.map((industry) => (
            <Link href={`/industries/${industry.slug}`} key={industry.slug}>
              <span>{industry.name}</span>
              <small>{industry.kpis.slice(0, 3).join(" · ")}</small>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-community-strip">
        <div><CalendarDays /><span>Live AI and technology event guides</span></div>
        <p>Local community data from Offline Networking, technical explainers, and a practical AI/ML glossary give people a reason to come back.</p>
        <Link href="/community">Explore community resources →</Link>
      </section>

      <section className="home-brief-section">
        <div className="home-brief-copy">
          <span className="home-kicker">05 / START WITH AN ENGINEER</span>
          <h2>Tell us what<br /><em>is stuck.</em></h2>
          <p>
            A senior engineer reviews every brief. No automated AI sales sequence,
            no game of telephone, and no requirement that the project already be perfectly defined.
          </p>
          <Link href="/book#calendar">Prefer a call? Book 15 minutes →</Link>
        </div>
        <div className="home-brief-form">
          <ProjectBriefForm compact />
        </div>
      </section>
    </>
  );
}
