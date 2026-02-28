type SanitizeNumericInputOptions = {
  allowDecimal?: boolean;
};

export function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
}

export function clampMin(value: number, min = 0) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.max(min, value);
}

export function clampPercent(value: number) {
  return clamp(value, 0, 100);
}

export function clampWholeNumber(value: number, min = 0, max?: number) {
  const rounded = Math.round(value);

  if (typeof max === "number") {
    return clamp(rounded, min, max);
  }

  return clampMin(rounded, min);
}

export function sanitizeNumericInput(
  input: string,
  { allowDecimal = true }: SanitizeNumericInputOptions = {},
) {
  const cleaned = input.replace(/[^\d.]/g, "");

  if (!allowDecimal) {
    return cleaned.replace(/\./g, "");
  }

  const [whole, ...fractionParts] = cleaned.split(".");
  const fraction = fractionParts.join("");

  if (cleaned.startsWith(".")) {
    return fraction ? `0.${fraction}` : "0.";
  }

  if (fractionParts.length === 0) {
    return whole;
  }

  return `${whole}.${fraction}`;
}

export function parseOptionalNumber(input: string) {
  const trimmed = input.trim();

  if (trimmed === "") {
    return null;
  }

  const parsed = Number(trimmed);

  return Number.isFinite(parsed) ? parsed : null;
}
