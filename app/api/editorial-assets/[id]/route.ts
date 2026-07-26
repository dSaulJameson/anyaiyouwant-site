import { hasEditorialSession } from "@/lib/editorial-auth";
import { verifyEditorialAssetToken } from "@/lib/editorial-assets";
import { getEditorialSocialPostById } from "@/lib/editorial-db";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = new URL(request.url);
  const authorized = await hasEditorialSession() || verifyEditorialAssetToken(id, url.searchParams.get("expires") || "", url.searchParams.get("token") || "");
  if (!authorized) return new Response("Not found", { status: 404 });
  const post = await getEditorialSocialPostById(id, true);
  if (!post?.image_data) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(post.image_data), {
    headers: {
      "Content-Type": post.image_mime || "image/jpeg",
      "Cache-Control": "private, max-age=300",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
