export type PricingCurrency = "GBP" | "USD";
export type BillingCadence = "monthly" | "annual";

export type BookkeepingTier = {
  maxMonthlyExpenses: number;
  baseMonthlyPrice: number;
  includedEmployees: number;
};

export type BookkeepingPricingConfig = {
  defaultCurrency: PricingCurrency;
  expenseStep: number;
  additionalEmployeeMonthlyPrice: number;
  customPricingThreshold: number;
  customScopeEmployeeCap: number;
  tiers: readonly BookkeepingTier[];
  cadenceMultipliers: Record<BillingCadence, number>;
};

export type BookkeepingQuoteInput = {
  monthlyExpenses: number;
  additionalEmployees: number;
  currency?: PricingCurrency;
  cadence?: BillingCadence;
  config?: BookkeepingPricingConfig;
};

export type BookkeepingQuote = {
  monthlyExpenses: number;
  additionalEmployees: number;
  currency: PricingCurrency;
  cadence: BillingCadence;
  isCustomPricing: boolean;
  customScopeReason: "expense_threshold" | "team_size_cap" | null;
  includedEmployees: number | null;
  totalEmployees: number | null;
  baseMonthlyPrice: number | null;
  additionalEmployeeMonthlyCost: number | null;
  totalMonthlyPrice: number | null;
};

export const BOOKKEEPING_PRICING_CONFIG: BookkeepingPricingConfig = {
  defaultCurrency: "GBP",
  expenseStep: 250,
  additionalEmployeeMonthlyPrice: 7,
  customPricingThreshold: 200_000,
  customScopeEmployeeCap: 75,
  tiers: [
    { maxMonthlyExpenses: 20_000, baseMonthlyPrice: 249, includedEmployees: 5 },
    { maxMonthlyExpenses: 40_000, baseMonthlyPrice: 349, includedEmployees: 10 },
    { maxMonthlyExpenses: 60_000, baseMonthlyPrice: 449, includedEmployees: 15 },
    { maxMonthlyExpenses: 80_000, baseMonthlyPrice: 549, includedEmployees: 20 },
    { maxMonthlyExpenses: 100_000, baseMonthlyPrice: 649, includedEmployees: 25 },
    { maxMonthlyExpenses: 120_000, baseMonthlyPrice: 749, includedEmployees: 30 },
    { maxMonthlyExpenses: 140_000, baseMonthlyPrice: 799, includedEmployees: 30 },
    { maxMonthlyExpenses: 160_000, baseMonthlyPrice: 849, includedEmployees: 35 },
    { maxMonthlyExpenses: 180_000, baseMonthlyPrice: 899, includedEmployees: 40 },
  ],
  cadenceMultipliers: {
    monthly: 1,
    annual: 12,
  },
};

const CURRENCY_FORMATTING: Record<PricingCurrency, { locale: string; currency: string }> = {
  GBP: { locale: "en-GB", currency: "GBP" },
  USD: { locale: "en-US", currency: "USD" },
};

function clampToWholeNumber(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.round(value));
}

export function formatMoney(amount: number, currency: PricingCurrency): string {
  const { locale, currency: currencyCode } = CURRENCY_FORMATTING[currency];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatExpenses(amount: number, currency: PricingCurrency): string {
  return formatMoney(amount, currency);
}

export function findBookkeepingTier(
  monthlyExpenses: number,
  config: BookkeepingPricingConfig = BOOKKEEPING_PRICING_CONFIG,
): BookkeepingTier | null {
  if (monthlyExpenses >= config.customPricingThreshold) {
    return null;
  }

  return (
    config.tiers.find((tier) => monthlyExpenses <= tier.maxMonthlyExpenses) ??
    config.tiers[config.tiers.length - 1] ??
    null
  );
}

export function getBookkeepingQuote({
  monthlyExpenses,
  additionalEmployees,
  currency,
  cadence = "monthly",
  config = BOOKKEEPING_PRICING_CONFIG,
}: BookkeepingQuoteInput): BookkeepingQuote {
  const normalizedExpenses = clampToWholeNumber(monthlyExpenses);
  const normalizedAdditionalEmployees = clampToWholeNumber(additionalEmployees);
  const resolvedCurrency = currency ?? config.defaultCurrency;
  const tier = findBookkeepingTier(normalizedExpenses, config);
  const isCustomPricing = tier === null;

  if (isCustomPricing) {
    return {
      monthlyExpenses: normalizedExpenses,
      additionalEmployees: normalizedAdditionalEmployees,
      currency: resolvedCurrency,
      cadence,
      isCustomPricing: true,
      customScopeReason: "expense_threshold",
      includedEmployees: null,
      totalEmployees: null,
      baseMonthlyPrice: null,
      additionalEmployeeMonthlyCost: null,
      totalMonthlyPrice: null,
    };
  }

  const additionalEmployeeMonthlyCost =
    normalizedAdditionalEmployees * config.additionalEmployeeMonthlyPrice;
  const totalEmployees = tier.includedEmployees + normalizedAdditionalEmployees;
  const isTeamSizeCustomScope = totalEmployees >= config.customScopeEmployeeCap;

  if (isTeamSizeCustomScope) {
    return {
      monthlyExpenses: normalizedExpenses,
      additionalEmployees: normalizedAdditionalEmployees,
      currency: resolvedCurrency,
      cadence,
      isCustomPricing: true,
      customScopeReason: "team_size_cap",
      includedEmployees: null,
      totalEmployees,
      baseMonthlyPrice: null,
      additionalEmployeeMonthlyCost: null,
      totalMonthlyPrice: null,
    };
  }

  const totalMonthlyPrice = tier.baseMonthlyPrice + additionalEmployeeMonthlyCost;

  return {
    monthlyExpenses: normalizedExpenses,
    additionalEmployees: normalizedAdditionalEmployees,
    currency: resolvedCurrency,
    cadence,
    isCustomPricing: false,
    customScopeReason: null,
    includedEmployees: tier.includedEmployees,
    totalEmployees,
    baseMonthlyPrice: tier.baseMonthlyPrice,
    additionalEmployeeMonthlyCost,
    totalMonthlyPrice,
  };
}
