import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { EditorialMarkdown } from "@/components/editorial-markdown";
import { getEditorialArticleBySlug } from "@/lib/editorial-db";
import { editorialTypeLabel } from "@/lib/editorial-types";
import { getInsight, insights } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getEditorialArticleBySlug(slug);
  if (article)
    return {
      title: article.title,
      description: article.dek,
      alternates: { canonical: `/learn/${slug}` },
      openGraph: {
        type: "article",
        title: article.title,
        description: article.dek,
        publishedTime: article.published_at || undefined,
        modifiedTime: article.updated_at,
      },
    };
  const insight = getInsight(slug);
  return insight
    ? {
        title: insight.title,
        description: insight.description,
        alternates: { canonical: `/learn/${slug}` },
      }
    : {};
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const article = await getEditorialArticleBySlug(slug);
  if (article)
    return (
      <div className="pt-16">
        <ArticleJsonLd
          title={article.title}
          description={article.dek}
          path={`/learn/${article.slug}`}
          publishedAt={article.published_at || undefined}
          modifiedAt={article.updated_at}
        />
        <BreadcrumbJsonLd
          items={[
            { name: "Insights", path: "/learn" },
            { name: article.title, path: `/learn/${article.slug}` },
          ]}
        />
        <article className="editorial-public-article">
          <Link
            href="/learn"
            className="text-xs font-mono text-muted hover:text-foreground"
          >
            &larr; Engineering insights
          </Link>
          <div className="label-mono mt-10">
            {editorialTypeLabel(article.content_type)} / {article.industry}
          </div>
          <h1>{article.title}</h1>
          <p className="editorial-dek">{article.dek}</p>
          <div className="editorial-byline">
            By {article.author_name} &middot;{" "}
            {article.published_at
              ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
                  new Date(article.published_at),
                )
              : ""}{" "}
            &middot; {article.capability}
          </div>
          <EditorialMarkdown value={article.body_markdown} />
          <section className="editorial-method">
            <div className="label-mono">Sources and method</div>
            <p>{article.methodology}</p>
            <ul>
              {article.source_urls.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-14 card p-7 md:p-9 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex gap-2 items-center text-success text-sm">
                <Check size={16} /> Strategy and engineering in the same room
              </div>
              <h2 className="mt-2 text-2xl font-semibold">
                Have a system that should work better?
              </h2>
            </div>
            <Link
              href="/book"
              className="px-5 py-3 rounded-md bg-accent text-black font-medium text-center shrink-0"
            >
              Talk through it &rarr;
            </Link>
          </div>
        </article>
      </div>
    );

  const insight = getInsight(slug);
  if (!insight) notFound();
  return (
    <div className="pt-16">
      <ArticleJsonLd
        title={insight.title}
        description={insight.description}
        path={`/learn/${insight.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Insights", path: "/learn" },
          { name: insight.title, path: `/learn/${insight.slug}` },
        ]}
      />
      <article className="max-w-5xl mx-auto px-6 md:px-10">
        <Link
          href="/learn"
          className="text-xs font-mono text-muted hover:text-foreground"
        >
          &larr; Engineering insights
        </Link>
        <div className="label-mono mt-10">{insight.eyebrow}</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
          {insight.title}
        </h1>
        <p className="mt-5 text-muted text-xl leading-relaxed max-w-4xl">
          {insight.description}
        </p>
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {insight.sections.map(([title, body]) => (
              <section key={title}>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-3 text-foreground/85 leading-8">{body}</p>
              </section>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="card p-6 lg:sticky lg:top-24">
              <div className="label-mono">A production workflow</div>
              <ol className="mt-5 space-y-4">
                {insight.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-accent/15 text-accent font-mono text-xs grid place-items-center shrink-0">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
        <div className="mt-14 card p-7 md:p-9 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex gap-2 items-center text-success text-sm">
              <Check size={16} /> Built around a real operating decision
            </div>
            <h2 className="mt-2 text-2xl font-semibold">
              Want to apply this to a real system?
            </h2>
          </div>
          <Link
            href={insight.cta.href}
            className="px-5 py-3 rounded-md bg-accent text-black font-medium text-center shrink-0"
          >
            {insight.cta.label} &rarr;
          </Link>
        </div>
      </article>
    </div>
  );
}
