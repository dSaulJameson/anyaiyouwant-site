import type { MetadataRoute } from "next";
import { dashboardSlugs } from "@/lib/dashboard-data.mjs";
import { capabilities, caseStudies, eventCities, glossaryTerms, industries, insights } from "@/lib/site-content";

const SITE_URL = "https://www.anyaiyouwant.com";
const CONTENT_UPDATED = "2026-07-22";

type Frequency = "daily" | "weekly" | "monthly" | "yearly";
type Route = { path: string; priority: number; changeFrequency: Frequency; lastModified?: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Route[] = [
    { path: "", priority: 1, changeFrequency: "weekly", lastModified: CONTENT_UPDATED },
    { path: "/services", priority: .95, changeFrequency: "monthly", lastModified: CONTENT_UPDATED },
    { path: "/work", priority: .95, changeFrequency: "monthly", lastModified: CONTENT_UPDATED },
    { path: "/industries", priority: .9, changeFrequency: "monthly", lastModified: CONTENT_UPDATED },
    { path: "/learn", priority: .9, changeFrequency: "weekly", lastModified: CONTENT_UPDATED },
    { path: "/ai-events", priority: .85, changeFrequency: "daily" },
    { path: "/glossary", priority: .8, changeFrequency: "monthly", lastModified: CONTENT_UPDATED },
    { path: "/community", priority: .75, changeFrequency: "weekly", lastModified: CONTENT_UPDATED },
    { path: "/demos", priority: .75, changeFrequency: "monthly", lastModified: CONTENT_UPDATED },
    { path: "/about", priority: .75, changeFrequency: "monthly", lastModified: CONTENT_UPDATED },
    { path: "/book", priority: .85, changeFrequency: "yearly", lastModified: CONTENT_UPDATED },
  ];

  capabilities.forEach(({ slug }) => routes.push({ path: `/services/${slug}`, priority: .9, changeFrequency: "monthly", lastModified: CONTENT_UPDATED }));
  caseStudies.forEach(({ slug }) => routes.push({ path: `/work/${slug}`, priority: .85, changeFrequency: "monthly", lastModified: CONTENT_UPDATED }));
  industries.forEach(({ slug }) => routes.push({ path: `/industries/${slug}`, priority: .85, changeFrequency: "monthly", lastModified: CONTENT_UPDATED }));
  insights.forEach(({ slug }) => routes.push({ path: `/learn/${slug}`, priority: .82, changeFrequency: "monthly", lastModified: CONTENT_UPDATED }));
  eventCities.forEach(([slug]) => routes.push({ path: `/ai-events/${slug}`, priority: .78, changeFrequency: "daily" }));
  glossaryTerms.forEach(({ slug }) => routes.push({ path: `/glossary/${slug}`, priority: .68, changeFrequency: "monthly", lastModified: CONTENT_UPDATED }));
  dashboardSlugs.forEach((slug) => routes.push({ path: `/demos/${slug}`, priority: .65, changeFrequency: "monthly", lastModified: CONTENT_UPDATED }));

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
