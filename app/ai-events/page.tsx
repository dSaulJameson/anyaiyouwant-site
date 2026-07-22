import type { Metadata } from "next";
import Link from "next/link";
import { eventCities } from "@/lib/site-content";

export const metadata: Metadata = { title: "AI & Technology Events by City", description: "Find current AI, startup, coding, cybersecurity, and technology events in Los Angeles, Fullerton, Orange County, San Diego, and other cities.", alternates: { canonical: "/ai-events" } };

export default function AIEventsPage() {
  return <div className="pt-16"><section className="max-w-7xl mx-auto px-6 md:px-10"><div className="label-mono">Community event guides</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">AI and technology events, <span className="text-gradient">organized by city.</span></h1><p className="mt-5 text-muted text-lg max-w-3xl">Current local event data from <a href="https://offlinenetworking.com" target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4">Offline Networking</a>, paired with practical guides to AI services, automation, analytics, and software development in each market.</p><div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{eventCities.map(([slug,name,state]) => <Link key={slug} href={`/ai-events/${slug}`} className="card p-6 group"><div className="label-mono">{state} / AI + Tech</div><h2 className="mt-3 text-2xl font-semibold group-hover:text-accent">{name}</h2><p className="mt-2 text-sm text-muted">Upcoming events, local technical context, and U.S.-based engineering services.</p><span className="mt-5 inline-block text-xs font-mono text-accent">View {name} guide →</span></Link>)}</div></section></div>;
}

