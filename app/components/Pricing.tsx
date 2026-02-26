"use client";

import { motion } from "framer-motion";
import { sectionEntrance, staggerChildren, fadeInUp } from "../lib/motion";
import { Button } from "./Button";

const TIERS = [
  {
    name: "Core",
    description: "Essential finance infrastructure for early-stage teams.",
    price: "Custom",
    features: ["Live ledger sync", "Basic reporting", "Email support"],
  },
  {
    name: "Engine",
    description: "Full ops, compliance, and reporting.",
    price: "Custom",
    features: ["Everything in Core", "Payroll + filings", "Board packs", "Priority support"],
  },
  {
    name: "Multi-Entity",
    description: "For groups and holding structures.",
    price: "Custom",
    features: ["Everything in Engine", "Multi-entity consolidation", "Dedicated success"],
  },
];

export function Pricing() {
  return (
    <motion.section
      id="pricing"
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
          System tiers
        </motion.h2>
        <motion.p
          className="prose-body text-center max-w-xl mx-auto mb-20"
          variants={fadeInUp}
        >
          Choose the infrastructure level that fits your stage.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-8 md:gap-10"
          variants={staggerChildren(0.06)}
        >
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              className="p-8 rounded-xl border border-neutral-200 bg-white hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300"
              variants={fadeInUp}
            >
              <h3 className="prose-h3 text-neutral-900">{tier.name}</h3>
              <p className="prose-body mt-3">{tier.description}</p>
              <p className="text-2xl font-medium text-neutral-900 mt-6">
                {tier.price}
              </p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f, j) => (
                  <li key={j} className="prose-body flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant={i === 1 ? "primary" : "secondary"}>
                  Get started
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
