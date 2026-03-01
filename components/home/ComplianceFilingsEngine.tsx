"use client";

import type { CSSProperties } from "react";
import { useReducedMotionSafe } from "@/lib/animations";

type ChecklistItem = {
  label: string;
};

type FilingRow = {
  label: string;
  status: "filed" | "pending" | "due-soon";
};

type InsightTile = {
  id: "coverage" | "countdown" | "penalty" | "rd-credits";
  title: string;
  subtitle: string;
  value: string;
  accent: "green" | "lavender" | "purple";
};

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { label: "VAT Registrations & returns" },
  { label: "Statutory Accounts" },
  { label: "Tax filings" },
  { label: "International Compliance" },
  { label: "Annual share schemes" },
];

const FILING_ROWS: FilingRow[] = [
  { label: "VAT filings", status: "filed" },
  { label: "Statutory Accounts", status: "filed" },
  { label: "Corporation Tax", status: "pending" },
  { label: "R&D credits", status: "filed" },
  { label: "Share schemes", status: "due-soon" },
];

const INSIGHT_TILES: InsightTile[] = [
  {
    id: "coverage",
    title: "Coverage",
    subtitle: "6 compliance item",
    value: "All filed",
    accent: "green",
  },
  {
    id: "countdown",
    title: "Deadlines Countdown",
    subtitle: "Next important date",
    value: "27 days",
    accent: "lavender",
  },
  {
    id: "penalty",
    title: "Penalty Avoidance",
    subtitle: "Year to date",
    value: "0 late filing this year",
    accent: "green",
  },
  {
    id: "rd-credits",
    title: "R&D credits saved",
    subtitle: "Approved & pending",
    value: "EUR 85,000",
    accent: "green",
  },
];

function animationStyle(delaySeconds: number, reduceMotion: boolean) {
  if (reduceMotion) {
    return undefined;
  }

  return {
    "--compliance-delay": `${delaySeconds}s`,
  } as CSSProperties;
}

function ShieldIcon({ className = "" }: { className?: string }) {
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
      <path d="M10 2.5c2 .9 4 1.4 6 1.5v5.1c0 3.6-2.3 6.6-6 8.4-3.7-1.8-6-4.8-6-8.4V4c2-.1 4-.6 6-1.5Z" />
      <path d="m7.7 9.9 1.6 1.7 3.2-3.5" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="7.25" />
      <path d="M2.9 10h14.2" />
      <path d="M10 2.75c2 2.06 3.1 4.56 3.1 7.25S12 15.19 10 17.25C8 15.19 6.9 12.69 6.9 10S8 4.81 10 2.75Z" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
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
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 6.2v4.2l2.7 1.6" />
    </svg>
  );
}

function TrophyIcon({ className = "" }: { className?: string }) {
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
      <path d="M6 3.5h8v2.7a4 4 0 0 1-8 0V3.5Z" />
      <path d="M7.3 14.6h5.4" />
      <path d="M10 10.2v4.4" />
      <path d="M6 4H3.8c0 2.2 1.2 3.9 3.1 4.5" />
      <path d="M14 4h2.2c0 2.2-1.2 3.9-3.1 4.5" />
    </svg>
  );
}

function MoneyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.75" y="5.1" width="14.5" height="9.8" rx="1.7" />
      <circle cx="10" cy="10" r="2.1" />
      <path d="M5.4 7.7h.01M14.6 12.3h.01" />
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

function InsightIcon({
  id,
  className = "",
}: {
  id: InsightTile["id"];
  className?: string;
}) {
  if (id === "coverage") {
    return <ShieldIcon className={className} />;
  }
  if (id === "countdown") {
    return <ClockIcon className={className} />;
  }
  if (id === "penalty") {
    return <TrophyIcon className={className} />;
  }
  return <MoneyIcon className={className} />;
}

export function ComplianceFilingsEngine() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className="compliance-engine-stage mx-auto w-full max-w-[39rem] rounded-[1.35rem] border border-white/65 p-2.5 shadow-[0_24px_54px_-36px_rgba(17,17,19,0.34)] sm:max-w-[40rem] sm:p-3">
      <div className="compliance-engine-shell rounded-[1.1rem] border border-black/10 bg-white/76 px-2.5 py-2.25 shadow-[0_18px_38px_-28px_rgba(17,17,19,0.22)] backdrop-blur-xl sm:px-3 sm:py-2.5">
        <section className="compliance-engine-panel rounded-[0.95rem] border border-black/8 bg-white/74 px-2.25 py-2.25 shadow-[0_14px_30px_-26px_rgba(17,17,19,0.2)]">
          <div className="flex flex-wrap items-start justify-between gap-2.5">
            <div className="font-display text-[0.84rem] font-medium tracking-tight text-ink sm:text-[0.9rem]">
              Checklist
            </div>
            <div
              style={animationStyle(2.65, reduceMotion)}
              className={`compliance-engine-system-status flex items-center gap-1.5 text-[0.66rem] text-charcoal/76 ${reduceMotion ? "is-static" : ""}`}
            >
              <span>System status</span>
              <span className="font-medium text-charcoal/82">All green</span>
            </div>
          </div>
          <div className="mt-2.25 flex flex-wrap gap-1.5">
            {CHECKLIST_ITEMS.map((item, index) => (
              <div
                key={item.label}
                style={animationStyle(index * 0.22, reduceMotion)}
                className={`compliance-engine-chip inline-flex items-center gap-1.5 rounded-full border border-[#55d388] bg-[#dcf8e7] px-2 py-0.75 text-[0.68rem] font-medium text-[#179a46] shadow-[0_10px_18px_-18px_rgba(23,154,70,0.45)] ${reduceMotion ? "is-static" : ""}`}
              >
                <span className="inline-flex h-3.25 w-3.25 items-center justify-center rounded-full text-[#179a46]">
                  <CheckIcon className="h-2.4 w-2.4" />
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <section
            style={animationStyle(1.15, reduceMotion)}
            className={`compliance-engine-kpi rounded-[0.95rem] border border-black/8 bg-white/74 px-2.5 py-2.5 shadow-[0_14px_30px_-26px_rgba(17,17,19,0.2)] ${reduceMotion ? "is-static" : ""}`}
          >
            <div className="flex items-start gap-2 text-[#29bf2a]">
              <ShieldIcon className="mt-0.5 h-5 w-5" />
              <div>
                <div className="text-[0.76rem] font-medium text-ink/86 sm:text-[0.82rem]">
                  Total Filings Covered
                </div>
                <div className="text-[0.68rem] text-charcoal/76">This year</div>
              </div>
            </div>
            <div className="mt-2.25 text-[2.15rem] leading-none font-medium tracking-tight text-ink/78">
              24
            </div>
          </section>

          <section
            style={animationStyle(1.45, reduceMotion)}
            className={`compliance-engine-kpi rounded-[0.95rem] border border-black/8 bg-white/74 px-2.5 py-2.5 shadow-[0_14px_30px_-26px_rgba(17,17,19,0.2)] ${reduceMotion ? "is-static" : ""}`}
          >
            <div className="flex items-start gap-2 text-[#b18cff]">
              <GlobeIcon className="mt-0.5 h-5 w-5" />
              <div>
                <div className="text-[0.76rem] font-medium text-ink/86 sm:text-[0.82rem]">
                  Jurisdiction Covered
                </div>
                <div className="text-[0.68rem] text-charcoal/76">
                  Live compliance map
                </div>
              </div>
            </div>
            <div className="mt-2.25 flex items-end gap-1.5">
              <span className="text-[2.15rem] leading-none font-medium tracking-tight text-ink/78">
                3
              </span>
              <span className="pb-1 text-[0.72rem] font-medium text-charcoal/72">
                UK
              </span>
            </div>
          </section>
        </div>

        <div className="mt-2 grid gap-2 sm:grid-cols-[1.08fr_0.92fr]">
          <section className="compliance-engine-panel rounded-[0.95rem] border border-black/8 bg-white/74 px-2.25 py-2.25 shadow-[0_14px_30px_-26px_rgba(17,17,19,0.2)]">
            <div className="flex items-center justify-between gap-2">
              <div className="font-display text-[0.84rem] font-medium tracking-tight text-ink sm:text-[0.9rem]">
                Your Finance Engine
              </div>
              <div className="text-[0.64rem] text-charcoal/72">This month</div>
            </div>
            <div className="mt-2 space-y-1.25">
              {FILING_ROWS.map((row, index) => (
                <div
                  key={row.label}
                  style={animationStyle(1.9 + index * 0.28, reduceMotion)}
                  className={`compliance-engine-filing-row compliance-engine-filing-row-${row.status} flex items-center justify-between gap-2 rounded-[0.82rem] border border-black/6 px-2.25 py-1.75 ${reduceMotion ? "is-static" : ""}`}
                >
                  <span className="text-[0.8rem] font-medium text-ink/82 sm:text-[0.86rem]">
                    {row.label}
                  </span>
                  <span
                    className={`compliance-engine-status compliance-engine-status-${row.status} inline-flex items-center rounded-full px-2 py-0.55 text-[0.62rem] font-medium ${reduceMotion ? "is-static" : ""}`}
                  >
                    {row.status === "filed"
                      ? "Filed"
                      : row.status === "pending"
                      ? "Pending"
                      : "Due soon"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="compliance-engine-panel rounded-[0.95rem] border border-black/8 bg-white/74 px-2.25 py-2.25 shadow-[0_14px_30px_-26px_rgba(17,17,19,0.2)]">
            <div className="flex items-center justify-between gap-2">
              <div className="font-display text-[0.84rem] font-medium tracking-tight text-ink sm:text-[0.9rem]">
                Founder Insight
              </div>
              <div className="text-[0.64rem] text-charcoal/72">This month</div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1.25">
              {INSIGHT_TILES.map((tile, index) => (
                <div
                  key={tile.id}
                  style={animationStyle(3.35 + index * 0.24, reduceMotion)}
                  className={`compliance-engine-insight-tile compliance-engine-insight-${tile.accent} rounded-[0.82rem] border border-black/6 px-2 py-2 ${reduceMotion ? "is-static" : ""}`}
                >
                  <div className="flex items-start gap-2">
                    <InsightIcon
                      id={tile.id}
                      className={`mt-0.25 h-4.5 w-4.5 ${
                        tile.accent === "green"
                          ? "text-[#4ebd2a]"
                          : tile.accent === "lavender"
                          ? "text-[#b48bff]"
                          : "text-[#8f73ff]"
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="truncate text-[0.72rem] font-medium text-ink/84">
                        {tile.title}
                      </div>
                      <div className="text-[0.64rem] leading-relaxed text-charcoal/72">
                        {tile.subtitle}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`mt-2 text-[0.76rem] font-medium leading-snug text-ink/78 ${
                      tile.id === "countdown"
                        ? "compliance-engine-countdown"
                        : tile.id === "rd-credits"
                        ? "compliance-engine-rd-value"
                        : ""
                    } ${reduceMotion ? "is-static" : ""}`}
                  >
                    {tile.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
