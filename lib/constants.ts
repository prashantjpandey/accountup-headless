export type NavLink =
  | {
      kind: "link";
      href: string;
      label: string;
    }
  | {
      kind: "services";
      label: string;
    }
  | {
      kind: "resources";
      label: string;
    };

export type UnifiedMegaMenuItem = {
  label: string;
  href: string;
  description: string;
  iconKey:
    | "core"
    | "ops"
    | "rd"
    | "compliance"
    | "reporting"
    | "finstack"
    | "calculator"
    | "diagnostic"
    | "utility"
    | "case-study"
    | "grants"
    | "insights"
    | "resources";
};

export type UnifiedMegaMenuColumn = {
  title: string;
  items: UnifiedMegaMenuItem[];
};

export type ServiceNavLink = {
  label: string;
  href: string;
  description: string;
};

export type ResourceNavLink = {
  label: string;
  href: string;
  description: string;
};

export type ResourceNavGroup = {
  title: string;
  description?: string;
  links: ResourceNavLink[];
};

export const SERVICE_NAV_LINKS: ServiceNavLink[] = [
  {
    label: "Services Overview",
    href: "/#services",
    description: "See the full finance system.",
  },
  {
    label: "Bookkeeping & Payroll",
    href: "/#daily-ops",
    description: "Clean books and payroll control.",
  },
  {
    label: "Compliance & Filings",
    href: "/#compliance",
    description: "Deadlines, filings, and compliance.",
  },
  {
    label: "Reporting & Insights",
    href: "/#reporting",
    description: "Dashboards and investor reporting.",
  },
  {
    label: "R&D Tax Claims",
    href: "/uk-rd-tax-claims",
    description: "System-backed UK R&D claims.",
  },
] as const;

export const RESOURCE_NAV_GROUPS: ResourceNavGroup[] = [
  {
    title: "Toolkit",
    description: "Core hubs and stack planning.",
    links: [
      {
        label: "Resources Hub",
        href: "/resources",
        description: "Browse all tools and guides.",
      },
      {
        label: "FinStack UK",
        href: "/finstack",
        description: "Design your finance stack.",
      },
    ],
  },
  {
    title: "Assessments",
    description: "Quick ways to find gaps.",
    links: [
      {
        label: "Calculators",
        href: "/resources/calculators",
        description: "Model key startup finance metrics.",
      },
      {
        label: "Finance Diagnostics",
        href: "/resources/diagnostics",
        description: "Spot structural finance issues.",
      },
    ],
  },
  {
    title: "Utilities",
    description: "Useful founder tools.",
    links: [
      {
        label: "Practical Utilities",
        href: "/resources/utilities",
        description: "Lightweight recurring finance tools.",
      },
    ],
  },
  {
    title: "Directory",
    description: "Funding and examples.",
    links: [
      {
        label: "Grants Directory",
        href: "/resources/grants",
        description: "Search UK grants and incentives.",
      },
      {
        label: "Case Studies",
        href: "/resources/case-studies",
        description: "Real finance breakdowns.",
      },
    ],
  },
  {
    title: "Insights",
    description: "Practical reads for operators.",
    links: [
      {
        label: "Insights",
        href: "/insights",
        description: "Short reads on finance decisions.",
      },
    ],
  },
] as const;

export const RESOURCE_NAV_LINKS: ResourceNavLink[] = RESOURCE_NAV_GROUPS.flatMap(
  (group) => group.links,
);

export const UNIFIED_MEGA_MENU_COLUMNS: UnifiedMegaMenuColumn[] = [
  {
    title: "Core System",
    items: [
      {
        label: "Core System",
        href: "/#services",
        description: "Overview of the finance engine.",
        iconKey: "core",
      },
      {
        label: "Bookkeeping Infrastructure",
        href: "/#daily-ops",
        description: "Books, payroll, and operating control.",
        iconKey: "ops",
      },
      {
        label: "R&D Tax Claims",
        href: "/uk-rd-tax-claims",
        description: "System-backed UK R&D claims.",
        iconKey: "rd",
      },
      {
        label: "VAT & Compliance",
        href: "/#compliance",
        description: "Filings, deadlines, and compliance.",
        iconKey: "compliance",
      },
      {
        label: "Investor Reporting",
        href: "/#reporting",
        description: "Dashboards and investor visibility.",
        iconKey: "reporting",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        label: "FinStack UK",
        href: "/finstack",
        description: "Design your finance stack.",
        iconKey: "finstack",
      },
      {
        label: "Calculators",
        href: "/resources/calculators",
        description: "Model key finance decisions.",
        iconKey: "calculator",
      },
      {
        label: "Finance Diagnostics",
        href: "/resources/diagnostics",
        description: "Spot structural finance issues.",
        iconKey: "diagnostic",
      },
      {
        label: "Practical Utilities",
        href: "/resources/utilities",
        description: "Useful recurring finance tools.",
        iconKey: "utility",
      },
    ],
  },
  {
    title: "Learn & Proof",
    items: [
      {
        label: "Case Studies",
        href: "/resources/case-studies",
        description: "Real finance breakdowns.",
        iconKey: "case-study",
      },
      {
        label: "Grants Directory",
        href: "/resources/grants",
        description: "Search UK grants and incentives.",
        iconKey: "grants",
      },
      {
        label: "Insights",
        href: "/insights",
        description: "Short reads for operators.",
        iconKey: "insights",
      },
      {
        label: "Resources Hub",
        href: "/resources",
        description: "Browse all tools and guides.",
        iconKey: "resources",
      },
    ],
  },
] as const;

export const NAV_LINKS: NavLink[] = [
  { kind: "services", label: "Services" },
  { kind: "link", href: "/pricing", label: "Pricing" },
  { kind: "link", href: "/about", label: "About" },
  { kind: "resources", label: "Resources" },
];

export const FOOTER_COLUMNS = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "#" },
  ],
  Services: [
    { label: "Bookkeeping & Payroll", href: "/#daily-ops" },
    { label: "Compliance & Filings", href: "/#compliance" },
    { label: "Reporting & Insights", href: "/#reporting" },
    { label: "R&D Tax Claims", href: "/uk-rd-tax-claims" },
  ],
  Resources: RESOURCE_NAV_LINKS,
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  Contact: [
    { label: "Email", href: "mailto:hello@accountup.com" },
    { label: "Support", href: "/#contact" },
  ],
} as const;

export const FOOTER_TAGLINE =
  "Modern accounting infrastructure for startups.";

export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: "$499",
    period: "/mo",
    description: "For early-stage startups",
    bullets: ["Monthly bookkeeping", "Basic financial statements", "Tax prep support"],
    cta: "View Full Pricing",
    emphasized: false,
    recommended: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$999",
    period: "/mo",
    description: "For scaling teams",
    bullets: ["Everything in Starter", "Payroll & compliance", "Investor reporting"],
    cta: "View Full Pricing",
    emphasized: true,
    recommended: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "Custom",
    period: "",
    description: "For funded companies",
    bullets: ["Everything in Growth", "Dedicated team", "Custom workflows"],
    cta: "View Full Pricing",
    emphasized: false,
    recommended: false,
  },
] as const;

export const ADDONS = [
  { name: "R&D tax credits", price: "From $2,500" },
  { name: "Audit support", price: "Custom" },
  { name: "CFO advisory", price: "From $500/hr" },
  { name: "Equity management", price: "From $199/mo" },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Accountup gave us investor-ready numbers in days, not months. Finally, finance that keeps up.",
    author: "Rachel S.",
    company: "duel.",
  },
  {
    quote: "Structured, systemized, and real-time. Exactly what we needed as we scaled.",
    author: "Leo M.",
    company: "Startup",
  },
] as const;

export const CASE_STUDIES = [
  {
    company: "Plastic Collective UK Limited",
    logoSrc: "/assets/logos/PlasticCollective_Logo.png",
    logoAlt: "Plastic Collective logo",
    summary:
      "Plastic Collective expanded its recycling programs but faced bottlenecks with system migration, reporting, and compliance. With a rebuilt finance function, they now run on live reporting, forecast cash with confidence, and deliver timely submissions.",
    href: "/#contact",
  },
  {
    company: "Conjecture Ltd",
    logoSrc: "/assets/logos/Conjecture_Logo.png",
    logoAlt: "Conjecture logo",
    summary:
      "As Conjecture scaled AI research, bookkeeping, spend control, and cross-border reporting grew complex. They now close books monthly, track burn and runway in real time, and stay compliant across UK and US operations.",
    href: "/#contact",
  },
  {
    company: "Duel Holdings Limited",
    logoSrc: "/assets/logos/Duel_Logo.png",
    logoAlt: "Duel logo",
    summary:
      "Rapid growth left Duel with reconciliation backlogs, outdated books, and heavy transaction volume across two markets. They now operate with clean reconciliations, current books, and smooth invoicing, payments, and supplier management.",
    href: "/#contact",
  },
  {
    company: "Surrey Event Agency Limited",
    logoSrc: "/assets/logos/SurreyEventAgency_Logo.png",
    logoAlt: "Surrey Event Agency logo",
    summary:
      "At launch, Surrey Event Agency juggled incorporation, payroll, VAT, and pensions while trying to win clients. With finance set up from day one, the founder now runs a compliant business with clear books and decision-ready reports.",
    href: "/#contact",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What's included in each plan?",
    answer:
      "Starter includes monthly bookkeeping and basic statements. Growth adds payroll, compliance, and investor reporting. Scale includes a dedicated team and custom workflows. Add-ons like R&D tax credits and CFO advisory are available across all tiers.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a call with our team. We'll review your stage, stack, and needs, then recommend a plan. Onboarding typically takes 1–2 weeks.",
  },
  {
    question: "Do you work with international entities?",
    answer:
      "We focus on US-based startups. For international subsidiaries or multi-entity setups, we can discuss custom solutions.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can upgrade or downgrade as your startup grows. We'll prorate and transition your books smoothly.",
  },
] as const;

export const CORE_SERVICES = [
  {
    id: "daily-ops",
    title: "Daily Ops",
    subtitle: "Bookkeeping & Payroll",
    description:
      "Clean books, on-time payroll, and reconciled accounts so you can focus on building.",
    bullets: [
      "Full-service bookkeeping",
      "Real-time ledger updates",
      "Automated payroll",
      "Expense tracking",
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Filings",
    subtitle: "Stay in good standing",
    description:
      "State filings, annual reports, and compliance checklists handled so you never miss a deadline.",
    bullets: [
      "Tax filings",
      "Audit support",
      "Sales tax automation",
      "Equity management",
    ],
  },
  {
    id: "reporting",
    title: "Reporting & Insights",
    subtitle: "Investor-ready in minutes",
    description:
      "Dashboards and reports that investors and boards expect — without the spreadsheet scramble.",
    bullets: [
      "Monthly financial reports",
      "Investor reporting",
      "Cash flow forecasts",
      "Budgeting tools",
    ],
  },
] as const;

export const TRADITIONAL_ITEMS = [
  "Reactive, month-end close",
  "Static spreadsheets",
  "Manual reconciliations",
  "Delayed reporting",
] as const;

export const ACCOUNTUP_ITEMS = [
  "Real-time, systemized books",
  "Live dashboards",
  "Automated sync & rules",
  "Investor-ready on demand",
] as const;
