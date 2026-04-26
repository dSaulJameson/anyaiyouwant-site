"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Phase = "chat" | "code" | "output";
type ScenId = "storywarz" | "songselfie" | "analytics";

type Scenario = {
  id: ScenId;
  domain: string;
  user: string;
  ai: string;
  code: { t: string; c: string; tone?: "ok" | "info" }[];
};

const scenarios: Scenario[] = [
  {
    id: "analytics",
    domain: "forecast · BR-v4",
    user: "Forecast our Q4 revenue. Show me the dashboard.",
    ai: "Bayesian regression + dashboard. Two days.",
    code: [
      { t: "$", c: "train forecast --model=br-v4" },
      { t: ">", c: "AUC 0.94 · CI 95% ✓", tone: "ok" },
      { t: ">", c: "dashboard live ✓", tone: "info" },
    ],
  },
  {
    id: "songselfie",
    domain: "songselfie.com",
    user: "Make custom songs at our venue with revenue split.",
    ai: "Stripe Connect + AI vocals. Shipping.",
    code: [
      { t: "$", c: "deploy songselfie --venue=hangout" },
      { t: ">", c: "stripe.connect.attach ✓", tone: "ok" },
      { t: ">", c: "song generated · 0:42 ✓", tone: "info" },
    ],
  },
  {
    id: "storywarz",
    domain: "storywarz.win",
    user: "I want a multiplayer story game.",
    ai: "Real-time rooms + AI co-author. On it.",
    code: [
      { t: "$", c: "init storywarz --multiplayer" },
      { t: ">", c: "rooms.deploy() ✓", tone: "ok" },
      { t: ">", c: "ai-storyteller online ✓", tone: "info" },
    ],
  },
];

const PHASE_MS: Record<Phase, number> = { chat: 3200, code: 3500, output: 4000 };

export function HeroBuildLoop() {
  const [scenIdx, setScenIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("chat");
  const scen = scenarios[scenIdx];

  useEffect(() => {
    const t = setTimeout(() => {
      if (phase === "chat") setPhase("code");
      else if (phase === "code") setPhase("output");
      else {
        setPhase("chat");
        setScenIdx((i) => (i + 1) % scenarios.length);
      }
    }, PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="card p-1 overflow-hidden">
      <div className="rounded-[14px] bg-[#08090c] p-5 h-[340px] relative font-mono text-sm overflow-hidden">
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[10px] text-muted">~/{scen.domain}</span>
          <span className="ml-auto text-[10px] text-muted uppercase tracking-[0.16em]">{phase}</span>
        </div>

        <AnimatePresence mode="wait">
          {phase === "chat" && <ChatPhase key={`chat-${scen.id}`} scen={scen} />}
          {phase === "code" && <CodePhase key={`code-${scen.id}`} scen={scen} />}
          {phase === "output" && <OutputPhase key={`out-${scen.id}`} scen={scen} />}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-px bg-border rounded-b-[14px] overflow-hidden mt-px">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setScenIdx(i); setPhase("chat"); }}
            className={`bg-[#08090c] p-3 text-left transition-colors ${
              i === scenIdx ? "" : "hover:bg-surface-2/60"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${i === scenIdx ? "bg-accent pulse-dot" : "bg-border"}`} />
              <span className="text-[9px] tracking-[0.16em] text-muted uppercase">
                {s.id === "storywarz" ? "GAMES" : s.id === "songselfie" ? "B2B2C" : "ML"}
              </span>
            </div>
            <div className={`text-[12px] mt-1 ${i === scenIdx ? "text-foreground" : "text-muted"}`}>
              {s.domain}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatPhase({ scen }: { scen: Scenario }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-3 font-sans"
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-end"
      >
        <div className="bg-accent/15 border border-accent/30 rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[88%]">
          <div className="text-[9px] font-mono text-muted tracking-[0.16em]">YOU</div>
          <div className="text-foreground text-[13.5px] leading-snug mt-0.5">{scen.user}</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
        className="flex"
      >
        <div className="bg-surface-2 border border-border rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[88%]">
          <div className="text-[9px] font-mono text-accent tracking-[0.16em]">SAUL</div>
          <div className="text-foreground text-[13.5px] leading-snug mt-0.5">{scen.ai}</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="flex"
      >
        <div className="bg-surface-2 border border-border rounded-2xl rounded-bl-sm px-3.5 py-2">
          <div className="flex gap-1">
            <Dot d={0} /><Dot d={0.15} /><Dot d={0.3} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Dot({ d }: { d: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay: d }}
      className="inline-block w-1.5 h-1.5 rounded-full bg-muted"
    />
  );
}

function CodePhase({ scen }: { scen: Scenario }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {scen.code.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.6 + 0.1 }}
          className="flex gap-2 leading-7"
        >
          <span className="text-accent">{l.t}</span>
          <span className={l.tone === "ok" ? "text-success" : l.tone === "info" ? "text-accent" : "text-foreground"}>
            {l.c}
          </span>
        </motion.div>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="inline-block w-2 h-4 bg-accent mt-1 align-middle"
      />
    </motion.div>
  );
}

function OutputPhase({ scen }: { scen: Scenario }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      {scen.id === "storywarz" && <StoryPreview />}
      {scen.id === "songselfie" && <SongPreview />}
      {scen.id === "analytics" && <AnalyticsPreview />}
    </motion.div>
  );
}

function PreviewHeader({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-mono text-accent">{left}</span>
      <span className="text-[10px] font-mono text-muted flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
        {right}
      </span>
    </div>
  );
}

function StoryPreview() {
  return (
    <>
      <PreviewHeader left="storywarz.win" right="round 3 · live" />
      <div className="bg-surface-2 border border-border rounded-md p-3 font-sans">
        <div className="text-[9px] font-mono text-muted tracking-[0.16em]">PROMPT</div>
        <div className="mt-1 text-[13px] leading-snug text-foreground">
          &ldquo;The lighthouse keeper opened the door, and the wave of static
          <span className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 align-middle animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 font-sans">
        {[
          { name: "player_one", pts: "+340", g: "from-accent to-accent-2" },
          { name: "narrator_x", pts: "+285", g: "from-accent-warm to-accent-2" },
        ].map((p) => (
          <div key={p.name} className="bg-surface-2 border border-border rounded-md p-2 flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${p.g}`} />
            <div>
              <div className="text-[11px] text-foreground">{p.name}</div>
              <div className="text-[9px] font-mono text-muted">{p.pts} pts</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SongPreview() {
  const bars = Array.from({ length: 32 }, (_, i) => {
    const h = 25 + Math.abs(Math.sin(i * 0.5)) * 60 + (i % 3 === 0 ? 15 : 0);
    return Math.min(h, 100);
  });
  return (
    <>
      <PreviewHeader left="songselfie.com" right="@ The Hangout · Venice" />
      <div className="bg-surface-2 border border-border rounded-md p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent text-black flex items-center justify-center font-sans text-base">
          ▶
        </div>
        <div className="flex-1 flex items-end gap-0.5 h-9">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.025, duration: 0.4 }}
              className="flex-1 bg-accent/70 rounded-sm"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between text-[10px] font-mono text-muted">
        <span>tip jar: $42</span>
        <span>shared: 18×</span>
        <span>venue split: 30%</span>
      </div>
    </>
  );
}

function AnalyticsPreview() {
  return (
    <>
      <PreviewHeader left="forecast · BR-v4" right="model live" />
      <div className="bg-surface-2 border border-border rounded-md p-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[9px] font-mono text-muted tracking-[0.16em]">Q4 REVENUE FORECAST</div>
            <div className="text-2xl font-semibold mt-0.5 font-sans">$2.4M</div>
          </div>
          <div className="text-[11px] font-mono text-success">+18% · 95% CI</div>
        </div>
        <svg className="mt-2 w-full h-12" viewBox="0 0 200 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4 }}
            d="M0,42 L20,38 L40,33 L60,30 L80,28 L100,22 L120,18 L140,12 L160,9 L180,6 L200,4"
            stroke="#22d3ee"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            d="M0,42 L20,38 L40,33 L60,30 L80,28 L100,22 L120,18 L140,12 L160,9 L180,6 L200,4 L200,50 L0,50 Z"
            fill="url(#sparkFill)"
          />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
        {[["MAPE", "3.1%"], ["RUNS", "1.2k"], ["LATENCY", "47ms"]].map(([k, v]) => (
          <div key={k} className="bg-surface-2 border border-border rounded-md p-2">
            <div className="text-muted tracking-[0.14em]">{k}</div>
            <div className="text-foreground mt-0.5">{v}</div>
          </div>
        ))}
      </div>
    </>
  );
}
