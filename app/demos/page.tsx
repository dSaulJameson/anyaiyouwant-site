import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Database, Sparkles } from "lucide-react";
import { dashboardConfigs } from "@/lib/dashboard-data.mjs";

export const metadata: Metadata = {
  title: "Interactive analytics dashboard demos",
  description: "Explore nine industry-specific analytics dashboards with three years of realistic synthetic data, built by Any AI You Want.",
  alternates: { canonical: "/demos" },
};

export default function DemosPage() {
  return (
    <div className="demo-hub">
      <section className="demo-hub-hero">
        <span className="demo-hub-kicker"><Sparkles size={15} /> Interactive analytics lab</span>
        <h1>Dashboards built around <span>the decisions that matter.</span></h1>
        <p>Nine industries. Three years of realistic synthetic history in each. Different operating models, different KPIs, one production-minded analytics approach.</p>
        <div className="demo-hub-proof"><span><Database size={15} /> 20,000+ modeled observations</span><span><BarChart3 size={15} /> Industry-specific KPI logic</span></div>
      </section>

      <section className="demo-card-grid" aria-label="Analytics dashboard demos">
        {dashboardConfigs.map((dashboard, index) => (
          <Link href={`/demos/${dashboard.slug}`} key={dashboard.slug} className="demo-card" style={{ "--card-accent": dashboard.accent } as React.CSSProperties}>
            <div className="demo-card-number">0{index + 1}</div>
            <div className="demo-card-copy"><span>{dashboard.category}</span><h2>{dashboard.title}</h2><p>{dashboard.description}</p></div>
            <div className="demo-card-metrics">{dashboard.metrics.slice(0, 3).map((metric) => <span key={metric.key}>{metric.label}</span>)}</div>
            <div className="demo-card-link">Open dashboard <ArrowUpRight size={16} /></div>
          </Link>
        ))}
      </section>

      <section className="demo-hub-cta">
        <div><span>Need your numbers to tell the truth?</span><h2>We build the data model, pipeline, interface, and deployment.</h2></div>
        <Link href="/book">Talk through your dashboard <ArrowUpRight size={16} /></Link>
      </section>
    </div>
  );
}
