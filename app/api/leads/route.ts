import { createLead, type LeadInput } from "@/lib/leads-db";

export const dynamic = "force-dynamic";

const attempts = new Map<string, number[]>();
const allowedProjectTypes = new Set(["software", "machine-learning", "secure-ai", "analytics", "automation", "technical-leadership", "other"]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 5) return true;
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 2_000) {
    for (const [entry, times] of attempts) {
      if (!times.some((time) => now - time < 60 * 60 * 1000)) attempts.delete(entry);
    }
  }
  return false;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 30_000) return Response.json({ error: "Request is too large." }, { status: 413 });

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const hostname = new URL(origin).hostname;
      const allowed = hostname === "anyaiyouwant.com" || hostname === "www.anyaiyouwant.com" || hostname === "localhost" || hostname === "127.0.0.1";
      if (!allowed) return Response.json({ error: "Origin is not allowed." }, { status: 403 });
    } catch {
      return Response.json({ error: "Origin is not allowed." }, { status: 403 });
    }
  }

  const clientKey = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientKey)) return Response.json({ error: "Please wait before sending another brief." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website, 200)) return Response.json({ ok: true });
  const startedAt = Number(body.startedAt || 0);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2_500) {
    return Response.json({ error: "Please take a moment to review your brief." }, { status: 400 });
  }

  const projectType = clean(body.projectType, 60);
  const input: LeadInput = {
    name: clean(body.name, 120),
    email: clean(body.email, 254).toLowerCase(),
    company: clean(body.company, 160),
    phone: clean(body.phone, 40),
    projectType: allowedProjectTypes.has(projectType) ? projectType : "other",
    budget: clean(body.budget, 80),
    timeline: clean(body.timeline, 80),
    brief: clean(body.brief, 5_000),
    landingPath: clean(body.landingPath, 500),
    referrer: clean(body.referrer, 1_000),
    utmSource: clean(body.utmSource, 160),
    utmMedium: clean(body.utmMedium, 160),
    utmCampaign: clean(body.utmCampaign, 160),
  };

  if (input.name.length < 2 || !validEmail(input.email) || input.brief.length < 30) {
    return Response.json({ error: "Add your name, a valid email, and at least a few sentences about the project." }, { status: 400 });
  }

  try {
    const id = await createLead(input);
    return Response.json({ ok: true, id });
  } catch (error) {
    console.error("lead-create-failed", error instanceof Error ? error.message : "unknown");
    return Response.json({ error: "The brief could not be saved. Please email Saul@anyaiyouwant.com." }, { status: 500 });
  }
}
