"use client";

import type { CSSProperties } from "react";
import { useReducedMotionSafe } from "@/lib/animations";

const EXPENSE_ROWS = [
  { vendor: "Uber", amount: "GBP 12.50", category: "Travel" },
  { vendor: "AWS", amount: "GBP 980", category: "Hosting" },
  { vendor: "Figma", amount: "GBP 45", category: "Subscriptions" },
  { vendor: "Pret A Manger", amount: "GBP 19.99", category: "Meals" },
  { vendor: "Stripe Fees", amount: "GBP 120", category: "Processing" },
  { vendor: "Google Ads", amount: "GBP 1,180", category: "Marketing" },
  { vendor: "Canva", amount: "GBP 99", category: "Design Tools" },
  { vendor: "Notion", amount: "GBP 80", category: "Productivity" },
] as const;

const BANK_ROWS = [
  "Revolut - Uber GBP 12.50",
  "Monzo - AWS GBP 980",
  "HSBC - Figma GBP 45",
  "Wise - Pret GBP 19.99",
  "NatWest - Stripe Fees GBP 120",
  "Lloyds - Google Ads GBP 1,180",
  "Amex - Canva GBP 99",
  "HSBC - Notion GBP 80",
] as const;

function animationStyle(delaySeconds: number, reduceMotion: boolean) {
  if (reduceMotion) {
    return undefined;
  }

  return {
    "--engine-delay": `${delaySeconds}s`,
  } as CSSProperties;
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4.5 10 3.4 3.5 7.6-8" />
    </svg>
  );
}

export function BookkeepingPayrollEngine({ lite = false }: { lite?: boolean }) {
  const reduceMotion = useReducedMotionSafe();
  const staticVisual = reduceMotion || lite;
  const expenseRows = lite ? EXPENSE_ROWS.slice(0, 4) : EXPENSE_ROWS;
  const bankRows = lite ? BANK_ROWS.slice(0, 4) : BANK_ROWS;

  return (
    <div className="finance-engine-stage mx-auto w-full max-w-[38rem] rounded-[1.35rem] border border-white/65 p-2.5 shadow-[0_24px_54px_-36px_rgba(17,17,19,0.34)] sm:max-w-[39rem] sm:p-3">
      <div className="rounded-[1.1rem] border border-black/10 bg-white/76 px-2.5 py-2.25 shadow-[0_18px_38px_-28px_rgba(17,17,19,0.22)] backdrop-blur-xl sm:px-3 sm:py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-display text-[1rem] font-semibold tracking-tight text-ink sm:text-[1.12rem]">
            Expenses & Reconciliation
          </h4>
          <div
            style={animationStyle(5.2, staticVisual)}
            className={`finance-engine-pill inline-flex items-center gap-1.5 rounded-full border border-emerald-500/18 bg-white/88 px-2.25 py-0.75 text-[0.68rem] font-medium text-charcoal shadow-[0_12px_24px_-20px_rgba(22,101,52,0.4)] ${staticVisual ? "is-static" : ""}`}
          >
            <span>All Synced</span>
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#17c617] text-white">
              <CheckIcon className="h-2.25 w-2.25" />
            </span>
          </div>
        </div>

        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <section className="finance-engine-panel rounded-[0.95rem] border border-purple/10 bg-[linear-gradient(180deg,rgba(218,217,249,0.34)_0%,rgba(255,255,255,0.72)_100%)] p-2.25 sm:p-2.25">
            <div className="rounded-[0.68rem] border border-white/70 bg-white/78 px-2.25 py-1.25 font-display text-[0.82rem] font-medium tracking-tight text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:text-[0.88rem]">
              Expenses
            </div>
            <ul className="mt-1.75 space-y-0.5">
              {expenseRows.map((row, index) => (
                <li
                  key={row.vendor}
                  style={animationStyle(index * 0.34, staticVisual)}
                  className={`finance-engine-expense-row grid grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)_0.9rem] items-center gap-1.25 rounded-[0.68rem] px-1.75 py-[0.22rem] ${staticVisual ? "is-static" : ""}`}
                >
                  <span className="truncate text-[0.72rem] font-medium text-ink/82 sm:text-[0.78rem]">
                    {row.vendor} - {row.amount}
                  </span>
                  <span
                      className={`finance-engine-category truncate text-right text-[0.66rem] text-charcoal/88 sm:text-[0.72rem] ${staticVisual ? "is-static" : ""}`}
                   >
                    {row.category}
                  </span>
                  <span
                      className={`finance-engine-check inline-flex h-3.25 w-3.25 items-center justify-center rounded-full bg-[#20c620] text-white ${staticVisual ? "is-static" : ""}`}
                   >
                    <CheckIcon className="h-2 w-2" />
                  </span>
                </li>
              ))}
            </ul>
            <div
              style={animationStyle(2.9, staticVisual)}
              className={`finance-engine-confirmation mt-2.25 flex items-center gap-1.75 rounded-[0.78rem] border border-emerald-500/12 bg-white/74 px-2.25 py-1.25 text-[0.72rem] font-medium text-ink shadow-[0_16px_32px_-28px_rgba(22,101,52,0.38)] ${staticVisual ? "is-static" : ""}`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#17c617] text-white shadow-[0_8px_18px_-12px_rgba(23,198,23,0.85)]">
                <CheckIcon className="h-3 w-3" />
              </span>
              <span>Transactions Categorised</span>
            </div>
          </section>

          <section className="finance-engine-panel rounded-[0.95rem] border border-primary/12 bg-[linear-gradient(180deg,rgba(234,196,173,0.34)_0%,rgba(255,255,255,0.74)_100%)] p-2.25 sm:p-2.25">
            <div className="rounded-[0.68rem] border border-white/70 bg-white/78 px-2.25 py-1.25 font-display text-[0.82rem] font-medium tracking-tight text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:text-[0.88rem]">
              Bank Feed
            </div>
            <ul className="mt-1.75 space-y-0.5">
              {bankRows.map((row, index) => (
                <li
                  key={row}
                  style={animationStyle(0.9 + index * 0.34, staticVisual)}
                  className={`finance-engine-feed-row flex items-center rounded-[0.68rem] px-1.75 py-[0.22rem] text-[0.72rem] font-medium text-ink/78 sm:text-[0.78rem] ${staticVisual ? "is-static" : ""}`}
                >
                  <span className="truncate">{row}</span>
                </li>
              ))}
            </ul>
            <div
              style={animationStyle(3.35, staticVisual)}
              className={`finance-engine-confirmation mt-2.25 flex items-center gap-1.75 rounded-[0.78rem] border border-emerald-500/12 bg-white/74 px-2.25 py-1.25 text-[0.72rem] font-medium text-ink shadow-[0_16px_32px_-28px_rgba(22,101,52,0.38)] ${staticVisual ? "is-static" : ""}`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#17c617] text-white shadow-[0_8px_18px_-12px_rgba(23,198,23,0.85)]">
                <CheckIcon className="h-3 w-3" />
              </span>
              <span>Reconciled</span>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-2 rounded-[1rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(246,244,241,0.94)_100%)] px-3 py-2.25 shadow-[0_18px_38px_-28px_rgba(17,17,19,0.22)] backdrop-blur-xl sm:px-3.5 sm:py-2.25">
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-display text-[0.92rem] font-semibold tracking-tight text-ink sm:text-[1.02rem]">
            GBP Payroll Run
          </h4>
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-charcoal/72">
            11 Employees
          </span>
        </div>
        <div className="mt-1.75 rounded-full bg-black/6 p-1">
          <div className="h-1.5 rounded-full bg-white/88">
            <div
              className={`finance-engine-progress-fill h-full rounded-full bg-[linear-gradient(90deg,#39c11a_0%,#2abf3e_58%,#6ed14f_100%)] ${staticVisual ? "is-static" : ""}`}
            />
          </div>
        </div>
        <div
          style={animationStyle(4.55, staticVisual)}
          className={`finance-engine-confirmation mt-1.75 flex items-center gap-1.75 rounded-[0.78rem] border border-emerald-500/12 bg-white/76 px-2.25 py-1.25 text-[0.72rem] font-medium text-ink shadow-[0_16px_32px_-28px_rgba(22,101,52,0.38)] ${staticVisual ? "is-static" : ""}`}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#17c617] text-white shadow-[0_8px_18px_-12px_rgba(23,198,23,0.85)]">
            <CheckIcon className="h-3 w-3" />
          </span>
          <span>All Employees Paid</span>
        </div>
      </div>
    </div>
  );
}
