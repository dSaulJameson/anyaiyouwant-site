import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required for migrations.");

const hostname = new URL(connectionString).hostname;
const privateHosts = new Set(["localhost", "127.0.0.1", "postgres", "hosthatch-postgres"]);
const pool = new Pool({
  connectionString,
  max: 1,
  ssl: privateHosts.has(hostname) ? false : { rejectUnauthorized: false },
});

const here = path.dirname(fileURLToPath(import.meta.url));
const migrationDirectory = path.resolve(here, "../database/migrations");

try {
  await pool.query(`create table if not exists app_schema_migrations (
    filename text primary key,
    applied_at timestamptz not null default now()
  )`);
  const applied = new Set((await pool.query("select filename from app_schema_migrations")).rows.map((row) => row.filename));
  const files = (await fs.readdir(migrationDirectory)).filter((file) => file.endsWith(".sql")).sort();
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = await fs.readFile(path.join(migrationDirectory, file), "utf8");
    const client = await pool.connect();
    try {
      await client.query("begin");
      await client.query(sql);
      await client.query("insert into app_schema_migrations (filename) values ($1)", [file]);
      await client.query("commit");
      console.log(`Applied ${file}`);
    } catch (error) {
      await client.query("rollback");
      throw error;
    } finally {
      client.release();
    }
  }
} finally {
  await pool.end();
}
