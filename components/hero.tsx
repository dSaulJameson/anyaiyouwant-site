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
          U.S.-based software + ML studio
        </div>

        <h1>
          Software, analytics, and
          <br className="brand-hero-break" /> secure AI that ships.
        </h1>

        <p className="brand-hero-summary">
          Senior engineers handle discovery and delivery—without a sales layer or
          a game of telephone. Bring us a one-day problem, a complicated rescue,
          or a platform that needs a full team.
        </p>

        <div className="brand-hero-actions">
          <Link href="/book" className="brand-primary-action">
            Start a project <ArrowRight size={17} />
          </Link>
          <Link href="/work" className="brand-secondary-action">
            See commercial work
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
            <span>engineering from discovery onward</span>
          </div>
        </div>
      </div>
    </section>
  );
}
