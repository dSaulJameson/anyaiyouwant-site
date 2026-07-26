import { checkDashboardDatabase } from "@/lib/dashboard-db";
import { checkEventsDatabase } from "@/lib/events-db";
import { checkEditorialDatabase } from "@/lib/editorial-db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [database, events, editorial] = await Promise.all([checkDashboardDatabase(), checkEventsDatabase(), checkEditorialDatabase()]);
    if (!database.connected || !database.leadsReady || !events.connected || !editorial.ready) throw new Error("Database capability check failed.");
    return Response.json(
      { status: "ok", database, events, editorial },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { status: "error", database: { connected: false }, events: { connected: false }, editorial: { connected: false, ready: false } },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
