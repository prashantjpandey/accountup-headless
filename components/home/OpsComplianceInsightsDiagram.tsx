"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import {
  fadeUp,
  softScaleIn,
  useReducedMotionSafe,
} from "@/lib/animations";

type DiagramStep = {
  id: "daily-ops" | "compliance-filings" | "insights";
  title: string;
  description: string;
  label: string;
  accent: "orange" | "lavender" | "blue";
  stripe: string;
};

const DIAGRAM_STEPS: DiagramStep[] = [
  {
    id: "daily-ops",
    title: "daily ops",
    description: "recording expenses/spends, payroll reconciliation, invoicing",
    label: "automation engine",
    accent: "orange",
    stripe: "linear-gradient(90deg, var(--primary) 0%, color-mix(in srgb, var(--warm-peach) 82%, white) 100%)",
  },
  {
    id: "compliance-filings",
    title: "compliance & filings",
    description: "corp tax, VAT, year end accounts, other statutory obligations",
    label: "expert human in the loop",
    accent: "lavender",
    stripe: "linear-gradient(90deg, var(--purple) 0%, color-mix(in srgb, var(--lavender-2) 78%, white) 100%)",
  },
  {
    id: "insights",
    title: "insights",
    description:
      "dashboards, reports, cashflow forecasts, budgets vs actuals, custom KPIs",
    label: "decision intelligence",
    accent: "blue",
    stripe: "linear-gradient(90deg, var(--purple) 0%, color-mix(in srgb, var(--purple) 48%, var(--primary) 52%) 52%, color-mix(in srgb, var(--warm-peach) 82%, white) 100%)",
  },
];

const listStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const ACCENT_STYLES: Record<DiagramStep["accent"], CSSProperties> = {
  orange: {
    "--ops-accent": "var(--primary)",
    "--ops-accent-soft": "color-mix(in srgb, var(--primary) 34%, white)",
    "--ops-accent-muted": "color-mix(in srgb, var(--primary) 14%, white)",
  } as CSSProperties,
  lavender: {
    "--ops-accent": "var(--purple)",
    "--ops-accent-soft": "color-mix(in srgb, var(--lavender-2) 72%, white)",
    "--ops-accent-muted": "color-mix(in srgb, var(--purple) 14%, white)",
  } as CSSProperties,
  blue: {
    "--ops-accent": "color-mix(in srgb, var(--purple) 82%, #9bb6ff 18%)",
    "--ops-accent-soft":
      "color-mix(in srgb, var(--purple) 22%, #9bb6ff 78%)",
    "--ops-accent-muted": "color-mix(in srgb, var(--purple) 14%, white)",
  } as CSSProperties,
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.75v13.5" />
      <path d="m7.75 13 4.25 4.75L16.25 13" />
    </svg>
  );
}

export function OpsComplianceInsightsDiagram() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.figure
      className="ops-diagram-surface relative w-full max-w-[39rem] overflow-hidden rounded-[2rem] border border-white/55 px-5 pt-3.5 pb-5 shadow-[0_28px_64px_-40px_rgba(20,24,50,0.42)] sm:px-6 sm:pt-4 sm:pb-6 md:px-7 md:pt-4 md:pb-6"
      variants={softScaleIn}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.35 }}
    >
      <figcaption className="sr-only">
        Accountup operating model diagram linking daily operations, compliance,
        and reporting insights.
      </figcaption>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 right-2 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-purple/10 blur-3xl" />
      </div>
      <motion.ol
        className="relative space-y-2 sm:space-y-2.5 md:space-y-2.5"
        variants={listStagger}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.4 }}
      >
        {DIAGRAM_STEPS.map((step) => (
          <motion.li
            key={step.id}
            className="group rounded-[1.35rem] outline-none focus-visible:outline-none"
            tabIndex={0}
            variants={fadeUp}
            style={ACCENT_STYLES[step.accent]}
          >
            <div className="grid gap-2 md:grid-cols-[8.2rem_minmax(0,1fr)] md:items-center md:gap-2">
              <div className="flex items-center gap-2 md:justify-end md:pr-0.5">
                <span className="ops-diagram-fuel-line hidden sm:block w-6 opacity-55 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100" />
                <span className="max-w-[5.6rem] text-left text-[0.66rem] leading-[0.84rem] font-medium lowercase tracking-[0.01em] text-[color:var(--ops-accent)] opacity-[0.82] transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100 md:text-right">
                  {step.label}
                </span>
                <span className="ops-diagram-fuel-line ops-diagram-fuel-line-flow hidden md:block md:w-9 md:group-hover:w-11 md:group-focus-within:w-11" />
              </div>
              <div className="min-w-0 md:max-w-[22.4rem]">
                <h3 className="font-display text-[0.96rem] font-semibold lowercase tracking-tight text-ink sm:text-[1.1rem]">
                  {step.title}
                </h3>
                <div className="mt-0.5 flex h-4 items-center pl-1.5 sm:pl-2">
                  <span className="text-[color:var(--ops-accent)] opacity-[0.72] transition duration-200 group-hover:translate-y-0.5 group-hover:opacity-100 group-focus-within:translate-y-0.5 group-focus-within:opacity-100 motion-reduce:transform-none [&_svg]:h-4 [&_svg]:w-4">
                    <ArrowIcon />
                  </span>
                </div>
                <div className="ops-diagram-card overflow-hidden rounded-[0.9rem] border border-black/12 bg-white/88 ring-0 ring-[color:var(--ops-accent-muted)] ring-offset-2 ring-offset-white/60 transition-[transform,box-shadow,border-color,ring-width] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:border-[color:var(--ops-accent-soft)] group-hover:shadow-[0_24px_50px_-36px_rgba(20,24,50,0.42)] group-focus-within:-translate-y-0.5 group-focus-within:border-[color:var(--ops-accent-soft)] group-focus-within:shadow-[0_24px_50px_-36px_rgba(20,24,50,0.42)] group-focus-within:ring-2 motion-reduce:transform-none">
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background: step.stripe,
                    }}
                  />
                  <div className="px-4 py-2.25 text-center text-[0.76rem] leading-relaxed text-charcoal sm:px-4.5 sm:py-2.25 sm:text-[0.82rem]">
                    <p className="mx-auto max-w-[17.9rem]">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </motion.figure>
  );
}
