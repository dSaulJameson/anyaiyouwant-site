import type { MetadataRoute } from "next";

const SITE_URL = "https://anyaiyouwant.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "",          priority: 1.0, changeFrequency: "weekly" },
    { path: "/work",     priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about",    priority: 0.7, changeFrequency: "monthly" },
    { path: "/book",     priority: 0.6, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
