import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CalendarDays, Images, Users } from "lucide-react";

export const metadata: Metadata = { title: "AI, Technology & Builder Community Resources", description: "AI and technology event guides, practical technical explainers, an AI and ML glossary, and Builders & Backers community work.", alternates: { canonical: "/community" } };

const resources = [
  { icon: CalendarDays, title: "Local AI & technology events", body: "City guides powered by the Offline Networking event database, with current AI, startup, coding, and technology gatherings.", href: "/ai-events", label: "Find events" },
  { icon: BookOpen, title: "Technical explainers", body: "Plain-English guides to marketing mix models, Monte Carlo simulation, forecasting, clustering, and secure AI architecture.", href: "/learn", label: "Learn the models" },
  { icon: Users, title: "AI & ML glossary", body: "Useful definitions for operators, founders, marketers, retailers, and technical buyers who need to separate concepts from hype.", href: "/glossary", label: "Browse the glossary" },
  { icon: Images, title: "Builders & Backers", body: "Founder and investor community work across Southern California, including mixers and programs sponsored and supported by the studio.", href: "https://buildersandbackers.org", label: "Visit the network", external: true },
];

export default function CommunityPage() {
  return <div className="pt-16"><section className="max-w-7xl mx-auto px-6 md:px-10"><div className="label-mono">Community</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">Useful resources for people who <span className="text-gradient">build in the real world.</span></h1><p className="mt-5 text-muted text-lg max-w-3xl">The best technical community work gives people a reason to return even when they are not buying anything. These resources connect education, local events, and the builders we support.</p><div className="mt-12 grid md:grid-cols-2 gap-5">{resources.map((resource) => { const content = <><resource.icon size={22} className="text-accent" /><h2 className="mt-5 text-2xl font-semibold">{resource.title}</h2><p className="mt-3 text-muted leading-relaxed">{resource.body}</p><span className="mt-6 inline-block text-sm font-mono text-accent">{resource.label} {resource.external ? "↗" : "→"}</span></>; return resource.external ? <a key={resource.title} href={resource.href} target="_blank" rel="noreferrer" className="card p-7">{content}</a> : <Link key={resource.title} href={resource.href} className="card p-7">{content}</Link>; })}</div></section></div>;
}

