"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  editorialContentTypes,
  type EditorialContentType,
} from "@/lib/editorial-types";
import {
  loginEditorial,
  logoutEditorial,
  requireEditorialAction,
} from "@/lib/editorial-auth";
import {
  createManualEditorialLead,
  generateEditorialDraft,
  runEditorialResearchCycle,
} from "@/lib/editorial-generation";
import {
  dismissEditorialLead,
  getEditorialArticleById,
  publishEditorialArticle,
  updateEditorialDraft,
} from "@/lib/editorial-db";
import { generateEditorialSocialCard } from "@/lib/editorial-assets";
import {
  deliverEditorialSocialPost,
  type EditorialGhlMode,
} from "@/lib/editorial-ghl";

function text(form: FormData, key: string, max = 30_000) {
  return String(form.get(key) || "")
    .trim()
    .slice(0, max);
}

function message(value: unknown) {
  return encodeURIComponent(
    value instanceof Error
      ? value.message
      : "The operation could not be completed.",
  );
}

function rethrowRedirect(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    "digest" in value &&
    String((value as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT")
  )
    throw value;
}

function slug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

export async function loginAction(form: FormData) {
  let ok = false;
  try {
    ok = await loginEditorial(text(form, "password", 500));
  } catch {
    ok = false;
  }
  redirect(
    ok
      ? "/editorial"
      : "/editorial/login?error=Invalid+password+or+editorial+desk+is+not+configured.",
  );
}

export async function logoutAction() {
  await requireEditorialAction();
  await logoutEditorial();
  redirect("/editorial/login");
}

export async function researchAction() {
  await requireEditorialAction();
  try {
    const result = await runEditorialResearchCycle();
    revalidatePath("/editorial");
    redirect(
      `/editorial?notice=${encodeURIComponent(`Research complete: ${result.candidates} candidates, ${result.eligible} eligible.`)}`,
    );
  } catch (error) {
    rethrowRedirect(error);
    redirect(`/editorial?error=${message(error)}`);
  }
}

export async function manualLeadAction(form: FormData) {
  await requireEditorialAction();
  try {
    const requestedType = text(form, "contentType", 40) as EditorialContentType;
    const contentType = editorialContentTypes.some(
      (item) => item.value === requestedType,
    )
      ? requestedType
      : "failure_file";
    await createManualEditorialLead({
      contentType,
      workingTitle: text(form, "workingTitle", 300),
      hook: text(form, "hook", 500),
      summary: text(form, "summary", 1_500),
      industry: text(form, "industry", 120),
      capability: text(form, "capability", 120),
      whyNow: text(form, "whyNow", 1_000),
      failure: text(form, "failure", 3_000),
      consequences: text(form, "consequences", 3_000),
      solution: text(form, "solution", 3_000),
      evidenceNotes: text(form, "evidenceNotes", 15_000),
      sourceUrls: text(form, "sourceUrls", 8_000),
    });
    revalidatePath("/editorial");
    redirect("/editorial?notice=Evidence+lead+saved.");
  } catch (error) {
    rethrowRedirect(error);
    redirect(`/editorial?error=${message(error)}`);
  }
}

export async function generateDraftAction(form: FormData) {
  await requireEditorialAction();
  try {
    await generateEditorialDraft(text(form, "leadId", 50));
    revalidatePath("/editorial");
    redirect("/editorial?notice=Article+and+social+drafts+generated.");
  } catch (error) {
    rethrowRedirect(error);
    redirect(`/editorial?error=${message(error)}`);
  }
}

export async function dismissLeadAction(form: FormData) {
  await requireEditorialAction();
  try {
    await dismissEditorialLead(text(form, "leadId", 50));
    revalidatePath("/editorial");
    redirect("/editorial?notice=Lead+dismissed.");
  } catch (error) {
    rethrowRedirect(error);
    redirect(`/editorial?error=${message(error)}`);
  }
}

export async function updateDraftAction(form: FormData) {
  await requireEditorialAction();
  try {
    const id = text(form, "articleId", 50);
    const article = await getEditorialArticleById(id);
    if (!article) throw new Error("Article was not found.");
    const title = text(form, "title", 300);
    const imageHeadline = text(form, "imageHeadline", 220);
    const imageData = await generateEditorialSocialCard(
      article.content_type,
      imageHeadline,
    );
    await updateEditorialDraft({
      id,
      title,
      slug: slug(text(form, "slug", 160) || title),
      dek: text(form, "dek", 1_500),
      bodyMarkdown: text(form, "bodyMarkdown"),
      methodology: text(form, "methodology", 3_000),
      linkedin: text(form, "linkedin", 6_000),
      instagram: text(form, "instagram", 6_000),
      facebook: text(form, "facebook", 6_000),
      imageHeadline,
      imageAlt: text(form, "imageAlt", 500),
      imageData,
    });
    revalidatePath("/editorial");
    redirect("/editorial?notice=Draft+saved+and+social+card+refreshed.");
  } catch (error) {
    rethrowRedirect(error);
    redirect(`/editorial?error=${message(error)}`);
  }
}

export async function publishArticleAction(form: FormData) {
  await requireEditorialAction();
  try {
    const article = await publishEditorialArticle(text(form, "articleId", 50));
    if (article) {
      revalidatePath("/learn");
      revalidatePath(`/learn/${article.slug}`);
      revalidatePath("/sitemap.xml");
    }
    revalidatePath("/editorial");
    redirect(
      "/editorial?notice=Article+published.+Social+posts+remain+under+your+control.",
    );
  } catch (error) {
    rethrowRedirect(error);
    redirect(`/editorial?error=${message(error)}`);
  }
}

export async function deliverSocialAction(form: FormData) {
  await requireEditorialAction();
  try {
    const mode = text(form, "mode", 20) as EditorialGhlMode;
    if (!(["draft", "scheduled", "published"] as string[]).includes(mode))
      throw new Error("Invalid delivery mode.");
    const results = await deliverEditorialSocialPost({
      socialPostId: text(form, "socialPostId", 50),
      accountIds: form.getAll("accountIds").map(String),
      mode,
      scheduledAt: text(form, "scheduledAt", 50) || undefined,
    });
    const failed = results.filter((result) => !result.ok).length;
    revalidatePath("/editorial");
    redirect(
      `/editorial?notice=${encodeURIComponent(`${results.length - failed} social delivery request(s) created${failed ? `; ${failed} failed` : ""}.`)}`,
    );
  } catch (error) {
    rethrowRedirect(error);
    redirect(`/editorial?error=${message(error)}`);
  }
}
