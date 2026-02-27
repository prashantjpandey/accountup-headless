import { NextRequest, NextResponse } from "next/server";
import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { items } from "@wix/data";

/**
 * POST /api/contact — saves contact form submissions to Wix CMS via the official SDK.
 *
 * Required env (server-only, never expose to frontend):
 *   - WIX_API_KEY — API key from Wix API Key Manager (API Keys page)
 *   - WIX_SITE_ID — Wix site ID (site-level Data API)
 *   - WIX_COLLECTION_ID — CMS collection ID (e.g. Leads) from Wix Editor → CMS → collection
 *
 * Uses ApiKeyStrategy for server-side admin operations. For visitor/member identity flows
 * you would use OAuthStrategy with WIX_CLIENT_ID instead.
 */
const DEDUPE_WINDOW_MS = 5 * 60 * 1000;
const recentSubmissions = new Map<string, number>();

function getDedupeKey(email: string, ip: string): string {
  return `${email.toLowerCase().trim()}:${ip}`;
}

function isDuplicate(email: string, ip: string): boolean {
  const key = getDedupeKey(email, ip);
  const at = recentSubmissions.get(key);
  if (!at) return false;
  if (Date.now() - at > DEDUPE_WINDOW_MS) {
    recentSubmissions.delete(key);
    return false;
  }
  return true;
}

function markSubmitted(email: string, ip: string): void {
  const key = getDedupeKey(email, ip);
  recentSubmissions.set(key, Date.now());
  if (recentSubmissions.size > 1000) {
    const now = Date.now();
    for (const [k, t] of recentSubmissions.entries()) {
      if (now - t > DEDUPE_WINDOW_MS) recentSubmissions.delete(k);
    }
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = { name: 200, email: 254, company: 200, message: 2000 };

type Body = {
  name: string;
  email: string;
  company: string;
  monthlyExpensesRange: string;
  teamSizeRange: string;
  message?: string;
  pageSource: string;
};

function validate(body: unknown): { ok: true; data: Body } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : "";
  const monthlyExpensesRange = typeof b.monthlyExpensesRange === "string" ? b.monthlyExpensesRange.trim() : "";
  const teamSizeRange = typeof b.teamSizeRange === "string" ? b.teamSizeRange.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const pageSource = typeof b.pageSource === "string" ? b.pageSource.trim() || "homepage-contact" : "homepage-contact";

  if (!name) return { ok: false, error: "Name is required." };
  if (name.length > MAX_LENGTH.name) return { ok: false, error: "Name is too long." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!EMAIL_REGEX.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (email.length > MAX_LENGTH.email) return { ok: false, error: "Email is too long." };
  if (!company) return { ok: false, error: "Company is required." };
  if (company.length > MAX_LENGTH.company) return { ok: false, error: "Company name is too long." };
  if (!monthlyExpensesRange) return { ok: false, error: "Monthly expenses range is required." };
  if (!teamSizeRange) return { ok: false, error: "Team size range is required." };
  if (message.length > MAX_LENGTH.message) return { ok: false, error: "Message is too long." };

  return {
    ok: true,
    data: {
      name,
      email,
      company,
      monthlyExpensesRange,
      teamSizeRange,
      message: message || undefined,
      pageSource,
    },
  };
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function getWixClient() {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (!apiKey || !siteId) {
    throw new Error("Missing WIX_API_KEY or WIX_SITE_ID");
  }
  return createClient({
    modules: { items },
    auth: ApiKeyStrategy({
      apiKey,
      siteId,
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json();
    const validated = validate(raw);
    if (!validated.ok) {
      return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
    }
    const { data } = validated;
    const ip = getClientIp(request);

    if (isDuplicate(data.email, ip)) {
      return NextResponse.json({
        ok: true,
        duplicate: true,
        message: "We've already received your details and will be in touch.",
      });
    }

    const apiKey = process.env.WIX_API_KEY;
    const siteId = process.env.WIX_SITE_ID;
    const rawCollectionId = process.env.WIX_COLLECTION_ID;

    const missing: string[] = [];
    if (!apiKey) missing.push("WIX_API_KEY");
    if (!siteId) missing.push("WIX_SITE_ID");
    if (!rawCollectionId) missing.push("WIX_COLLECTION_ID");
    if (missing.length > 0) {
      console.error("[contact] Missing env:", missing.join(", "));
      const isDev = process.env.NODE_ENV === "development";
      return NextResponse.json(
        {
          ok: false,
          error: "Something went wrong. Please try again in a moment.",
          ...(isDev && { debug: { missingEnv: missing } }),
        },
        { status: 502 }
      );
    }

    const collectionId = rawCollectionId;
    const wixClient = getWixClient();
    const leadItem = {
      // Map to existing Wix fields:
      // fullName, emailAddress, shortMessageOptional
      fullName: data.name,
      emailAddress: data.email,
      ...(data.message && { shortMessageOptional: data.message }),
      // Keep additional metadata in their own fields
      company: data.company,
      monthlyExpensesRange: data.monthlyExpensesRange,
      teamSizeRange: data.teamSizeRange,
      pageSource: data.pageSource,
    };

    await wixClient.items.insert(collectionId, leadItem);

    markSubmitted(data.email, ip);
    return NextResponse.json({ ok: true, message: "Thanks, we will be in touch shortly." });
  } catch (e) {
    console.error("[contact] Unexpected error:", e);
    const isDev = process.env.NODE_ENV === "development";
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong. Please try again in a moment.",
        ...(isDev && { debug: { message } }),
      },
      { status: 500 }
    );
  }
}
