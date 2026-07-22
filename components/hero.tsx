"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { HeroBuildLoop } from "./hero-build-loop";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (index: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function Hero() {
  return (
    <section className="relative pt-10 md:pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/70 text-xs font-mono text-muted">
            <MapPin size={13} className="text-accent" /> All engineering work is performed by U.S.-based engineers
          </motion.div>
          <motion.h1 initial="hidden" animate="show" variants={fadeUp} custom={1} className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.045em] leading-[1.02]">
            Software, analytics, and <span className="text-gradient">secure AI that ships.</span>
          </motion.h1>
          <motion.p initial="hidden" animate="show" variants={fadeUp} custom={2} className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            Senior engineers handle discovery and implementation, so the person learning your business can also write the code. Bring us a one-day problem or a multi-quarter platform.
          </motion.p>
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="px-5 py-3 rounded-md bg-accent text-black font-medium hover:bg-accent/90 transition-colors inline-flex items-center gap-2">Send a project brief <ArrowRight size={16} /></Link>
            <Link href="/demos" className="px-5 py-3 rounded-md border border-border text-foreground hover:bg-surface transition-colors">Explore live dashboards</Link>
          </motion.div>
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={4} className="mt-9 grid sm:grid-cols-3 gap-3 max-w-2xl">
            {["$1B+ in revenue processed by shipped systems", "9+ years building production ML", "Any language, cloud, or sensible stack"].map((item) => (
              <div key={item} className="flex gap-2 text-xs text-muted leading-relaxed"><Check size={14} className="text-success shrink-0 mt-0.5" /><span>{item}</span></div>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.25 }} className="lg:col-span-5">
          <HeroBuildLoop />
        </motion.div>
      </div>
    </section>
  );
}
