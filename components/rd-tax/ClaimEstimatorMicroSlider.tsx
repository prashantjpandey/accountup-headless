"use client";

import { useState } from "react";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const MIN_SPEND = 50000;
const MAX_SPEND = 500000;
const STEP = 10000;
const DEFAULT_SPEND = 200000;

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function ClaimEstimatorMicroSlider() {
  const [spend, setSpend] = useState(DEFAULT_SPEND);
  const estimatedRelief = Math.round(spend * 0.2);
  const progress = ((spend - MIN_SPEND) / (MAX_SPEND - MIN_SPEND)) * 100;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(17rem,0.88fr)] lg:items-end">
      <div className="rounded-[1.6rem] border border-black/8 bg-white/92 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/72">
            Quick estimator
          </p>
          <p className="text-sm font-medium text-charcoal">Illustrative only</p>
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-charcoal">R&amp;D Spend</p>
            <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
              {formatCurrency(spend)}
            </p>
          </div>
          <p className="max-w-[18rem] text-sm leading-6 text-charcoal">
            Adjust spend to get a quick directional view based on the 20% merged scheme rate.
          </p>
        </div>
        <div className="mt-5">
          <input
            type="range"
            min={MIN_SPEND}
            max={MAX_SPEND}
            step={STEP}
            value={spend}
            aria-label="R&D spend"
            onChange={(event) => setSpend(Number(event.target.value))}
            className="pricing-range w-full"
            style={{
              background: `linear-gradient(90deg, rgba(105,106,246,1) 0%, rgba(129,140,248,0.96) ${progress}%, rgba(226,232,240,0.88) ${progress}%, rgba(226,232,240,0.88) 100%)`,
            }}
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-charcoal/72">
            <span>{formatCurrency(MIN_SPEND)}</span>
            <span>{formatCurrency(MAX_SPEND)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] bg-[radial-gradient(circle_at_18%_18%,rgba(105,106,246,0.18),transparent_34%),radial-gradient(circle_at_88%_14%,rgba(96,165,250,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,247,252,0.9))] p-5 shadow-[0_18px_40px_-34px_rgba(105,106,246,0.24)] transition-[box-shadow,transform] duration-200 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/72">
          Estimated Relief
        </p>
        <p className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink tabular-nums">
          {formatCurrency(estimatedRelief)}
        </p>
        <p className="mt-3 max-w-[18rem] text-sm leading-6 text-charcoal">
          Directional output only. Final benefit depends on qualifying spend, profitability, and
          scheme eligibility.
        </p>
      </div>
    </div>
  );
}
