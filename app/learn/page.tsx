import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getEditorialArticles } from "@/lib/editorial-db";
import { editorialTypeLabel } from "@/lib/editorial-types";
import { insights } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Product Engineering, ML, Secure AI & GEO Insights",
  description:
    "Practical analysis covering business systems, growth, product delivery, software, machine learning, secure AI, technical SEO, and GEO.",
  alternates: { canonical: "/learn" },
};
export const dynamic = "force-dynamic";

export default async function LearnPage() {
  const articles = await getEditorialArticles();
  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="label-mono">Engineering insights</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">
          Engineering guidance grounded{" "}
          <span className="text-gradient">in production.</span>
        </h1>
        <p className="mt-5 text-muted text-lg max-w-3xl">
          Practical writing about strategy, growth, software, data, models,
          security, search, and the operating systems around them. Clear enough
          for buyers; detailed enough for engineers.
        </p>
        {articles.length ? (
          <>
            <div className="editorial-public-heading">
              <div className="label-mono">From the newsroom</div>
              <h2>Specific failures. Useful fixes.</h2>
              <p>
                Evidence-backed analysis of systems and decisions that
                broke&mdash;and what a capable team would build instead.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/learn/${article.slug}`}
                  className="card p-7 group"
                >
                  <div className="label-mono">
                    {editorialTypeLabel(article.content_type)} /{" "}
                    {article.industry}
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold group-hover:text-accent">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-muted leading-relaxed">
                    {article.dek}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-mono text-accent">
                    Read the analysis <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </>
        ) : null}
        <div className="editorial-public-heading">
          <div className="label-mono">Evergreen guides</div>
          <h2>The systems behind the work.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {insights.map((insight) => (
            <Link
              key={insight.slug}
              href={`/learn/${insight.slug}`}
              className="card p-7 group"
            >
              <div className="label-mono">{insight.eyebrow}</div>
              <h2 className="mt-3 text-2xl font-semibold group-hover:text-accent">
                {insight.title}
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                {insight.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-mono text-accent">
                Read the insight <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
