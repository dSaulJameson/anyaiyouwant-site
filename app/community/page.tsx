import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CalendarDays, Images, Users } from "lucide-react";

export const metadata: Metadata = { title: "Technology Events, Engineering Insights & Community Resources", description: "Live AI and technology event guides, practical engineering insights, a software and AI glossary, and Builders & Backers community work.", alternates: { canonical: "/community" } };

const resources = [
  { icon: CalendarDays, title: "Local AI & technology events", body: "City guides powered by the Offline Networking event database, with current AI, startup, coding, and technology gatherings.", href: "/ai-events", label: "Find events" },
  { icon: BookOpen, title: "Engineering insights", body: "Practical guides to product delivery, software rescue, custom software cost, secure AI, ML, technical SEO, and GEO.", href: "/learn", label: "Read the insights" },
  { icon: Users, title: "Technical glossary", body: "Useful definitions and examples for software, data, machine learning, secure AI, search, and answer-engine concepts.", href: "/glossary", label: "Browse the glossary" },
  { icon: Images, title: "Builders & Backers", body: "Founder and investor community work across Southern California, including mixers and programs sponsored and supported by Any AI You Want.", href: "https://buildersandbackers.org", label: "Visit the network", external: true },
];

export default function CommunityPage() {
  return <div className="pt-16"><section className="max-w-7xl mx-auto px-6 md:px-10"><div className="label-mono">Community</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">Useful resources for people who <span className="text-gradient">build in the real world.</span></h1><p className="mt-5 text-muted text-lg max-w-3xl">Live local data, direct technical answers, and practical community work create reasons to return before a project ever reaches a buying conversation.</p><div className="mt-12 grid md:grid-cols-2 gap-5">{resources.map((resource) => { const content = <><resource.icon size={22} className="text-accent" /><h2 className="mt-5 text-2xl font-semibold">{resource.title}</h2><p className="mt-3 text-muted leading-relaxed">{resource.body}</p><span className="mt-6 inline-block text-sm font-mono text-accent">{resource.label} {resource.external ? "↗" : "→"}</span></>; return resource.external ? <a key={resource.title} href={resource.href} target="_blank" rel="noreferrer" className="card p-7">{content}</a> : <Link key={resource.title} href={resource.href} className="card p-7">{content}</Link>; })}</div></section></div>;
}
