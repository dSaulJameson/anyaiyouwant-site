import type { Metadata } from "next";
import { TIDYCAL_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a 15-minute call with D. Saul Jameson — Fractional CTO and ML engineer. By the end of the call you'll know what your problem is, what it costs, and how long it takes to solve.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a 15-minute call",
    description: "Real answers in 15 minutes. No deck, no discovery phase.",
    url: "/book",
  },
};

export default function BookPage() {
  return (
    <div className="pt-16">
      <section className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="label-mono">Book</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
          15 minutes. <span className="text-gradient">Real answers.</span>
        </h1>
        <p className="mt-5 text-muted text-lg max-w-2xl">
          By the end of the call you&apos;ll know what your problem actually is, what it costs to
          solve it, and how long it will take. No discovery phase. No deck.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <a
            href={TIDYCAL_URL}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-md bg-accent text-black font-medium hover:bg-accent/90 transition-colors"
          >
            Pick a slot ↓
          </a>
          <span className="text-muted">or</span>
          <a
            href="mailto:Saul@anyaiyouwant.com"
            className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-surface transition-colors font-mono text-sm"
          >
            Saul@anyaiyouwant.com
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-10">
        <div className="card p-2 overflow-hidden">
          <iframe
            src={TIDYCAL_URL}
            className="w-full h-[800px] rounded-[12px] bg-white"
            title="Book a call with D. Saul Jameson"
          />
        </div>
        <p className="mt-3 text-xs font-mono text-muted text-center">
          Calendar not loading?{" "}
          <a href={TIDYCAL_URL} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            Open in new tab ↗
          </a>{" "}
          · Or just email{" "}
          <a href="mailto:Saul@anyaiyouwant.com" className="text-accent hover:underline">
            Saul@anyaiyouwant.com
          </a>
        </p>
      </section>
    </div>
  );
}
