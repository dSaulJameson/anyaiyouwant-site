import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Globe2, ShieldCheck, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="brand-hero">
      <div className="brand-hero-visual" aria-hidden="true">
        <Image
          src="/media/browser-icon.png"
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 100vw, 52vw"
          className="brand-hero-art"
        />
        <div className="brand-hero-vignette" />
        <div className="brand-hero-proof">
          <span>9+ years</span>
          <small>production ML</small>
        </div>
      </div>

      <div className="brand-hero-copy">
        <div className="brand-display-name">
          <span>ANY AI</span>
          <span>YOU WANT</span>
        </div>
        <div className="brand-rule" />

        <h1>
          Software, analytics,
          <br />
          and secure AI that ships.
        </h1>

        <div className="brand-signal-list">
          <div className="brand-signal">
            <ShieldCheck aria-hidden="true" />
            <span>Technical discovery. Production delivery.</span>
          </div>
          <div className="brand-signal">
            <Users aria-hidden="true" />
            <span>Senior U.S.-based engineers.</span>
          </div>
          <div className="brand-signal">
            <Globe2 aria-hidden="true" />
            <span>Any language. Any sensible stack.</span>
          </div>
        </div>

        <p className="brand-hero-summary">
          The people learning your business can also write the code. Bring us a
          one-day problem, a complicated rescue, or a platform that needs a full team.
        </p>

        <div className="brand-hero-actions">
          <Link href="/book" className="brand-primary-action">
            Start a project <ArrowRight size={17} />
          </Link>
          <Link href="/work" className="brand-secondary-action">
            See commercial work
          </Link>
        </div>

        <div className="brand-hero-facts">
          <span><Check size={14} /> $1B+ processed by shipped systems</span>
          <span><Check size={14} /> No bloated agency layer</span>
        </div>
      </div>
    </section>
  );
}
