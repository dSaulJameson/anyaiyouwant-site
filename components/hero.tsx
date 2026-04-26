"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TIDYCAL_URL } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const codeLines = [
  { t: "$", c: "deploy ml-pipeline --env=prod", color: "text-foreground" },
  { t: ">", c: "training... AUC 0.94 ✓", color: "text-success" },
  { t: ">", c: "shipping to 12M users ✓", color: "text-accent" },
];

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
            9 years building ML — long before ChatGPT
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
            <span className="text-foreground">ML engineer.</span>
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
            <span><span className="text-foreground">$300M+</span> processed via my models</span>
            <span><span className="text-foreground">3 yrs</span> beating the avocado market</span>
            <span><span className="text-foreground">12M+</span> end-users touched</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:col-span-5"
        >
          <div className="card p-1 overflow-hidden">
            <div className="rounded-[14px] bg-[#08090c] p-5 font-mono text-sm">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[10px] text-muted">~/anyaiyouwant — zsh</span>
              </div>

              {codeLines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.4 }}
                  className="flex gap-2 leading-7"
                >
                  <span className="text-accent">{l.t}</span>
                  <span className={l.color}>{l.c}</span>
                </motion.div>
              ))}

              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-accent mt-1 align-middle"
              />
            </div>

            <div className="grid grid-cols-3 gap-px bg-border rounded-b-[14px] overflow-hidden mt-px">
              {[
                { k: "MODELS", v: "47 deployed" },
                { k: "STACK", v: "polyglot" },
                { k: "STATUS", v: "shipping" },
              ].map((s) => (
                <div key={s.k} className="bg-[#08090c] p-3">
                  <div className="text-[9px] tracking-[0.18em] text-muted">{s.k}</div>
                  <div className="text-[13px] text-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
