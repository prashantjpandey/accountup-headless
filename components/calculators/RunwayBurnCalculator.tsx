"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { CurrencyInput, PercentInput } from "@/components/calculators/Field";
import { ResultsCard, type ResultItem } from "@/components/calculators/ResultsCard";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatNumber, safeDivide } from "@/lib/format";

function getRunwayDate(months: number) {
  const daysToAdd = Math.round(months * 30.4);
  const estimate = new Date();

  estimate.setDate(estimate.getDate() + daysToAdd);

  return estimate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RunwayBurnCalculator() {
  const [cashOnHand, setCashOnHand] = useState<number | null>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number | null>(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number | null>(null);
  const [monthlyChangePercent, setMonthlyChangePercent] = useState<number | null>(0);

  const results = useMemo(() => {
    const revenue = monthlyRevenue ?? 0;
    const expenses = monthlyExpenses ?? 0;
    const monthlyChange = monthlyChangePercent ?? 0;
    const hasActivity = revenue > 0 || expenses > 0;
    const note =
      "Runway uses a flat-burn estimate. Collections timing, hiring changes, and one-off spend can materially move the outcome.";
    const items: ResultItem[] = [];

    if (!hasActivity) {
      return {
        summaryLabel: "Runway status",
        summaryValue: "Need inputs",
        message: "Enter expenses or revenue to model burn.",
        items,
        note,
      };
    }

    if (cashOnHand === null || monthlyExpenses === null) {
      return {
        summaryLabel: "Runway status",
        summaryValue: "Incomplete",
        message: "Cash on hand and monthly expenses are required to estimate runway.",
        items: [
          { label: "Monthly revenue", value: formatCurrency(revenue) },
          { label: "Monthly expenses", value: formatCurrency(expenses) },
        ],
        note,
      };
    }

    const netBurn = expenses - revenue;

    if (netBurn <= 0) {
      const surplus = revenue - expenses;

      return {
        summaryLabel: "Runway status",
        summaryValue: "Cash-flow positive",
        summaryTone: "positive" as const,
        message:
          surplus > 0
            ? `You are currently generating an estimated ${formatCurrency(surplus)} monthly surplus.`
            : "Revenue currently matches expenses, so you are not burning cash on a steady-state basis.",
        items: [
          { label: "Monthly surplus", value: formatCurrency(surplus), tone: "positive" as const },
          { label: "Cash on hand", value: formatCurrency(cashOnHand) },
          {
            label: "Monthly change assumption",
            value: `${formatNumber(monthlyChange, Number.isInteger(monthlyChange) ? 0 : 1)}%`,
          },
        ],
        note:
          "Positive cash flow here does not include debt service, delayed receivables, or one-off spend. Use it as an operating snapshot.",
      };
    }

    const runwayMonths = cashOnHand === 0 ? 0 : safeDivide(cashOnHand, netBurn) ?? 0;
    const changeMessage =
      monthlyChange === 0
        ? "Assumes current revenue and expenses stay broadly flat."
        : `If burn changes by ${formatNumber(monthlyChange, Number.isInteger(monthlyChange) ? 0 : 1)}% per month, actual runway will move faster than this flat-burn estimate.`;

    return {
      summaryLabel: "Net burn",
      summaryValue: `${formatCurrency(netBurn)} /mo`,
      message: changeMessage,
      items: [
        { label: "Runway", value: `${formatNumber(runwayMonths, 1)} months` },
        { label: "Estimated runway date", value: getRunwayDate(runwayMonths) },
        { label: "Cash on hand", value: formatCurrency(cashOnHand) },
      ],
      note,
    };
  }, [cashOnHand, monthlyChangePercent, monthlyExpenses, monthlyRevenue]);

  return (
    <CalculatorLayout
      inputs={
        <Card interactive={false} className="p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/70">
            Inputs
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            Current cash profile
          </h2>
          <div className="mt-6 space-y-5">
            <CurrencyInput
              label="Cash on hand"
              value={cashOnHand}
              onChange={setCashOnHand}
              required
              hint="Current cash available to fund operations."
            />
            <CurrencyInput
              label="Monthly revenue"
              value={monthlyRevenue}
              onChange={setMonthlyRevenue}
              hint="Defaults to 0 if you are pre-revenue."
            />
            <CurrencyInput
              label="Monthly expenses"
              value={monthlyExpenses}
              onChange={setMonthlyExpenses}
              required
              hint="Use total monthly operating spend."
            />
            <PercentInput
              label="Monthly change %"
              value={monthlyChangePercent}
              onChange={setMonthlyChangePercent}
              hint="Used only for the projection note, not the core runway formula."
            />
          </div>
        </Card>
      }
      results={<ResultsCard {...results} />}
    />
  );
}
