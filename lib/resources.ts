import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  Blocks,
  BriefcaseBusiness,
  Calculator,
  ChartPie,
  FileSearch,
  FlaskConical,
  HandCoins,
  Landmark,
  Lightbulb,
  MailPlus,
  Newspaper,
  ReceiptText,
  Rocket,
  ShieldCheck,
  TrendingUp,
  UserRoundPlus,
} from "lucide-react";

export type ResourceCategory = "tool" | "grant" | "case-study" | "insight";

export type ResourceIconKey =
  | "runway"
  | "equity"
  | "valuation"
  | "growth"
  | "team"
  | "health"
  | "fundraise"
  | "stack"
  | "invoice"
  | "update"
  | "credit"
  | "grant"
  | "innovation"
  | "subsidy"
  | "case"
  | "insight";

export type ResourceItem = {
  slug: string;
  title: string;
  description: string;
  href: string;
  category: ResourceCategory;
  linkLabel: string;
  variant?: "default" | "featured";
  iconKey?: ResourceIconKey;
};

export type ResourceSection = {
  id: string;
  href: string;
  title: string;
  pageTitle: string;
  description?: string;
  pageDescription: string;
  items: ResourceItem[];
};

export type CalculatorResource = ResourceItem & {
  pageDescription: string;
};

export const resourceIconMap: Record<ResourceIconKey, LucideIcon> = {
  runway: Rocket,
  equity: ChartPie,
  valuation: BadgeDollarSign,
  growth: TrendingUp,
  team: UserRoundPlus,
  health: ShieldCheck,
  fundraise: HandCoins,
  stack: Blocks,
  invoice: ReceiptText,
  update: MailPlus,
  credit: FlaskConical,
  grant: Landmark,
  innovation: Lightbulb,
  subsidy: BriefcaseBusiness,
  case: FileSearch,
  insight: Newspaper,
};

export const resourceCategoryTintMap: Record<ResourceCategory, string> = {
  tool: "border-purple/16 bg-gradient-to-br from-purple/10 via-lavender-1/18 to-white",
  grant: "border-primary/16 bg-gradient-to-br from-primary/12 via-warm-peach/18 to-white",
  "case-study": "border-black/10 bg-gradient-to-br from-ink/6 via-white to-white",
  insight: "border-lavender-2/28 bg-gradient-to-br from-lavender-1/22 via-white to-white",
};

export const calculatorResources: CalculatorResource[] = [
  {
    slug: "runway-burn",
    title: "Runway & Burn Rate",
    description: "Model burn, runway, and whether current revenue actually covers monthly spend.",
    href: "/resources/calculators/runway-burn",
    category: "tool",
    linkLabel: "Calculate Runway",
    variant: "featured",
    iconKey: "runway",
    pageDescription:
      "Estimate net burn, runway months, and an approximate runway date from current cash, revenue, and expenses.",
  },
  {
    slug: "startup-valuation",
    title: "Startup Valuation",
    description: "Get a directional valuation range from revenue and a simple ARR multiple.",
    href: "/resources/calculators/startup-valuation",
    category: "tool",
    linkLabel: "Estimate Valuation",
    iconKey: "valuation",
    pageDescription:
      "Use a simple revenue-multiple model to compare conservative, base, and aggressive valuation scenarios.",
  },
  {
    slug: "cac-payback",
    title: "CAC Payback",
    description: "See how long customer acquisition spend takes to return gross profit.",
    href: "/resources/calculators/cac-payback",
    category: "tool",
    linkLabel: "Calculate Payback",
    iconKey: "growth",
    pageDescription:
      "Compare CAC against monthly gross profit per customer to estimate payback speed and efficiency.",
  },
  {
    slug: "break-even-hiring",
    title: "Break-even Hiring",
    description: "Estimate when a planned hire pays back the cost of ramping them.",
    href: "/resources/calculators/break-even-hiring",
    category: "tool",
    linkLabel: "Estimate Break-even",
    iconKey: "team",
    pageDescription:
      "Model fully-loaded hiring cost, ramp time, and expected monthly impact to estimate break-even timing.",
  },
];

const diagnosticToolItems: ResourceItem[] = [
  {
    slug: "finance-health-score",
    title: "Finance Health Score",
    description: "Spot structural weaknesses across reporting, controls, and cash visibility.",
    href: "/resources/tools/finance-health-score",
    category: "tool",
    linkLabel: "Open Tool",
    iconKey: "health",
  },
  {
    slug: "fundraising-planning",
    title: "Fundraising Planning",
    description: "Map capital timing against runway so fundraising starts before urgency.",
    href: "/resources/tools/fundraising-planning",
    category: "tool",
    linkLabel: "Open Tool",
    iconKey: "fundraise",
  },
  {
    slug: "stack-recommender",
    title: "Stack Recommender",
    description: "Compare finance stack options based on stage, complexity, and reporting needs.",
    href: "/resources/tools/stack-recommender",
    category: "tool",
    linkLabel: "Open Tool",
    iconKey: "stack",
  },
];

const utilityToolItems: ResourceItem[] = [
  {
    slug: "invoice-generator",
    title: "Invoice Generator",
    description: "Create cleaner invoices faster so founder time is not wasted on admin loops.",
    href: "/resources/tools/invoice-generator",
    category: "tool",
    linkLabel: "Open Tool",
    iconKey: "invoice",
  },
  {
    slug: "investor-update-generator",
    title: "Investor Update Generator",
    description: "Structure concise monthly updates that make performance legible to investors.",
    href: "/resources/tools/investor-update-generator",
    category: "tool",
    linkLabel: "Open Tool",
    iconKey: "update",
  },
  {
    slug: "rd-tax-estimator",
    title: "R&D Tax Estimator",
    description: "Outline likely credit potential before you invest time in a deeper claim review.",
    href: "/resources/tools/rd-tax-estimator",
    category: "tool",
    linkLabel: "Open Tool",
    iconKey: "credit",
  },
];

const caseStudyItems: ResourceItem[] = [
  {
    slug: "saas-burn-recovery",
    title: "How a SaaS team exposed runway distortion before a hiring round",
    description: "Cash looked healthy until the real burn profile surfaced beneath reporting lag.",
    href: "/resources/case-studies/saas-burn-recovery",
    category: "case-study",
    linkLabel: "Read Breakdown",
    iconKey: "case",
  },
  {
    slug: "fundraise-readiness-reset",
    title: "The fundraise prep reset that fixed investor reporting in two cycles",
    description: "Board-ready numbers required rebuilding the finance narrative, not polishing slides.",
    href: "/resources/case-studies/fundraise-readiness-reset",
    category: "case-study",
    linkLabel: "Read Breakdown",
    iconKey: "fundraise",
  },
  {
    slug: "hiring-before-runway-collapse",
    title: "Why a growth hire only made sense after margin and payback were reworked",
    description: "The team needed better economics before headcount could become leverage.",
    href: "/resources/case-studies/hiring-before-runway-collapse",
    category: "case-study",
    linkLabel: "Read Breakdown",
    iconKey: "team",
  },
];

const insightItems: ResourceItem[] = [];

export const resourceSections: ResourceSection[] = [
  {
    id: "calculators",
    href: "/resources/calculators",
    title: "Clarity in Numbers",
    pageTitle: "Core Calculators",
    description: "Quick models to understand burn, dilution, growth, and survival.",
    pageDescription:
      "A compact set of starter finance models for cash runway, payback, hiring decisions, and valuation framing.",
    items: calculatorResources,
  },
  {
    id: "diagnostics",
    href: "/resources/diagnostics",
    title: "Assess Your Finance Setup",
    pageTitle: "Finance Diagnostics",
    description:
      "Not sure if your numbers are structured properly? These tools surface blind spots.",
    pageDescription:
      "Use these diagnostics to identify structural gaps in reporting, fundraising readiness, and systems.",
    items: diagnosticToolItems,
  },
  {
    id: "utilities",
    href: "/resources/utilities",
    title: "Practical Utilities",
    pageTitle: "Practical Utilities",
    description: "Simple tools founders use weekly.",
    pageDescription:
      "A small set of recurring finance utilities for invoices, investor communication, and incentive estimation.",
    items: utilityToolItems,
  },
  {
    id: "grants",
    href: "/resources/grants",
    title: "Government Grants & Incentives",
    pageTitle: "Government Grants & Incentives",
    description:
      "Discover funding programs, tax credits, and incentive schemes your business may qualify for.",
    pageDescription:
      "Search the live UK grants and incentives directory sourced from the Accountup Wix CMS collection.",
    items: [],
  },
  {
    id: "case-studies",
    href: "/resources/case-studies",
    title: "Real Financial Breakdowns",
    pageTitle: "Case Studies",
    description: "Examples of the financial tension behind startup decisions that looked simple on the surface.",
    pageDescription:
      "Short finance breakdowns that show how startup decisions change once the numbers are structured properly.",
    items: caseStudyItems,
  },
  {
    id: "insights",
    href: "/insights",
    title: "Insights",
    pageTitle: "Insights",
    description: "Practical reads on reporting quality, operating discipline, and startup finance decisions.",
    pageDescription:
      "A growing insight layer for practical startup finance thinking, reporting clarity, and operating discipline.",
    items: insightItems,
  },
];

export const allResources = [
  ...calculatorResources,
  ...diagnosticToolItems,
  ...utilityToolItems,
  ...caseStudyItems,
  ...insightItems,
];

export const toolResources = [...diagnosticToolItems, ...utilityToolItems];
export const caseStudyResources = caseStudyItems;
export const insightResources = insightItems;

export function getResourceByCategoryAndSlug(
  category: ResourceCategory,
  slug: string,
) {
  return allResources.find((resource) => resource.category === category && resource.slug === slug);
}

export function getResourceSectionById(id: ResourceSection["id"]) {
  return resourceSections.find((section) => section.id === id);
}

export function getRequiredResourceSectionById(id: ResourceSection["id"]) {
  const section = getResourceSectionById(id);

  if (!section) {
    throw new Error(`Missing resources section: ${id}`);
  }

  return section;
}

export function getCalculatorResourceBySlug(slug: CalculatorResource["slug"]) {
  return calculatorResources.find((resource) => resource.slug === slug);
}

export function getRequiredCalculatorResourceBySlug(slug: CalculatorResource["slug"]) {
  const resource = getCalculatorResourceBySlug(slug);

  if (!resource) {
    throw new Error(`Missing calculator resource: ${slug}`);
  }

  return resource;
}

export function getToolResourceBySlug(slug: ResourceItem["slug"]) {
  return toolResources.find((resource) => resource.slug === slug);
}

export const resourceIndexIcons = {
  calculators: Calculator,
  diagnostics: ShieldCheck,
  utilities: ReceiptText,
  grants: Landmark,
  "case-studies": FileSearch,
  insights: Newspaper,
} as const;
