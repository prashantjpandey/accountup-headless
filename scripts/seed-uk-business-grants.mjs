import fs from "node:fs";
import path from "node:path";
import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { collections, items } from "@wix/data";

const DEFAULT_COLLECTION_ID = "UKBusinessGrantsIncentives";
const DEFAULT_SOURCE = "grants directories.txt";
const BATCH_SIZE = 50;

const FIELD_DEFINITIONS = [
  { key: "slug", displayName: "Slug", type: "TEXT" },
  { key: "title", displayName: "Title", type: "TEXT" },
  { key: "sortOrder", displayName: "Sort Order", type: "NUMBER" },
  {
    key: "officialAdministeringAuthority",
    displayName: "Official Administering Authority",
    type: "TEXT",
  },
  { key: "country", displayName: "Country", type: "TEXT" },
  { key: "regionState", displayName: "Region or State", type: "TEXT" },
  { key: "industryEligibility", displayName: "Industry Eligibility", type: "ARRAY_STRING" },
  {
    key: "businessSizeEligibility",
    displayName: "Business Size Eligibility",
    type: "ARRAY_STRING",
  },
  {
    key: "businessSizeEligibilityLabel",
    displayName: "Business Size Eligibility Label",
    type: "TEXT",
  },
  { key: "benefitType", displayName: "Benefit Type", type: "TEXT" },
  { key: "benefitAmount", displayName: "Benefit Amount", type: "TEXT" },
  { key: "eligibleExpenses", displayName: "Eligible Expenses", type: "ARRAY_STRING" },
  {
    key: "eligibilityRequirements",
    displayName: "Eligibility Requirements",
    type: "TEXT",
  },
  { key: "deadlineType", displayName: "Deadline Type", type: "TEXT" },
  { key: "nextDeadline", displayName: "Next Deadline", type: "DATE" },
  { key: "nextDeadlineDisplay", displayName: "Next Deadline Display", type: "TEXT" },
  { key: "applicationLink", displayName: "Application Link", type: "URL" },
  { key: "requiredDocuments", displayName: "Required Documents", type: "ARRAY_STRING" },
  { key: "decisionTimeline", displayName: "Decision Timeline", type: "TEXT" },
  { key: "renewalRules", displayName: "Renewal Rules", type: "TEXT" },
  { key: "matchFundingRequired", displayName: "Match Funding Required", type: "TEXT" },
  { key: "paymentType", displayName: "Payment Type", type: "TEXT" },
  { key: "complexityScore", displayName: "Complexity Score", type: "TEXT" },
  { key: "estimatedTimeToApply", displayName: "Estimated Time to Apply", type: "TEXT" },
  {
    key: "commonRejectionReasons",
    displayName: "Common Rejection Reasons",
    type: "TEXT",
  },
  {
    key: "competitivenessIndicator",
    displayName: "Competitiveness Indicator",
    type: "TEXT",
  },
];

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
];

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const contents = fs.readFileSync(envPath, "utf8");

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
}

function parseArgs(argv) {
  const parsed = {
    source: DEFAULT_SOURCE,
    collectionId: DEFAULT_COLLECTION_ID,
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }

    if (arg === "--source") {
      parsed.source = argv[index + 1] ?? parsed.source;
      index += 1;
      continue;
    }

    if (arg === "--collection") {
      parsed.collectionId = argv[index + 1] ?? parsed.collectionId;
      index += 1;
    }
  }

  return parsed;
}

function fixMojibake(value) {
  return MOJIBAKE_REPLACEMENTS.reduce(
    (current, [target, replacement]) => current.replaceAll(target, replacement),
    value,
  );
}

function slugify(value) {
  return fixMojibake(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeText(value) {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = fixMojibake(value).trim();
  return cleaned ? cleaned : null;
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((entry) => normalizeText(entry)).filter((entry) => entry !== null);
}

function normalizeDateString(value) {
  const text = normalizeText(value);

  if (!text || text.toUpperCase() === "N/A") {
    return null;
  }

  const parsed = new Date(text);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid nextDeadline: ${text}`);
  }

  return parsed.toISOString().slice(0, 10);
}

function splitBusinessSizes(value) {
  const text = normalizeText(value);

  if (!text) {
    return [];
  }

  return text
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function extractArraySource(sourceText) {
  const declarationIndex = sourceText.indexOf("const rawData =");

  if (declarationIndex === -1) {
    throw new Error('Missing "rawData" declaration in source file.');
  }

  const arrayStart = sourceText.indexOf("[", declarationIndex);

  if (arrayStart === -1) {
    throw new Error('Missing opening "[" for rawData.');
  }

  let depth = 0;
  let stringQuote = null;
  let isEscaped = false;

  for (let index = arrayStart; index < sourceText.length; index += 1) {
    const character = sourceText[index];

    if (stringQuote) {
      if (isEscaped) {
        isEscaped = false;
        continue;
      }

      if (character === "\\") {
        isEscaped = true;
        continue;
      }

      if (character === stringQuote) {
        stringQuote = null;
      }

      continue;
    }

    if (character === '"' || character === "'") {
      stringQuote = character;
      continue;
    }

    if (character === "[") {
      depth += 1;
      continue;
    }

    if (character === "]") {
      depth -= 1;

      if (depth === 0) {
        return sourceText.slice(arrayStart, index + 1);
      }
    }
  }

  throw new Error('Missing closing "]" for rawData.');
}

function parseGrantsSource(sourcePath) {
  const absolutePath = path.resolve(process.cwd(), sourcePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Source file not found: ${absolutePath}`);
  }

  const sourceText = fs.readFileSync(absolutePath, "utf8");
  const arraySource = extractArraySource(sourceText);
  const grants = Function(`return ${arraySource};`)();

  if (!Array.isArray(grants)) {
    throw new Error("Parsed rawData is not an array.");
  }

  const seenSlugs = new Set();

  return grants.map((grant, index) => {
    const title = normalizeText(grant["Program Name"]);
    const officialAdministeringAuthority = normalizeText(grant["Official Administering Authority"]);
    const country = normalizeText(grant.Country);
    const regionState = normalizeText(grant["Region/State"]);
    const businessSizeEligibilityLabel = normalizeText(grant["Business Size Eligibility"]);
    const benefitType = normalizeText(grant["Benefit Type"]);
    const benefitAmount = normalizeText(grant["Benefit Amount"]);
    const eligibilityRequirements = normalizeText(grant["Eligibility Requirements"]);
    const deadlineType = normalizeText(grant["Deadline Type"]);
    const decisionTimeline = normalizeText(grant["Decision Timeline"]);
    const renewalRules = normalizeText(grant["Renewal Rules"]);
    const matchFundingRequired = normalizeText(grant["Match Funding Required"]);
    const paymentType = normalizeText(grant["Payment Type"]);
    const complexityScore = normalizeText(grant["Complexity Score"]);
    const estimatedTimeToApply = normalizeText(grant["Estimated Time to Apply"]);

    if (
      !title ||
      !officialAdministeringAuthority ||
      !country ||
      !regionState ||
      !businessSizeEligibilityLabel ||
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
      throw new Error(`Invalid grant at index ${index}: required field is missing.`);
    }

    const slug = slugify(title);

    if (!slug) {
      throw new Error(`Invalid grant title for slug generation: ${title}`);
    }

    if (seenSlugs.has(slug)) {
      throw new Error(`Duplicate slug generated: ${slug}`);
    }

    seenSlugs.add(slug);

    return {
      _id: slug,
      slug,
      title,
      sortOrder: index,
      officialAdministeringAuthority,
      country,
      regionState,
      industryEligibility: normalizeStringArray(grant["Industry Eligibility"]),
      businessSizeEligibility: splitBusinessSizes(grant["Business Size Eligibility"]),
      businessSizeEligibilityLabel,
      benefitType,
      benefitAmount,
      eligibleExpenses: normalizeStringArray(grant["Eligible Expenses"]),
      eligibilityRequirements,
      deadlineType,
      nextDeadline: normalizeDateString(grant["Next Deadline"]),
      nextDeadlineDisplay: normalizeText(grant["Next Deadline"]) ?? "N/A",
      applicationLink: normalizeText(grant["Application Link"]),
      requiredDocuments: normalizeStringArray(grant["Required Documents"]),
      decisionTimeline,
      renewalRules,
      matchFundingRequired,
      paymentType,
      complexityScore,
      estimatedTimeToApply,
      commonRejectionReasons: normalizeText(grant["Common Rejection Reasons"]),
      competitivenessIndicator: normalizeText(grant["Competitiveness Indicator"]),
    };
  });
}

function chunk(itemsToChunk, size) {
  const chunks = [];

  for (let index = 0; index < itemsToChunk.length; index += size) {
    chunks.push(itemsToChunk.slice(index, index + size));
  }

  return chunks;
}

function buildCollectionDefinition(collectionId) {
  return {
    _id: collectionId,
    displayName: collectionId,
    displayField: "title",
    permissions: {
      insert: "ADMIN",
      update: "ADMIN",
      remove: "ADMIN",
      read: "ANYONE",
    },
    fields: [
      {
        key: "title",
        displayName: "Title",
        type: "TEXT",
      },
    ],
  };
}

async function getCollectionIfExists(client, collectionId) {
  try {
    return await client.collections.getDataCollection(collectionId);
  } catch (error) {
    const message = String(error?.message ?? "");

    if (message.toLowerCase().includes("not found") || message.toLowerCase().includes("404")) {
      return null;
    }

    throw error;
  }
}

async function ensureCollection(client, collectionId, dryRun) {
  const existing = await getCollectionIfExists(client, collectionId);

  if (existing) {
    return { collection: existing, created: false };
  }

  if (dryRun) {
    return {
      collection: buildCollectionDefinition(collectionId),
      created: true,
    };
  }

  const created = await client.collections.createDataCollection(buildCollectionDefinition(collectionId));
  return { collection: created, created: true };
}

async function ensureFields(client, collectionId, existingCollection, dryRun) {
  const existingKeys = new Set(
    (existingCollection.fields ?? []).map((field) => field.key).filter(Boolean),
  );
  const missingFields = FIELD_DEFINITIONS.filter((field) => !existingKeys.has(field.key));

  if (!dryRun) {
    for (const field of missingFields) {
      await client.collections.createDataCollectionField(collectionId, { field });
    }
  }

  return missingFields;
}

async function loadExistingItems(client, collectionId) {
  const existingItems = [];
  let skip = 0;

  while (true) {
    const result = await client.items.query(collectionId).limit(100).skip(skip).find();
    const batch = result.items ?? [];
    existingItems.push(...batch);

    if (batch.length < 100) {
      break;
    }

    skip += batch.length;
  }

  return existingItems;
}

function prepareUpserts(seedItems, existingItems) {
  const byId = new Map(existingItems.map((item) => [item._id, item]));
  const bySlug = new Map(
    existingItems
      .filter((item) => typeof item.slug === "string" && item.slug.trim())
      .map((item) => [item.slug.trim(), item]),
  );
  const byTitle = new Map(
    existingItems
      .filter((item) => typeof item.title === "string" && item.title.trim())
      .map((item) => [item.title.trim().toLowerCase(), item]),
  );

  let inserts = 0;
  let updates = 0;

  const upserts = seedItems.map((seedItem) => {
    const existing =
      byId.get(seedItem._id) ??
      bySlug.get(seedItem.slug) ??
      byTitle.get(seedItem.title.toLowerCase()) ??
      null;

    if (existing) {
      updates += 1;
      return {
        ...existing,
        ...seedItem,
        _id: existing._id ?? seedItem._id,
        slug: seedItem.slug,
      };
    }

    inserts += 1;
    return seedItem;
  });

  return { upserts, inserts, updates };
}

async function main() {
  loadLocalEnv();

  const { source, collectionId, dryRun } = parseArgs(process.argv.slice(2));
  const seedItems = parseGrantsSource(source);

  const client = createClient({
    modules: { items, collections },
    auth: ApiKeyStrategy({
      apiKey: getRequiredEnv("WIX_API_KEY"),
      siteId: getRequiredEnv("WIX_SITE_ID"),
    }),
  });

  const collectionState = await ensureCollection(client, collectionId, dryRun);
  const fieldChanges = await ensureFields(client, collectionId, collectionState.collection, dryRun);
  const existingItems = await loadExistingItems(client, collectionId);
  const { upserts, inserts, updates } = prepareUpserts(seedItems, existingItems);

  console.log(`collection\t${collectionId}`);
  console.log(`collectionCreated\t${collectionState.created ? "yes" : "no"}`);
  console.log(`fieldsMissing\t${fieldChanges.length}`);

  for (const field of fieldChanges) {
    console.log(`field\t${field.key}\t${field.type}`);
  }

  console.log(`parsedGrants\t${seedItems.length}`);
  console.log(`inserts\t${inserts}`);
  console.log(`updates\t${updates}`);

  if (dryRun) {
    console.log("mode\tdry-run");
    return;
  }

  for (const batch of chunk(upserts, BATCH_SIZE)) {
    await client.items.bulkSave(collectionId, batch);
  }

  console.log("mode\twrite");
  console.log(`saved\t${upserts.length}`);
}

main().catch((error) => {
  console.error("[seed-uk-business-grants] Failed to sync UKBusinessGrantsIncentives.");
  console.error(error);
  process.exitCode = 1;
});
