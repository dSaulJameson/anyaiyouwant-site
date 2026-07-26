import "server-only";

import { createEditorialLead, getEditorialLead, getRecentEditorialLeadTitles, saveGeneratedEditorialDraft } from "@/lib/editorial-db";
import { generateEditorialSocialCard } from "@/lib/editorial-assets";
import { editorialContentTypes, editorialTypeLabel, type EditorialContentType, type EditorialFact, type EditorialLead, type EditorialSource } from "@/lib/editorial-types";

type GeneratedDraft = {
  title: string;
  dek: string;
  body_markdown: string;
  methodology: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  image_headline: string;
};

type DiscoveredCandidate = {
  content_type?: string;
  working_title?: string;
  hook?: string;
  summary?: string;
  industry?: string;
  capability?: string;
  why_now?: string;
  failure?: string;
  consequences?: string;
  solution?: string;
  evidence_notes?: string;
  facts?: EditorialFact[];
  source_urls?: EditorialSource[];
  commercial_fit_score?: number;
  significance_score?: number;
};

function clean(value: unknown, max = 20_000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function clampScore(value: unknown, fallback = 50) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.min(100, Math.round(number))) : fallback;
}

function tokens(value: string) {
  const ignored = new Set(["the", "and", "that", "with", "from", "this", "what", "when", "your", "into", "they", "were", "have", "has", "for", "why", "how"]);
  return new Set(value.toLowerCase().match(/[a-z0-9]{3,}/g)?.filter((token) => !ignored.has(token)) ?? []);
}

function similarity(left: string, right: string) {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / (a.size + b.size - intersection);
}

export async function calculateNoveltyScore(title: string, summary: string) {
  const recent = await getRecentEditorialLeadTitles();
  const highestSimilarity = recent.reduce((highest, item) => Math.max(highest, similarity(`${title} ${summary}`, `${item.working_title} ${item.summary}`)), 0);
  return clampScore(100 - highestSimilarity * 100, 100);
}

function evidenceScore(sources: EditorialSource[], notes: string, facts: EditorialFact[], contentType: EditorialContentType) {
  let score = Math.min(55, sources.length * 25);
  if (notes.length >= 250) score += 15;
  if (notes.length >= 700) score += 10;
  if (facts.length >= 1) score += 10;
  if (facts.length >= 3) score += 5;
  if (contentType === "build_note" && notes.length >= 350) score = Math.max(score, 65);
  return clampScore(score, 0);
}

function validContentType(value: unknown): EditorialContentType {
  const candidate = clean(value, 40) as EditorialContentType;
  return editorialContentTypes.some((item) => item.value === candidate) ? candidate : "failure_file";
}

function canonicalSourceUrl(value: string) {
  try {
    const url = new URL(value);
    url.hash = "";
    url.search = "";
    url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    url.pathname = url.pathname.replace(/\/$/, "") || "/";
    return url.toString();
  } catch { return ""; }
}

function normalizeSources(values: unknown, allowedSources?: Map<string, EditorialSource>) {
  if (!Array.isArray(values)) return [];
  const seen = new Set<string>();
  const sources: EditorialSource[] = [];
  for (const value of values) {
    const source = typeof value === "string" ? { url: value, label: "" } : value && typeof value === "object" ? value as { label?: unknown; url?: unknown } : null;
    if (!source) continue;
    const requestedUrl = clean(source.url, 2_000);
    const canonical = canonicalSourceUrl(requestedUrl);
    const cited = allowedSources?.get(canonical);
    if (!canonical || seen.has(canonical) || (allowedSources && !cited)) continue;
    seen.add(canonical);
    const url = cited?.url || requestedUrl;
    sources.push({ label: clean(source.label, 220) || cited?.label || new URL(url).hostname, url });
  }
  return sources.slice(0, 8);
}

function normalizeFacts(values: unknown) {
  if (!Array.isArray(values)) return [];
  return values.slice(0, 8).map((value) => {
    const fact = value && typeof value === "object" ? value as Record<string, unknown> : {};
    return {
      label: clean(fact.label, 180),
      display: clean(fact.display, 180),
      context: clean(fact.context, 260) || undefined,
      value: typeof fact.value === "number" || typeof fact.value === "string" ? fact.value : undefined,
    };
  }).filter((fact) => fact.label && fact.display);
}

export async function createManualEditorialLead(input: {
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
  sourceUrls: string;
}) {
  const sources = input.sourceUrls.split(/\r?\n/).map((url) => url.trim()).filter((url) => /^https:\/\//i.test(url)).map((url) => ({ label: new URL(url).hostname, url }));
  const novelty = await calculateNoveltyScore(input.workingTitle, input.summary);
  return createEditorialLead({
    contentType: input.contentType,
    workingTitle: clean(input.workingTitle, 300),
    hook: clean(input.hook, 500),
    summary: clean(input.summary, 1_500),
    industry: clean(input.industry, 120) || "Cross-industry",
    capability: clean(input.capability, 120) || "Strategy and execution",
    whyNow: clean(input.whyNow, 1_000),
    failure: clean(input.failure, 3_000),
    consequences: clean(input.consequences, 3_000),
    solution: clean(input.solution, 3_000),
    evidenceNotes: clean(input.evidenceNotes, 15_000),
    facts: [],
    sources,
    evidenceScore: evidenceScore(sources, input.evidenceNotes, [], input.contentType),
    noveltyScore: novelty,
    commercialFitScore: 80,
    significanceScore: 75,
  });
}

function parseJson<T>(value: string, fallback: T): T {
  try { return JSON.parse(value.replace(/^```json\s*|\s*```$/g, "")) as T; }
  catch { return fallback; }
}

async function openRouter(messages: Array<{ role: "system" | "user"; content: string }>, options?: { research?: boolean }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.PUBLIC_SITE_URL || "https://www.anyaiyouwant.com",
      "X-Title": "Any AI You Want Editorial Desk",
    },
    body: JSON.stringify({
      model: options?.research ? process.env.EDITORIAL_RESEARCH_MODEL || "openai/gpt-5-mini" : process.env.EDITORIAL_COPY_MODEL || "openai/gpt-5-mini",
      response_format: { type: "json_object" },
      reasoning: { effort: options?.research ? "medium" : "low", exclude: true },
      temperature: options?.research ? 0.25 : 0.55,
      max_tokens: options?.research ? 6_000 : 8_000,
      tools: options?.research ? [{ type: "openrouter:web_search", parameters: { engine: "exa", max_results: 12, max_total_results: 12, max_characters: 2_400 } }] : undefined,
      messages,
    }),
    signal: AbortSignal.timeout(options?.research ? 120_000 : 90_000),
  });
  if (!response.ok) throw new Error(`Editorial model request failed (${response.status}).`);
  return response.json() as Promise<{
    choices?: Array<{ message?: { content?: string; annotations?: Array<{ url_citation?: { url?: string; title?: string; content?: string } }> } }>;
  }>;
}

export async function discoverEditorialCandidates() {
  const today = new Date().toISOString().slice(0, 10);
  const response = await openRouter([
    {
      role: "system",
      content: "You are the research editor for Any AI You Want, a U.S.-based strategy, growth, software, data, ML, automation, and secure-AI company. Return JSON with a candidates array. Find specific, well-documented recent failures, postmortems, enforcement actions, security/privacy incidents, marketing measurement breakdowns, forecasting or inventory mistakes, automation failures, and expensive software decisions. Prefer primary sources: regulators, court or government records, company incident reports, engineering postmortems, status pages, and official filings. Reject generic trend pieces, listicles, rumors, isolated social posts, and stories without an implementable lesson. Each candidate must include content_type, working_title, hook, summary, industry, capability, why_now, failure, consequences, solution, evidence_notes, facts, source_urls, commercial_fit_score, and significance_score. source_urls must be an array of objects shaped exactly as {\"label\":\"source title\",\"url\":\"https://exact-cited-url\"}; use only URLs returned by the research tool. Make the hook sharp but do not allege misconduct or causation beyond the sources. Return no more than four candidates.",
    },
    {
      role: "user",
      content: `Today is ${today}. Find stories from the last 21 days that let us explain what failed and what a competent team would build instead. Rotate across software, AI and automation, analytics and ML, growth and paid media, security and privacy, and business operations.`,
    },
  ], { research: true });
  if (!response) return [];
  const message = response.choices?.[0]?.message;
  const annotations = message?.annotations?.map((item) => item.url_citation).filter((item): item is { url: string; title?: string; content?: string } => Boolean(item?.url)) ?? [];
  const allowedSources = new Map(annotations.map((item) => [canonicalSourceUrl(item.url), { url: item.url, label: item.title || new URL(item.url).hostname }]));
  const parsed = parseJson<{ candidates?: DiscoveredCandidate[] }>(message?.content || "{}", {});
  const saved: EditorialLead[] = [];
  for (const candidate of (parsed.candidates || []).slice(0, 4)) {
    const contentType = validContentType(candidate.content_type);
    const sources = normalizeSources(candidate.source_urls, allowedSources);
    const facts = normalizeFacts(candidate.facts);
    const evidenceNotes = clean(candidate.evidence_notes, 15_000);
    if (!clean(candidate.working_title, 300) || !sources.length || evidenceNotes.length < 120) continue;
    const novelty = await calculateNoveltyScore(clean(candidate.working_title, 300), clean(candidate.summary, 1_500));
    const lead = await createEditorialLead({
      contentType,
      workingTitle: clean(candidate.working_title, 300),
      hook: clean(candidate.hook, 500),
      summary: clean(candidate.summary, 1_500),
      industry: clean(candidate.industry, 120) || "Cross-industry",
      capability: clean(candidate.capability, 120) || "Strategy and execution",
      whyNow: clean(candidate.why_now, 1_000),
      failure: clean(candidate.failure, 3_000),
      consequences: clean(candidate.consequences, 3_000),
      solution: clean(candidate.solution, 3_000),
      evidenceNotes,
      facts,
      sources,
      evidenceScore: evidenceScore(sources, evidenceNotes, facts, contentType),
      noveltyScore: novelty,
      commercialFitScore: clampScore(candidate.commercial_fit_score, 60),
      significanceScore: clampScore(candidate.significance_score, 60),
    });
    if (lead) saved.push(lead);
  }
  console.info("Editorial research discovery", { parsed: parsed.candidates?.length ?? 0, citations: annotations.length, saved: saved.length });
  return saved;
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);
}

function fallbackDraft(lead: EditorialLead): GeneratedDraft {
  const articleUrl = `${(process.env.PUBLIC_SITE_URL || "https://www.anyaiyouwant.com").replace(/\/$/, "")}/learn/${slugify(lead.working_title)}`;
  const facts = lead.facts.length ? `\n\n${lead.facts.map((fact) => `- **${fact.label}:** ${fact.display}${fact.context ? ` (${fact.context})` : ""}`).join("\n")}` : "";
  const body = `## What failed\n\n${lead.failure}${facts}\n\n## Why it mattered\n\n${lead.consequences}\n\n## What should exist instead\n\n${lead.solution}\n\n## What we would build\n\nWe would start with the smallest complete system that fixes the operating constraint, makes ownership explicit, and produces evidence that the change worked. The exact architecture follows the data, users, risk, and economics rather than a predetermined tool.\n\n## Warning signs\n\n- The team cannot name the owner of the outcome.\n- The metric being optimized is disconnected from the business result.\n- Critical context is lost between strategy and execution.\n- Nobody can explain how the system fails or recovers.\n\n## The bottom line\n\n${lead.hook}`;
  return {
    title: lead.working_title,
    dek: lead.summary,
    body_markdown: body,
    methodology: `This analysis is based on the linked sources and the evidence notes retained by the Any AI You Want editorial desk. Facts and inference are separated; the proposed solution is our technical and operating analysis, not a claim about unreported events.`,
    linkedin: `${lead.hook}\n\n${lead.summary}\n\nThe useful question is what should exist instead. ${lead.solution}\n\nRead the sourced analysis: ${articleUrl}`,
    instagram: `${lead.hook}\n\n${lead.summary}\n\nWhat we would build instead: ${lead.solution}\n\n${articleUrl}\n\n#SoftwareEngineering #Automation #BusinessOperations #AnyAIYouWant`,
    facebook: `${lead.hook}\n\n${lead.summary}\n\nWhat should exist instead: ${lead.solution}\n\n${articleUrl}`,
    image_headline: lead.working_title,
  };
}

export async function generateEditorialDraft(leadId: string) {
  const lead = await getEditorialLead(leadId);
  if (!lead) throw new Error("Editorial lead was not found.");
  const fallback = fallbackDraft(lead);
  const typeLabel = editorialTypeLabel(lead.content_type);
  const slugSeed = slugify(lead.working_title);
  const articleUrl = `${(process.env.PUBLIC_SITE_URL || "https://www.anyaiyouwant.com").replace(/\/$/, "")}/learn/${slugSeed}`;
  let generated = fallback;
  const response = await openRouter([
    {
      role: "system",
      content: `You are the senior editorial and technical desk for Any AI You Want. Return only JSON with title, dek, body_markdown, methodology, linkedin, instagram, facebook, and image_headline. This is a ${typeLabel}. Write a sharp, specific, premium analysis—not generic AI content, a listicle, outrage bait, or agency filler. The hook may be provocative only when the evidence earns it. Separate sourced facts from inference. Never invent a cause, quote, number, customer result, private detail, or allegation. Critique the failed system or decision pattern, not an individual. The article must explain the business consequence and provide an implementable solution that a strategy-and-engineering team could actually deliver. Use concise Markdown headings. For Failure Files use What failed, Why it failed, What it cost, What should exist instead, What we would build, Warning signs, and The bottom line. Adapt headings naturally for other types. LinkedIn should be 150-260 words with short paragraphs. Instagram should be concise and may use 3-5 relevant hashtags. Facebook should be direct. Each platform post must link to the supplied article URL. Preserve source qualifications and explain what the evidence cannot establish.`,
    },
    {
      role: "user",
      content: JSON.stringify({
        article_url: articleUrl,
        content_type: lead.content_type,
        working_title: lead.working_title,
        hook: lead.hook,
        summary: lead.summary,
        industry: lead.industry,
        capability: lead.capability,
        why_now: lead.why_now,
        failure: lead.failure,
        consequences: lead.consequences,
        solution: lead.solution,
        evidence_notes: lead.evidence_notes,
        facts: lead.facts,
        sources: lead.source_urls,
      }),
    },
  ]);
  if (response) {
    const parsed = parseJson<Partial<GeneratedDraft>>(response.choices?.[0]?.message?.content || "{}", {});
    generated = {
      title: clean(parsed.title, 300) || fallback.title,
      dek: clean(parsed.dek, 1_500) || fallback.dek,
      body_markdown: clean(parsed.body_markdown, 30_000) || fallback.body_markdown,
      methodology: clean(parsed.methodology, 3_000) || fallback.methodology,
      linkedin: clean(parsed.linkedin, 6_000) || fallback.linkedin,
      instagram: clean(parsed.instagram, 6_000) || fallback.instagram,
      facebook: clean(parsed.facebook, 6_000) || fallback.facebook,
      image_headline: clean(parsed.image_headline, 220) || fallback.image_headline,
    };
  }
  const slug = `${slugify(generated.title)}-${new Date().toISOString().slice(0, 10)}`;
  const finalUrl = `${(process.env.PUBLIC_SITE_URL || "https://www.anyaiyouwant.com").replace(/\/$/, "")}/learn/${slug}`;
  generated.linkedin = generated.linkedin.replaceAll(articleUrl, finalUrl);
  generated.instagram = generated.instagram.replaceAll(articleUrl, finalUrl);
  generated.facebook = generated.facebook.replaceAll(articleUrl, finalUrl);
  const imageData = await generateEditorialSocialCard(lead.content_type, generated.image_headline);
  return saveGeneratedEditorialDraft({
    lead,
    slug,
    title: generated.title,
    dek: generated.dek,
    bodyMarkdown: generated.body_markdown,
    methodology: generated.methodology,
    linkedin: generated.linkedin,
    instagram: generated.instagram,
    facebook: generated.facebook,
    imageHeadline: generated.image_headline,
    imageAlt: `${typeLabel}: ${generated.image_headline}`,
    imageData,
  });
}

export async function runEditorialResearchCycle() {
  const candidates = await discoverEditorialCandidates();
  const eligible = candidates.filter((lead) => lead.evidence_score >= 60 && lead.novelty_score >= 50).sort((left, right) => right.significance_score - left.significance_score);
  const article = eligible[0] ? await generateEditorialDraft(eligible[0].id) : null;
  return { candidates: candidates.length, eligible: eligible.length, articleId: article?.id ?? null };
}
