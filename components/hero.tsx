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
          STRATEGY, GROWTH, AI + U.S.-BASED ENGINEERING
        </div>

        <h1>
          Whatever you want to build,
          <br className="brand-hero-break" /> automate, or improve—we engineer and ship it.
        </h1>

        <p className="brand-hero-summary">
          Bring us a hard business decision, a growth goal, an AI idea, a
          process to automate, a website, or a full product. Senior people
          shape the answer and stay accountable through execution.
        </p>

        <div className="brand-hero-actions">
          <Link href="/book" className="brand-primary-action">
            Tell us what you need <ArrowRight size={17} />
          </Link>
          <Link href="/work" className="brand-secondary-action">
            See what we&apos;ve built
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
