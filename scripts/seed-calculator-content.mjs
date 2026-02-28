import fs from "node:fs";
import path from "node:path";
import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { items } from "@wix/data";

const COLLECTION_ID = "CalculatorContent";
const CALCULATOR_SEEDS = [
  {
    slug: "runway-burn",
    title: "Runway & Burn Rate Calculator",
  },
  {
    slug: "cac-payback",
    title: "CAC Payback Calculator",
  },
  {
    slug: "break-even-hiring",
    title: "Break-even Hiring Calculator",
  },
  {
    slug: "startup-valuation",
    title: "Startup Valuation Calculator",
  },
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

async function main() {
  loadLocalEnv();

  const client = createClient({
    modules: { items },
    auth: ApiKeyStrategy({
      apiKey: getRequiredEnv("WIX_API_KEY"),
      siteId: getRequiredEnv("WIX_SITE_ID"),
    }),
  });

  for (const seed of CALCULATOR_SEEDS) {
    const result = await client.items
      .query(COLLECTION_ID)
      .eq("slug", seed.slug)
      .limit(1)
      .find();

    const existingItem = result.items[0];

    if (existingItem) {
      console.log(`exists\t${seed.slug}\t${existingItem.title ?? seed.title}`);
      continue;
    }

    await client.items.insert(COLLECTION_ID, {
      slug: seed.slug,
      title: seed.title,
    });

    console.log(`created\t${seed.slug}\t${seed.title}`);
  }
}

main().catch((error) => {
  console.error("[seed-calculator-content] Failed to seed calculator CMS items.");
  console.error(error);
  process.exitCode = 1;
});
