import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, DefinedTermJsonLd } from "@/components/json-ld";
import { getGlossaryTerm, glossaryTerms } from "@/lib/site-content";

type Props = { params: Promise<{ term: string }> };
export function generateStaticParams() { return glossaryTerms.map((item) => ({ term: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { term } = await params; const item = getGlossaryTerm(term); return item ? { title: `${item.name}: Definition and Example`, description: item.definition, alternates: { canonical: `/glossary/${term}` } } : {}; }

export default async function GlossaryTermPage({ params }: Props) {
  const term = getGlossaryTerm((await params).term);
  if (!term) notFound();
  const related = glossaryTerms.filter((item) => item.slug !== term.slug).slice(0, 4);
  return <div className="pt-16"><DefinedTermJsonLd name={term.name} description={term.definition} path={`/glossary/${term.slug}`} /><BreadcrumbJsonLd items={[{ name: "Technical glossary", path: "/glossary" }, { name: term.name, path: `/glossary/${term.slug}` }]} /><article className="max-w-4xl mx-auto px-6 md:px-10"><Link href="/glossary" className="text-xs font-mono text-muted hover:text-foreground">← Technical glossary</Link><div className="label-mono mt-10">Definition</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">{term.name}</h1><p className="mt-7 text-xl md:text-2xl leading-relaxed text-foreground/90">{term.definition}</p><div className="mt-12 grid md:grid-cols-2 gap-4"><section className="card p-7"><div className="label-mono">Why it matters</div><h2 className="mt-2 text-2xl font-semibold">The practical consequence.</h2><p className="mt-4 text-muted leading-relaxed">{term.why}</p></section><section className="card p-7"><div className="label-mono">Example</div><h2 className="mt-2 text-2xl font-semibold">How it appears in a system.</h2><p className="mt-4 text-muted leading-relaxed">{term.example}</p></section></div><section className="mt-12"><div className="label-mono">Continue learning</div><div className="mt-4 flex flex-wrap gap-2">{related.map((item) => <Link key={item.slug} href={`/glossary/${item.slug}`} className="px-3 py-2 rounded-md border border-border text-sm text-muted hover:text-foreground hover:bg-surface">{item.name}</Link>)}</div><Link href="/learn" className="mt-6 inline-block text-sm font-mono text-accent">Browse engineering insights →</Link></section></article></div>;
}
