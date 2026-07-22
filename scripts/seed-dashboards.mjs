import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";
import { dashboardConfigs, generateDashboardRows } from "../lib/dashboard-data.mjs";

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required to seed dashboard data.");

const hostname = new URL(connectionString).hostname;
const privateHosts = new Set(["localhost", "127.0.0.1", "postgres", "hosthatch-postgres"]);
const pool = new Pool({
  connectionString,
  max: 2,
  ssl: privateHosts.has(hostname) ? false : { rejectUnauthorized: false },
});

const here = path.dirname(fileURLToPath(import.meta.url));
const schema = await readFile(path.join(here, "..", "database", "dashboard_schema.sql"), "utf8");

try {
  await pool.query("begin");
  await pool.query(schema);
  for (const config of dashboardConfigs) {
    const rows = generateDashboardRows(config.slug);
    await pool.query("delete from dashboard_observations where vertical_slug = $1", [config.slug]);
    await pool.query(
      `insert into dashboard_observations
        (vertical_slug, period_start, segment, location, channel, metrics)
       select * from unnest(
         $1::text[], $2::date[], $3::text[], $4::text[], $5::text[], $6::jsonb[]
       )`,
      [
        rows.map(() => config.slug),
        rows.map((row) => row.period),
        rows.map((row) => row.segment),
        rows.map((row) => row.location),
        rows.map((row) => row.channel),
        rows.map((row) => JSON.stringify(row.values)),
      ],
    );
  }
  await pool.query("commit");
  const result = await pool.query("select count(*)::int as count from dashboard_observations");
  console.log(`Seeded ${result.rows[0].count.toLocaleString()} synthetic dashboard observations.`);
} catch (error) {
  await pool.query("rollback");
  throw error;
} finally {
  await pool.end();
}
