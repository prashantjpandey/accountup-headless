export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
] as const;

export const FOOTER_COLUMNS = {
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Services: [
    { label: "Bookkeeping", href: "/#services" },
    { label: "Payroll", href: "/#services" },
    { label: "Compliance", href: "/#services" },
  ],
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
