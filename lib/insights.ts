import { cache } from "react";
import type { WixDataItem } from "@wix/wix-data-items-common";
import {
  allResources,
  getCalculatorResourceBySlug,
  getResourceSectionById,
  type ResourceItem,
} from "@/lib/resources";
import {
  getCalculatorById,
  getCalculatorReferenceById,
  getCalculatorRefInfoFromContent,
  getCalculatorReferenceInfoFromContent,
  type CalculatorRefInfo,
} from "@/lib/calculator-content";
import { createWixServerClient, getOptionalWixReadEnv } from "@/lib/wix-server";
import { resolveWixImageUrl } from "@/lib/wix-media";

const INSIGHTS_COLLECTION_ID = "Insights";
const CMS_BATCH_SIZE = 50;
export const INSIGHTS_PAGE_SIZE = 12;

export type InsightSort = "newest" | "oldest" | "reading-time";

export type InsightQueryParams = {
  page: number;
  sort: InsightSort;
  contentType?: string;
  categories: string[];
  expertReviewed: boolean;
};

export type Insight = {
  id: string;
  title: string;
  routeSlug: string;
  rawSlug: string;
  excerpt: string;
  coverImageUrl: string | null;
  publishDate: string | null;
  authorName: string | null;
  categories: string[];
  contentType: string | null;
  expertReviewed: boolean;
  featured: boolean;
  readingTime: number | null;
  content: unknown;
  seoTitle: string | null;
  seoDescription: string | null;
  relatedCalculatorRefs: string[];
  relatedCalculatorRef: string | null;
  relatedCalculatorLabel: string | null;
  relatedDiagnosticLabel: string | null;
  relatedToolLabel: string | null;
  insightFaqs: InsightFaqItem[];
};

export type InsightFaqItem = {
  question: string;
  answer: unknown;
};

export type RelatedResourceLink = {
  label: string;
  href: string;
  kind: "calculator" | "diagnostic" | "tool";
};

export type InsightFilterOption = {
  value: string;
  label: string;
};

export type InsightsIndexData = {
  featuredInsights: Insight[];
  insights: Insight[];
  totalInsights: number;
  currentPage: number;
  totalPages: number;
  hasActiveFilters: boolean;
  categoryOptions: InsightFilterOption[];
  contentTypeOptions: InsightFilterOption[];
};

function normalizeText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalizeDateString(value: unknown) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
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

function normalizeBoolean(value: unknown) {
  return value === true;
}

function dedupeStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function decodeUriComponentSafe(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function slugify(value: string) {
  return decodeUriComponentSafe(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCategoryValue(value: unknown): string[] {
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
    // Fall through to string parsing.
  }

  return dedupeStrings(
    trimmed
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  );
}

function normalizeInsightFaqItems(value: unknown): InsightFaqItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<InsightFaqItem[]>((items, item) => {
      if (!item || typeof item !== "object") {
        return items;
      }

      const entry = item as Record<string, unknown>;
      const question = normalizeText(
        entry.question ?? entry.title ?? entry.label ?? entry["Question"],
      );
      const answer = entry.answer ?? entry.content ?? entry["Answer"];

      if (!question || !answer) {
        return items;
      }

      items.push({
        question,
        answer,
      });

      return items;
    }, []);
}

export function normalizeRouteSlug(rawSlug: string) {
  const trimmed = rawSlug.trim();

  if (!trimmed) {
    return "";
  }

  let candidate = trimmed.replace(/^[a-z]+:\/\//i, "");
  candidate = candidate.split(/[?#]/)[0] ?? candidate;
  candidate = candidate.replace(/^\/+|\/+$/g, "");

  const pathSegments = candidate.split("/").filter(Boolean);
  const lastSegment = pathSegments.at(-1) ?? candidate;
  const normalized = slugify(lastSegment);

  if (normalized) {
    return normalized;
  }

  return slugify(trimmed);
}

function ensureUniqueRouteSlugs(insights: Insight[]) {
  const counts = new Map<string, number>();

  return insights.map((insight, index) => {
    const baseSlug = insight.routeSlug || `insight-${index + 1}`;
    const currentCount = counts.get(baseSlug) ?? 0;
    const nextCount = currentCount + 1;
    counts.set(baseSlug, nextCount);

    return {
      ...insight,
      routeSlug: nextCount === 1 ? baseSlug : `${baseSlug}-${nextCount}`,
    };
  });
}

function getCollectionQuery() {
  const wixClient = createWixServerClient();
  return wixClient?.items.query(INSIGHTS_COLLECTION_ID) ?? null;
}

function normalizeRefIds(value: unknown): string[] {
  if (Array.isArray(value)) {
    return dedupeStrings(value.flatMap((entry) => normalizeRefIds(entry)));
  }

  if (value && typeof value === "object" && "_id" in value && typeof (value as { _id: unknown })._id === "string") {
    const id = (value as { _id: string })._id.trim();
    return id ? [id] : [];
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function normalizeRefId(value: unknown): string | null {
  return normalizeRefIds(value)[0] ?? null;
}

function normalizeReferenceLabel(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return /\s/.test(trimmed) ? trimmed : null;
  }

  if (typeof value === "object") {
    const reference = value as Record<string, unknown>;

    for (const key of ["title", "name", "label"]) {
      if (typeof reference[key] === "string" && reference[key].trim()) {
        return reference[key].trim();
      }
    }
  }

  return null;
}

function getIncludedCalculatorCta(value: unknown): CalculatorRefInfo | null {
  if (Array.isArray(value)) {
    for (const entry of value) {
      const calculator = getIncludedCalculatorCta(entry);

      if (calculator) {
        return calculator;
      }
    }

    return null;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const calculator = value as { slug?: unknown; title?: unknown };

  return getCalculatorRefInfoFromContent({
    slug: normalizeText(calculator.slug) ?? "",
    title: normalizeText(calculator.title) ?? "",
  });
}

function getIncludedCalculatorResources(value: unknown): ResourceItem[] {
  if (!value) {
    return [];
  }

  const entries = Array.isArray(value) ? value : [value];

  return entries.reduce<ResourceItem[]>((resources, entry) => {
    if (!entry || typeof entry !== "object") {
      return resources;
    }

    const reference = getCalculatorReferenceInfoFromContent({
      slug: normalizeText((entry as { slug?: unknown }).slug) ?? "",
      title: normalizeText((entry as { title?: unknown }).title) ?? "",
    });

    if (!reference) {
      return resources;
    }

    const resource = getCalculatorResourceBySlug(reference.slug);
    resources.push(resource ?? buildFallbackCalculatorResource(reference));

    return resources;
  }, []);
}

function buildFallbackCalculatorResource(reference: {
  slug: string;
  title: string;
  href: string;
}): ResourceItem {
  return {
    slug: reference.slug,
    title: reference.title,
    description: "Open the calculator connected to this insight.",
    href: reference.href,
    category: "tool",
    linkLabel: "Open Calculator",
  };
}

function normalizeInsightItem(item: WixDataItem): Insight {
  const rawSlug = normalizeText(item.slug) ?? normalizeText(item.title) ?? item._id ?? "";
  const relatedCalcRefs = normalizeRefIds(item.relatedCalculator);
  const relatedCalcRef = relatedCalcRefs[0] ?? null;

  return {
    id: item._id ?? rawSlug,
    title: normalizeText(item.title) ?? "Untitled Insight",
    routeSlug: normalizeRouteSlug(rawSlug),
    rawSlug,
    excerpt: normalizeText(item.excerpt) ?? "",
    coverImageUrl: resolveWixImageUrl(item.coverImage),
    publishDate: normalizeDateString(item.publishDate),
    authorName: normalizeText(item.author),
    categories: parseCategoryValue(item.category),
    contentType: normalizeText(item.contentType),
    expertReviewed: normalizeBoolean(item.expertReviewed),
    featured: normalizeBoolean(item.featured),
    readingTime: normalizeNumber(item.readingTime),
    content: item.content ?? "",
    seoTitle: normalizeText(item.seoTitle),
    seoDescription: normalizeText(item.seoDescription),
    relatedCalculatorRefs: relatedCalcRefs,
    relatedCalculatorRef: relatedCalcRef,
    relatedCalculatorLabel:
      normalizeText(item.relatedCalculatorLabel) ??
      normalizeReferenceLabel(item.relatedCalculator),
    relatedDiagnosticLabel: normalizeText(item.relatedDiagnostic),
    relatedToolLabel: normalizeText(item.relatedTool),
    insightFaqs: normalizeInsightFaqItems(
      item.insightFaQs ?? item.insightFaqs ?? item.insight_faqs,
    ),
  };
}

function compareByDateDesc(a: Insight, b: Insight) {
  const aTime = a.publishDate ? Date.parse(a.publishDate) : 0;
  const bTime = b.publishDate ? Date.parse(b.publishDate) : 0;

  return bTime - aTime;
}

function sortInsights(insights: Insight[], sort: InsightSort) {
  const sorted = [...insights];

  switch (sort) {
    case "oldest":
      sorted.sort((a, b) => compareByDateDesc(b, a));
      return sorted;
    case "reading-time":
      sorted.sort((a, b) => {
        const aValue = a.readingTime ?? Number.POSITIVE_INFINITY;
        const bValue = b.readingTime ?? Number.POSITIVE_INFINITY;

        if (aValue !== bValue) {
          return aValue - bValue;
        }

        return compareByDateDesc(a, b);
      });
      return sorted;
    case "newest":
    default:
      sorted.sort(compareByDateDesc);
      return sorted;
  }
}

export function getInsightHref(routeSlug: string) {
  return `/insights/${routeSlug}`;
}

export function parseInsightSearchParams(
  searchParams:
    | Record<string, string | string[] | undefined>
    | URLSearchParams
    | undefined,
): InsightQueryParams {
  const getValues = (key: string) => {
    if (!searchParams) {
      return [];
    }

    if (searchParams instanceof URLSearchParams) {
      return searchParams.getAll(key);
    }

    const value = searchParams[key];

    if (Array.isArray(value)) {
      return value.filter(Boolean);
    }

    return typeof value === "string" && value ? [value] : [];
  };

  const rawPage = getValues("page")[0];
  const rawSort = getValues("sort")[0];
  const rawContentType = getValues("contentType")[0];
  const rawExpertReviewed = getValues("expertReviewed")[0];

  const page = Number(rawPage);
  const sort: InsightSort =
    rawSort === "oldest" || rawSort === "reading-time" || rawSort === "newest"
      ? rawSort
      : "newest";

  return {
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
    sort,
    contentType: normalizeText(rawContentType) ?? undefined,
    categories: dedupeStrings(getValues("category").map((value) => value.trim()).filter(Boolean)),
    expertReviewed:
      rawExpertReviewed === "1" ||
      rawExpertReviewed === "true" ||
      rawExpertReviewed === "yes",
  };
}

export function hasActiveInsightFilters(params: InsightQueryParams) {
  return Boolean(
    params.categories.length > 0 || params.contentType || params.expertReviewed,
  );
}

async function getDistinctContentTypesFromCms() {
  const query = getCollectionQuery();

  if (!query) {
    return [];
  }

  try {
    const result = await query.distinct("contentType");

    return dedupeStrings(
      result.items
        .map((entry) => normalizeText(entry))
        .filter((entry): entry is string => entry !== null),
    );
  } catch {
    return [];
  }
}

export const getAllInsights = cache(async () => {
  if (!getOptionalWixReadEnv()) {
    console.warn("[insights] Missing Wix read env. Rendering without CMS insights.");
    return [] as Insight[];
  }

  const query = getCollectionQuery();

  if (!query) {
    return [] as Insight[];
  }

  const items: Insight[] = [];
  let skip = 0;

  try {
    while (true) {
      const result = await getCollectionQuery()?.limit(CMS_BATCH_SIZE).skip(skip).find();
      const batch = result?.items ?? [];

      items.push(...batch.map(normalizeInsightItem));

      if (batch.length < CMS_BATCH_SIZE) {
        break;
      }

      skip += batch.length;
    }

    return ensureUniqueRouteSlugs(items);
  } catch (error) {
    console.warn("[insights] Failed to fetch CMS insights.", error);
    return [] as Insight[];
  }
});

export const getInsightByRouteSlug = cache(async (routeSlug: string) => {
  const normalizedRouteSlug = normalizeRouteSlug(routeSlug);

  if (!normalizedRouteSlug) {
    return null;
  }

  const insights = await getAllInsights();
  return insights.find((insight) => insight.routeSlug === normalizedRouteSlug) ?? null;
});

export async function getInsightsIndexData(
  params: InsightQueryParams,
): Promise<InsightsIndexData> {
  const allInsights = await getAllInsights();
  const hasActiveFilters = hasActiveInsightFilters(params);

  const filteredInsights = sortInsights(
    allInsights.filter((insight) => {
      if (
        params.categories.length > 0 &&
        !params.categories.some((category) => insight.categories.includes(category))
      ) {
        return false;
      }

      if (params.contentType && insight.contentType !== params.contentType) {
        return false;
      }

      if (params.expertReviewed && !insight.expertReviewed) {
        return false;
      }

      return true;
    }),
    params.sort,
  );

  const totalInsights = filteredInsights.length;
  const totalPages = Math.max(1, Math.ceil(totalInsights / INSIGHTS_PAGE_SIZE));
  const currentPage = Math.min(Math.max(params.page, 1), totalPages);
  const pageStart = (currentPage - 1) * INSIGHTS_PAGE_SIZE;

  const distinctContentTypes = await getDistinctContentTypesFromCms();
  const fallbackContentTypes = dedupeStrings(
    allInsights
      .map((insight) => insight.contentType)
      .filter((contentType): contentType is string => Boolean(contentType)),
  );

  return {
    featuredInsights: sortInsights(
      allInsights.filter((insight) => insight.featured),
      "newest",
    ).slice(0, 2),
    insights: filteredInsights.slice(pageStart, pageStart + INSIGHTS_PAGE_SIZE),
    totalInsights,
    currentPage,
    totalPages,
    hasActiveFilters,
    categoryOptions: dedupeStrings(allInsights.flatMap((insight) => insight.categories))
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ value, label: value })),
    contentTypeOptions: dedupeStrings([...distinctContentTypes, ...fallbackContentTypes])
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ value, label: value })),
  };
}

export async function getLatestInsights(limit = 3) {
  const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 3;

  if (safeLimit === 0) {
    return [] as Insight[];
  }

  const insights = await getAllInsights();
  return sortInsights(insights, "newest").slice(0, safeLimit);
}

export async function getResourcesInsightsPreview(limit = 6) {
  const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 6;

  if (safeLimit === 0) {
    return [] as Insight[];
  }

  const latestInsights = sortInsights(await getAllInsights(), "newest");

  if (latestInsights.length === 0) {
    return [] as Insight[];
  }

  const featuredInsight =
    latestInsights.find((insight) => insight.featured) ?? latestInsights[0] ?? null;

  if (!featuredInsight) {
    return [] as Insight[];
  }

  return [
    featuredInsight,
    ...latestInsights.filter((insight) => insight.id !== featuredInsight.id),
  ].slice(0, safeLimit);
}

function normalizeLookupValue(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findMatchingResource(resources: ResourceItem[], label: string) {
  const exactMatch = resources.find((resource) => resource.title === label);

  if (exactMatch) {
    return exactMatch;
  }

  const normalizedLabel = normalizeLookupValue(label);

  return resources.find(
    (resource) => normalizeLookupValue(resource.title) === normalizedLabel,
  );
}

export function resolveRelatedResourceLinks(insight: Insight): RelatedResourceLink[] {
  const calculatorResources =
    allResources.filter((resource) => resource.href.startsWith("/resources/calculators/")) ?? [];
  const diagnosticResources = getResourceSectionById("diagnostics")?.items ?? [];
  const toolResources = getResourceSectionById("utilities")?.items ?? [];

  const links: RelatedResourceLink[] = [];

  if (insight.relatedCalculatorLabel) {
    const match = findMatchingResource(calculatorResources, insight.relatedCalculatorLabel);

    if (match) {
      links.push({
        label: insight.relatedCalculatorLabel,
        href: match.href,
        kind: "calculator",
      });
    }
  }

  if (insight.relatedDiagnosticLabel) {
    const match = findMatchingResource(diagnosticResources, insight.relatedDiagnosticLabel);

    if (match) {
      links.push({
        label: insight.relatedDiagnosticLabel,
        href: match.href,
        kind: "diagnostic",
      });
    }
  }

  if (insight.relatedToolLabel) {
    const match = findMatchingResource(toolResources, insight.relatedToolLabel);

    if (match) {
      links.push({
        label: insight.relatedToolLabel,
        href: match.href,
        kind: "tool",
      });
    }
  }

  return links;
}

export const getInsightRelatedCalculatorCta = cache(
  async (insight: Insight): Promise<CalculatorRefInfo | null> => {
    for (const calculatorRef of insight.relatedCalculatorRefs) {
      const calculatorById = await getCalculatorById(calculatorRef);

      if (calculatorById) {
        return calculatorById;
      }
    }

    const query = getCollectionQuery();

    if (query) {
      try {
        const result = await query
          .eq("_id", insight.id)
          .include("relatedCalculator")
          .limit(1)
          .find();
        const cmsInsight = result.items[0];
        const cmsRelatedCalculator = cmsInsight?.relatedCalculator;

        if (cmsRelatedCalculator) {
          const includedId = normalizeRefId(cmsRelatedCalculator);

          if (includedId) {
            const calculatorByIncludedId = await getCalculatorById(includedId);

            if (calculatorByIncludedId) {
              return calculatorByIncludedId;
            }
          }

          const resolvedFromIncludedValue =
            getIncludedCalculatorCta(cmsRelatedCalculator);

          if (resolvedFromIncludedValue) {
            return resolvedFromIncludedValue;
          }
        }
      } catch (error) {
        console.warn(
          `[insights] Failed to resolve related calculator reference for insight "${insight.id}".`,
          error,
        );
      }
    }

    return null;
  },
);

export const getInsightRelatedCalculators = cache(
  async (insight: Insight): Promise<ResourceItem[]> => {
    const relatedCalculators: ResourceItem[] = [];
    const seenHrefs = new Set<string>();

    const pushResource = (resource: ResourceItem | null) => {
      if (!resource || seenHrefs.has(resource.href)) {
        return;
      }

      seenHrefs.add(resource.href);
      relatedCalculators.push(resource);
    };

    for (const calculatorRef of insight.relatedCalculatorRefs) {
      const reference = await getCalculatorReferenceById(calculatorRef);

      if (!reference) {
        continue;
      }

      pushResource(
        getCalculatorResourceBySlug(reference.slug) ??
          buildFallbackCalculatorResource(reference),
      );
    }

    if (relatedCalculators.length > 0) {
      return relatedCalculators;
    }

    const query = getCollectionQuery();

    if (!query) {
      return [];
    }

    try {
      const result = await query
        .eq("_id", insight.id)
        .include("relatedCalculator")
        .limit(1)
        .find();
      const cmsRelatedCalculator = result.items[0]?.relatedCalculator;

      for (const resource of getIncludedCalculatorResources(cmsRelatedCalculator)) {
        pushResource(resource);
      }

      if (relatedCalculators.length > 0) {
        return relatedCalculators;
      }

      for (const calculatorRef of normalizeRefIds(cmsRelatedCalculator)) {
        const reference = await getCalculatorReferenceById(calculatorRef);

        if (!reference) {
          continue;
        }

        pushResource(
          getCalculatorResourceBySlug(reference.slug) ??
            buildFallbackCalculatorResource(reference),
        );
      }
    } catch (error) {
      console.warn(
        `[insights] Failed to resolve related calculators for insight "${insight.id}".`,
        error,
      );
    }

    return relatedCalculators;
  },
);

export async function getRelatedInsights(currentInsight: Insight) {
  const insights = await getAllInsights();

  return sortInsights(
    insights.filter((insight) => {
      if (insight.id === currentInsight.id) {
        return false;
      }

      const sharesCategory = insight.categories.some((category) =>
        currentInsight.categories.includes(category),
      );
      const sharesContentType =
        Boolean(insight.contentType) && insight.contentType === currentInsight.contentType;

      return sharesCategory || sharesContentType;
    }),
    "newest",
  ).slice(0, 3);
}
