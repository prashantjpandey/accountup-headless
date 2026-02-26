 "use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, staggerContainer, useReducedMotionSafe } from "@/lib/animations";

export function Testimonials() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="py-20 md:py-28 px-6 bg-white"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl font-semibold text-ink text-center mb-16"
          variants={fadeUp}
        >
          Trusted by founders
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={staggerContainer}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className="p-6 md:p-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-lavender-1/50 shrink-0 flex items-center justify-center text-charcoal/40 text-xs">
                  Photo
                </div>
                <div className="min-w-0">
                  <blockquote className="text-ink font-medium leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-6 flex items-center gap-3">
                    <p className="text-sm font-semibold text-ink">{t.author}</p>
                    <span className="text-charcoal/60">·</span>
                    <p className="text-sm text-charcoal">{t.company}</p>
                  </footer>
                </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
