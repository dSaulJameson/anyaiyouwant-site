import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, BrainCircuit, Code2, ShieldCheck } from "lucide-react";
import { dashboardConfigs } from "@/lib/dashboard-data.mjs";
import { caseStudies } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Selected Product Engineering, Data, ML & Secure AI Work",
  description: "Selected full-stack products, operating platforms, analytics systems, production machine learning, and secure AI delivered by Any AI You Want.",
  alternates: { canonical: "/work" },
};

const categories = [
  { href: "#product-engineering", number: "01", title: "Product", detail: "Software + platforms", icon: Code2 },
  { href: "#data-analytics", number: "02", title: "Data", detail: "Analytics + BI", icon: BarChart3 },
  { href: "#machine-learning", number: "03", title: "ML", detail: "Forecasting + optimization", icon: BrainCircuit },
  { href: "#secure-ai", number: "04", title: "Secure AI", detail: "Agents + private models", icon: ShieldCheck },
] as const;

const productWork = caseStudies.filter((item) => ["hospitality-operations-platform", "event-contact-platform", "local-discovery-platform"].includes(item.slug));
const mlWork = caseStudies.filter((item) => ["auction-bidding-engine", "lead-prioritization", "avocado-demand-forecasting"].includes(item.slug));
const secureWork = caseStudies.filter((item) => item.slug === "secure-coding-agents");

export default function WorkPage() {
  return (
    <div className="compact-work-page">
      <header className="work-index">
        <div className="work-index-copy">
          <span>SELECTED WORK</span>
          <h1>Products and systems built for the real world.</h1>
          <p>Representative full-stack software, data systems, machine learning, and secure AI delivered by senior U.S.-based engineers.</p>
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

      <section className="compact-work-section compact-software" id="product-engineering">
        <header className="compact-section-heading">
          <div><span>01</span><Code2 aria-hidden="true" /></div>
          <h2>Product engineering and delivery</h2>
          <p>Customer products, operating platforms, data-backed publishing, APIs, integrations, and infrastructure shaped and built by the same engineering team.</p>
          <Link href="/services/product-engineering">Explore the capability <ArrowRight size={14} /></Link>
        </header>
        <div className="compact-software-grid">
          {productWork.map((item) => (
            <Link href={`/work/${item.slug}`} key={item.slug} className="compact-work-case">
              <div><Code2 aria-hidden="true" /><small>{item.category}</small></div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="compact-stack">{item.capabilities.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}</div>
              <strong>Read case study <ArrowRight size={14} /></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="compact-work-section compact-bi" id="data-analytics">
        <header className="compact-section-heading">
          <div><span>02</span><BarChart3 aria-hidden="true" /></div>
          <h2>Data and analytics</h2>
          <p>Nine industry examples with three years of synthetic history each. The dashboards demonstrate the visible layer; client systems also include definitions, integrations, pipelines, permissions, and deployment.</p>
          <Link href="/services/data-analytics">Explore data engineering <ArrowRight size={14} /></Link>
        </header>
        <div className="compact-dashboard-grid">
          {dashboardConfigs.map((dashboard) => (
            <Link href={`/demos/${dashboard.slug}`} style={{ "--dashboard-accent": dashboard.accent } as React.CSSProperties} key={dashboard.slug}>
              <small>{dashboard.category}</small><h3>{dashboard.title}</h3>
              <div>{dashboard.metrics.slice(0, 3).map((metric) => <span key={metric.key}>{metric.label}</span>)}</div>
              <strong>Open example <ArrowUpRight size={14} /></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="compact-work-section compact-ml" id="machine-learning">
        <header className="compact-section-heading">
          <div><span>03</span><BrainCircuit aria-hidden="true" /></div>
          <h2>Applied machine learning</h2>
          <p>Forecasting, regression, recommendation, and optimization evaluated against real operating decisions and production results.</p>
          <Link href="/services/applied-machine-learning">Explore applied ML <ArrowRight size={14} /></Link>
        </header>
        <div className="compact-ml-grid">
          {mlWork.map((item) => (
            <Link href={`/work/${item.slug}`} key={item.slug} className="compact-work-case">
              <small>{item.category}</small><h3>{item.title}</h3><p>{item.summary}</p>
              <ul>{item.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>
              <strong>Read case study <ArrowRight size={14} /></strong>
            </Link>
          ))}
        </div>
        <div className="compact-ml-resources">
          <Link href="/learn/demand-forecasting">ARIMA + Prophet <ArrowRight size={14} /></Link>
          <Link href="/learn/marketing-mix-modeling">Bayesian marketing mix modeling <ArrowRight size={14} /></Link>
          <Link href="/learn/customer-segmentation">Clustering that changes decisions <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="compact-work-section compact-ai" id="secure-ai">
        <header className="compact-section-heading">
          <div><span>04</span><ShieldCheck aria-hidden="true" /></div>
          <h2>Secure AI</h2>
          <p>Models and coding agents made useful through controlled identity, retrieval, credentials, execution, retention, and review.</p>
          <Link href="/services/secure-ai">Explore secure AI <ArrowRight size={14} /></Link>
        </header>
        <div className="compact-ai-grid">
          {secureWork.map((item) => (
            <Link href={`/work/${item.slug}`} key={item.slug} className="compact-work-case">
              <div><ShieldCheck aria-hidden="true" /><small>CASE STUDY / CONTROLLED TEAM ACCESS</small></div>
              <h3>{item.title}</h3><p>{item.summary}</p>
              <strong>Read case study <ArrowRight size={14} /></strong>
            </Link>
          ))}
          <article><div><ShieldCheck aria-hidden="true" /><small>ARCHITECTURE / ZERO RETENTION</small></div><h3>Sensitive-data model workflows</h3><p>SSNs, documents, and private business records can be minimized, masked, routed, processed, and discarded without becoming ordinary application history.</p><Link href="/learn/secure-private-ai">Understand the architecture <ArrowRight size={14} /></Link></article>
          <article><div><ShieldCheck aria-hidden="true" /><small>DEPLOYMENT / PRIVATE INFERENCE</small></div><h3>Hosted or self-hosted models</h3><p>The right boundary may be a protected hosted API, a private cloud endpoint, or infrastructure the client controls. The data and threat model decide.</p><Link href="/services/secure-ai">Compare deployment paths <ArrowRight size={14} /></Link></article>
        </div>
      </section>

      <section className="compact-work-cta">
        <div><span>BRING US THE OPERATING PROBLEM</span><h2>What needs to work in production?</h2></div>
        <p>Talk directly with a senior engineer who can help shape, architect, and build the answer.</p>
        <Link href="/book">Talk to an engineer <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}
