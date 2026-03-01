"use client";

import { useState } from "react";
import { FinstackStackRecommendationCard } from "@/components/finstack/FinstackStackRecommendationCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  buildStackRecommendation,
  isStackBuilderInputComplete,
  type StackBuilderInput,
  type StackBuilderLedger,
  type StackBuilderNeed,
  type StackBuilderRegion,
  type StackBuilderResult,
  type StackBuilderStage,
  type StackBuilderTeamSize,
} from "@/lib/finstack-stack-builder";
import type { FinstackTool } from "@/lib/finstack";

type FinstackStackBuilderProps = {
  tools: FinstackTool[];
};

const STAGE_OPTIONS: Array<{ value: StackBuilderStage; label: string }> = [
  { value: "Pre-seed", label: "Pre-seed" },
  { value: "Seed", label: "Seed" },
  { value: "Series A+", label: "Series A+" },
  { value: "SME", label: "SME" },
];

const TEAM_SIZE_OPTIONS: Array<{ value: StackBuilderTeamSize; label: string }> = [
  { value: "1-5", label: "1–5" },
  { value: "6-15", label: "6–15" },
  { value: "16-50", label: "16–50" },
  { value: "50+", label: "50+" },
];

const REGION_OPTIONS: Array<{ value: StackBuilderRegion; label: string }> = [
  { value: "UK", label: "UK" },
  { value: "EU", label: "EU" },
  { value: "US", label: "US" },
  { value: "Global", label: "Global" },
];

const LEDGER_OPTIONS: Array<{ value: StackBuilderLedger; label: string }> = [
  { value: "None", label: "None" },
  { value: "Xero", label: "Xero" },
  { value: "QuickBooks", label: "QuickBooks" },
  { value: "FreeAgent", label: "FreeAgent" },
  { value: "Sage", label: "Sage" },
];

const NEED_OPTIONS: Array<{ value: StackBuilderNeed; label: string }> = [
  { value: "Payroll", label: "Payroll" },
  { value: "VAT & compliance", label: "VAT & compliance" },
  { value: "Expenses", label: "Expenses" },
  { value: "Reporting", label: "Reporting" },
  { value: "Cash flow", label: "Cash flow" },
  { value: "AR/AP", label: "AR/AP" },
  { value: "Subscription billing", label: "Subscription billing" },
  { value: "Inventory", label: "Inventory" },
];

const INITIAL_INPUT: StackBuilderInput = {
  stage: "",
  teamSize: "",
  region: "",
  currentLedger: "",
  need: "",
};

type SelectFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (nextValue: string) => void;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
};

function SelectField({
  label,
  value,
  placeholder,
  onChange,
  options,
  disabled = false,
}: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30 disabled:cursor-not-allowed disabled:bg-black/3"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FinstackStackBuilder({ tools }: FinstackStackBuilderProps) {
  const [input, setInput] = useState<StackBuilderInput>(INITIAL_INPUT);
  const [result, setResult] = useState<StackBuilderResult | null>(null);
  const hasCmsData = tools.length > 0;
  const canGenerate = hasCmsData && isStackBuilderInputComplete(input);

  function updateInput<Key extends keyof StackBuilderInput>(key: Key, value: StackBuilderInput[Key]) {
    setInput((current) => ({ ...current, [key]: value }));
    setResult(null);
  }

  function handleGenerate() {
    if (!isStackBuilderInputComplete(input)) {
      return;
    }

    setResult(buildStackRecommendation(tools, input));
  }

  return (
    <div>
      <div className="rounded-[2rem] border border-black/8 bg-white/78 p-5 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.26)] sm:p-6 md:p-7">
        <div className="max-w-3xl">
          <p className="eyebrow-chip">Stack Builder</p>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">
            Build a finance stack that fits how your company actually operates.
          </h2>
          <p className="mt-3 text-sm leading-7 text-charcoal sm:text-base">
            Pick the basics and we&apos;ll recommend one best-fit tool per category, a few credible
            alternatives, and the rollout order to implement first.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SelectField
            label="Stage"
            value={input.stage}
            placeholder="Select stage"
            onChange={(value) => updateInput("stage", value as StackBuilderStage | "")}
            options={STAGE_OPTIONS}
            disabled={!hasCmsData}
          />
          <SelectField
            label="Team size"
            value={input.teamSize}
            placeholder="Select team size"
            onChange={(value) => updateInput("teamSize", value as StackBuilderTeamSize | "")}
            options={TEAM_SIZE_OPTIONS}
            disabled={!hasCmsData}
          />
          <SelectField
            label="Region"
            value={input.region}
            placeholder="Select region"
            onChange={(value) => updateInput("region", value as StackBuilderRegion | "")}
            options={REGION_OPTIONS}
            disabled={!hasCmsData}
          />
          <SelectField
            label="Current ledger"
            value={input.currentLedger}
            placeholder="Optional"
            onChange={(value) => updateInput("currentLedger", value as StackBuilderLedger)}
            options={LEDGER_OPTIONS}
            disabled={!hasCmsData}
          />
          <SelectField
            label="Biggest need"
            value={input.need}
            placeholder="Select biggest need"
            onChange={(value) => updateInput("need", value as StackBuilderNeed | "")}
            options={NEED_OPTIONS}
            disabled={!hasCmsData}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-black/6 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-charcoal">
            {hasCmsData
              ? "Recommendations use the same CMS fields already powering the directory cards."
              : "The builder needs the Wix CMS dataset before recommendations can be generated."}
          </p>
          <Button type="button" onClick={handleGenerate} disabled={!canGenerate}>
            Generate my stack
          </Button>
        </div>

        {!hasCmsData ? (
          <div className="mt-6 rounded-[1.5rem] border border-black/8 bg-background px-5 py-5 text-sm leading-7 text-charcoal">
            FinStack UK CMS data is unavailable right now, so the builder cannot score recommendations yet.
          </div>
        ) : null}
      </div>

      {result ? (
        <div className="mt-8 space-y-8">
          <section>
            <div>
              <p className="eyebrow-chip">Recommended stack</p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.15rem]">
                Best-fit tools by category
              </h3>
            </div>
            <div className="mt-6 grid items-start gap-5 sm:gap-6 xl:grid-cols-2">
              {result.recommendations.map((recommendation) => (
                <div key={recommendation.category}>
                  <FinstackStackRecommendationCard recommendation={recommendation} />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card interactive={false} className="p-6 md:p-7">
              <p className="eyebrow-chip">Setup order</p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
                Roll this out in the right sequence
              </h3>
              <ol className="mt-6 space-y-4">
                {result.setupOrder.map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-2xl border border-black/8 bg-background px-4 py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-7 text-charcoal">{step}</p>
                  </li>
                ))}
              </ol>
            </Card>

            <Card interactive={false} variant="emphasized" className="p-6 md:p-7">
              <p className="eyebrow-chip">This week</p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
                First actions for your selected priority
              </h3>
              <ul className="mt-6 space-y-4">
                {result.checklist.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-black/8 bg-white/86 px-4 py-4 text-sm leading-7 text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        </div>
      ) : null}
    </div>
  );
}
