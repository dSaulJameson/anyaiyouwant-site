import { checkDashboardDatabase } from "@/lib/dashboard-db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const database = await checkDashboardDatabase();
    return Response.json(
      { status: "ok", database },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { status: "error", database: { connected: false } },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
