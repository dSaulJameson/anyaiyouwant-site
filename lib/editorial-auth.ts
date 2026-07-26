import "server-only";

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { editorialQueryOne, editorialQueryRows } from "@/lib/editorial-db";

const COOKIE_NAME = "aaiyw_editorial";
const SESSION_SECONDS = 12 * 60 * 60;

function sessionSecret() {
  const value = process.env.EDITORIAL_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("EDITORIAL_SESSION_SECRET must contain at least 32 characters.");
  return value;
}

function configuredPassword() {
  const value = process.env.EDITORIAL_ADMIN_PASSWORD;
  if (!value || value.length < 14) throw new Error("EDITORIAL_ADMIN_PASSWORD must contain at least 14 characters.");
  return value;
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function equal(left: string, right: string) {
  const a = digest(left);
  const b = digest(right);
  return timingSafeEqual(a, b);
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

function createSessionValue() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = `${expires}.${randomBytes(18).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

function validSessionValue(value: string | undefined) {
  if (!value) return false;
  const [expires, nonce, signature] = value.split(".");
  if (!expires || !nonce || !signature || Number(expires) <= Math.floor(Date.now() / 1000)) return false;
  const payload = `${expires}.${nonce}`;
  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function hasEditorialSession() {
  return validSessionValue((await cookies()).get(COOKIE_NAME)?.value);
}

export async function requireEditorialPage() {
  if (!await hasEditorialSession()) redirect("/editorial/login");
}

export async function requireEditorialAction() {
  if (!await hasEditorialSession()) throw new Error("Editorial authorization is required.");
}

async function clientKey() {
  const values = await headers();
  const ip = values.get("cf-connecting-ip") || values.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHmac("sha256", sessionSecret()).update(`login:${ip}`).digest("hex");
}

async function checkBlocked(key: string) {
  const row = await editorialQueryOne<{ attempts: number; blocked_until: string | null }>(
    "select attempts, blocked_until from editorial_login_attempts where client_key = $1", [key],
  );
  return Boolean(row?.blocked_until && new Date(row.blocked_until).getTime() > Date.now());
}

async function recordFailure(key: string) {
  await editorialQueryRows(
    `insert into editorial_login_attempts (client_key, attempts, blocked_until)
     values ($1, 1, null)
     on conflict (client_key) do update set
       attempts = case when editorial_login_attempts.updated_at < now() - interval '30 minutes' then 1 else editorial_login_attempts.attempts + 1 end,
       blocked_until = case
         when (case when editorial_login_attempts.updated_at < now() - interval '30 minutes' then 1 else editorial_login_attempts.attempts + 1 end) >= 5
         then now() + interval '30 minutes' else editorial_login_attempts.blocked_until end,
       updated_at = now()`, [key],
  );
}

export async function loginEditorial(password: string) {
  const key = await clientKey();
  if (await checkBlocked(key)) return false;
  if (!equal(password, configuredPassword())) {
    await recordFailure(key);
    return false;
  }
  await editorialQueryRows("delete from editorial_login_attempts where client_key = $1", [key]);
  (await cookies()).set(COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/editorial",
    maxAge: SESSION_SECONDS,
    priority: "high",
  });
  return true;
}

export async function logoutEditorial() {
  (await cookies()).delete(COOKIE_NAME);
}
