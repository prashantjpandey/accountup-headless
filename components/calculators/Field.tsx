"use client";

import { useId, useState, type ReactNode } from "react";
import { formatNumber } from "@/lib/format";
import {
  clamp,
  clampMin,
  clampPercent,
  clampWholeNumber,
  parseOptionalNumber,
  sanitizeNumericInput,
} from "@/lib/validation";

type FieldProps = {
  id?: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
};

type BaseNumericInputProps = {
  id?: string;
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  allowDecimals?: boolean;
  prefix?: string;
  suffix?: string;
  kind: "currency" | "percent" | "number";
};

type ToggleProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    label: string;
    value: string;
  }>;
  hint?: string;
};

type RangeInputProps = {
  id?: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  hint?: string;
  valueLabel?: string;
};

function Field({ id, label, hint, required, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-purple"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-2 text-xs leading-6 text-charcoal">{hint}</p> : null}
    </div>
  );
}

function formatDisplayValue(
  kind: BaseNumericInputProps["kind"],
  value: number,
  allowDecimals: boolean,
) {
  if (kind === "currency") {
    return formatNumber(value, 0);
  }

  if (kind === "percent") {
    return formatNumber(value, Number.isInteger(value) ? 0 : 1);
  }

  if (!allowDecimals) {
    return formatNumber(value, 0);
  }

  return formatNumber(value, Number.isInteger(value) ? 0 : 1);
}

function BaseNumericInput({
  id,
  label,
  value,
  onChange,
  hint,
  placeholder = "0",
  required,
  min = 0,
  max,
  allowDecimals = true,
  prefix,
  suffix,
  kind,
}: BaseNumericInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [isFocused, setIsFocused] = useState(false);
  const [draft, setDraft] = useState("");

  function normalizeValue(nextValue: number) {
    if (kind === "percent") {
      return clampPercent(nextValue);
    }

    if (!allowDecimals) {
      return clampWholeNumber(nextValue, min, max);
    }

    if (typeof max === "number") {
      return clamp(nextValue, min, max);
    }

    return clampMin(nextValue, min);
  }

  function handleChange(nextDraft: string) {
    const sanitized = sanitizeNumericInput(nextDraft, { allowDecimal: allowDecimals });
    const parsed = parseOptionalNumber(sanitized);

    if (parsed === null) {
      setDraft(sanitized);
      onChange(null);
      return;
    }

    const normalized = normalizeValue(parsed);
    const normalizedDraft = normalized === parsed ? sanitized : String(normalized);

    setDraft(normalizedDraft);
    onChange(normalized);
  }

  const displayValue = isFocused
    ? draft
    : value === null
      ? ""
      : formatDisplayValue(kind, value, allowDecimals);

  return (
    <Field id={inputId} label={label} hint={hint} required={required}>
      <div className="relative flex min-h-12 items-center rounded-2xl border border-black/10 bg-white/88 px-4 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.36)] transition-colors focus-within:border-purple/40 focus-within:ring-4 focus-within:ring-purple/10">
        {prefix ? (
          <span className="mr-2 shrink-0 text-sm font-semibold text-charcoal">
            {prefix}
          </span>
        ) : null}
        <input
          id={inputId}
          type="text"
          inputMode={allowDecimals ? "decimal" : "numeric"}
          value={displayValue}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setDraft(value === null ? "" : String(value));
          }}
          onBlur={() => {
            setIsFocused(false);
            setDraft("");
          }}
          placeholder={placeholder}
          className="h-12 w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-charcoal/45"
        />
        {suffix ? (
          <span className="ml-2 shrink-0 text-sm font-semibold text-charcoal">
            {suffix}
          </span>
        ) : null}
      </div>
    </Field>
  );
}

export function CurrencyInput(
  props: Omit<BaseNumericInputProps, "kind" | "prefix" | "allowDecimals">,
) {
  return (
    <BaseNumericInput
      {...props}
      kind="currency"
      prefix="$"
      allowDecimals={true}
    />
  );
}

export function PercentInput(
  props: Omit<BaseNumericInputProps, "kind" | "suffix" | "min" | "max">,
) {
  return (
    <BaseNumericInput
      {...props}
      kind="percent"
      min={0}
      max={100}
      suffix="%"
      allowDecimals={true}
    />
  );
}

export function NumberInput(
  props: Omit<BaseNumericInputProps, "kind" | "prefix">,
) {
  return <BaseNumericInput {...props} kind="number" />;
}

export function Toggle({
  label,
  value,
  onChange,
  options,
  hint,
}: ToggleProps) {
  const generatedId = useId();

  return (
    <Field id={generatedId} label={label} hint={hint}>
      <div
        id={generatedId}
        className="grid grid-cols-2 gap-2 rounded-2xl border border-black/10 bg-white/78 p-2 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.36)]"
      >
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-purple text-white shadow-[0_12px_26px_-18px_rgba(59,64,197,0.62)]"
                  : "bg-transparent text-ink hover:bg-purple/6"
              }`}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

export function RangeInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  hint,
  valueLabel,
}: RangeInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <Field id={inputId} label={label} hint={hint}>
      <div className="rounded-2xl border border-black/10 bg-white/88 px-4 py-4 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.36)]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-charcoal">{min}x</span>
          <span className="rounded-full bg-purple/10 px-3 py-1 text-sm font-semibold text-purple">
            {valueLabel ?? `${value}x`}
          </span>
          <span className="text-sm text-charcoal">{max}x</span>
        </div>
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="pricing-range mt-5 w-full"
        />
      </div>
    </Field>
  );
}
