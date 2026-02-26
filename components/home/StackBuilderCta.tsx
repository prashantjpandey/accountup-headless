 "use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer, useReducedMotionSafe } from "@/lib/animations";

export function StackBuilderCta() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="relative py-20 md:py-28 px-6 overflow-hidden"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-blob-purple-strong" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-blob-orange-strong" />
      </div>
      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        variants={staggerContainer}
      >
        <motion.h2
          className="text-3xl font-semibold text-ink md:text-4xl"
          variants={fadeUp}
        >
          Build Your Accounting & Finance Stack in 30 Seconds
        </motion.h2>
        <motion.p
          className="mt-4 text-charcoal"
          variants={fadeUp}
        >
          Get a tailored recommendation based on your stage and needs.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Button asChild variant="primary" size="lg" className="mt-10">
            <Link href="/#contact">Get Started</Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
