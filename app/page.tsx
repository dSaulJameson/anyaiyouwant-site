import { Hero } from "@/components/hero";
import { CapabilityStrip } from "@/components/capability-strip";
import { ServicesGrid } from "@/components/services-grid";
import { FeaturedWork } from "@/components/featured-work";
import { HowDifferent } from "@/components/how-different";
import { AnimatedGrid } from "@/components/animated-grid";
import Link from "next/link";
import { TIDYCAL_URL } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <AnimatedGrid />
        <Hero />
      </div>
      <CapabilityStrip />
      <ServicesGrid />
      <FeaturedWork />
      <HowDifferent />

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-2/15 blur-3xl" />
            <div className="relative">
              <div className="label-mono">2 hours or 2,000 hours</div>
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
                If you can describe it,{" "}
                <span className="text-gradient">we can ship it.</span>
              </h2>
              <p className="mt-4 text-muted text-lg max-w-2xl">
                Enterprise teams need someone who can talk to the board and write the model.
                Startups need someone who can choose the stack and ship by Friday.
                The right operator does both — that&apos;s the whole point.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={TIDYCAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-md bg-accent text-black font-medium hover:bg-accent/90 transition-colors"
                >
                  Book 15 minutes →
                </a>
                <Link
                  href="/work"
                  className="px-5 py-3 rounded-md border border-border text-foreground hover:bg-surface transition-colors"
                >
                  See the work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
