import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { Pool, type PoolClient, type QueryResultRow } from "pg";
import type {
  EditorialArticle,
  EditorialContentType,
  EditorialDelivery,
  EditorialFact,
  EditorialLead,
  EditorialSocialPost,
  EditorialSource,
} from "@/lib/editorial-types";

let editorialPool: Pool | null = null;

function getEditorialPool() {
  if (editorialPool) return editorialPool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  const hostname = new URL(connectionString).hostname;
  const privateHosts = new Set(["localhost", "127.0.0.1", "postgres", "hosthatch-postgres"]);
  editorialPool = new Pool({
    connectionString,
    max: Number(process.env.DATABASE_POOL_SIZE || 5),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 8_000,
    ssl: privateHosts.has(hostname) ? false : { rejectUnauthorized: false },
  });
  return editorialPool;
}

export async function editorialQueryRows<T extends QueryResultRow>(sql: string, values: unknown[] = []) {
  const pool = getEditorialPool();
  if (!pool) throw new Error("Editorial database is not configured.");
  return (await pool.query<T>(sql, values)).rows;
}

export async function editorialQueryOne<T extends QueryResultRow>(sql: string, values: unknown[] = []) {
  return (await editorialQueryRows<T>(sql, values))[0] ?? null;
}

function normalizeFingerprint(value: string) {
  return value.toLowerCase().replace(/https?:\/\/|www\./g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

export function editorialFingerprint(title: string, sources: EditorialSource[]) {
  const sourceKey = sources.map((source) => normalizeFingerprint(source.url)).sort().join("|");
  return createHash("sha256").update(`${normalizeFingerprint(title)}|${sourceKey}`).digest("hex");
}

export async function getRecentEditorialLeadTitles(limit = 120) {
  try {
    const rows = await editorialQueryRows<{ working_title: string; summary: string }>(
      `select working_title, summary from editorial_story_leads
       where created_at >= now() - interval '180 days'
       order by created_at desc limit $1`,
      [limit],
    );
    return rows;
  } catch (error) {
    if ((error as { code?: string }).code === "42P01" || !process.env.DATABASE_URL) return [];
    throw error;
  }
}

export async function createEditorialLead(input: {
  contentType: EditorialContentType;
  workingTitle: string;
  hook: string;
  summary: string;
  industry: string;
  capability: string;
  whyNow: string;
  failure: string;
  consequences: string;
  solution: string;
  evidenceNotes: string;
  facts: EditorialFact[];
  sources: EditorialSource[];
  evidenceScore: number;
  noveltyScore: number;
  commercialFitScore: number;
  significanceScore: number;
}) {
  const id = randomUUID();
  const fingerprint = editorialFingerprint(input.workingTitle, input.sources);
  return editorialQueryOne<EditorialLead>(
    `insert into editorial_story_leads (
       id, fingerprint, content_type, working_title, hook, summary, industry, capability,
       why_now, failure, consequences, solution, evidence_notes, facts, source_urls,
       evidence_score, novelty_score, commercial_fit_score, significance_score
     ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::jsonb,$15::jsonb,$16,$17,$18,$19)
     on conflict (fingerprint) do update set
       hook = excluded.hook, summary = excluded.summary, why_now = excluded.why_now,
       failure = excluded.failure, consequences = excluded.consequences, solution = excluded.solution,
       evidence_notes = excluded.evidence_notes, facts = excluded.facts, source_urls = excluded.source_urls,
       evidence_score = greatest(editorial_story_leads.evidence_score, excluded.evidence_score),
       novelty_score = greatest(editorial_story_leads.novelty_score, excluded.novelty_score),
       commercial_fit_score = greatest(editorial_story_leads.commercial_fit_score, excluded.commercial_fit_score),
       significance_score = greatest(editorial_story_leads.significance_score, excluded.significance_score)
     returning *`,
    [
      id, fingerprint, input.contentType, input.workingTitle, input.hook, input.summary,
      input.industry, input.capability, input.whyNow, input.failure, input.consequences,
      input.solution, input.evidenceNotes, JSON.stringify(input.facts), JSON.stringify(input.sources),
      input.evidenceScore, input.noveltyScore, input.commercialFitScore, input.significanceScore,
    ],
  );
}

export async function getEditorialLeads(status: "active" | "new" | "dismissed" = "active") {
  const clause = status === "active" ? "status in ('new','drafted')" : "status = $1";
  try {
    return editorialQueryRows<EditorialLead>(
      `select * from editorial_story_leads where ${clause}
       order by significance_score desc, evidence_score desc, novelty_score desc, created_at desc limit 100`,
      status === "active" ? [] : [status],
    );
  } catch (error) {
    if ((error as { code?: string }).code === "42P01" || !process.env.DATABASE_URL) return [];
    throw error;
  }
}

export async function getEditorialLead(id: string) {
  return editorialQueryOne<EditorialLead>("select * from editorial_story_leads where id = $1", [id]);
}

export async function dismissEditorialLead(id: string) {
  return editorialQueryOne<EditorialLead>("update editorial_story_leads set status = 'dismissed' where id = $1 and status = 'new' returning *", [id]);
}

export async function saveGeneratedEditorialDraft(input: {
  lead: EditorialLead;
  slug: string;
  title: string;
  dek: string;
  bodyMarkdown: string;
  methodology: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  imageHeadline: string;
  imageAlt: string;
  imageData: Buffer;
}) {
  const pool = getEditorialPool();
  if (!pool) throw new Error("Editorial database is not configured.");
  const client = await pool.connect();
  try {
    await client.query("begin");
    const existing = await client.query<EditorialArticle>("select * from editorial_articles where story_lead_id = $1 limit 1", [input.lead.id]);
    if (existing.rows[0]) {
      await client.query("commit");
      return existing.rows[0];
    }
    const articleId = randomUUID();
    const socialId = randomUUID();
    const article = await client.query<EditorialArticle>(
      `insert into editorial_articles (
         id, story_lead_id, slug, content_type, title, dek, body_markdown, industry,
         capability, source_urls, methodology
       ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11) returning *`,
      [articleId, input.lead.id, input.slug, input.lead.content_type, input.title, input.dek,
        input.bodyMarkdown, input.lead.industry, input.lead.capability,
        JSON.stringify(input.lead.source_urls), input.methodology],
    );
    await client.query(
      `insert into editorial_social_posts (
         id, article_id, caption_linkedin, caption_instagram, caption_facebook,
         image_headline, image_alt, image_data
       ) values ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [socialId, articleId, input.linkedin, input.instagram, input.facebook, input.imageHeadline, input.imageAlt, input.imageData],
    );
    await client.query("update editorial_story_leads set status = 'drafted' where id = $1", [input.lead.id]);
    await client.query("commit");
    return article.rows[0] ?? null;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

export async function getEditorialArticles(includeDrafts = false) {
  try {
    return editorialQueryRows<EditorialArticle>(
      `select a.*, l.evidence_score, l.novelty_score
       from editorial_articles a left join editorial_story_leads l on l.id = a.story_lead_id
       ${includeDrafts ? "where a.status <> 'archived'" : "where a.status = 'published'"}
       order by coalesce(a.published_at, a.created_at) desc`,
    );
  } catch (error) {
    if ((error as { code?: string }).code === "42P01" || !process.env.DATABASE_URL) return [];
    throw error;
  }
}

export async function getEditorialArticleBySlug(slug: string, includeDrafts = false) {
  try {
    return editorialQueryOne<EditorialArticle>(
      `select a.*, l.evidence_score, l.novelty_score
       from editorial_articles a left join editorial_story_leads l on l.id = a.story_lead_id
       where a.slug = $1 ${includeDrafts ? "" : "and a.status = 'published'"} limit 1`,
      [slug],
    );
  } catch (error) {
    if ((error as { code?: string }).code === "42P01" || !process.env.DATABASE_URL) return null;
    throw error;
  }
}

export async function getEditorialArticleById(id: string) {
  return editorialQueryOne<EditorialArticle>(
    `select a.*, l.evidence_score, l.novelty_score
     from editorial_articles a left join editorial_story_leads l on l.id = a.story_lead_id
     where a.id = $1`, [id],
  );
}

export async function getEditorialSocialPost(articleId: string) {
  return editorialQueryOne<EditorialSocialPost>("select * from editorial_social_posts where article_id = $1", [articleId]);
}

export async function getEditorialSocialPostById(id: string, includeImage = false) {
  const columns = includeImage ? "*" : "id, article_id, caption_linkedin, caption_instagram, caption_facebook, image_headline, image_alt, image_mime, status, scheduled_at, published_at, generation_error, created_at, updated_at";
  return editorialQueryOne<EditorialSocialPost>(`select ${columns} from editorial_social_posts where id = $1`, [id]);
}

export async function getEditorialDeliveries(socialPostId: string) {
  return editorialQueryRows<EditorialDelivery>("select * from editorial_social_deliveries where social_post_id = $1 order by created_at desc", [socialPostId]);
}

export async function updateEditorialDraft(input: {
  id: string;
  title: string;
  slug: string;
  dek: string;
  bodyMarkdown: string;
  methodology: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  imageHeadline: string;
  imageAlt: string;
  imageData?: Buffer;
}) {
  const pool = getEditorialPool();
  if (!pool) throw new Error("Editorial database is not configured.");
  const client = await pool.connect();
  try {
    await client.query("begin");
    const article = await client.query<EditorialArticle>(
      `update editorial_articles set title = $2, slug = $3, dek = $4, body_markdown = $5, methodology = $6
       where id = $1 and status = 'draft' returning *`,
      [input.id, input.title, input.slug, input.dek, input.bodyMarkdown, input.methodology],
    );
    if (!article.rows[0]) throw new Error("Only draft articles can be edited.");
    await client.query(
      `update editorial_social_posts set caption_linkedin = $2, caption_instagram = $3,
         caption_facebook = $4, image_headline = $5, image_alt = $6,
         image_data = coalesce($7, image_data) where article_id = $1`,
      [input.id, input.linkedin, input.instagram, input.facebook, input.imageHeadline, input.imageAlt, input.imageData ?? null],
    );
    await client.query("commit");
    return article.rows[0];
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

export async function publishEditorialArticle(id: string) {
  const article = await getEditorialArticleById(id);
  if (!article || article.status !== "draft") throw new Error("Draft article was not found.");
  if ((article.evidence_score ?? 0) < 50) throw new Error("Evidence score must be at least 50 before publishing.");
  if ((article.novelty_score ?? 0) < 40) throw new Error("Novelty score must be at least 40 before publishing.");
  const pool = getEditorialPool();
  if (!pool) throw new Error("Editorial database is not configured.");
  const client = await pool.connect();
  try {
    await client.query("begin");
    const updated = await client.query<EditorialArticle>(
      `update editorial_articles set status = 'published', published_at = coalesce(published_at, now())
       where id = $1 and status = 'draft' returning *`, [id],
    );
    if (article.story_lead_id) await client.query("update editorial_story_leads set status = 'published' where id = $1", [article.story_lead_id]);
    await client.query("commit");
    return updated.rows[0] ?? null;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

export async function saveEditorialDelivery(input: {
  socialPostId: string;
  platform: "instagram" | "linkedin" | "facebook";
  accountId: string;
  accountName?: string;
  mode: "draft" | "scheduled" | "published";
  status: "created" | "failed";
  providerPostId?: string;
  scheduledAt?: string;
  errorMessage?: string;
}) {
  return editorialQueryOne<EditorialDelivery>(
    `insert into editorial_social_deliveries (
       id, social_post_id, platform, account_id, account_name, delivery_mode,
       status, provider_post_id, scheduled_at, error_message
     ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *`,
    [randomUUID(), input.socialPostId, input.platform, input.accountId, input.accountName || null,
      input.mode, input.status, input.providerPostId || null, input.scheduledAt || null, input.errorMessage || null],
  );
}

export async function markEditorialSocialStatus(socialPostId: string, status: EditorialSocialPost["status"], scheduledAt?: string) {
  return editorialQueryOne<EditorialSocialPost>(
    `update editorial_social_posts set status = $2, scheduled_at = $3 where id = $1 returning *`,
    [socialPostId, status, scheduledAt || null],
  );
}

export async function withEditorialTransaction<T>(work: (client: PoolClient) => Promise<T>) {
  const pool = getEditorialPool();
  if (!pool) throw new Error("Editorial database is not configured.");
  const client = await pool.connect();
  try {
    await client.query("begin");
    const result = await work(client);
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

export async function checkEditorialDatabase() {
  try {
    const row = await editorialQueryOne<{ leads: number; articles: number; published: number }>(
      `select
        (select count(*)::int from editorial_story_leads) as leads,
        (select count(*)::int from editorial_articles) as articles,
        (select count(*)::int from editorial_articles where status = 'published') as published`,
    );
    return { connected: true, ready: true, leads: row?.leads ?? 0, articles: row?.articles ?? 0, published: row?.published ?? 0 };
  } catch (error) {
    if ((error as { code?: string }).code === "42P01") return { connected: true, ready: false, leads: 0, articles: 0, published: 0 };
    return { connected: false, ready: false, leads: 0, articles: 0, published: 0 };
  }
}
