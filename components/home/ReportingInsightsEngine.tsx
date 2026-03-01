"use client";

import type { CSSProperties } from "react";
import { useReducedMotionSafe } from "@/lib/animations";

type MetricCard = {
  title: string;
  value: string;
  accent?: "green";
};

type TrendPoint = {
  month: string;
  value: number;
};

type RevenueExpensePoint = {
  month: string;
  expenses: number;
  revenue: number;
};

type StatusChip = {
  label: string;
  status: string;
};

const METRIC_CARDS: MetricCard[] = [
  { title: "Cash Runway", value: "14" },
  { title: "Burn rate", value: "\u00A3120k/mo" },
  { title: "Revenue growth", value: "+12%mom", accent: "green" },
  { title: "Gross Margin", value: "68%" },
];

const RUNWAY_TREND: TrendPoint[] = [
  { month: "Feb", value: 86 },
  { month: "Mar", value: 81 },
  { month: "Apr", value: 74 },
  { month: "May", value: 69 },
  { month: "Jun", value: 66 },
  { month: "Jul", value: 62 },
  { month: "Aug", value: 54 },
];

const REVENUE_EXPENSES: RevenueExpensePoint[] = [
  { month: "Feb", expenses: 36, revenue: 28 },
  { month: "Mar", expenses: 38, revenue: 27 },
  { month: "Apr", expenses: 45, revenue: 31 },
  { month: "May", expenses: 52, revenue: 38 },
  { month: "Jun", expenses: 58, revenue: 43 },
  { month: "Jul", expenses: 61, revenue: 46 },
  { month: "Aug", expenses: 67, revenue: 50 },
];

const STATUS_CHIPS: StatusChip[] = [
  { label: "Board Pack", status: "Ready" },
  { label: "forecast", status: "Updated" },
  { label: "Budgets vs Actual", status: "Tracked" },
  { label: "KPI dashboard", status: "Live" },
];

const TREND_POINTS = RUNWAY_TREND.map((point, index, points) => {
  const left =
    points.length === 1 ? 8 : 8 + (index / (points.length - 1)) * 84;
  const top = 100 - point.value;

  return {
    ...point,
    left,
    top,
  };
});

const RUNWAY_PATH = TREND_POINTS.map((point, index) =>
  `${index === 0 ? "M" : "L"} ${point.left} ${point.top}`
).join(" ");

function animationStyle(delaySeconds: number, reduceMotion: boolean) {
  if (reduceMotion) {
    return undefined;
  }

  return {
    "--reporting-delay": `${delaySeconds}s`,
  } as CSSProperties;
}

function ArrowUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.25 14.75 14.75 5.25" />
      <path d="M8.6 5.25h6.15v6.15" />
    </svg>
  );
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

export function ReportingInsightsEngine() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className="reporting-engine-stage mx-auto w-full max-w-[39rem] rounded-[1.35rem] border border-white/65 p-2.5 shadow-[0_24px_54px_-36px_rgba(17,17,19,0.34)] sm:max-w-[40rem] sm:p-3">
      <div className="reporting-engine-shell rounded-[1.1rem] border border-black/10 bg-white/76 px-3 py-2.5 shadow-[0_18px_38px_-28px_rgba(17,17,19,0.22)] backdrop-blur-xl sm:px-3.5 sm:py-3">
        <div className="font-display text-[1rem] font-semibold tracking-tight text-ink sm:text-[1.1rem]">
          Reporting & Insights
        </div>

        <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {METRIC_CARDS.map((card, index) => (
            <section
              key={card.title}
              style={animationStyle(index * 0.18, reduceMotion)}
              className={`reporting-engine-metric rounded-[0.95rem] border border-black/8 bg-white/74 px-2.5 py-2.25 shadow-[0_14px_30px_-26px_rgba(17,17,19,0.2)] ${reduceMotion ? "is-static" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-[0.82rem] font-medium text-ink/82 sm:text-[0.88rem]">
                  {card.title}
                </div>
                {card.accent === "green" ? (
                  <ArrowUpIcon className="h-4.5 w-4.5 text-[#31ba2f]" />
                ) : null}
              </div>
              <div className="mt-2.25 text-[1.6rem] leading-none font-medium tracking-tight text-ink/78 sm:text-[1.75rem]">
                {card.value}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          <section className="reporting-engine-panel rounded-[0.95rem] border border-black/8 bg-white/74 px-2.25 py-2.25 shadow-[0_14px_30px_-26px_rgba(17,17,19,0.2)]">
            <div className="text-[0.82rem] font-medium text-ink/82 sm:text-[0.88rem]">
              Cash Runway Trend
            </div>
            <div className="reporting-engine-chart mt-2.25">
              <div className="reporting-engine-plot">
                <div className="reporting-engine-grid">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <span key={index} className="reporting-engine-grid-line" />
                  ))}
                </div>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className={`reporting-engine-line-svg ${reduceMotion ? "is-static" : ""}`}
                >
                  <path
                    d={RUNWAY_PATH}
                    className="reporting-engine-line-path"
                    style={animationStyle(0.9, reduceMotion)}
                  />
                  {TREND_POINTS.map((point, index) => (
                    <circle
                      key={point.month}
                      cx={point.left}
                      cy={point.top}
                      r="1.1"
                      style={animationStyle(1 + index * 0.18, reduceMotion)}
                      className={`reporting-engine-line-point ${reduceMotion ? "is-static" : ""}`}
                    />
                  ))}
                </svg>
              </div>
              <div className="reporting-engine-months">
                {RUNWAY_TREND.map((point) => (
                  <span key={point.month}>{point.month}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="reporting-engine-panel rounded-[0.95rem] border border-black/8 bg-white/74 px-2.25 py-2.25 shadow-[0_14px_30px_-26px_rgba(17,17,19,0.2)]">
            <div className="text-[0.82rem] font-medium text-ink/82 sm:text-[0.88rem]">
              Revenue vs Expenses
            </div>
            <div className="reporting-engine-chart mt-2.25">
              <div className="reporting-engine-plot">
                <div className="reporting-engine-grid">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <span key={index} className="reporting-engine-grid-line" />
                  ))}
                </div>
                <div className="reporting-engine-bars-stage">
                  {REVENUE_EXPENSES.map((point, index) => (
                    <div key={point.month} className="reporting-engine-bar-group">
                      <span
                        style={
                          {
                            "--bar-height": `${point.expenses}%`,
                            "--reporting-delay": `${1.35 + index * 0.14}s`,
                          } as CSSProperties
                        }
                        className={`reporting-engine-bar reporting-engine-expense-bar ${reduceMotion ? "is-static" : ""}`}
                      />
                      <span
                        style={
                          {
                            "--bar-height": `${point.revenue}%`,
                            "--reporting-delay": `${1.45 + index * 0.14}s`,
                          } as CSSProperties
                        }
                        className={`reporting-engine-bar reporting-engine-revenue-bar ${reduceMotion ? "is-static" : ""}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="reporting-engine-months">
                {REVENUE_EXPENSES.map((point) => (
                  <span key={point.month}>{point.month}</span>
                ))}
              </div>
              <div className="reporting-engine-legend mt-2">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-[0.3rem] bg-[#f0bf8e]" />
                  <span>- expenses</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-[0.3rem] bg-[#b8b0ef]" />
                  <span>- revenue</span>
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {STATUS_CHIPS.map((chip, index) => (
            <div
              key={chip.label}
              style={animationStyle(2.35 + index * 0.16, reduceMotion)}
              className={`reporting-engine-status-chip inline-flex items-center justify-center gap-2 rounded-[0.82rem] border border-[#7fd38c]/40 bg-[linear-gradient(180deg,rgba(191,225,183,0.94)_0%,rgba(169,206,159,0.92)_100%)] px-2.5 py-1.25 text-[0.72rem] font-medium text-[#32563a] shadow-[0_12px_20px_-18px_rgba(50,86,58,0.34)] ${reduceMotion ? "is-static" : ""}`}
            >
              <span>{chip.label} -</span>
              <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#109d10] text-white">
                <CheckIcon className="h-2.4 w-2.4" />
              </span>
              <span>{chip.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
