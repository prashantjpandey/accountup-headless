import type { FinstackTool } from "@/lib/finstack";

export type StackBuilderStage = "Pre-seed" | "Seed" | "Series A+" | "SME";
export type StackBuilderTeamSize = "1-5" | "6-15" | "16-50" | "50+";
export type StackBuilderRegion = "UK" | "EU" | "US" | "Global";
export type StackBuilderLedger = "" | "None" | "Xero" | "QuickBooks" | "FreeAgent" | "Sage";
export type StackBuilderNeed =
  | "Payroll"
  | "VAT & compliance"
  | "Expenses"
  | "Reporting"
  | "Cash flow"
  | "AR/AP"
  | "Subscription billing"
  | "Inventory";

export type StackBuilderInput = {
  stage: StackBuilderStage | "";
  teamSize: StackBuilderTeamSize | "";
  region: StackBuilderRegion | "";
  currentLedger: StackBuilderLedger;
  need: StackBuilderNeed | "";
};

export type CompleteStackBuilderInput = {
  stage: StackBuilderStage;
  teamSize: StackBuilderTeamSize;
  region: StackBuilderRegion;
  currentLedger: StackBuilderLedger;
  need: StackBuilderNeed;
};

export type StackCategoryKey =
  | "Accounting ledger"
  | "Banking + spend control"
  | "Expenses + receipts capture"
  | "Payroll (UK payroll) and Contractor payroll (global)"
  | "VAT/tax compliance (UK focused)"
  | "AP/AR automation"
  | "Subscription billing + revenue recognition (SaaS)"
  | "Inventory + COGS (D2C)"
  | "Reporting + dashboards + board packs"
  | "Cash flow forecasting";

type ReasonKind = "region" | "complexity" | "pricing" | "integration" | "trust";

export type ScoringReason = {
  kind: ReasonKind;
  points: number;
  text: string;
};

export type AlternativeRecommendation = {
  tool: FinstackTool;
  rationale: string;
  finalScore: number;
};

export type CategoryRecommendation = {
  category: StackCategoryKey;
  state: "recommended" | "current-ledger" | "no-strong-match";
  displayTitle: string;
  tool: FinstackTool | null;
  whyThis: string[];
  watchOut: string | null;
  alternatives: AlternativeRecommendation[];
  note: string | null;
  finalScore: number | null;
  metadata: {
    pricingTier: string | null;
    complexity: number | null;
    reviewSignals: string | null;
  };
};

export type StackBuilderResult = {
  recommendations: CategoryRecommendation[];
  setupOrder: string[];
  checklist: string[];
};

type RankedTool = {
  tool: FinstackTool;
  rawScore: number;
  finalScore: number;
  reasons: ScoringReason[];
  bestPro: string | null;
  strongestCon: string | null;
  completeness: number;
};

const CATEGORY_ORDER: StackCategoryKey[] = [
  "Accounting ledger",
  "Banking + spend control",
  "Expenses + receipts capture",
  "Payroll (UK payroll) and Contractor payroll (global)",
  "VAT/tax compliance (UK focused)",
  "AP/AR automation",
  "Subscription billing + revenue recognition (SaaS)",
  "Inventory + COGS (D2C)",
  "Reporting + dashboards + board packs",
  "Cash flow forecasting",
];

const EXISTING_LEDGER_LABEL_BY_KEY: Record<Exclude<StackBuilderLedger, "" | "None">, string> = {
  Xero: "Xero",
  QuickBooks: "QuickBooks",
  FreeAgent: "FreeAgent",
  Sage: "Sage",
};

const LEDGER_TOKEN_BY_KEY: Record<Exclude<StackBuilderLedger, "" | "None">, string> = {
  Xero: "xero",
  QuickBooks: "quickbooks",
  FreeAgent: "freeagent",
  Sage: "sage",
};

const PAYROLL_ADJACENT_TOKENS = [
  "xero",
  "quickbooks",
  "freeagent",
  "sage",
  "netsuite",
  "workday",
  "gusto",
  "personio",
  "hibob",
  "bamboohr",
];

const UK_WEIGHTED_KEYWORDS = [
  "uk",
  "hmrc",
  "mtd",
  "making tax digital",
  "uk-focused",
  "uk payroll",
  "uk standard",
  "uk small business",
  "uk-only",
];

const RAW_SCORE_MAX = 85;

const CHECKLIST_BY_NEED: Record<StackBuilderNeed, string[]> = {
  Payroll: [
    "Confirm who is employees vs contractors and next pay-run timing.",
    "Gather payroll IDs, pension setup, and year-to-date figures.",
    "Connect payroll output back into the ledger before the next close.",
  ],
  "VAT & compliance": [
    "Confirm VAT registration status and filing cadence.",
    "Identify where VAT-relevant transactions currently live.",
    "Verify the recommended compliance tool matches HMRC / regional needs.",
  ],
  Expenses: [
    "Choose the expense capture source of truth for cards and receipts.",
    "Invite approvers and set simple spending policies.",
    "Connect the expense flow back into the ledger.",
  ],
  Reporting: [
    "Lock the chart of accounts and core management KPIs.",
    "Decide the monthly reporting pack owner and cadence.",
    "Connect the reporting layer only after ledger/bank data is clean.",
  ],
  "Cash flow": [
    "List the 10 largest upcoming cash in/out items.",
    "Confirm debtor/creditor timing assumptions.",
    "Build the first 13-week forecast from clean ledger data.",
  ],
  "AR/AP": [
    "Identify invoice approval and collection bottlenecks.",
    "Decide which bills and invoices should be automated first.",
    "Connect payment status data into the ledger and reporting layer.",
  ],
  "Subscription billing": [
    "Map plans, billing cycles, and revenue-recognition requirements.",
    "Confirm checkout, invoicing, and tax ownership.",
    "Reconcile subscription events back into the ledger monthly.",
  ],
  Inventory: [
    "Confirm SKU structure, stock locations, and reorder process.",
    "Decide where COGS and stock adjustments will be managed.",
    "Connect inventory movement back into the ledger before reporting.",
  ],
};

function normalizeText(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function hasUkWeightedLanguage(tool: FinstackTool) {
  const haystacks = [tool.notes ?? "", ...tool.pros].map((value) => normalizeText(value));
  return UK_WEIGHTED_KEYWORDS.some((keyword) => haystacks.some((value) => value.includes(keyword)));
}

function teamSizeHeadcount(teamSize: StackBuilderTeamSize) {
  switch (teamSize) {
    case "1-5":
      return 5;
    case "6-15":
      return 15;
    case "16-50":
      return 50;
    case "50+":
      return 51;
  }
}

function getIncludedCategories(input: CompleteStackBuilderInput): StackCategoryKey[] {
  const included = new Set<StackCategoryKey>([
    "Banking + spend control",
    "Expenses + receipts capture",
  ]);

  if (input.currentLedger === "" || input.currentLedger === "None") {
    included.add("Accounting ledger");
  } else {
    included.add("Accounting ledger");
  }

  if (input.need === "Payroll" || teamSizeHeadcount(input.teamSize) > 5) {
    included.add("Payroll (UK payroll) and Contractor payroll (global)");
  }

  if (input.region === "UK" || input.region === "EU" || input.need === "VAT & compliance") {
    included.add("VAT/tax compliance (UK focused)");
  }

  if (input.need === "AR/AP" || teamSizeHeadcount(input.teamSize) >= 16) {
    included.add("AP/AR automation");
  }

  if (input.need === "Subscription billing") {
    included.add("Subscription billing + revenue recognition (SaaS)");
  }

  if (input.need === "Inventory") {
    included.add("Inventory + COGS (D2C)");
  }

  if (input.need === "Reporting" || input.stage !== "Pre-seed") {
    included.add("Reporting + dashboards + board packs");
  }

  if (input.need === "Cash flow" || input.stage !== "Pre-seed") {
    included.add("Cash flow forecasting");
  }

  return CATEGORY_ORDER.filter((category) => included.has(category));
}

function getRegionReason(tool: FinstackTool, region: StackBuilderRegion): ScoringReason {
  if (tool.regionSupport.includes(region)) {
    return {
      kind: "region",
      points: 25,
      text:
        region === "UK"
          ? "Strong UK coverage and better fit for your selected region."
          : `Direct ${region} coverage makes this a cleaner regional fit.`,
    };
  }

  if (tool.regionSupport.includes("Global")) {
    return {
      kind: "region",
      points: 10,
      text: "Global coverage keeps the stack flexible if your footprint expands.",
    };
  }

  return { kind: "region", points: 0, text: "" };
}

function getComplexityReason(tool: FinstackTool, stage: StackBuilderStage): ScoringReason {
  const complexity = tool.complexity;
  if (complexity === null) {
    return { kind: "complexity", points: 0, text: "" };
  }

  if (stage === "Pre-seed") {
    if (complexity <= 2) {
      return {
        kind: "complexity",
        points: 20,
        text: "Complexity suits a Pre-seed team without overbuilding the stack.",
      };
    }
    if (complexity === 3) {
      return {
        kind: "complexity",
        points: 10,
        text: "Manageable complexity for an early-stage team that needs a bit more depth.",
      };
    }
    return { kind: "complexity", points: -15, text: "" };
  }

  if (stage === "Seed") {
    if (complexity >= 2 && complexity <= 3) {
      return {
        kind: "complexity",
        points: 20,
        text: "Complexity suits a Seed-stage team without unnecessary overhead.",
      };
    }
    if (complexity === 1) {
      return {
        kind: "complexity",
        points: 10,
        text: "Simple enough to move fast while the finance stack is still maturing.",
      };
    }
    if (complexity === 4) {
      return {
        kind: "complexity",
        points: 5,
        text: "Slightly heavier than ideal, but still workable at Seed.",
      };
    }
    return { kind: "complexity", points: -10, text: "" };
  }

  if (complexity >= 2 && complexity <= 4) {
    return {
      kind: "complexity",
      points: 20,
      text: "Feature depth is a better fit for a more established finance setup.",
    };
  }

  if (complexity === 5) {
    return {
      kind: "complexity",
      points: 10,
      text: "Complexity is justified for a later-stage team with broader requirements.",
    };
  }

  return {
    kind: "complexity",
    points: 5,
    text: "Lower complexity can still work if you want a lighter operating model.",
  };
}

function getPricingBand(pricingTier: string | null) {
  const normalized = normalizeText(pricingTier);
  if (!normalized || normalized === "unknown") {
    return "unknown";
  }
  if (normalized.includes("enterprise") || normalized.includes("custom")) {
    return "enterprise";
  }
  if (normalized.includes("high")) {
    return "high";
  }
  if (normalized.includes("mid") || normalized.includes("medium")) {
    return "mid";
  }
  if (normalized.includes("low")) {
    return "low";
  }
  return "unknown";
}

function getPricingReason(tool: FinstackTool, stage: StackBuilderStage): ScoringReason {
  const band = getPricingBand(tool.pricingTier);

  if (stage === "Pre-seed") {
    if (band === "low" || band === "mid") {
      return {
        kind: "pricing",
        points: 10,
        text: "Pricing is more realistic for a lean early-stage budget.",
      };
    }
    if (band === "high") {
      return { kind: "pricing", points: -6, text: "" };
    }
    if (band === "enterprise") {
      return { kind: "pricing", points: -10, text: "" };
    }
  }

  if (stage === "Seed") {
    if (band === "low" || band === "mid") {
      return {
        kind: "pricing",
        points: 6,
        text: "Pricing stays sensible while the stack is still being built out.",
      };
    }
    if (band === "enterprise") {
      return { kind: "pricing", points: -6, text: "" };
    }
  }

  if (stage === "Series A+" || stage === "SME") {
    if (band === "high" || band === "enterprise") {
      return {
        kind: "pricing",
        points: 8,
        text: "Pricing is more acceptable at your current stage if the workflow is stronger.",
      };
    }
    if (band === "mid") {
      return {
        kind: "pricing",
        points: 4,
        text: "Mid-tier pricing balances capability and rollout risk.",
      };
    }
  }

  return { kind: "pricing", points: 0, text: "" };
}

function getIntegrationReason(tool: FinstackTool, input: CompleteStackBuilderInput): ScoringReason {
  const integrationValues = tool.keyIntegrations.map((value) => normalizeText(value));
  let points = 0;
  let text = "";

  if (input.currentLedger && input.currentLedger !== "None") {
    const ledgerToken = LEDGER_TOKEN_BY_KEY[input.currentLedger];
    if (integrationValues.some((value) => value.includes(ledgerToken))) {
      points += 15;
      text = `Connects cleanly to your current ${EXISTING_LEDGER_LABEL_BY_KEY[input.currentLedger]} setup.`;
    }
  }

  if (
    input.need === "Payroll" &&
    PAYROLL_ADJACENT_TOKENS.some((token) => integrationValues.some((value) => value.includes(token)))
  ) {
    points += 5;
    if (!text) {
      text = "Useful payroll-adjacent integrations reduce handoffs across HR and finance tools.";
    }
  }

  return { kind: "integration", points, text };
}

function getTrustReason(tool: FinstackTool, region: StackBuilderRegion): ScoringReason {
  let points = 0;
  let text = "";

  if (tool.reviewSignals && normalizeText(tool.reviewSignals) !== "unknown") {
    points += 5;
    text = "Useful review signals make the recommendation easier to trust.";
  }

  if (region === "UK" && hasUkWeightedLanguage(tool)) {
    points += 5;
    text = "Clear UK-specific positioning makes this easier to operationalize locally.";
  }

  return { kind: "trust", points, text };
}

function passesHardFilters(tool: FinstackTool, category: StackCategoryKey, input: CompleteStackBuilderInput) {
  if (input.region === "UK" && !tool.regionSupport.includes("UK")) {
    return false;
  }

  if (
    category === "Accounting ledger" &&
    input.currentLedger &&
    input.currentLedger !== "None"
  ) {
    return false;
  }

  return true;
}

function rankTool(tool: FinstackTool, input: CompleteStackBuilderInput): RankedTool {
  const reasons = [
    getRegionReason(tool, input.region),
    getComplexityReason(tool, input.stage),
    getPricingReason(tool, input.stage),
    getIntegrationReason(tool, input),
    getTrustReason(tool, input.region),
  ];
  const rawScore = reasons.reduce((sum, reason) => sum + reason.points, 0);
  const finalScore = Math.max(0, Math.min(100, Math.round((rawScore / RAW_SCORE_MAX) * 100)));

  return {
    tool,
    rawScore,
    finalScore,
    reasons,
    bestPro: tool.pros[0] ?? null,
    strongestCon: tool.cons[0] ?? null,
    completeness: (tool.pros.length > 0 ? 1 : 0) + (tool.cons.length > 0 ? 1 : 0),
  };
}

function compareRankedTools(left: RankedTool, right: RankedTool, stage: StackBuilderStage) {
  if (right.finalScore !== left.finalScore) {
    return right.finalScore - left.finalScore;
  }

  if (right.completeness !== left.completeness) {
    return right.completeness - left.completeness;
  }

  if ((stage === "Pre-seed" || stage === "Seed") && left.tool.complexity !== right.tool.complexity) {
    const leftComplexity = left.tool.complexity ?? Number.POSITIVE_INFINITY;
    const rightComplexity = right.tool.complexity ?? Number.POSITIVE_INFINITY;
    return leftComplexity - rightComplexity;
  }

  return left.tool.title.localeCompare(right.tool.title);
}

function buildWhyThis(ranked: RankedTool) {
  const positiveReasons = ranked.reasons
    .filter((reason) => reason.points > 0 && reason.text)
    .sort((left, right) => right.points - left.points);

  const whyThis: string[] = [];
  const strongestReason = positiveReasons[0];
  if (strongestReason) {
    whyThis.push(strongestReason.text);
  }

  if (ranked.bestPro) {
    whyThis.push(`Best pro: ${ranked.bestPro}.`);
  } else if (positiveReasons[1]) {
    whyThis.push(positiveReasons[1].text);
  }

  return whyThis.slice(0, 2);
}

function buildAlternativeRationale(ranked: RankedTool) {
  const bestReason = ranked.reasons
    .filter((reason) => reason.points > 0 && reason.text)
    .sort((left, right) => right.points - left.points)[0];

  if (bestReason) {
    return bestReason.text;
  }

  if (ranked.bestPro) {
    return `Best pro: ${ranked.bestPro}.`;
  }

  return ranked.tool.shortDescription;
}

function buildCurrentLedgerCard(input: CompleteStackBuilderInput, tools: FinstackTool[]): CategoryRecommendation {
  const currentLedger = input.currentLedger;
  if (!currentLedger || currentLedger === "None") {
    throw new Error("Current ledger card requested without an existing ledger.");
  }

  const ledgerToken = LEDGER_TOKEN_BY_KEY[currentLedger];
  const matchedTool =
    tools.find(
      (tool) =>
        tool.category === "Accounting ledger" &&
        normalizeText(tool.title).includes(ledgerToken),
    ) ?? null;

  return {
    category: "Accounting ledger",
    state: "current-ledger",
    displayTitle: EXISTING_LEDGER_LABEL_BY_KEY[currentLedger],
    tool: matchedTool,
    whyThis: [
      `Keeping ${EXISTING_LEDGER_LABEL_BY_KEY[currentLedger]} as the system of record avoids unnecessary migration risk.`,
      "The rest of the stack is optimized to work around your existing ledger rather than replacing it.",
    ],
    watchOut: null,
    alternatives: [],
    note: "Current ledger confirmed.",
    finalScore: null,
    metadata: {
      pricingTier: matchedTool?.pricingTier ?? null,
      complexity: matchedTool?.complexity ?? null,
      reviewSignals: matchedTool?.reviewSignals ?? null,
    },
  };
}

function buildNoMatchRecommendation(
  category: StackCategoryKey,
  categoryTools: FinstackTool[],
  input: CompleteStackBuilderInput,
) {
  const closestMatches = categoryTools
    .map((tool) => rankTool(tool, input))
    .sort((left, right) => compareRankedTools(left, right, input.stage))
    .slice(0, 3)
    .map((ranked) => ({
      tool: ranked.tool,
      rationale: buildAlternativeRationale(ranked),
      finalScore: ranked.finalScore,
    }));

  return {
    category,
    state: "no-strong-match" as const,
    displayTitle: "No strong match found",
    tool: null,
    whyThis: [],
    watchOut: null,
    alternatives: closestMatches,
    note: "Verify region/pricing before rollout.",
    finalScore: null,
    metadata: {
      pricingTier: null,
      complexity: null,
      reviewSignals: null,
    },
  };
}

function buildCategoryRecommendation(
  category: StackCategoryKey,
  categoryTools: FinstackTool[],
  input: CompleteStackBuilderInput,
) {
  const rankedTools = categoryTools
    .filter((tool) => passesHardFilters(tool, category, input))
    .map((tool) => rankTool(tool, input))
    .sort((left, right) => compareRankedTools(left, right, input.stage));

  if (rankedTools.length === 0) {
    return buildNoMatchRecommendation(category, categoryTools, input);
  }

  const [best, ...rest] = rankedTools;

  return {
    category,
    state: "recommended" as const,
    displayTitle: best.tool.title,
    tool: best.tool,
    whyThis: buildWhyThis(best),
    watchOut: best.strongestCon,
    alternatives: rest.slice(0, 2).map((ranked) => ({
      tool: ranked.tool,
      rationale: buildAlternativeRationale(ranked),
      finalScore: ranked.finalScore,
    })),
    note: null,
    finalScore: best.finalScore,
    metadata: {
      pricingTier: best.tool.pricingTier,
      complexity: best.tool.complexity,
      reviewSignals: best.tool.reviewSignals,
    },
  };
}

function buildSetupOrder(
  recommendations: CategoryRecommendation[],
  input: CompleteStackBuilderInput,
) {
  const includedCategories = new Set(recommendations.map((recommendation) => recommendation.category));
  const steps: string[] = [];

  steps.push(
    input.currentLedger && input.currentLedger !== "None"
      ? `Ledger: Confirm ${EXISTING_LEDGER_LABEL_BY_KEY[input.currentLedger]} as the system of record.`
      : "Ledger: Set up the recommended ledger as the system of record.",
  );

  if (includedCategories.has("Banking + spend control")) {
    steps.push("Banking and spend controls: Connect core bank accounts, cards, and approval rules.");
  }

  if (includedCategories.has("Expenses + receipts capture")) {
    steps.push("Expenses capture: Roll out receipt capture and coding rules for everyday spend.");
  }

  const coreOperations: string[] = [];
  if (includedCategories.has("Payroll (UK payroll) and Contractor payroll (global)")) {
    coreOperations.push("payroll");
  }
  if (includedCategories.has("VAT/tax compliance (UK focused)")) {
    coreOperations.push("VAT/compliance");
  }
  if (includedCategories.has("AP/AR automation")) {
    coreOperations.push("AP/AR");
  }
  if (includedCategories.has("Subscription billing + revenue recognition (SaaS)")) {
    coreOperations.push("subscription billing");
  }
  if (includedCategories.has("Inventory + COGS (D2C)")) {
    coreOperations.push("inventory");
  }
  if (coreOperations.length > 0) {
    steps.push(`Core operations: Layer in ${coreOperations.join(", ")} after the core transaction flows are live.`);
  }

  if (includedCategories.has("Reporting + dashboards + board packs")) {
    steps.push("Management reporting: Add dashboards and board-pack reporting once the source data is clean.");
  }

  if (includedCategories.has("Cash flow forecasting")) {
    steps.push("Forecasting: Build cash flow forecasting after the ledger and reporting flows are stable.");
  }

  return steps.slice(0, 6);
}

export function isStackBuilderInputComplete(
  input: StackBuilderInput,
): input is CompleteStackBuilderInput {
  return Boolean(input.stage && input.teamSize && input.region && input.need);
}

export function buildStackRecommendation(
  tools: FinstackTool[],
  input: CompleteStackBuilderInput,
): StackBuilderResult {
  const includedCategories = getIncludedCategories(input);
  const recommendations = includedCategories.map((category) => {
    const categoryTools = tools.filter((tool) => tool.category === category);

    if (
      category === "Accounting ledger" &&
      input.currentLedger &&
      input.currentLedger !== "None"
    ) {
      return buildCurrentLedgerCard(input, tools);
    }

    return buildCategoryRecommendation(category, categoryTools, input);
  });

  return {
    recommendations,
    setupOrder: buildSetupOrder(recommendations, input),
    checklist: CHECKLIST_BY_NEED[input.need],
  };
}
