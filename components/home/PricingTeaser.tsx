"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer, useReducedMotionSafe } from "@/lib/animations";

type PricingModule = {
  id: string;
  name: string;
  price: string;
  explanation: string;
  highlights: string[];
  cta: string;
  href: string;
};

const PRICING_MODULES: PricingModule[] = [
  {
    id: "bookkeeping",
    name: "Bookkeeping & Payroll",
    price: "From \u00A3249 / month",
    explanation: "Based on monthly expenses + team size.",
    highlights: [
      "Bookkeeping",
      "Payroll processing",
      "Bank reconciliation",
      "Ledger maintenance",
    ],
    cta: "Estimate pricing \u2192",
    href: "/pricing?module=bookkeeping",
  },
  {
    id: "compliance",
    name: "Compliance",
    price: "From \u00A31,800 / year",
    explanation: "Must be purchased with bookkeeping.",
    highlights: [
      "VAT returns",
      "Statutory accounts",
      "Tax filings",
      "Share scheme filings",
    ],
    cta: "View compliance pricing \u2192",
    href: "/pricing?module=compliance",
  },
  {
    id: "reporting",
    name: "Reporting",
    price: "From \u00A31,200 / month",
    explanation: "Advanced reporting infrastructure.",
    highlights: [
      "KPI reporting",
      "Cashflow tracking",
      "Forecasting",
      "Board reporting",
    ],
    cta: "View reporting pricing \u2192",
    href: "/pricing?module=reporting",
  },
];

export function PricingTeaser() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="surface-default page-shell section-space-lg"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="page-container">
        <motion.div className="mx-auto max-w-3xl text-center" variants={staggerContainer}>
          <motion.p
            className="eyebrow-chip"
            variants={fadeUp}
          >
            Modular Finance Infrastructure
          </motion.p>
          <motion.h2
            className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl"
            variants={fadeUp}
          >
            Transparent, Modular Pricing
          </motion.h2>
          <motion.p
            className="mt-5 text-base leading-relaxed text-charcoal md:text-lg"
            variants={fadeUp}
          >
            Finance infrastructure priced by function, not arbitrary tiers.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
        >
          {PRICING_MODULES.map((module) => (
            <motion.div key={module.id} variants={fadeUp} className="h-full">
              <Card
                variant="default"
                className="flex h-full flex-col p-6 md:p-7"
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  {module.name}
                </h3>
                <p className="mt-4 font-display text-[1.9rem] font-medium tracking-tight text-ink md:text-3xl">
                  {module.price}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  {module.explanation}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {module.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink/85">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal/45"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant="secondary" size="md" className="mt-8 w-full">
                  <Link href={module.href}>{module.cta}</Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
