"use client";

import { motion } from "framer-motion";
import { sectionEntrance, staggerChildren, fadeInUp } from "../lib/motion";

const MODULES = [
  {
    title: "Daily Ops",
    subtitle: "Bookkeeping + Payroll",
    outcome: "Operations run without chaos.",
    bullets: [
      "Real-time ledger sync",
      "Rules-based categorization",
      "Payroll runs without chaos",
    ],
  },
  {
    title: "Compliance + Filings",
    subtitle: "",
    outcome: "Filings handled on schedule.",
    bullets: [
      "Deadline tracking",
      "Auto-reminders",
      "Audit-ready records",
    ],
  },
  {
    title: "Reporting + Insights",
    subtitle: "",
    outcome: "Board packs always ready.",
    bullets: [
      "Live dashboards",
      "One-click exports",
      "CFO-ready reports",
    ],
  },
];

export function WhatWeDo() {
  return (
    <motion.section
      className="section-primary"
      variants={sectionEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="container-main">
        <motion.h2
          className="prose-h2 text-neutral-900 text-center mb-4"
          variants={fadeInUp}
        >
          What we do
        </motion.h2>
        <motion.p
          className="prose-body text-center max-w-xl mx-auto mb-20"
          variants={fadeInUp}
        >
          System modules that power your finance infrastructure.
        </motion.p>

        <div className="space-y-24">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.title}
              className="grid md:grid-cols-12 gap-12 md:gap-16 items-center"
              variants={staggerChildren(0.1)}
            >
              <motion.div
                className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}
                variants={fadeInUp}
              >
                <div className="aspect-video rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden flex items-center justify-center group hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] hover:border-neutral-300/80 transition-all duration-300">
                  <div className="text-center">
                    <div className="inline-flex h-16 w-32 rounded-lg bg-neutral-200/80 mb-4 group-hover:bg-neutral-200 transition-colors" />
                    <p className="prose-small text-neutral-500">
                      {mod.title} UI
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}
                variants={fadeInUp}
              >
                <h3 className="prose-h3 text-neutral-900">
                  {mod.title}
                  {mod.subtitle && (
                    <span className="text-neutral-500 font-normal">
                      {" "}({mod.subtitle})
                    </span>
                  )}
                </h3>
                <p className="prose-body mt-4">{mod.outcome}</p>
                <ul className="mt-6 space-y-3">
                  {mod.bullets.map((b, j) => (
                    <li key={j} className="prose-body flex items-center gap-2">
                      <span className="text-indigo-500">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
