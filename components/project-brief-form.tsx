"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

type FormStatus = { kind: "idle" | "sending" | "success" | "error"; message: string };

export function ProjectBriefForm({ compact = false }: { compact?: boolean }) {
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<FormStatus>({ kind: "idle", message: "" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const params = new URLSearchParams(window.location.search);
    const attribution = {
      landingPath: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
    };
    setStatus({ kind: "sending", message: "Sending your brief…" });
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, ...attribution, startedAt }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      form.reset();
      setStatus({ kind: "success", message: "Your project brief is in. A senior operator or engineer will review the context and respond directly." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Something went wrong." });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="brief-success" role="status">
        <CheckCircle2 aria-hidden="true" />
        <h3>Brief received.</h3>
        <p>{status.message}</p>
      </div>
    );
  }

  return (
    <form className={`brief-form ${compact ? "brief-form-compact" : ""}`} onSubmit={submit}>
      <div className="brief-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="brief-grid">
        <label><span>Name *</span><input name="name" autoComplete="name" required minLength={2} /></label>
        <label><span>Work email *</span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>Company</span><input name="company" autoComplete="organization" /></label>
        <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
        <label>
          <span>What kind of help?</span>
          <select name="projectType" defaultValue="">
            <option value="">Not sure yet</option>
            <option value="product-engineering">Product engineering and delivery</option>
            <option value="data-analytics">Data and analytics</option>
            <option value="applied-machine-learning">Applied machine learning</option>
            <option value="secure-ai">Secure AI</option>
            <option value="growth-marketing-media">Growth marketing and media</option>
            <option value="business-strategy-execution">Business strategy, decision, or launch plan</option>
            <option value="search-growth">Search and answer-engine growth</option>
            <option value="other">Something else</option>
          </select>
        </label>
        <label>
          <span>Engagement shape</span>
          <select name="budget" defaultValue="">
            <option value="">Not sure yet</option>
            <option value="focused">Focused problem or sprint</option>
            <option value="project">Defined project or launch</option>
            <option value="ongoing">Ongoing execution partner</option>
            <option value="team">Full build or embedded team</option>
          </select>
        </label>
      </div>
      <label><span>Timing</span><input name="timeline" placeholder="This week, this quarter, exploring…" /></label>
      <label>
        <span>What should change? *</span>
        <textarea name="brief" rows={compact ? 4 : 6} minLength={30} maxLength={5000} required placeholder="What exists today, what outcome do you need, and what is currently getting in the way?" />
      </label>
      <div className="brief-submit-row">
        <button type="submit" disabled={status.kind === "sending"}>
          <Send size={16} aria-hidden="true" /> {status.kind === "sending" ? "Saving…" : "Send project brief"}
        </button>
        <p>Stored privately for direct senior review.</p>
      </div>
      {status.kind === "error" && <p className="brief-error" role="alert">{status.message}</p>}
    </form>
  );
}
