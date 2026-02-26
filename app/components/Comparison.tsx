"use client";

import { motion } from "framer-motion";
import { sectionEntrance, staggerChildren, fadeInUp } from "../lib/motion";

const TRADITIONAL = [
  "Clarity arrives after the month ends",
  "You chase updates",
  "Manual assembly, last-minute stress",
];

const ACCOUNTUP = [
  "Live ledger sync",
  "Auto workflows",
  "Board pack always ready",
];

export function Comparison() {
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
          className="prose-h2 text-neutral-900 text-center mb-16"
          variants={fadeInUp}
        >
          Traditional vs Accountup
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12"
          variants={staggerChildren(0.05)}
        >
          <motion.div
            className="rounded-xl p-8 bg-neutral-100/60 border border-neutral-200/50"
            variants={fadeInUp}
          >
            <h3 className="prose-h3 text-neutral-600 mb-6">Traditional</h3>
            <ul className="space-y-4">
              {TRADITIONAL.map((item, i) => (
                <li
                  key={i}
                  className="prose-body flex items-start gap-3 text-neutral-600"
                >
                  <span className="text-neutral-400 mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-xl p-8 bg-white border border-neutral-200 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] relative"
            variants={fadeInUp}
          >
            <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-indigo-500/10 to-transparent -z-10 opacity-60" />
            <h3 className="prose-h3 text-neutral-900 mb-6">Accountup</h3>
            <ul className="space-y-4">
              {ACCOUNTUP.map((item, i) => (
                <li
                  key={i}
                  className="prose-body flex items-start gap-3 text-neutral-700"
                >
                  <span className="text-indigo-500 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
