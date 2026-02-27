"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  BOOKKEEPING_PRICING_CONFIG,
  formatExpenses,
  formatMoney,
  getBookkeepingQuote,
  type BookkeepingQuote,
} from "@/lib/pricing-engine";

type ModuleKey = "bookkeeping" | "compliance" | "reporting";

type ModuleTab = {
  key: ModuleKey;
  label: string;
  description: string;
};

type FixedModuleConfig = {
  title: string;
  subtitle: string;
  startingMonthlyPrice: number;
  included: string[];
  addOns: { name: string; price: string }[];
  confidenceLine: string;
};

const MODULE_TABS: ModuleTab[] = [
  {
    key: "bookkeeping",
    label: "Bookkeeping & Payroll",
    description: "Dynamic pricing engine based on expenses and team size.",
  },
  {
    key: "compliance",
    label: "Compliance",
    description: "Fixed monthly base plus clearly scoped add-ons.",
  },
  {
    key: "reporting",
    label: "Reporting",
    description: "Fixed monthly base plus optional reporting extensions.",
  },
];

const FIXED_MODULES: Record<Exclude<ModuleKey, "bookkeeping">, FixedModuleConfig> = {
  compliance: {
    title: "Compliance",
    subtitle: "Ongoing statutory and filing operations",
    startingMonthlyPrice: 219,
    included: [
      "Monthly compliance calendar management",
      "Core statutory filing preparation",
      "Submission workflow coordination",
      "Deadline and exception tracking",
    ],
    addOns: [
      { name: "R&D tax credit support", price: "From £1,500 per filing" },
      { name: "Year-end statutory accounts package", price: "From £350 per month" },
      { name: "Entity expansion setup", price: "Custom scope" },
    ],
    confidenceLine:
      "Controls-first execution with documented timelines and ownership.",
  },
  reporting: {
    title: "Reporting",
    subtitle: "Decision-ready financial reporting infrastructure",
    startingMonthlyPrice: 269,
    included: [
      "Monthly management reporting pack",
      "Cash runway and burn monitoring",
      "Board and investor KPI baseline",
      "Variance commentary for leadership",
    ],
    addOns: [
      { name: "Board deck finance appendix", price: "From £180 per month" },
      { name: "Department-level budget tracking", price: "From £150 per month" },
      { name: "Forecast model refresh", price: "Custom scope" },
    ],
    confidenceLine:
      "Structured output designed for founder decisions and investor scrutiny.",
  },
};

const EXPENSES_MAX = 300_000;
const SLIDER_MAX_STEPS = Math.floor(EXPENSES_MAX / BOOKKEEPING_PRICING_CONFIG.expenseStep);

export function PricingExperience() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("bookkeeping");

  return (
    <div className="bg-background">
      <section className="px-6 pt-24 pb-10 md:pt-30 md:pb-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-center text-4xl font-medium tracking-tight text-ink md:text-5xl font-display">
            Plans built for your business growth
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base text-charcoal md:text-lg">
            Estimate your monthly cost based on your business expenses and payroll
            needs.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-charcoal md:grid-cols-2">
            <li className="rounded-lg border border-black/8 bg-white/65 px-3 py-2">
              Based on monthly expenses
            </li>
            <li className="rounded-lg border border-black/8 bg-white/65 px-3 py-2">
              Based on team size
            </li>
            <li className="rounded-lg border border-black/8 bg-white/65 px-3 py-2">
              Modular add-ons by function
            </li>
            <li className="rounded-lg border border-black/8 bg-white/65 px-3 py-2">
              Built to scale with your business
            </li>
          </ul>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-black/10 bg-white/82 p-2 shadow-[0_18px_48px_-36px_rgba(8,10,18,0.35)] backdrop-blur-sm">
            <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.09em] text-charcoal">
              Service modules, not SaaS tiers
            </p>
            <div
              className="grid gap-2 md:grid-cols-3"
              role="tablist"
              aria-label="Pricing modules"
            >
              {MODULE_TABS.map((tab) => {
                const isActive = activeModule === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`module-panel-${tab.key}`}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      isActive
                        ? "border-purple/25 bg-purple text-white"
                        : "border-black/8 bg-white text-ink hover:bg-neutral-50"
                    }`}
                    onClick={() => setActiveModule(tab.key)}
                  >
                    <p className="text-sm font-semibold">{tab.label}</p>
                    <p
                      className={`mt-1 text-xs ${
                        isActive ? "text-white/85" : "text-charcoal"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_22px_55px_-40px_rgba(8,10,18,0.45)] md:p-7">
            {activeModule === "bookkeeping" ? (
              <BookkeepingModule />
            ) : (
              <FixedModule moduleKey={activeModule} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function BookkeepingModule() {
  const [expenseSteps, setExpenseSteps] = useState(160);
  const [additionalEmployeesInput, setAdditionalEmployeesInput] = useState("");
  const additionalEmployees = useMemo(() => {
    const parsed = Number.parseInt(additionalEmployeesInput, 10);
    if (Number.isNaN(parsed)) {
      return 0;
    }

    return Math.min(2000, Math.max(0, parsed));
  }, [additionalEmployeesInput]);

  const monthlyExpenses = expenseSteps * BOOKKEEPING_PRICING_CONFIG.expenseStep;
  const quote = useMemo(
    () =>
      getBookkeepingQuote({
        monthlyExpenses,
        additionalEmployees,
      }),
    [monthlyExpenses, additionalEmployees],
  );

  return (
    <div
      id="module-panel-bookkeeping"
      role="tabpanel"
      aria-label="Bookkeeping and payroll pricing"
      className="module-fade-in grid gap-6 md:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="rounded-2xl border border-black/10 bg-neutral-50/65 p-5 md:p-6">
        <h2 className="text-2xl font-medium text-ink font-display">Bookkeeping & Payroll</h2>
        <p className="mt-2 text-sm text-charcoal">
          Dynamic monthly pricing based on expense volume and additional employees.
        </p>

        <div className="mt-6">
          <label htmlFor="monthly-expenses" className="text-sm font-medium text-ink">
            Monthly expenses
          </label>
          <p className="mt-3 text-3xl font-medium tracking-tight text-ink tabular-nums font-display">
            {formatExpenses(monthlyExpenses, "GBP")}
          </p>
          <input
            id="monthly-expenses"
            className="pricing-range mt-5 w-full"
            type="range"
            min={0}
            max={SLIDER_MAX_STEPS}
            step={1}
            value={expenseSteps}
            onChange={(event) => setExpenseSteps(Number(event.target.value))}
            aria-label="Monthly expenses slider"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-charcoal">
            <span>{formatMoney(0, "GBP")}</span>
            <span>{formatMoney(EXPENSES_MAX, "GBP")}</span>
          </div>
        </div>

        <div className="mt-7">
          <label htmlFor="additional-employees" className="text-sm font-medium text-ink">
            Additional employees
          </label>
          <p className="mt-1 text-xs text-charcoal">
            {formatMoney(BOOKKEEPING_PRICING_CONFIG.additionalEmployeeMonthlyPrice, "GBP")} per
            employee per month
          </p>
          <input
            id="additional-employees"
            type="number"
            inputMode="numeric"
            min={0}
            max={2000}
            step={1}
            value={additionalEmployeesInput}
            placeholder="0"
            onChange={(event) => {
              const nextValue = event.target.value;
              if (nextValue === "") {
                setAdditionalEmployeesInput("");
                return;
              }

              const parsed = Number.parseInt(nextValue, 10);
              if (Number.isNaN(parsed)) {
                setAdditionalEmployeesInput("");
                return;
              }

              const clamped = Math.min(2000, Math.max(0, parsed));
              setAdditionalEmployeesInput(String(clamped));
            }}
            className="mt-3 h-11 w-full rounded-xl border border-black/12 bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-neutral-400"
          />
        </div>
      </div>

      <BookkeepingSummaryCard quote={quote} />
    </div>
  );
}

function BookkeepingSummaryCard({ quote }: { quote: BookkeepingQuote }) {
  return (
    <aside className="rounded-2xl border border-black/10 bg-white p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-charcoal">
        Estimated monthly price
      </p>

      <div className="mt-4 min-h-14">
        <div
          key={
            quote.isCustomPricing
              ? "custom-pricing"
              : String(quote.totalMonthlyPrice ?? "base-pricing")
          }
          className="price-fade-in text-4xl font-medium tracking-tight text-ink tabular-nums font-display"
        >
          {quote.isCustomPricing
            ? "Custom Scope"
            : formatMoney(quote.totalMonthlyPrice ?? 0, quote.currency)}
        </div>
      </div>

      <p className="mt-2 text-xs text-charcoal">
        {quote.isCustomPricing && quote.customScopeReason === "team_size_cap"
          ? `Custom Scope Required at ${BOOKKEEPING_PRICING_CONFIG.customScopeEmployeeCap}+ total employees.`
          : quote.isCustomPricing
            ? `Custom Scope Required at ${formatMoney(
                BOOKKEEPING_PRICING_CONFIG.customPricingThreshold,
                quote.currency,
              )}+ monthly expenses.`
            : "Includes base service price and additional employee load."}
      </p>

      <div className="mt-6 space-y-3 text-sm">
        <InfoRow
          label="Base price"
          value={
            quote.isCustomPricing
              ? "Custom scope"
              : formatMoney(quote.baseMonthlyPrice ?? 0, quote.currency)
          }
        />
        <InfoRow
          label="Included employees"
          value={quote.isCustomPricing ? "Custom scope" : String(quote.includedEmployees ?? 0)}
        />
        <InfoRow
          label="Additional employees"
          value={quote.isCustomPricing ? "Handled in scope" : String(quote.additionalEmployees)}
        />
        <InfoRow
          label="Additional employee cost"
          value={
            quote.isCustomPricing
              ? "Handled in scope"
              : formatMoney(quote.additionalEmployeeMonthlyCost ?? 0, quote.currency)
          }
        />
      </div>

      <div className="mt-6 rounded-xl border border-black/10 bg-neutral-50 p-4 text-xs text-charcoal">
        Must be purchased as the base module for all other Accountup services.
      </div>

      <div className="mt-6">
        <Button asChild variant="purple" size="lg" className="w-full">
          <Link href="/#contact">Contact Sales</Link>
        </Button>
      </div>
    </aside>
  );
}

function FixedModule({ moduleKey }: { moduleKey: Exclude<ModuleKey, "bookkeeping"> }) {
  const moduleConfig = FIXED_MODULES[moduleKey];

  return (
    <div
      id={`module-panel-${moduleKey}`}
      role="tabpanel"
      aria-label={`${moduleConfig.title} pricing`}
      className="module-fade-in"
    >
      <div className="rounded-xl border border-black/12 bg-amber-50/55 px-4 py-3 text-sm text-neutral-800">
        Must be purchased with Accountup bookkeeping.
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-black/10 bg-neutral-50/60 p-5 md:p-6">
          <h2 className="text-2xl font-medium text-ink font-display">{moduleConfig.title}</h2>
          <p className="mt-1 text-sm text-charcoal">{moduleConfig.subtitle}</p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-charcoal">
            Starting monthly price
          </p>
          <p className="mt-2 text-4xl font-medium tracking-tight text-ink tabular-nums font-display">
            {formatMoney(moduleConfig.startingMonthlyPrice, "GBP")}
          </p>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-charcoal">
            Included
          </p>
          <ul className="mt-3 space-y-2">
            {moduleConfig.included.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink">
                <span className="mt-0.5 text-charcoal" aria-hidden="true">
                  +
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-charcoal">
            Add-ons
          </p>
          <div className="mt-3 space-y-2.5">
            {moduleConfig.addOns.map((addOn) => (
              <div
                key={addOn.name}
                className="flex items-start justify-between gap-3 rounded-xl border border-black/10 bg-neutral-50/55 px-3 py-2.5"
              >
                <p className="text-sm text-ink">{addOn.name}</p>
                <p className="shrink-0 text-sm font-medium text-ink">{addOn.price}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-charcoal">{moduleConfig.confidenceLine}</p>

          <div className="mt-6">
            <Button asChild variant="purple" size="lg" className="w-full">
              <Link href="/#contact">Contact Sales</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/8 pb-2">
      <span className="text-charcoal">{label}</span>
      <span className="font-medium text-ink tabular-nums">{value}</span>
    </div>
  );
}
