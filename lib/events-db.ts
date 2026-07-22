import { Pool } from "pg";

export type CommunityEvent = {
  id: string;
  title: string;
  description: string | null;
  organizer: string | null;
  venue: string | null;
  city: string | null;
  state: string | null;
  startsAt: string;
  timezone: string | null;
  price: string | null;
  url: string;
  topics: string[];
};

let eventsPool: Pool | null = null;

function getEventsPool() {
  if (eventsPool) return eventsPool;
  const connectionString = process.env.EVENTS_DATABASE_URL;
  if (!connectionString) return null;
  const hostname = new URL(connectionString).hostname;
  const privateHosts = new Set(["localhost", "127.0.0.1", "postgres", "hosthatch-postgres"]);
  eventsPool = new Pool({
    connectionString,
    max: 3,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    ssl: privateHosts.has(hostname) ? false : { rejectUnauthorized: false },
  });
  return eventsPool;
}

const cityGroups: Record<string, string[]> = {
  "orange-county": ["Irvine", "Fullerton", "Newport Beach", "Costa Mesa", "Anaheim", "Santa Ana", "Orange", "Tustin", "Garden Grove", "Buena Park"],
};

export async function getUpcomingTechEvents(citySlug: string, cityName: string, limit = 24): Promise<CommunityEvent[]> {
  const pool = getEventsPool();
  if (!pool) return [];
  const cities = cityGroups[citySlug] ?? [cityName];
  const result = await pool.query<{
    id: string;
    title: string;
    description: string | null;
    organizer: string | null;
    venue: string | null;
    city: string | null;
    state: string | null;
    starts_at: string;
    timezone: string | null;
    price: string | null;
    url: string;
    topics: string[] | null;
  }>(
    `select e.id::text,
            e.title,
            e.description,
            e.organizer_name as organizer,
            e.venue_name as venue,
            e.city,
            e.state,
            e.starts_at_utc::text as starts_at,
            e.timezone,
            e.price_text as price,
            e.source_url as url,
            coalesce(e.topics, array[]::text[]) as topics
       from anyaiyouwant_public_events e
      where e.starts_at_utc >= now()
        and e.starts_at_utc < now() + interval '180 days'
        and e.city = any($1::text[])
        and e.topics && array['ai','tech','coding','cybersecurity','startups','innovation','founders']::text[]
      order by e.starts_at_utc
      limit $2`,
    [cities, limit],
  );
  return result.rows.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    organizer: event.organizer,
    venue: event.venue,
    city: event.city,
    state: event.state,
    startsAt: event.starts_at,
    timezone: event.timezone,
    price: event.price,
    url: event.url,
    topics: event.topics ?? [],
  }));
}

export async function checkEventsDatabase() {
  const pool = getEventsPool();
  if (!pool) return { connected: false, reason: "not-configured" } as const;
  const result = await pool.query<{ count: string }>("select count(*)::text as count from anyaiyouwant_public_events");
  return { connected: true, rows: Number(result.rows[0]?.count ?? 0) } as const;
}
