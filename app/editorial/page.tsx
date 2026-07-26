import Link from "next/link";
import Image from "next/image";
import { EditorialSubmitButton } from "@/components/editorial-submit-button";
import { requireEditorialPage } from "@/lib/editorial-auth";
import {
  getEditorialArticles,
  getEditorialDeliveries,
  getEditorialLeads,
  getEditorialSocialPost,
} from "@/lib/editorial-db";
import { getEditorialGhlState } from "@/lib/editorial-ghl";
import {
  editorialContentTypes,
  editorialTypeLabel,
} from "@/lib/editorial-types";
import {
  deliverSocialAction,
  dismissLeadAction,
  generateDraftAction,
  logoutAction,
  manualLeadAction,
  publishArticleAction,
  researchAction,
  updateDraftAction,
} from "./actions";

export const dynamic = "force-dynamic";

function date(value: string | null) {
  return value
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "America/Los_Angeles",
      }).format(new Date(value))
    : "-";
}

export default async function EditorialPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  await requireEditorialPage();
  const [{ notice, error }, leads, articles, ghl] = await Promise.all([
    searchParams,
    getEditorialLeads(),
    getEditorialArticles(true),
    getEditorialGhlState(),
  ]);
  const articleDetails = await Promise.all(
    articles.map(async (article) => {
      const social = await getEditorialSocialPost(article.id);
      const deliveries = social ? await getEditorialDeliveries(social.id) : [];
      return { article, social, deliveries };
    }),
  );
  return (
    <div className="editorial-shell">
      <header className="editorial-desk-header">
        <div>
          <div className="label-mono">Any AI You Want / private</div>
          <h1>Newsroom</h1>
          <p>
            Evidence first. Human approval always. Sharp enough to earn
            attention, precise enough to defend.
          </p>
        </div>
        <form action={logoutAction}>
          <EditorialSubmitButton className="editorial-button secondary">
            Sign out
          </EditorialSubmitButton>
        </form>
      </header>
      {notice ? <div className="editorial-alert">{notice}</div> : null}
      {error ? <div className="editorial-alert error">{error}</div> : null}
      <section className="editorial-grid two">
        <div className="editorial-panel">
          <div className="editorial-panel-head">
            <div>
              <div className="label-mono">Research desk</div>
              <h2>Find the next failure worth explaining</h2>
            </div>
            <form action={researchAction}>
              <EditorialSubmitButton busy="Researching...">
                Run research
              </EditorialSubmitButton>
            </form>
          </div>
          <p>
            The coded research pass looks for recent primary-source incidents,
            enforcement actions, postmortems, and expensive operating mistakes.
            It can prepare a draft, but it cannot publish one.
          </p>
        </div>
        <details className="editorial-panel">
          <summary>Add a sourced lead manually</summary>
          <form action={manualLeadAction} className="editorial-form">
            <div className="editorial-fields two">
              <label>
                <span>Format</span>
                <select name="contentType">
                  {editorialContentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Industry</span>
                <input
                  name="industry"
                  placeholder="Retail, legal, home services..."
                  required
                />
              </label>
            </div>
            <label>
              <span>Working title</span>
              <input name="workingTitle" required />
            </label>
            <label>
              <span>Hook</span>
              <textarea name="hook" required />
            </label>
            <label>
              <span>Summary</span>
              <textarea name="summary" required />
            </label>
            <div className="editorial-fields two">
              <label>
                <span>Capability</span>
                <input name="capability" required />
              </label>
              <label>
                <span>Why now</span>
                <textarea name="whyNow" required />
              </label>
            </div>
            <label>
              <span>What failed</span>
              <textarea name="failure" required />
            </label>
            <label>
              <span>Consequences</span>
              <textarea name="consequences" required />
            </label>
            <label>
              <span>What should exist instead</span>
              <textarea name="solution" required />
            </label>
            <label>
              <span>Evidence notes</span>
              <textarea name="evidenceNotes" rows={6} required />
            </label>
            <label>
              <span>Primary source URLs, one per line</span>
              <textarea name="sourceUrls" rows={4} />
            </label>
            <EditorialSubmitButton busy="Saving...">
              Save evidence lead
            </EditorialSubmitButton>
          </form>
        </details>
      </section>
      <section className="editorial-section">
        <div className="editorial-section-title">
          <div>
            <div className="label-mono">Lead queue</div>
            <h2>{leads.length} story leads</h2>
          </div>
          <p>Novelty and evidence gates keep the desk from repeating itself.</p>
        </div>
        <div className="editorial-list">
          {leads.length ? (
            leads.map((lead) => (
              <article key={lead.id} className="editorial-panel editorial-lead">
                <div className="editorial-score-row">
                  <span>{editorialTypeLabel(lead.content_type)}</span>
                  <span>E {lead.evidence_score}</span>
                  <span>N {lead.novelty_score}</span>
                  <span>Fit {lead.commercial_fit_score}</span>
                </div>
                <h3>{lead.working_title}</h3>
                <p>{lead.summary}</p>
                <div className="editorial-meta">
                  {lead.industry} / {lead.capability} /{" "}
                  {date(lead.created_at)}
                </div>
                <div className="editorial-actions">
                  <form action={generateDraftAction}>
                    <input type="hidden" name="leadId" value={lead.id} />
                    <EditorialSubmitButton
                      busy="Generating..."
                      className="editorial-button"
                    >
                      {lead.status === "drafted"
                        ? "Draft created"
                        : "Generate article + social"}
                    </EditorialSubmitButton>
                  </form>
                  {lead.status === "new" ? (
                    <form action={dismissLeadAction}>
                      <input type="hidden" name="leadId" value={lead.id} />
                      <EditorialSubmitButton className="editorial-button secondary">
                        Dismiss
                      </EditorialSubmitButton>
                    </form>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <div className="editorial-empty">
              No active leads yet. Run research or add a sourced lead.
            </div>
          )}
        </div>
      </section>
      <section className="editorial-section">
        <div className="editorial-section-title">
          <div>
            <div className="label-mono">Review queue</div>
            <h2>{articles.length} articles</h2>
          </div>
          <p>
            Article, social copy, and artwork stay editable until you approve
            them.
          </p>
        </div>
        <div className="editorial-list">
          {articleDetails.map(({ article, social, deliveries }) => (
            <details
              key={article.id}
              className="editorial-panel editorial-draft"
              open={article.status === "draft"}
            >
              <summary>
                <div>
                  <div className="editorial-score-row">
                    <span>{article.status}</span>
                    <span>E {article.evidence_score ?? 0}</span>
                    <span>N {article.novelty_score ?? 0}</span>
                    <span>{editorialTypeLabel(article.content_type)}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.dek}</p>
                </div>
              </summary>
              {social ? (
                <>
                  <form action={updateDraftAction} className="editorial-form">
                    <input type="hidden" name="articleId" value={article.id} />
                    <div className="editorial-fields two">
                      <label>
                        <span>Title</span>
                        <input
                          name="title"
                          defaultValue={article.title}
                          required
                        />
                      </label>
                      <label>
                        <span>Slug</span>
                        <input
                          name="slug"
                          defaultValue={article.slug}
                          required
                        />
                      </label>
                    </div>
                    <label>
                      <span>Dek</span>
                      <textarea
                        name="dek"
                        defaultValue={article.dek}
                        required
                      />
                    </label>
                    <label>
                      <span>Article Markdown</span>
                      <textarea
                        name="bodyMarkdown"
                        rows={22}
                        defaultValue={article.body_markdown}
                        required
                      />
                    </label>
                    <label>
                      <span>Methodology / evidence limits</span>
                      <textarea
                        name="methodology"
                        rows={5}
                        defaultValue={article.methodology}
                        required
                      />
                    </label>
                    <div className="editorial-fields three">
                      <label>
                        <span>LinkedIn</span>
                        <textarea
                          name="linkedin"
                          rows={12}
                          defaultValue={social.caption_linkedin}
                        />
                      </label>
                      <label>
                        <span>Instagram</span>
                        <textarea
                          name="instagram"
                          rows={12}
                          defaultValue={social.caption_instagram}
                        />
                      </label>
                      <label>
                        <span>Facebook</span>
                        <textarea
                          name="facebook"
                          rows={12}
                          defaultValue={social.caption_facebook}
                        />
                      </label>
                    </div>
                    <div className="editorial-fields two">
                      <label>
                        <span>Social card headline</span>
                        <input
                          name="imageHeadline"
                          defaultValue={social.image_headline}
                        />
                      </label>
                      <label>
                        <span>Image alt text</span>
                        <input
                          name="imageAlt"
                          defaultValue={social.image_alt}
                        />
                      </label>
                    </div>
                    {article.status === "draft" ? (
                      <EditorialSubmitButton busy="Saving...">
                        Save draft + refresh card
                      </EditorialSubmitButton>
                    ) : null}
                  </form>
                  <div className="editorial-publish-row">
                    {article.status === "draft" ? (
                      <form action={publishArticleAction}>
                        <input
                          type="hidden"
                          name="articleId"
                          value={article.id}
                        />
                        <EditorialSubmitButton busy="Publishing...">
                          Approve and publish article
                        </EditorialSubmitButton>
                      </form>
                    ) : (
                      <Link
                        href={`/learn/${article.slug}`}
                        className="editorial-button"
                      >
                        View published article
                      </Link>
                    )}
                  <Image
                    unoptimized
                    width={352}
                    height={352}
                    className="editorial-social-preview"
                      src={`/api/editorial-assets/${social.id}`}
                      alt={social.image_alt}
                    />
                  </div>
                  <div className="editorial-delivery">
                    <h4>Social delivery</h4>
                    <p>
                      {ghl.error ||
                        "Choose connected accounts. Draft, schedule, or publish only when you submit this form."}
                    </p>
                    {ghl.accounts.length ? (
                      <form
                        action={deliverSocialAction}
                        className="editorial-form"
                      >
                        <input
                          type="hidden"
                          name="socialPostId"
                          value={social.id}
                        />
                        <div className="editorial-account-list">
                          {ghl.accounts.map((account) => (
                            <label key={account.id}>
                              <input
                                type="checkbox"
                                name="accountIds"
                                value={account.id}
                              />{" "}
                              {account.name || account.id}{" "}
                              <small>{account.normalizedPlatform}</small>
                            </label>
                          ))}
                        </div>
                        <div className="editorial-fields three">
                          <label>
                            <span>Mode</span>
                            <select name="mode">
                              <option value="draft">HighLevel draft</option>
                              <option value="scheduled">Schedule</option>
                              <option value="published">Publish now</option>
                            </select>
                          </label>
                          <label>
                            <span>Schedule (Pacific)</span>
                            <input name="scheduledAt" type="datetime-local" />
                          </label>
                          <div className="editorial-form-button">
                            <EditorialSubmitButton busy="Sending...">
                              Send to HighLevel
                            </EditorialSubmitButton>
                          </div>
                        </div>
                      </form>
                    ) : null}
                    {deliveries.length ? (
                      <div className="editorial-delivery-log">
                        {deliveries.map((delivery) => (
                          <div key={delivery.id}>
                            {delivery.platform} / {delivery.delivery_mode} /{" "}
                            {delivery.status} / {date(delivery.created_at)}
                            {delivery.error_message
                              ? ` - ${delivery.error_message}`
                              : ""}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </>
              ) : (
                <p>Social draft is missing.</p>
              )}
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
