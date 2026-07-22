import { checkDashboardDatabase } from "@/lib/dashboard-db";
import { checkEventsDatabase } from "@/lib/events-db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [database, events] = await Promise.all([checkDashboardDatabase(), checkEventsDatabase()]);
    if (!database.connected || !database.leadsReady || !events.connected) throw new Error("Database capability check failed.");
    return Response.json(
      { status: "ok", database, events },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { status: "error", database: { connected: false }, events: { connected: false } },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
