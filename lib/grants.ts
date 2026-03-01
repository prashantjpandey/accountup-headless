import { cache } from "react";
import type { WixDataItem } from "@wix/wix-data-items-common";
import { createWixServerClient, getOptionalWixReadEnv } from "@/lib/wix-server";

export const UK_BUSINESS_GRANTS_COLLECTION_ID = "UKBusinessGrantsIncentives";
const CMS_BATCH_SIZE = 100;

const MOJIBAKE_REPLACEMENTS = [
  ["\u00C2\u00A3", "\u00A3"],
  ["\u00E2\u0080\u009C", '"'],
  ["\u00E2\u0080\u009D", '"'],
  ["\u00E2\u0080\u0098", "'"],
  ["\u00E2\u0080\u0099", "'"],
  ["\u00E2\u0080\u0093", "-"],
  ["\u00E2\u0080\u0094", "-"],
  ["\u00E2\u0080\u00A6", "..."],
  ["\u00C2", ""],
] as const;

export type GrantComplexityScore = "Low" | "Medium" | "High";

export type GrantDirectoryItem = {
  id: string;
  slug: string;
  sortOrder: number;
  title: string;
  officialAdministeringAuthority: string;
  country: string;
  regionState: string;
  industryEligibility: string[];
  businessSizeEligibility: string[];
  businessSizeEligibilityLabel: string;
  benefitType: string;
  benefitAmount: string;
  eligibleExpenses: string[];
  eligibilityRequirements: string;
  deadlineType: string;
  nextDeadline: string | null;
  nextDeadlineDisplay: string;
  applicationLink: string | null;
  requiredDocuments: string[];
  decisionTimeline: string;
  renewalRules: string;
  matchFundingRequired: string;
  paymentType: string;
  complexityScore: GrantComplexityScore | null;
  estimatedTimeToApply: string;
  commonRejectionReasons: string | null;
  competitivenessIndicator: string | null;
};

export type GrantDistributionItem = {
  label: string;
  count: number;
};

export type GrantDashboardSummary = {
  totalPrograms: number;
  competitivePrograms: number;
  upcomingDeadlines: number;
  byRegion: GrantDistributionItem[];
  byBusinessSize: GrantDistributionItem[];
};

function fixMojibake(value: string) {
  return MOJIBAKE_REPLACEMENTS.reduce(
    (current, [target, replacement]) => current.replaceAll(target, replacement),
    value,
  );
}

function normalizeText(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = fixMojibake(value).trim();
  return cleaned ? cleaned : null;
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

  return dedupeStrings(
    fixMojibake(value)
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  );
}

function normalizeDateString(value: unknown) {
  const text = normalizeText(value);

  if (!text || text.toUpperCase() === "N/A") {
    return null;
  }

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
}

function slugify(value: string) {
  return fixMojibake(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeComplexityScore(value: unknown): GrantComplexityScore | null {
  const text = normalizeText(value);

  if (text === "Low" || text === "Medium" || text === "High") {
    return text;
  }

  return null;
}

function normalizeGrantItem(item: WixDataItem): GrantDirectoryItem | null {
  const title = normalizeText(item.title);
  const officialAdministeringAuthority = normalizeText(item.officialAdministeringAuthority);
  const country = normalizeText(item.country);
  const regionState = normalizeText(item.regionState);
  const benefitType = normalizeText(item.benefitType);
  const benefitAmount = normalizeText(item.benefitAmount);
  const eligibilityRequirements = normalizeText(item.eligibilityRequirements);
  const deadlineType = normalizeText(item.deadlineType);
  const decisionTimeline = normalizeText(item.decisionTimeline);
  const renewalRules = normalizeText(item.renewalRules);
  const matchFundingRequired = normalizeText(item.matchFundingRequired);
  const paymentType = normalizeText(item.paymentType);
  const estimatedTimeToApply = normalizeText(item.estimatedTimeToApply);

  if (
    !title ||
    !officialAdministeringAuthority ||
    !country ||
    !regionState ||
    !benefitType ||
    !benefitAmount ||
    !eligibilityRequirements ||
    !deadlineType ||
    !decisionTimeline ||
    !renewalRules ||
    !matchFundingRequired ||
    !paymentType ||
    !estimatedTimeToApply
  ) {
    return null;
  }

  const businessSizeEligibility = normalizeStringArray(item.businessSizeEligibility);
  const businessSizeEligibilityLabel =
    normalizeText(item.businessSizeEligibilityLabel) ?? businessSizeEligibility.join(", ");
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
    sortOrder: normalizeNumber(item.sortOrder) ?? Number.MAX_SAFE_INTEGER,
    title,
    officialAdministeringAuthority,
    country,
    regionState,
    industryEligibility: normalizeStringArray(item.industryEligibility),
    businessSizeEligibility,
    businessSizeEligibilityLabel,
    benefitType,
    benefitAmount,
    eligibleExpenses: normalizeStringArray(item.eligibleExpenses),
    eligibilityRequirements,
    deadlineType,
    nextDeadline: normalizeDateString(item.nextDeadline),
    nextDeadlineDisplay:
      normalizeText(item.nextDeadlineDisplay) ?? normalizeDateString(item.nextDeadline) ?? "N/A",
    applicationLink: normalizeText(item.applicationLink),
    requiredDocuments: normalizeStringArray(item.requiredDocuments),
    decisionTimeline,
    renewalRules,
    matchFundingRequired,
    paymentType,
    complexityScore: normalizeComplexityScore(item.complexityScore),
    estimatedTimeToApply,
    commonRejectionReasons: normalizeText(item.commonRejectionReasons),
    competitivenessIndicator: normalizeText(item.competitivenessIndicator),
  };
}

function buildDistribution(values: string[]) {
  const counts = new Map<string, number>();

  for (const value of values) {
    if (!value) {
      continue;
    }

    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return Array.from(counts, ([label, count]) => ({ label, count }));
}

function isCompetitiveGrant(grant: GrantDirectoryItem) {
  return grant.competitivenessIndicator?.toLowerCase().includes("competitive") ?? false;
}

function hasUpcomingFixedDeadline(grant: GrantDirectoryItem) {
  return grant.deadlineType.toLowerCase() === "fixed" && grant.nextDeadline !== null;
}

export const getAllGrantDirectoryItems = cache(async () => {
  if (!getOptionalWixReadEnv()) {
    console.warn("[grants] Missing Wix read env. Rendering without CMS grants directory.");
    return [] as GrantDirectoryItem[];
  }

  const wixClient = createWixServerClient();

  if (!wixClient) {
    return [] as GrantDirectoryItem[];
  }

  const grants: GrantDirectoryItem[] = [];
  let skip = 0;

  try {
    while (true) {
      const result = await wixClient.items
        .query(UK_BUSINESS_GRANTS_COLLECTION_ID)
        .limit(CMS_BATCH_SIZE)
        .skip(skip)
        .find();
      const batch = result.items ?? [];

      grants.push(
        ...batch
          .map(normalizeGrantItem)
          .filter((grant): grant is GrantDirectoryItem => grant !== null),
      );

      if (batch.length < CMS_BATCH_SIZE) {
        break;
      }

      skip += batch.length;
    }
  } catch (error) {
    console.warn("[grants] Failed to fetch CMS grants directory.", error);
    return [] as GrantDirectoryItem[];
  }

  return grants.sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
});

export function getGrantRegionOptions(grants: GrantDirectoryItem[]) {
  return dedupeStrings(grants.map((grant) => grant.regionState)).sort((a, b) => a.localeCompare(b));
}

export function getGrantBusinessSizeOptions(grants: GrantDirectoryItem[]) {
  return dedupeStrings(grants.flatMap((grant) => grant.businessSizeEligibility)).sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getGrantBenefitTypeOptions(grants: GrantDirectoryItem[]) {
  return dedupeStrings(
    grants.map((grant) => grant.benefitType.split("/")[0]?.trim() ?? grant.benefitType),
  ).sort((a, b) => a.localeCompare(b));
}

export function getGrantDashboardSummary(grants: GrantDirectoryItem[]): GrantDashboardSummary {
  return {
    totalPrograms: grants.length,
    competitivePrograms: grants.filter(isCompetitiveGrant).length,
    upcomingDeadlines: grants.filter(hasUpcomingFixedDeadline).length,
    byRegion: buildDistribution(grants.map((grant) => grant.regionState)),
    byBusinessSize: buildDistribution(grants.flatMap((grant) => grant.businessSizeEligibility)),
  };
}
