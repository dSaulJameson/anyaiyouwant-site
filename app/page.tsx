import Link from "next/link";
import { ArrowRight, BarChart3, Binary, CalendarDays, Code2, Database, LockKeyhole, Sparkles } from "lucide-react";
import { Hero } from "@/components/hero";
import { ProjectBriefForm } from "@/components/project-brief-form";
import { industries, insights, services } from "@/lib/site-content";

const serviceIcons = [Code2, Binary, LockKeyhole, BarChart3, Database, Sparkles];
const featuredInsights = insights.filter((insight) => ["custom-software-cost", "software-project-rescue", "secure-coding-agents", "search-answer-engine-growth"].includes(insight.slug));

const proof = [
  {
    eyebrow: "PRODUCT ENGINEERING / OPERATIONS",
    title: "Hospitality operations platform",
    body: "Reservations, staffing, onboarding, training, availability, and manager workflows brought into one production system.",
    href: "/work/hospitality-operations-platform",
    action: "Read the case study →",
  },
  {
    eyebrow: "FULL-STACK / GROWTH ENGINEERING",
    title: "Local discovery platform",
    body: "A live event database, city architecture, publishing system, internal linking, and automated freshness built as one acquisition product.",
    href: "/work/local-discovery-platform",
    action: "See the platform →",
  },
  {
    eyebrow: "APPLIED ML / OPTIMIZATION",
    title: "$300M bidding engine",
    body: "A production recommendation and bidding-optimization system designed around real-time financial decisions for a national auction platform.",
    href: "/work/auction-bidding-engine",
    action: "Read the case study →",
  },
  {
    eyebrow: "SECURE AI / ENGINEERING",
    title: "Protected coding agents",
    body: "Codex and Claude connected to team workflows through isolated workspaces, controlled repository access, short-lived credentials, and review gates.",
    href: "/work/secure-coding-agents",
    action: "See the architecture →",
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
          <span className="home-kicker">01 / PRODUCT ENGINEERING + DELIVERY</span>
          <h2>Bring the problem.<br /><em>Engineers build the answer.</em></h2>
          <p>
            We are engineering-heavy by design. The people shaping the product
            also architect, code, test, deploy, and operate it.
          </p>
        </div>

        <div className="home-service-ledger">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <Link href={`/services/${service.slug}`} className="home-service-row" key={service.slug}>
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
          <span className="home-kicker">02 / SELECTED OUTCOMES</span>
          <h2>Built into the business.<br />Measured by what changes.</h2>
          <p>Representative production work across products, operations, data, machine learning, and secure AI.</p>
          <Link href="/work">Explore selected work <ArrowRight size={16} /></Link>
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
          <span className="home-kicker">FULL-STACK MEANS THE WHOLE PRODUCT</span>
          <h2>From the customer experience to the system behind it.</h2>
        </div>
        <p>We build the interfaces people use and the software, data, integrations, and infrastructure that make them reliable. One engineering team stays accountable across the stack.</p>
        <div className="home-range-links">
          <Link href="/services/product-engineering">Product engineering →</Link>
          <Link href="/work">Selected outcomes →</Link>
          <Link href="/services/modernization-automation">Modernization →</Link>
        </div>
      </section>

      <section className="home-model-section">
        <div className="home-model-header">
          <span className="home-kicker">03 / ENGINEERING INSIGHTS</span>
          <h2>Clear answers for<br /><em>expensive technical decisions.</em></h2>
          <p>Software architecture, production machine learning, secure AI, and technical growth explained by engineers who build and operate the systems.</p>
        </div>
        <div className="home-model-grid">
          {featuredInsights.map((insight, index) => (
            <Link href={`/learn/${insight.slug}`} className="home-model-item" key={insight.slug}>
              <div className="home-model-orbit"><span>{index + 1}</span></div>
              <small>{insight.eyebrow}</small>
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
              <strong>Read the engineering insight →</strong>
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
            A senior engineer reviews every brief and responds with the most useful
            technical next step. The project does not need to be perfectly defined.
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
