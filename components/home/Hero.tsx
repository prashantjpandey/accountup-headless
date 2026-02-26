 "use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "@/components/home/HeroVideo";
import { fadeUp, softScaleIn, staggerContainer, useReducedMotionSafe } from "@/lib/animations";

export function Hero() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="relative overflow-hidden bg-background px-6 pt-24 pb-20 md:pt-32 md:pb-28"
      variants={staggerContainer}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] glow-blob-purple-strong" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] glow-blob-orange-strong" />
      </div>
      <div className="relative mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="max-w-xl">
          <motion.h1
            className="text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl leading-[1.1]"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            Your Plug-and-Play{" "}
            <span className="text-primary">Finance Engine</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-charcoal leading-relaxed max-w-lg"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Bookkeeping, payroll, compliance, and investor-ready reporting — built
            as a{" "}
            <span className="text-purple">plug-and-play</span>{" "}
            finance system.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button asChild variant="primary" size="lg">
              <Link href="/#contact">Get a Demo</Link>
            </Button>
            <Link
              href="/#contact"
              className="text-sm font-medium text-charcoal hover:text-purple transition-colors"
            >
              Talk to an Expert
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="relative flex justify-center items-center"
          variants={softScaleIn}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 w-full max-w-lg mx-auto h-[280px] md:h-[320px] glow-blob-purple opacity-40" />
          <motion.div
            className="relative w-full max-w-lg aspect-video flex justify-center rounded-2xl"
            initial={reduceMotion ? undefined : { boxShadow: "0 4px 18px -8px rgba(15,23,42,0.18)" }}
            animate={
              reduceMotion
                ? undefined
                : { boxShadow: "0 16px 45px -18px rgba(15,23,42,0.45)" }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <HeroVideo />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
