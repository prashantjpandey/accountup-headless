const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return currencyFormatter.format(0);
  }

  return currencyFormatter.format(value);
}

export function formatNumber(value: number, decimals = 0) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function safeDivide(a: number, b: number) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) {
    return null;
  }

  const result = a / b;

  return Number.isFinite(result) ? result : null;
}
