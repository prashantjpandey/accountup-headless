"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { CurrencyInput, PercentInput } from "@/components/calculators/Field";
import { ResultsCard } from "@/components/calculators/ResultsCard";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatNumber, safeDivide } from "@/lib/format";

function getPaybackStatus(months: number) {
  if (months <= 3) {
    return "Fast payback";
  }

  if (months <= 12) {
    return "Normal";
  }

  return "Slow payback";
}

export function CacPaybackCalculator() {
  const [cac, setCac] = useState<number | null>(null);
  const [arpa, setArpa] = useState<number | null>(null);
  const [grossMarginPercent, setGrossMarginPercent] = useState<number | null>(80);

  const results = useMemo(() => {
    const margin = grossMarginPercent ?? 0;
    const note =
      "Payback is based on gross profit only. It does not factor in churn, cash collection timing, support costs, or expansion revenue.";

    if (cac === null || arpa === null) {
      return {
        summaryLabel: "CAC payback",
        summaryValue: "Incomplete",
        message: "Enter CAC and ARPA to estimate payback.",
        items: [
          { label: "Gross margin", value: `${formatNumber(margin, Number.isInteger(margin) ? 0 : 1)}%` },
        ],
        note,
      };
    }

    const grossProfitPerMonth = arpa * (margin / 100);

    if (grossProfitPerMonth <= 0) {
      return {
        summaryLabel: "CAC payback",
        summaryValue: "Not possible",
        summaryTone: "warning" as const,
        message: "Payback not possible with current inputs.",
        items: [
          { label: "Gross profit / month", value: formatCurrency(grossProfitPerMonth) },
          { label: "CAC", value: formatCurrency(cac) },
        ],
        note,
      };
    }

    const paybackMonths = safeDivide(cac, grossProfitPerMonth) ?? 0;

    return {
      summaryLabel: "CAC payback",
      summaryValue: `${formatNumber(paybackMonths, 1)} months`,
      badge: getPaybackStatus(paybackMonths),
      message: `Each customer contributes about ${formatCurrency(grossProfitPerMonth)} in monthly gross profit.`,
      items: [
        { label: "Gross profit / customer / month", value: formatCurrency(grossProfitPerMonth) },
        { label: "CAC", value: formatCurrency(cac) },
        { label: "Gross margin", value: `${formatNumber(margin, Number.isInteger(margin) ? 0 : 1)}%` },
      ],
      note,
    };
  }, [arpa, cac, grossMarginPercent]);

  return (
    <CalculatorLayout
      inputs={
        <Card interactive={false} className="p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/70">
            Inputs
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            Unit economics
          </h2>
          <div className="mt-6 space-y-5">
            <CurrencyInput
              label="CAC"
              value={cac}
              onChange={setCac}
              required
              hint="Use fully-loaded acquisition cost per customer."
            />
            <CurrencyInput
              label="ARPA"
              value={arpa}
              onChange={setArpa}
              required
              hint="Monthly average revenue per account."
            />
            <PercentInput
              label="Gross margin %"
              value={grossMarginPercent}
              onChange={setGrossMarginPercent}
              hint="Defaults to 80% for a simple SaaS-style baseline."
            />
          </div>
        </Card>
      }
      results={<ResultsCard {...results} />}
    />
  );
}
