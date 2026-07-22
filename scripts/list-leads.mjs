import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not configured.");
  process.exit(1);
}

const limit = Math.min(Math.max(Number(process.argv[2] || 25), 1), 100);
const hostname = new URL(connectionString).hostname;
const privateHosts = new Set(["localhost", "127.0.0.1", "postgres", "hosthatch-postgres"]);
const pool = new pg.Pool({
  connectionString,
  max: 1,
  ssl: privateHosts.has(hostname) ? false : { rejectUnauthorized: false },
});

try {
  const result = await pool.query(
    `select created_at, status, name, email, company, project_type, budget, timeline,
            left(brief, 500) as brief, landing_path, utm_source, utm_campaign
       from consultation_leads
      order by created_at desc
      limit $1`,
    [limit],
  );
  if (!result.rows.length) console.log("No consultation leads yet.");
  else console.table(result.rows);
} finally {
  await pool.end();
}
