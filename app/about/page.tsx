import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TIDYCAL_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "D. Saul Jameson — machine learning engineer writing algorithms since before ChatGPT. Fractional CTO, founder, Chairman of Builders & Backers Network 501(c)(6).",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-4">
          <div className="card p-2 inline-block">
            <Image
              src="/media/headshot.png"
              alt="D. Saul Jameson"
              width={420}
              height={420}
              className="rounded-[12px]"
              priority
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {[
              { k: "EXP", v: "9+ yrs" },
              { k: "BASED", v: "SoCal" },
              { k: "ROLES", v: "Eng · CTO" },
              { k: "STATUS", v: "Available" },
            ].map((s) => (
              <div key={s.k} className="bg-surface-2/60 border border-border rounded-md p-3">
                <div className="label-mono text-[10px]">{s.k}</div>
                <div className="mt-1 text-sm font-mono">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="label-mono">About</div>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
            D. Saul Jameson
          </h1>
          <p className="mt-3 text-xl text-muted">
            A machine learning engineer writing algorithms since before ChatGPT.
          </p>

          <div className="mt-8 space-y-5 text-foreground/90 leading-relaxed">
            <p>
              If you want to work with someone who didn&apos;t just jump on the hype train — but
              was building the tracks for it to ride on — you&apos;re in the right place.
            </p>
            <p>
              I&apos;m a data-driven builder, consultant, and community organizer who has spent
              nine years turning messy real-world problems into working systems. I started in
              applied forecasting, where I was recruited to model supply and demand for one of
              the nation&apos;s leading avocado suppliers — and consistently beat the market for
              three consecutive years.
            </p>
            <p>
              From there, I was recruited again to design and deploy a large-scale product
              recommendation and bidding optimization engine for an auction company generating
              <span className="text-foreground"> $300M+ annually</span>. Since then I&apos;ve
              shipped systems across real estate, home remodeling, CPG, AI-first businesses,
              and cannabis — building practical automation stacks (CRMs, voice agents, n8n
              workflows, data pipelines, marketing systems) that actually get used by sales
              teams and founders every day.
            </p>
            <p>
              Outside of client work, I build and ship apps of my own —{" "}
              <a href="https://storywarz.win" target="_blank" rel="noreferrer" className="text-accent hover:underline">storywarz.win</a>{" "}
              and{" "}
              <a href="https://songselfie.com" target="_blank" rel="noreferrer" className="text-accent hover:underline">songselfie.com</a>{" "}
              are two live products. I&apos;m comfortable from the model layer all the way up to
              Stripe Connect revenue splits and the cloud invoice — GCP, AWS, Azure, Hetzner,
              Vercel — pick your poison.
            </p>
            <p>
              I also serve as <span className="text-foreground">Chairman of the Board</span> of
              the <span className="text-foreground">Builders &amp; Backers Network</span>, a
              501(c)(6) connecting founders and investors across Southern California through
              regular mixers and programs.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
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
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
        <div className="card p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-accent-2/15 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="label-mono">Community</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Builders &amp; Backers Network
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                A 501(c)(6) trade association connecting Southern California founders with
                operators, capital, and each other. Mixers, salons, and working sessions where
                people who actually ship find their next collaborator. I serve as Chairman of
                the Board.
              </p>
              <div className="mt-5">
                <a
                  href="https://buildersandbackers.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-mono text-accent hover:underline"
                >
                  buildersandbackers.org ↗
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              {[
                ["FOUNDED", "2024"],
                ["TYPE", "501(c)(6)"],
                ["ROLE", "Chairman"],
                ["REGION", "SoCal"],
                ["FOCUS", "Founders + capital"],
                ["FORMAT", "IRL mixers"],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface-2/60 border border-border rounded-md p-3">
                  <div className="label-mono text-[10px]">{k}</div>
                  <div className="mt-1 text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
