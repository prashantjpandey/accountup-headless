"use client";

import { motion } from "framer-motion";
import { sectionEntrance, staggerChildren, fadeInUp } from "../lib/motion";

const QUOTES = [
  {
    text: "Accountup transformed how we handle our books. Real-time visibility changed everything.",
    role: "Founder",
    city: "London",
    stage: "Series A",
  },
  {
    text: "Board packs used to take days. Now they're always ready. That's infrastructure.",
    role: "CFO",
    city: "Berlin",
    stage: "",
  },
  {
    text: "Finally, finance that feels like a system, not a scramble.",
    role: "COO",
    city: "Amsterdam",
    stage: "Seed",
  },
];

export function Testimonials() {
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
          className="prose-h2 text-neutral-900 text-center mb-20"
          variants={fadeInUp}
        >
          Founder quotes
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8 md:gap-12"
          variants={staggerChildren(0.08)}
        >
          {QUOTES.map((q, i) => (
            <motion.blockquote
              key={i}
              className="p-8 bg-white rounded-xl border border-neutral-100"
              variants={fadeInUp}
            >
              <p
                className={`prose-body text-neutral-700 ${
                  i === 0 ? "text-lg md:text-xl" : ""
                }`}
              >
                &ldquo;{q.text}&rdquo;
              </p>
              <footer className="mt-6 prose-small text-neutral-500">
                {q.role}
                {q.city && ` · ${q.city}`}
                {q.stage && ` · ${q.stage}`}
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
