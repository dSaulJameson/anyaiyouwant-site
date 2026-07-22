import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { getUpcomingTechEvents } from "@/lib/events-db";
import { eventCities, getEventCity } from "@/lib/site-content";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() { return eventCities.map(([city]) => ({ city })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const item = getEventCity(city);
  if (!item) return {};
  return { title: `${item.name} AI & Technology Events and Engineering Services`, description: `Find upcoming AI and technology events in ${item.name}, plus practical information about local AI services, automation, analytics, and software development.`, alternates: { canonical: `/ai-events/${city}` } };
}

function eventDate(value: string, timezone: string | null) {
  try { return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: timezone || "America/Los_Angeles", timeZoneName: "short" }).format(new Date(value)); }
  catch { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)); }
}

export default async function CityEventsPage({ params }: Props) {
  const city = getEventCity((await params).city);
  if (!city) notFound();
  const events = await getUpcomingTechEvents(city.slug, city.name);
  return <div className="pt-16"><section className="max-w-7xl mx-auto px-6 md:px-10"><div className="label-mono">{city.name}, {city.state} / AI + technology</div><h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl">AI and technology events in <span className="text-gradient">{city.name}.</span></h1><p className="mt-5 text-muted text-lg max-w-3xl">A community resource for finding AI, startup, software, cybersecurity, coding, and innovation gatherings—plus a direct path to senior U.S.-based engineers when an idea needs to become a working system.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://offlinenetworking.com" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-md border border-border hover:bg-surface">Search all networking events ↗</a><Link href={`/book?city=${city.slug}`} className="px-5 py-3 rounded-md bg-accent text-black font-medium">Discuss a {city.name} project →</Link></div></section>
  <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16"><div className="flex items-end justify-between gap-4"><div><div className="label-mono">Live event feed</div><h2 className="mt-2 text-3xl font-semibold">Upcoming AI and tech events</h2></div><span className="text-xs font-mono text-muted">Updated from Offline Networking</span></div>{events.length ? <div className="mt-8 grid md:grid-cols-2 gap-4">{events.map((event) => <a key={event.id} href={event.url} target="_blank" rel="noreferrer" className="card p-6 group"><div className="flex gap-2 text-xs font-mono text-accent"><CalendarDays size={14} /><span>{eventDate(event.startsAt,event.timezone)}</span></div><h3 className="mt-3 text-lg font-semibold group-hover:text-accent leading-snug">{event.title}</h3><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">{event.city && <span className="flex items-center gap-1"><MapPin size={13} />{event.venue ? `${event.venue}, ` : ""}{event.city}</span>}{event.price && <span className="flex items-center gap-1"><Clock size={13} />{event.price}</span>}</div><div className="mt-4 flex flex-wrap gap-1.5">{event.topics.slice(0,5).map((topic) => <span key={topic} className="px-2 py-0.5 rounded-full bg-surface-2 text-[10px] font-mono text-muted">{topic.replaceAll("_"," ")}</span>)}</div></a>)}</div> : <div className="mt-8 card p-8"><h3 className="text-xl font-semibold">No matching upcoming events are in the feed right now.</h3><p className="mt-2 text-muted">The guide remains active and will populate as new {city.name} listings are classified. Search the broader Offline Networking directory in the meantime.</p></div>}</section>
  <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20 grid lg:grid-cols-12 gap-10"><div className="lg:col-span-7"><div className="label-mono">AI services in {city.name}</div><h2 className="mt-2 text-3xl md:text-4xl font-semibold">From local conversation to production software.</h2><p className="mt-4 text-muted leading-relaxed">Any AI You Want works with organizations in {city.name} and across the United States on software development, analytics, forecasting, recommendation, automation, and secure AI. All engineering work is performed by U.S.-based engineers, and the person doing discovery can also participate directly in implementation.</p><p className="mt-4 text-muted leading-relaxed">Projects can begin with a one-day assessment or prototype and expand only when the evidence supports it. That keeps the work price-effective without relying on a large sales or administrative organization.</p></div><aside className="lg:col-span-5 card p-6"><div className="label-mono">Common starting points</div><ul className="mt-5 space-y-3 text-sm">{["A secure AI prototype using private business data", "A dashboard that connects marketing to revenue", "A forecasting or optimization proof of concept", "An internal tool replacing spreadsheets and manual handoffs", "A production application, API, or integration"].map((item) => <li key={item} className="flex gap-2"><span className="text-accent">›</span>{item}</li>)}</ul><Link href={`/book?city=${city.slug}`} className="mt-6 inline-flex text-sm font-mono text-accent">Send a local project brief →</Link></aside></section></div>;
}
