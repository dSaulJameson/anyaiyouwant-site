import { Pool } from "pg";
import {
  generateDashboardRows,
  getDashboardConfig,
  type DashboardRow,
} from "@/lib/dashboard-data.mjs";

let dashboardPool: Pool | null = null;

function getDashboardPool() {
  if (dashboardPool) return dashboardPool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  const hostname = new URL(connectionString).hostname;
  const privateHosts = new Set(["localhost", "127.0.0.1", "postgres", "hosthatch-postgres"]);
  dashboardPool = new Pool({
    connectionString,
    max: Number(process.env.DATABASE_POOL_SIZE || 5),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 8_000,
    ssl: privateHosts.has(hostname) ? false : { rejectUnauthorized: false },
  });
  return dashboardPool;
}

export async function getDashboardRows(slug: string): Promise<DashboardRow[]> {
  if (!getDashboardConfig(slug)) return [];
  const pool = getDashboardPool();
  if (!pool) return generateDashboardRows(slug);

  const result = await pool.query<{
    period: string;
    segment: string;
    location: string;
    channel: string;
    metrics: Record<string, number>;
  }>(
    `select to_char(period_start, 'YYYY-MM-DD') as period,
            segment, location, channel, metrics
       from dashboard_observations
      where vertical_slug = $1
      order by period_start, segment, location, channel`,
    [slug],
  );

  if (!result.rows.length) {
    throw new Error(`Dashboard dataset is empty for ${slug}.`);
  }

  return result.rows.map((row) => ({
    period: row.period,
    segment: row.segment,
    location: row.location,
    channel: row.channel,
    values: row.metrics,
  }));
}

export async function checkDashboardDatabase() {
  const pool = getDashboardPool();
  if (!pool) return { connected: false, reason: "not-configured" } as const;
  const result = await pool.query<{ count: string }>("select count(*)::text as count from dashboard_observations");
  return { connected: true, rows: Number(result.rows[0]?.count ?? 0) } as const;
}
