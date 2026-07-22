import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryDashboard } from "@/components/industry-dashboard";
import { getDashboardRows } from "@/lib/dashboard-db";
import { dashboardSlugs, getDashboardConfig } from "@/lib/dashboard-data.mjs";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return dashboardSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const config = getDashboardConfig(slug);
  if (!config) return {};
  return {
    title: `${config.title} dashboard demo`,
    description: `${config.description} Explore three years of interactive synthetic data.`,
    alternates: { canonical: `/demos/${slug}` },
  };
}

export default async function DashboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getDashboardConfig(slug)) notFound();
  const rows = await getDashboardRows(slug);
  return <IndustryDashboard slug={slug} rows={rows} />;
}
