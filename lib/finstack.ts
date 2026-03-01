import { cache } from "react";
import type { WixDataItem } from "@wix/wix-data-items-common";
import { createWixServerClient, getOptionalWixReadEnv } from "@/lib/wix-server";

export const FINSTACK_COLLECTION_ID = "FinStackUK";
const CMS_BATCH_SIZE = 100;

export type FinstackTool = {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  bestForStage: string[];
  bestForModel: string[];
  regionSupport: string[];
  pricingTier: string | null;
  complexity: number | null;
  keyIntegrations: string[];
  pros: string[];
  cons: string[];
  officialUrl: string | null;
  reviewSignals: string | null;
  lastVerifiedDate: string | null;
  notes: string | null;
};

function normalizeText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalizeNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function dedupeStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return dedupeStrings(
      value
        .map((entry) => normalizeText(entry))
        .filter((entry): entry is string => entry !== null),
    );
  }

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  const trimmed = value.trim();

  try {
    const parsed = JSON.parse(trimmed);

    if (Array.isArray(parsed)) {
      return dedupeStrings(
        parsed
          .map((entry) => normalizeText(entry))
          .filter((entry): entry is string => entry !== null),
      );
    }
  } catch {
    // Fall through to delimiter parsing.
  }

  return dedupeStrings(
    trimmed
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  );
}

function normalizeDateString(value: unknown) {
  const text = normalizeText(value);

  if (!text) {
    return null;
  }

  const parsed = new Date(text);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeFinstackTool(item: WixDataItem): FinstackTool | null {
  const title = normalizeText(item.title);
  const category = normalizeText(item.category);
  const shortDescription = normalizeText(item.shortDescription);

  if (!title || !category || !shortDescription) {
    return null;
  }

  const slug =
    normalizeText(item.slug) ??
    (item._id ? slugify(item._id) : null) ??
    slugify(title);

  if (!slug) {
    return null;
  }

  return {
    id: item._id ?? slug,
    slug,
    title,
    category,
    shortDescription,
    bestForStage: normalizeStringArray(item.bestForStage),
    bestForModel: normalizeStringArray(item.bestForModel),
    regionSupport: normalizeStringArray(item.regionSupport),
    pricingTier: normalizeText(item.pricingTier),
    complexity: normalizeNumber(item.complexity),
    keyIntegrations: normalizeStringArray(item.keyIntegrations),
    pros: normalizeStringArray(item.pros),
    cons: normalizeStringArray(item.cons),
    officialUrl: normalizeText(item.officialUrl),
    reviewSignals: normalizeText(item.reviewSignals),
    lastVerifiedDate: normalizeDateString(item.lastVerifiedDate),
    notes: normalizeText(item.notes),
  };
}

export const getAllFinstackTools = cache(async () => {
  if (!getOptionalWixReadEnv()) {
    console.warn("[finstack] Missing Wix read env. Rendering without CMS directory.");
    return [] as FinstackTool[];
  }

  const wixClient = createWixServerClient();

  if (!wixClient) {
    return [] as FinstackTool[];
  }

  const tools: FinstackTool[] = [];
  let skip = 0;

  try {
    while (true) {
      const result = await wixClient.items
        .query(FINSTACK_COLLECTION_ID)
        .limit(CMS_BATCH_SIZE)
        .skip(skip)
        .find();
      const batch = result.items ?? [];

      tools.push(
        ...batch
          .map(normalizeFinstackTool)
          .filter((tool): tool is FinstackTool => tool !== null),
      );

      if (batch.length < CMS_BATCH_SIZE) {
        break;
      }

      skip += batch.length;
    }
  } catch (error) {
    console.warn("[finstack] Failed to fetch FinStackUK CMS tools.", error);
    return [] as FinstackTool[];
  }

  return tools.sort((a, b) => a.title.localeCompare(b.title));
});

export function getFinstackCategoryOptions(tools: FinstackTool[]) {
  return dedupeStrings(tools.map((tool) => tool.category)).sort((a, b) =>
    a.localeCompare(b),
  );
}
