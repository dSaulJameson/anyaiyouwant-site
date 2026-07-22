import { createHash, randomUUID } from "node:crypto";
import { Pool } from "pg";

export type LeadInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  brief: string;
  landingPath: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

let leadPool: Pool | null = null;

function getLeadPool() {
  if (leadPool) return leadPool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Lead database is not configured.");
  const hostname = new URL(connectionString).hostname;
  const privateHosts = new Set(["localhost", "127.0.0.1", "postgres", "hosthatch-postgres"]);
  leadPool = new Pool({
    connectionString,
    max: Number(process.env.DATABASE_POOL_SIZE || 5),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 8_000,
    ssl: privateHosts.has(hostname) ? false : { rejectUnauthorized: false },
  });
  return leadPool;
}

export async function createLead(input: LeadInput) {
  const normalized = `${input.email.trim().toLowerCase()}|${input.brief.trim().toLowerCase()}|${new Date().toISOString().slice(0, 10)}`;
  const dedupeKey = createHash("sha256").update(normalized).digest("hex");
  const id = randomUUID();
  const result = await getLeadPool().query<{ id: string }>(
    `insert into consultation_leads (
       id, name, email, company, phone, project_type, budget, timeline, brief,
       landing_path, referrer, utm_source, utm_medium, utm_campaign, dedupe_key
     ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     on conflict (dedupe_key) do update set updated_at = now()
     returning id::text`,
    [
      id,
      input.name,
      input.email,
      input.company || null,
      input.phone || null,
      input.projectType,
      input.budget || null,
      input.timeline || null,
      input.brief,
      input.landingPath || null,
      input.referrer || null,
      input.utmSource || null,
      input.utmMedium || null,
      input.utmCampaign || null,
      dedupeKey,
    ],
  );
  return result.rows[0]?.id ?? id;
}

