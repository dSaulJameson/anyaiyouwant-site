import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TIDYCAL_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About D. Saul Jameson",
  description:
    "D. Saul Jameson — machine learning engineer writing algorithms since before ChatGPT. 9+ years across forecasting, recommendation, and automation. Chairman of the Board of Builders & Backers Network 501(c)(6). Based in Southern California.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About D. Saul Jameson",
    description: "ML engineer writing algorithms since before ChatGPT. Fractional CTO. Chairman of Builders & Backers Network.",
    url: "/about",
  },
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
              { k: "ROLES", v: "ML Eng · CTO" },
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
              For teams that want to work with someone who didn&apos;t just jump on the hype
              train — but was building the tracks for it to ride on — Saul is the right call.
            </p>
            <p>
              Saul is a data-driven builder, consultant, and community organizer who has spent
              nine years turning messy real-world problems into working systems. He started in
              applied forecasting, where he was recruited to model supply and demand for one of
              the nation&apos;s leading avocado suppliers — and consistently beat the market for
              three consecutive years.
            </p>
            <p>
              From there, he was recruited again to design and deploy a large-scale product
              recommendation and bidding optimization engine for an auction company generating
              <span className="text-foreground"> $300M+ annually</span>. Across all of his
              engagements combined, the models he has built and shipped have processed
              <span className="text-foreground"> well over $1B in revenue</span>.
            </p>
            <p>
              Since then he has shipped systems across <span className="text-foreground">real
              estate, home remodeling, CPG, cannabis, legal, e-commerce, agriculture &amp;
              commodity forecasting, lead aggregation, and AI-first businesses</span> —
              building practical automation stacks (CRMs, voice agents, n8n workflows, data
              pipelines, marketing systems) that actually get used by sales teams and founders
              every day. If a given industry isn&apos;t on that list, it probably will be by
              next quarter.
            </p>
            <p>
              Outside of client work, Saul builds and ships apps of his own —{" "}
              <a href="https://storywarz.win" target="_blank" rel="noreferrer" className="text-accent hover:underline">storywarz.win</a>{" "}
              and{" "}
              <a href="https://songselfie.com" target="_blank" rel="noreferrer" className="text-accent hover:underline">songselfie.com</a>{" "}
              are two live products. He&apos;s comfortable from the model layer all the way up
              through architecture, integrations, and the cloud invoice — GCP, AWS, Azure,
              Hetzner, Vercel — pick your poison.
            </p>
            <p>
              He also serves as <span className="text-foreground">Chairman of the Board</span> of
              the <span className="text-foreground">Builders &amp; Backers Network</span>, a
              501(c)(6) connecting founders and investors across Southern California through
              regular mixers and programs.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 items-center">
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
            <a
              href="mailto:Saul@anyaiyouwant.com"
              className="px-2 py-3 text-sm font-mono text-muted hover:text-foreground transition-colors"
            >
              Saul@anyaiyouwant.com →
            </a>
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
