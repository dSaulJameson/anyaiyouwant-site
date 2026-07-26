import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import { editorialTypeLabel, type EditorialContentType } from "@/lib/editorial-types";

function signingSecret() {
  const secret = process.env.SOCIAL_ASSET_SIGNING_SECRET || process.env.EDITORIAL_SESSION_SECRET;
  if (!secret) throw new Error("A social asset signing secret is not configured.");
  return secret;
}

export function signEditorialAsset(postId: string, expires: string) {
  return createHmac("sha256", signingSecret()).update(`editorial-asset:${postId}:${expires}`).digest("base64url");
}

export function verifyEditorialAssetToken(postId: string, expires: string, token: string) {
  if (!token || !expires || Number(expires) < Math.floor(Date.now() / 1000)) return false;
  const expected = Buffer.from(signEditorialAsset(postId, expires));
  const received = Buffer.from(token);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export function getEditorialAssetUrl(postId: string) {
  const baseUrl = (process.env.PUBLIC_SITE_URL || "https://www.anyaiyouwant.com").replace(/\/$/, "");
  const expires = String(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60);
  return `${baseUrl}/api/editorial-assets/${postId}?expires=${expires}&token=${signEditorialAsset(postId, expires)}`;
}

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[character] || character);
}

function wrapHeadline(value: string, max = 27) {
  const words = value.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (`${current} ${word}`.trim().length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 6);
}

export async function generateEditorialSocialCard(type: EditorialContentType, headline: string) {
  const lines = wrapHeadline(headline);
  const startY = Math.max(360, 565 - lines.length * 43);
  const headlineSvg = lines.map((line, index) => `<text x="84" y="${startY + index * 86}" fill="#f7fbff" font-size="68" font-weight="750" font-family="Arial, Helvetica, sans-serif">${escapeXml(line)}</text>`).join("");
  const label = editorialTypeLabel(type).toUpperCase();
  const svg = Buffer.from(`<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="1200" fill="rgba(1,8,24,.48)"/>
    <rect x="64" y="64" width="1072" height="1072" rx="28" fill="rgba(2,8,22,.62)" stroke="#17d7ee" stroke-width="2"/>
    <circle cx="92" cy="118" r="8" fill="#17d7ee"/>
    <text x="118" y="127" fill="#78eaf7" font-size="23" font-weight="700" letter-spacing="5" font-family="Arial, Helvetica, sans-serif">ANY AI YOU WANT</text>
    <text x="84" y="250" fill="#17d7ee" font-size="25" font-weight="700" letter-spacing="4" font-family="Arial, Helvetica, sans-serif">${escapeXml(label)}</text>
    ${headlineSvg}
    <line x1="84" y1="1014" x2="1116" y2="1014" stroke="#17d7ee" stroke-width="2" opacity=".65"/>
    <text x="84" y="1072" fill="#b9c8dc" font-size="28" font-family="Arial, Helvetica, sans-serif">WHAT FAILED  /  WHAT TO BUILD INSTEAD</text>
    <text x="84" y="1122" fill="#17d7ee" font-size="25" font-weight="700" font-family="Arial, Helvetica, sans-serif">anyaiyouwant.com</text>
  </svg>`);
  const background = path.join(process.cwd(), "public", "media", "browser-icon.png");
  return sharp(background)
    .resize(1200, 1200, { fit: "cover", position: "center" })
    .modulate({ brightness: 0.52, saturation: 0.82 })
    .composite([{ input: svg }])
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
    .toBuffer();
}
