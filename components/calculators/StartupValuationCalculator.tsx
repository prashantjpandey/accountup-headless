"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { CurrencyInput, RangeInput, Toggle } from "@/components/calculators/Field";
import { ResultsCard } from "@/components/calculators/ResultsCard";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatNumber } from "@/lib/format";

type RevenueMode = "MRR" | "ARR";

export function StartupValuationCalculator() {
  const [revenueMode, setRevenueMode] = useState<RevenueMode>("MRR");
  const [revenue, setRevenue] = useState<number | null>(null);
  const [multiple, setMultiple] = useState(8);

  const results = useMemo(() => {
    const note = "Multiples vary by market and growth. This is a directional estimate.";

    if (revenue === null) {
      return {
        summaryLabel: "Base valuation",
        summaryValue: "Incomplete",
        message: "Enter revenue to estimate valuation scenarios.",
        badge: `${formatNumber(multiple, 0)}x`,
        items: [{ label: "Revenue mode", value: revenueMode }],
        note,
      };
    }

    const annualRecurringRevenue = revenueMode === "MRR" ? revenue * 12 : revenue;
    const conservativeMultiple = Math.max(2, multiple - 2);
    const aggressiveMultiple = multiple + 2;
    const baseValuation = annualRecurringRevenue * multiple;

    return {
      summaryLabel: "Base valuation",
      summaryValue: formatCurrency(baseValuation),
      badge: `${formatNumber(multiple, 0)}x`,
      message:
        revenueMode === "MRR"
          ? `Annualized from ${formatCurrency(revenue)} MRR.`
          : `Based on ${formatCurrency(revenue)} ARR.`,
      items: [
        { label: "Annual recurring revenue", value: formatCurrency(annualRecurringRevenue) },
        { label: `Conservative (${formatNumber(conservativeMultiple, 0)}x)`, value: formatCurrency(annualRecurringRevenue * conservativeMultiple) },
        { label: `Base (${formatNumber(multiple, 0)}x)`, value: formatCurrency(baseValuation) },
        { label: `Aggressive (${formatNumber(aggressiveMultiple, 0)}x)`, value: formatCurrency(annualRecurringRevenue * aggressiveMultiple) },
      ],
      note,
    };
  }, [multiple, revenue, revenueMode]);

  return (
    <CalculatorLayout
      inputs={
        <Card interactive={false} className="p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/70">
            Inputs
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            Revenue multiple
          </h2>
          <div className="mt-6 space-y-5">
            <Toggle
              label="Revenue mode"
              value={revenueMode}
              onChange={(value) => setRevenueMode(value as RevenueMode)}
              options={[
                { label: "MRR", value: "MRR" },
                { label: "ARR", value: "ARR" },
              ]}
              hint="Switch between monthly or annual recurring revenue."
            />
            <CurrencyInput
              label="Revenue"
              value={revenue}
              onChange={setRevenue}
              required
              hint={revenueMode === "MRR" ? "Monthly recurring revenue." : "Annual recurring revenue."}
            />
            <RangeInput
              label="Multiple"
              value={multiple}
              onChange={setMultiple}
              min={2}
              max={20}
              valueLabel={`${formatNumber(multiple, 0)}x`}
              hint="A simple revenue multiple for directional planning."
            />
          </div>
        </Card>
      }
      results={<ResultsCard {...results} />}
    />
  );
}
