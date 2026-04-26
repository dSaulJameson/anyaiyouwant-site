"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TIDYCAL_URL } from "@/lib/utils";
import { HeroBuildLoop } from "./hero-build-loop";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative pt-20 md:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 text-xs font-mono text-muted"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
            9 years building ML / AI — long before ChatGPT
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            <span className="text-foreground">Fractional CTO.</span>
            <br />
            <span className="text-gradient">Full-stack of AI.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mt-6 text-lg text-muted max-w-xl leading-relaxed"
          >
            Algorithms, automation, and apps — for enterprises and startups alike. Whether
            it&apos;s a 2-hour script or a 2,000-hour platform, you get it shipped, faster
            and better than anywhere else.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={TIDYCAL_URL}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-md bg-accent text-black font-medium hover:bg-accent/90 transition-colors"
            >
              Book 15 min — save 100s of hours
            </a>
            <Link
              href="/work"
              className="px-5 py-3 rounded-md border border-border text-foreground hover:bg-surface transition-colors"
            >
              See the work →
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono text-muted"
          >
            <span><span className="text-foreground">$1B+</span> revenue processed by my models</span>
            <span><span className="text-foreground">Every industry</span> — CPG, home services, real estate, legal, e-comm, fintech &amp; more</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:col-span-5"
        >
          <HeroBuildLoop />
        </motion.div>
      </div>
    </section>
  );
}
