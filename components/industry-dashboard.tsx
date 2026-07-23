"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CalendarRange,
  Database,
  Gauge,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  calculateMetric,
  getDashboardConfig,
  type DashboardRow,
  type MetricDefinition,
} from "@/lib/dashboard-data.mjs";

const colors = ["#18d9f2", "#1677ff", "#38bdf8", "#4ade80", "#0ea5e9"];

const rangeOptions = [
  { key: "3y", label: "3 years", months: 36 },
  { key: "12m", label: "Last 12 months", months: 12 },
  { key: "6m", label: "Last 6 months", months: 6 },
  { key: "ytd", label: "2026 YTD", start: "2026-01-01" },
];

function formatValue(value: number, format: string) {
  if (!Number.isFinite(value)) return "—";
  if (format === "percent") return `${(value * 100).toFixed(1)}%`;
  if (format === "ratio") return `${value.toFixed(2)}x`;
  if (format === "days") return `${value.toFixed(0)} days`;
  if (format === "decimal") return value.toFixed(1);
  if (format === "number") return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0, notation: value >= 100000 ? "compact" : "standard" }).format(value);
  if (format === "money") return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: value >= 1000 ? 0 : 2 }).format(value);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0, notation: Math.abs(value) >= 100000 ? "compact" : "standard" }).format(value);
}

function axisValue(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function monthLabel(period: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "2-digit", timeZone: "UTC" }).format(new Date(`${period}T00:00:00Z`));
}

function MetricTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number; payload?: { primaryFormat?: string; secondaryFormat?: string } }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="demo-tooltip">
      <strong>{label}</strong>
      {payload.map((item, index) => (
        <span key={`${item.name}-${index}`} style={{ color: item.color }}>
          {item.name}: {formatValue(item.value, index === 0 ? item.payload?.primaryFormat || "currency" : item.payload?.secondaryFormat || "currency")}
        </span>
      ))}
    </div>
  );
}

function summarize(metric: MetricDefinition, rows: DashboardRow[]) {
  return calculateMetric(metric, rows);
}

export function IndustryDashboard({ slug, rows }: { slug: string; rows: DashboardRow[] }) {
  const config = getDashboardConfig(slug);
  const [range, setRange] = useState("3y");
  const [segment, setSegment] = useState("all");
  const [location, setLocation] = useState("all");
  const [channel, setChannel] = useState("all");

  const filtered = useMemo(() => {
    const selectedRange = rangeOptions.find((item) => item.key === range) || rangeOptions[0];
    const periods = [...new Set(rows.map((row) => row.period))].sort();
    const rangeStart = selectedRange.start || periods[Math.max(0, periods.length - (selectedRange.months || 36))];
    return rows.filter((row) =>
      row.period >= rangeStart &&
      (segment === "all" || row.segment === segment) &&
      (location === "all" || row.location === location) &&
      (channel === "all" || row.channel === channel)
    );
  }, [rows, range, segment, location, channel]);

  const prior = useMemo(() => {
    const activePeriods = [...new Set(filtered.map((row) => row.period))].sort();
    if (!activePeriods.length) return [];
    const allPeriods = [...new Set(rows.map((row) => row.period))].sort();
    const firstIndex = allPeriods.indexOf(activePeriods[0]);
    const priorPeriods = new Set(allPeriods.slice(Math.max(0, firstIndex - activePeriods.length), firstIndex));
    return rows.filter((row) => priorPeriods.has(row.period) && (segment === "all" || row.segment === segment) && (location === "all" || row.location === location) && (channel === "all" || row.channel === channel));
  }, [filtered, rows, segment, location, channel]);

  if (!config) return null;
  const metricByKey = (key: string) => config.metrics.find((metric) => metric.key === key)!;
  const primaryMetric = metricByKey(config.primaryMetric);
  const secondaryMetric = metricByKey(config.secondaryMetric);

  const trend = [...new Set(filtered.map((row) => row.period))].sort().map((period) => {
    const periodRows = filtered.filter((row) => row.period === period);
    return {
      period,
      label: monthLabel(period),
      primary: summarize(primaryMetric, periodRows),
      secondary: summarize(secondaryMetric, periodRows),
      primaryFormat: primaryMetric.format,
      secondaryFormat: secondaryMetric.format,
    };
  });

  const breakdown = (field: "segment" | "location" | "channel", values: string[]) => values.map((name) => {
    const scoped = filtered.filter((row) => row[field] === name);
    return { name, value: summarize(primaryMetric, scoped), rows: scoped };
  }).sort((a, b) => b.value - a.value);

  const segmentRows = breakdown("segment", config.segments);
  const locationRows = breakdown("location", config.locations);
  const channelRows = breakdown("channel", config.channels);
  const bestSegment = segmentRows[0];
  const bestLocation = locationRows[0];
  const bestChannel = channelRows[0];
  const rangeLabel = rangeOptions.find((item) => item.key === range)?.label || "3 years";

  return (
    <div className="demo-dashboard" style={{ "--demo-accent": config.accent } as React.CSSProperties}>
      <header className="demo-topbar">
        <div className="demo-brand">
          <Image src="/media/browser-icon.png" alt="Any AI You Want" width={36} height={36} />
          <div><strong>ANY AI YOU WANT</strong><span>Analytics demo</span></div>
        </div>
        <div className="demo-heading">
          <span>{config.category}</span>
          <h1>{config.title}</h1>
        </div>
        <div className="demo-actions">
          <span className="demo-data-badge"><Database size={14} /> Synthetic data</span>
          <Link href="/demos"><ArrowLeft size={15} /> All demos</Link>
        </div>
      </header>

      <section className="demo-context">
        <div><Sparkles size={17} /><span>{config.description}</span></div>
        <span><CalendarRange size={15} /> Jul 2023–Jun 2026</span>
      </section>

      <section className="demo-filters" aria-label="Dashboard filters">
        <div className="demo-filter-title"><SlidersHorizontal size={17} /><span>Explore the data</span></div>
        <label><span>Period</span><select value={range} onChange={(event) => setRange(event.target.value)}>{rangeOptions.map((item) => <option value={item.key} key={item.key}>{item.label}</option>)}</select></label>
        <label><span>{config.segmentLabel}</span><select value={segment} onChange={(event) => setSegment(event.target.value)}><option value="all">All {config.segmentLabel.toLowerCase()}s</option>{config.segments.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Market</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="all">All markets</option>{config.locations.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Channel</span><select value={channel} onChange={(event) => setChannel(event.target.value)}><option value="all">All channels</option>{config.channels.map((item) => <option key={item}>{item}</option>)}</select></label>
      </section>

      <section className="demo-kpis" aria-label={`${config.title} key performance indicators`}>
        {config.metrics.map((metric, index) => {
          const current = summarize(metric, filtered);
          const previous = summarize(metric, prior);
          const change = previous ? (current - previous) / Math.abs(previous) : 0;
          const favorable = metric.direction === "down" ? change <= 0 : metric.direction === "neutral" ? true : change >= 0;
          const Icon = [TrendingUp, Target, Gauge, BarChart3, ArrowUpRight, Sparkles][index];
          return (
            <article key={metric.key} className={index === 0 ? "featured" : ""}>
              <div><Icon size={17} /><span>{metric.label}</span></div>
              <strong>{formatValue(current, metric.format)}</strong>
              <small className={favorable ? "positive" : "negative"}>{change >= 0 ? "+" : ""}{(change * 100).toFixed(1)}% <span>vs prior period</span></small>
            </article>
          );
        })}
      </section>

      <section className="demo-chart-grid">
        <article className="demo-panel demo-trend-panel">
          <div className="demo-panel-heading"><div><span>Performance trend</span><h2>{config.trendTitle}</h2></div><span className="demo-chip">{rangeLabel}</span></div>
          <div className="demo-chart tall">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1} initialDimension={{ width: 900, height: 310 }}>
              <ComposedChart data={trend} margin={{ top: 12, right: 8, left: 4, bottom: 0 }}>
                <defs><linearGradient id={`fill-${slug}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={config.accent} stopOpacity={0.28} /><stop offset="100%" stopColor={config.accent} stopOpacity={0.01} /></linearGradient></defs>
                <CartesianGrid stroke="#242934" vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#77808f" tickLine={false} axisLine={false} minTickGap={28} fontSize={10} />
                <YAxis yAxisId="primary" stroke="#77808f" tickLine={false} axisLine={false} tickFormatter={axisValue} fontSize={10} width={45} />
                <YAxis yAxisId="secondary" orientation="right" stroke="#77808f" tickLine={false} axisLine={false} tickFormatter={axisValue} fontSize={10} width={45} />
                <Tooltip content={<MetricTooltip />} />
                <Legend iconType="circle" iconSize={7} />
                <Area yAxisId="primary" type="monotone" dataKey="primary" name={primaryMetric.label} stroke={config.accent} strokeWidth={2.5} fill={`url(#fill-${slug})`} />
                <Line yAxisId="secondary" type="monotone" dataKey="secondary" name={secondaryMetric.label} stroke="#1677ff" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="demo-panel">
          <div className="demo-panel-heading"><div><span>Mix analysis</span><h2>Performance by channel</h2></div><Gauge size={19} /></div>
          <div className="demo-donut-layout">
            <div className="demo-chart donut"><ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1} initialDimension={{ width: 320, height: 214 }}><PieChart><Pie data={channelRows} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="88%" paddingAngle={3} stroke="#0c0f14" strokeWidth={2}>{channelRows.map((item, index) => <Cell key={item.name} fill={index === 0 ? config.accent : colors[(index + 1) % colors.length]} />)}</Pie><Tooltip formatter={(value) => formatValue(Number(value), primaryMetric.format)} /></PieChart></ResponsiveContainer></div>
            <div className="demo-mix-list">{channelRows.map((item, index) => <div key={item.name}><i style={{ background: index === 0 ? config.accent : colors[(index + 1) % colors.length] }} /><span>{item.name}</span><strong>{formatValue(item.value, primaryMetric.format)}</strong></div>)}</div>
          </div>
        </article>
      </section>

      <section className="demo-chart-grid lower">
        <article className="demo-panel">
          <div className="demo-panel-heading"><div><span>{config.segmentLabel} comparison</span><h2>{config.segmentTitle}</h2></div><BarChart3 size={19} /></div>
          <div className="demo-chart bars"><ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1} initialDimension={{ width: 720, height: 262 }}><BarChart data={segmentRows} layout="vertical" margin={{ top: 6, right: 70, left: 8, bottom: 0 }}><CartesianGrid stroke="#242934" horizontal={false} strokeDasharray="3 3" /><XAxis type="number" hide /><YAxis type="category" dataKey="name" width={112} tickLine={false} axisLine={false} tick={{ fill: "#aeb6c4", fontSize: 11 }} /><Tooltip formatter={(value) => formatValue(Number(value), primaryMetric.format)} cursor={{ fill: "rgba(255,255,255,.03)" }} /><Bar dataKey="value" fill={config.accent} radius={[0, 5, 5, 0]} barSize={24}><LabelList dataKey="value" position="right" formatter={(value: unknown) => formatValue(Number(value), primaryMetric.format)} fill="#e8e8ec" fontSize={10} /></Bar></BarChart></ResponsiveContainer></div>
        </article>

        <article className="demo-panel demo-insight-panel">
          <div className="demo-panel-heading"><div><span>Decision signals</span><h2>Where to look next</h2></div><Target size={19} /></div>
          <div className="demo-insights">
            <div><span className="demo-insight-icon"><TrendingUp size={17} /></span><p><span>Leading {config.segmentLabel.toLowerCase()}</span><strong>{bestSegment?.name}</strong><small>{formatValue(bestSegment?.value || 0, primaryMetric.format)} in {primaryMetric.label.toLowerCase()}</small></p></div>
            <div><span className="demo-insight-icon"><MapPin size={17} /></span><p><span>Strongest market</span><strong>{bestLocation?.name}</strong><small>Top contribution for the selected filters</small></p></div>
            <div><span className="demo-insight-icon"><Gauge size={17} /></span><p><span>Leading channel</span><strong>{bestChannel?.name}</strong><small>{formatValue(bestChannel?.value || 0, primaryMetric.format)} measured impact</small></p></div>
          </div>
        </article>
      </section>

      <section className="demo-panel demo-table-panel">
        <div className="demo-panel-heading"><div><span>Market scorecard</span><h2>Operating performance by market</h2></div><span className="demo-chip">{filtered.length.toLocaleString()} observations</span></div>
        <div className="demo-table-wrap"><table><thead><tr><th>Market</th>{config.metrics.map((metric) => <th key={metric.key}>{metric.label}</th>)}</tr></thead><tbody>{locationRows.map((locationRow) => <tr key={locationRow.name}><td><MapPin size={14} />{locationRow.name}</td>{config.metrics.map((metric) => <td key={metric.key}>{formatValue(summarize(metric, locationRow.rows), metric.format)}</td>)}</tr>)}</tbody></table></div>
      </section>

      <footer className="demo-footer"><span>Any AI You Want · Data engineering and analytics</span><span>Fictional businesses and synthetic data for demonstration only</span><Link href="/book?project=data-analytics">Talk to a data engineer <ArrowUpRight size={14} /></Link></footer>
    </div>
  );
}
