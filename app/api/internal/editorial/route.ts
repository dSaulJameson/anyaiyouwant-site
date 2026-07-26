import { createHash, timingSafeEqual } from "node:crypto";
import { runEditorialResearchCycle } from "@/lib/editorial-generation";

export const dynamic = "force-dynamic";
export const maxDuration = 180;

function equal(left: string, right: string) {
  const a = createHash("sha256").update(left).digest();
  const b = createHash("sha256").update(right).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const configured = process.env.EDITORIAL_CRON_SECRET || "";
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!configured || !supplied || !equal(configured, supplied)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const result = await runEditorialResearchCycle();
    return Response.json({ status: "ok", ...result }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Editorial research cycle failed", error);
    return Response.json({ status: "error", error: error instanceof Error ? error.message : "Editorial cycle failed." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
