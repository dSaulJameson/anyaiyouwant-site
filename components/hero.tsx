import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function Hero() {
  return (
    <section className="brand-hero">
      <Image
        src="/media/browser-icon.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="brand-hero-background"
      />
      <div className="brand-hero-overlay" aria-hidden="true" />
      <div className="brand-hero-scan" aria-hidden="true" />

      <div className="brand-hero-content">
        <div className="brand-hero-kicker">
          <span aria-hidden="true" />
          SENIOR U.S.-BASED PRODUCT ENGINEERING
        </div>

        <h1>
          Senior U.S. engineers for
          <br className="brand-hero-break" /> software that has to work.
        </h1>

        <p className="brand-hero-summary">
          We shape, architect, code, deploy, and operate full-stack products,
          data systems, machine learning, and secure AI. The engineers in
          discovery remain accountable through production.
        </p>

        <div className="brand-hero-actions">
          <Link href="/book" className="brand-primary-action">
            Talk to an engineer <ArrowRight size={17} />
          </Link>
          <Link href="/work" className="brand-secondary-action">
            See selected work
          </Link>
        </div>

        <div className="brand-hero-metrics">
          <div>
            <strong>$1B+</strong>
            <span>processed by shipped systems</span>
          </div>
          <div>
            <strong>9+ years</strong>
            <span>long-running production ML</span>
          </div>
          <div>
            <strong><Check size={16} /> U.S.-based</strong>
            <span>engineering through production</span>
          </div>
        </div>
      </div>
    </section>
  );
}
