"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { CurrencyInput, NumberInput } from "@/components/calculators/Field";
import { ResultsCard } from "@/components/calculators/ResultsCard";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatNumber, safeDivide } from "@/lib/format";

export function BreakEvenHiringCalculator() {
  const [monthlyHireCost, setMonthlyHireCost] = useState<number | null>(null);
  const [monthlyImpact, setMonthlyImpact] = useState<number | null>(null);
  const [rampMonths, setRampMonths] = useState<number | null>(2);

  const results = useMemo(() => {
    const ramp = rampMonths ?? 0;
    const note =
      "This model treats ramp as a pure cost period and assumes monthly impact becomes steady after ramp finishes.";

    if (monthlyHireCost === null || monthlyImpact === null) {
      return {
        summaryLabel: "Break-even estimate",
        summaryValue: "Incomplete",
        message: "Enter monthly hire cost and expected impact to estimate payback.",
        items: [{ label: "Ramp time", value: `${formatNumber(ramp, 0)} months` }],
        note,
      };
    }

    const netGainAfterRamp = monthlyImpact - monthlyHireCost;
    const totalRampCost = monthlyHireCost * ramp;

    if (netGainAfterRamp <= 0) {
      return {
        summaryLabel: "Break-even estimate",
        summaryValue: "Not under current assumptions",
        summaryTone: "warning" as const,
        message: "This hire does not break even under these assumptions.",
        items: [
          { label: "Net gain after ramp", value: formatCurrency(netGainAfterRamp), tone: "warning" as const },
          { label: "Total ramp cost", value: formatCurrency(totalRampCost) },
          { label: "Ramp time", value: `${formatNumber(ramp, 0)} months` },
        ],
        note,
      };
    }

    const monthsToRecoverRamp = safeDivide(totalRampCost, netGainAfterRamp) ?? 0;
    const breakEvenMonthEstimate = ramp + monthsToRecoverRamp;

    return {
      summaryLabel: "Break-even estimate",
      summaryValue: `${formatNumber(breakEvenMonthEstimate, 1)} months`,
      message: `After ramp, the hire is assumed to add ${formatCurrency(netGainAfterRamp)} in net value per month.`,
      items: [
        { label: "Net gain after ramp", value: formatCurrency(netGainAfterRamp), tone: "positive" as const },
        { label: "Total ramp cost", value: formatCurrency(totalRampCost) },
        { label: "Months to recover ramp cost", value: `${formatNumber(monthsToRecoverRamp, 1)} months` },
      ],
      note,
    };
  }, [monthlyHireCost, monthlyImpact, rampMonths]);

  return (
    <CalculatorLayout
      inputs={
        <Card interactive={false} className="p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/70">
            Inputs
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            Hiring assumptions
          </h2>
          <div className="mt-6 space-y-5">
            <CurrencyInput
              label="Monthly fully-loaded cost of hire"
              value={monthlyHireCost}
              onChange={setMonthlyHireCost}
              required
              hint="Include salary, taxes, benefits, tooling, and manager overhead."
            />
            <CurrencyInput
              label="Expected monthly impact"
              value={monthlyImpact}
              onChange={setMonthlyImpact}
              required
              hint="Use either extra revenue or cost savings, not both."
            />
            <NumberInput
              label="Ramp time"
              value={rampMonths}
              onChange={setRampMonths}
              allowDecimals={false}
              suffix="months"
              hint="Defaults to 2 months before the hire is fully productive."
            />
          </div>
        </Card>
      }
      results={<ResultsCard {...results} />}
    />
  );
}
