export const editorialContentTypes = [
  { value: "failure_file", label: "Failure File", description: "A sourced teardown of what broke, why it mattered, and what should exist instead." },
  { value: "solution_blueprint", label: "What We’d Build Instead", description: "A concrete system design for a recognizable operating problem." },
  { value: "expensive_shortcut", label: "Expensive Shortcut", description: "A sharp explanation of a tempting decision and the hidden bill it creates." },
  { value: "build_note", label: "Built This Week", description: "A concise proof-driven note about a real problem, constraint, and shipped result." },
] as const;

export type EditorialContentType = (typeof editorialContentTypes)[number]["value"];

export type EditorialSource = { label: string; url: string };
export type EditorialFact = { label: string; value?: number | string; display: string; context?: string };

export type EditorialLead = {
  id: string;
  fingerprint: string;
  content_type: EditorialContentType;
  working_title: string;
  hook: string;
  summary: string;
  industry: string;
  capability: string;
  why_now: string;
  failure: string;
  consequences: string;
  solution: string;
  evidence_notes: string;
  facts: EditorialFact[];
  source_urls: EditorialSource[];
  evidence_score: number;
  novelty_score: number;
  commercial_fit_score: number;
  significance_score: number;
  status: "new" | "drafted" | "dismissed" | "published";
  discovered_at: string;
  created_at: string;
  updated_at: string;
};

export type EditorialArticle = {
  id: string;
  story_lead_id: string | null;
  slug: string;
  content_type: EditorialContentType;
  title: string;
  dek: string;
  body_markdown: string;
  industry: string;
  capability: string;
  author_name: string;
  source_urls: EditorialSource[];
  methodology: string;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  evidence_score?: number;
  novelty_score?: number;
};

export type EditorialSocialPost = {
  id: string;
  article_id: string;
  caption_linkedin: string;
  caption_instagram: string;
  caption_facebook: string;
  image_headline: string;
  image_alt: string;
  image_mime: string;
  image_data?: Buffer | null;
  status: "draft" | "scheduled" | "published" | "archived" | "failed";
  scheduled_at: string | null;
  published_at: string | null;
  generation_error: string | null;
  created_at: string;
  updated_at: string;
};

export type EditorialDelivery = {
  id: string;
  social_post_id: string;
  provider: string;
  platform: "instagram" | "linkedin" | "facebook";
  account_id: string;
  account_name: string | null;
  delivery_mode: "draft" | "scheduled" | "published";
  status: "pending" | "created" | "published" | "cancelled" | "failed";
  provider_post_id: string | null;
  scheduled_at: string | null;
  published_at: string | null;
  error_message: string | null;
  created_at: string;
};

export function editorialTypeLabel(type: EditorialContentType) {
  return editorialContentTypes.find((item) => item.value === type)?.label ?? "Editorial analysis";
}
