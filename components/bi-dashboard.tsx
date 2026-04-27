"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";

type Range = "7D" | "30D" | "90D";

function seedRand(seed: number) {
  let s = seed % 2147483647;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildTimeSeries(days: number, seed: number) {
  const rnd = seedRand(seed);
  const today = new Date();
  const data: { date: string; revenue: number; forecast: number; conv: number }[] = [];
  let base = 28000;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const weekday = d.getDay();
    const seasonal = weekday === 0 || weekday === 6 ? 0.78 : 1;
    base += (rnd() - 0.45) * 1800;
    const revenue = Math.round(base * seasonal + rnd() * 4000);
    const forecast = Math.round(revenue * (1 + (rnd() - 0.5) * 0.06));
    const conv = +(2.4 + rnd() * 1.6).toFixed(2);
    data.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue,
      forecast,
      conv,
    });
  }
  return data;
}

const channels = [
  { name: "Paid Search", value: 38 },
  { name: "Organic", value: 22 },
  { name: "Email",    value: 16 },
  { name: "Social",   value: 13 },
  { name: "Affiliate", value: 7 },
  { name: "Direct",   value: 4 },
];

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n}`;
}

export function BiDashboard() {
  const [range, setRange] = useState<Range>("30D");
  const days = range === "7D" ? 7 : range === "30D" ? 30 : 90;
  const [seed, setSeed] = useState(7);
  const [tick, setTick] = useState(0);

  const series = useMemo(() => buildTimeSeries(days, seed), [days, seed]);

  // "Live" pulse — slight refresh every 4s
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  const total = series.reduce((s, d) => s + d.revenue, 0);
  const avgConv = +(series.reduce((s, d) => s + d.conv, 0) / series.length).toFixed(2);
  const lastWeek = series.slice(-7).reduce((s, d) => s + d.revenue, 0);
  const prevWeek = series.slice(-14, -7).reduce((s, d) => s + d.revenue, 0) || 1;
  const delta = ((lastWeek - prevWeek) / prevWeek) * 100;
  const forecastNext = Math.round(series[series.length - 1].forecast * 1.04);

  const kpis = [
    { label: "Revenue", value: fmt(total), delta: `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%`, positive: delta >= 0 },
    { label: "Conversion", value: `${avgConv}%`, delta: "+0.4%", positive: true },
    { label: "Active Customers", value: "12,408", delta: "+182", positive: true },
    { label: "Forecast (next 24h)", value: fmt(forecastNext), delta: "model: BR-v4", positive: true },
  ];

  return (
    <div className="card p-5 md:p-6 relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
            <span className="label-mono">Live BI Demo · Mock data</span>
          </div>
          <h3 className="mt-1.5 text-lg font-semibold">Marketing &amp; Forecast Dashboard</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-2 rounded-md p-0.5 border border-border">
            {(["7D", "30D", "90D"] as Range[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 text-xs font-mono rounded-[5px] transition-colors ${
                  range === r ? "bg-accent text-black" : "text-muted hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSeed(Math.floor(Math.random() * 9999))}
            className="px-3 py-1 text-xs font-mono rounded-md border border-border text-muted hover:text-foreground hover:bg-surface"
            title="Re-roll mock data"
          >
            ⟳ Reroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-2/60 border border-border rounded-md p-4">
            <div className="label-mono text-[10px]">{k.label}</div>
            <div className="mt-1.5 text-xl font-semibold tracking-tight">{k.value}</div>
            <div className={`mt-1 text-xs font-mono ${k.positive ? "text-success" : "text-accent-warm"}`}>
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 bg-surface-2/60 border border-border rounded-md p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="label-mono">Revenue · Actual vs Forecast</div>
            <div className="text-[10px] font-mono text-muted">tick #{tick}</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ left: -10, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f242d" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" stroke="#7a8290" fontSize={10} tickLine={false} axisLine={false} minTickGap={24} />
                <YAxis stroke="#7a8290" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => fmt(v)} width={50} />
                <Tooltip
                  contentStyle={{ background: "#0e1014", border: "1px solid #1f242d", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#e8e8ec" }}
                  formatter={(v) => fmt(Number(v))}
                />
                <Area type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={2} fill="url(#rev)" />
                <Area type="monotone" dataKey="forecast" stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#fc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-2/60 border border-border rounded-md p-4">
          <div className="label-mono mb-3">Channel Mix</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channels} layout="vertical" margin={{ left: 10, right: 8, top: 0, bottom: 0 }}>
                <CartesianGrid stroke="#1f242d" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="#7a8290" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="#7a8290" fontSize={10} tickLine={false} axisLine={false} width={70} />
                <Tooltip
                  contentStyle={{ background: "#0e1014", border: "1px solid #1f242d", borderRadius: 8, fontSize: 12 }}
                  formatter={(v) => `${v}%`}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {channels.map((_, i) => (
                    <Cell key={i} fill={["#22d3ee","#a78bfa","#fb923c","#4ade80","#22d3ee","#7a8290"][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-surface-2/60 border border-border rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="label-mono">Conversion Rate · 7-day rolling</div>
          <div className="text-[10px] font-mono text-muted">Avg {avgConv}%</div>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ left: -10, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="#1f242d" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" stroke="#7a8290" fontSize={10} tickLine={false} axisLine={false} minTickGap={24} />
              <YAxis stroke="#7a8290" fontSize={10} tickLine={false} axisLine={false} width={40} unit="%" />
              <Tooltip
                contentStyle={{ background: "#0e1014", border: "1px solid #1f242d", borderRadius: 8, fontSize: 12 }}
                formatter={(v) => `${v}%`}
              />
              <Line type="monotone" dataKey="conv" stroke="#fb923c" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted font-mono">
        Demo data. The same patterns ship in Power BI, Tableau, Looker, and custom Next.js dashboards.
      </p>
    </div>
  );
}
