import "server-only";

import { DateTime } from "luxon";
import { getEditorialAssetUrl } from "@/lib/editorial-assets";
import { getEditorialSocialPostById, markEditorialSocialStatus, saveEditorialDelivery } from "@/lib/editorial-db";

const GHL_API_ROOT = "https://services.leadconnectorhq.com";

export type EditorialGhlPlatform = "instagram" | "linkedin" | "facebook";
export type EditorialGhlMode = "draft" | "scheduled" | "published";
export type EditorialGhlAccount = { id: string; name?: string; platform?: string; type?: string; userId?: string; [key: string]: unknown };

function token() { return process.env.GHL_API_KEY || ""; }
function locationId() { return process.env.GHL_LOCATION_ID || ""; }

async function requestGhl<T>(path: string, init?: RequestInit): Promise<T> {
  if (!token()) throw new Error("HighLevel is not configured.");
  const response = await fetch(`${GHL_API_ROOT}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token()}`,
      Version: "2021-07-28",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`HighLevel request failed (${response.status}): ${body.slice(0, 400)}`);
  return body ? JSON.parse(body) as T : {} as T;
}

export function editorialGhlPlatform(account: EditorialGhlAccount): EditorialGhlPlatform | null {
  const value = `${account.platform || ""} ${account.type || ""}`.toLowerCase();
  if (value.includes("instagram")) return "instagram";
  if (value.includes("linkedin")) return "linkedin";
  if (value.includes("facebook")) return "facebook";
  return null;
}

export async function getEditorialGhlState() {
  if (!token() || !locationId()) return { configured: false, accounts: [] as Array<EditorialGhlAccount & { normalizedPlatform: EditorialGhlPlatform }>, error: "HighLevel is not configured for Any AI You Want yet." };
  try {
    const response = await requestGhl<{ accounts?: EditorialGhlAccount[]; results?: { accounts?: EditorialGhlAccount[] } } | EditorialGhlAccount[]>(`/social-media-posting/${locationId()}/accounts`);
    const raw = Array.isArray(response) ? response : response.accounts || response.results?.accounts || [];
    const accounts = raw.map((account) => ({ account, normalizedPlatform: editorialGhlPlatform(account) }))
      .filter((item): item is { account: EditorialGhlAccount; normalizedPlatform: EditorialGhlPlatform } => Boolean(item.account.id && item.normalizedPlatform))
      .map(({ account, normalizedPlatform }) => ({ ...account, normalizedPlatform }));
    return { configured: true, accounts, error: accounts.length ? null : "Connect LinkedIn, Instagram, or Facebook in HighLevel Social Planner." };
  } catch (error) {
    console.error("Unable to load Any AI You Want HighLevel accounts", error);
    return { configured: true, accounts: [] as Array<EditorialGhlAccount & { normalizedPlatform: EditorialGhlPlatform }>, error: "HighLevel accounts are temporarily unavailable." };
  }
}

function providerPostId(value: Record<string, unknown>) {
  const results = value.results && typeof value.results === "object" ? value.results as Record<string, unknown> : {};
  return String(value._id || value.id || value.postId || results._id || results.id || results.postId || "") || undefined;
}

function pacificToIso(value: string) {
  const parsed = DateTime.fromISO(value, { zone: "America/Los_Angeles" });
  if (!parsed.isValid) throw new Error("A valid Pacific schedule time is required.");
  return parsed.toUTC().toISO() || undefined;
}

export async function deliverEditorialSocialPost(input: { socialPostId: string; accountIds: string[]; mode: EditorialGhlMode; scheduledAt?: string }) {
  const post = await getEditorialSocialPostById(input.socialPostId);
  if (!post) throw new Error("Social post was not found.");
  const state = await getEditorialGhlState();
  if (!state.configured || !state.accounts.length) throw new Error(state.error || "HighLevel is not configured.");
  const selected = state.accounts.filter((account) => input.accountIds.includes(account.id));
  if (!selected.length) throw new Error("Select at least one connected account.");
  const scheduleIso = input.mode === "scheduled" ? pacificToIso(input.scheduledAt || "") : undefined;
  const results: Array<{ accountId: string; ok: boolean; error?: string }> = [];
  for (const account of selected) {
    const platform = account.normalizedPlatform;
    const summary = platform === "instagram" ? post.caption_instagram : platform === "facebook" ? post.caption_facebook : post.caption_linkedin;
    const creatorId = process.env.GHL_USER_ID || account.userId || "";
    if (!creatorId) throw new Error("GHL_USER_ID is required to create a Social Planner post.");
    const payload: Record<string, unknown> = {
      accountIds: [account.id],
      summary,
      media: [{ url: getEditorialAssetUrl(post.id), type: post.image_mime || "image/jpeg", altText: post.image_alt }],
      status: input.mode,
      type: "post",
      userId: creatorId,
    };
    if (scheduleIso) {
      payload.scheduleDate = scheduleIso;
      payload.selectedBestTime = scheduleIso;
      payload.scheduleTimeUpdated = true;
    }
    try {
      const response = await requestGhl<Record<string, unknown>>(`/social-media-posting/${locationId()}/posts`, { method: "POST", body: JSON.stringify(payload) });
      await saveEditorialDelivery({
        socialPostId: post.id,
        platform,
        accountId: account.id,
        accountName: account.name,
        mode: input.mode,
        status: "created",
        providerPostId: providerPostId(response),
        scheduledAt: scheduleIso,
      });
      results.push({ accountId: account.id, ok: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "HighLevel delivery failed.";
      await saveEditorialDelivery({ socialPostId: post.id, platform, accountId: account.id, accountName: account.name, mode: input.mode, status: "failed", scheduledAt: scheduleIso, errorMessage: message });
      results.push({ accountId: account.id, ok: false, error: message });
    }
  }
  const successful = results.filter((result) => result.ok).length;
  if (successful) await markEditorialSocialStatus(post.id, input.mode === "published" ? "published" : input.mode === "scheduled" ? "scheduled" : "draft", scheduleIso);
  return results;
}
