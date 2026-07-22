import type { MetadataRoute } from "next";
import { dashboardSlugs } from "@/lib/dashboard-data.mjs";
import { eventCities, glossaryTerms, industries, insights } from "@/lib/site-content";

const SITE_URL = "https://www.anyaiyouwant.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: .95, changeFrequency: "monthly" },
    { path: "/industries", priority: .9, changeFrequency: "monthly" },
    { path: "/work", priority: .9, changeFrequency: "monthly" },
    { path: "/demos", priority: .9, changeFrequency: "monthly" },
    { path: "/learn", priority: .85, changeFrequency: "monthly" },
    { path: "/ai-events", priority: .85, changeFrequency: "daily" },
    { path: "/glossary", priority: .8, changeFrequency: "monthly" },
    { path: "/community", priority: .75, changeFrequency: "weekly" },
    { path: "/about", priority: .7, changeFrequency: "monthly" },
    { path: "/book", priority: .8, changeFrequency: "yearly" },
  ];
  dashboardSlugs.forEach((slug) => routes.push({ path: `/demos/${slug}`, priority: .8, changeFrequency: "monthly" }));
  industries.forEach(({ slug }) => routes.push({ path: `/industries/${slug}`, priority: .85, changeFrequency: "monthly" }));
  insights.forEach(({ slug }) => routes.push({ path: `/learn/${slug}`, priority: .8, changeFrequency: "monthly" }));
  eventCities.forEach(([slug]) => routes.push({ path: `/ai-events/${slug}`, priority: .75, changeFrequency: "daily" }));
  glossaryTerms.forEach(([slug]) => routes.push({ path: `/glossary/${slug}`, priority: .65, changeFrequency: "monthly" }));
  return routes.map((route) => ({ url: `${SITE_URL}${route.path}`, lastModified: now, changeFrequency: route.changeFrequency, priority: route.priority }));
}
