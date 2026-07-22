export type DashboardRow = {
  period: string;
  segment: string;
  location: string;
  channel: string;
  values: Record<string, number>;
};

export type MetricDefinition = {
  key: string;
  label: string;
  format: string;
  direction?: "up" | "down" | "neutral";
  calc: Record<string, string | number | boolean>;
};

export type DashboardConfig = {
  slug: string;
  title: string;
  category: string;
  description: string;
  model: string;
  accent: string;
  segmentLabel: string;
  segments: string[];
  locations: string[];
  channels: string[];
  base: number;
  metrics: MetricDefinition[];
  primaryMetric: string;
  secondaryMetric: string;
  trendTitle: string;
  segmentTitle: string;
};

export const dashboardConfigs: DashboardConfig[];
export const dashboardSlugs: string[];
export const dashboardPeriod: { start: string; end: string };
export function getDashboardConfig(slug: string): DashboardConfig | null;
export function generateDashboardRows(slug: string): DashboardRow[];
export function calculateMetric(metric: MetricDefinition, rows: DashboardRow[]): number;
