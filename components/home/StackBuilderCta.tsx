"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer, useReducedMotionSafe } from "@/lib/animations";

export function StackBuilderCta() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="surface-lift page-shell relative overflow-hidden section-space-md"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-blob-purple-strong opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-blob-orange-strong opacity-30" />
      </div>
      <div className="page-container">
        <motion.div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/65 bg-white/48 px-6 py-12 text-center shadow-[0_24px_56px_-38px_rgba(17,17,19,0.42)] backdrop-blur-xl md:px-10 md:py-14"
          variants={staggerContainer}
        >
          <motion.h2
            className="font-display text-3xl font-semibold text-ink md:text-4xl"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.02 }}
          >
            Build Your Accounting and Finance Stack in 30 Seconds
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-charcoal md:text-lg"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get a tailored recommendation based on your stage and needs.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.16 }}>
            <Button asChild variant="primary" size="lg" className="mt-9">
              <Link href="/finstack">Explore FinStack UK</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
