"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "@/components/home/HeroVideo";
import {
  fadeUp,
  softScaleIn,
  staggerContainer,
  useReducedMotionSafe,
} from "@/lib/animations";

export function Hero() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="relative overflow-hidden hero-gradient page-shell pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28"
      variants={staggerContainer}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.35 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 h-[420px] w-[420px] glow-blob-purple-strong" />
        <div className="absolute bottom-1/4 -right-24 h-[420px] w-[420px] glow-blob-orange-strong" />
      </div>
      <div className="relative page-container grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="mx-auto w-full max-w-[36rem] lg:col-span-6 lg:mx-0">
          <motion.h1
            className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.02 }}
          >
            Your Plug-and-Play <span className="text-primary">Finance Engine</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[34rem] text-base leading-relaxed text-charcoal sm:text-lg"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Bookkeeping, payroll, compliance, and investor-ready reporting, built as a{" "}
            <span className="text-purple">plug-and-play</span> finance system.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <Button asChild variant="primary" size="lg">
              <Link href="/#contact">Get a Demo</Link>
            </Button>
            <Link
              href="/#contact"
              className="text-sm font-semibold text-charcoal transition-colors hover:text-purple"
            >
              Talk to an Expert
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="relative flex items-center justify-center lg:col-span-6"
          variants={softScaleIn}
          transition={{ duration: 0.55, delay: 0.14 }}
        >
          <div className="absolute inset-0 mx-auto h-[520px] w-full max-w-[42rem] glow-blob-purple opacity-35 md:h-[620px]" />
          <motion.div className="relative w-full max-w-[46rem] lg:origin-right lg:scale-[1.08]">
            <HeroVideo />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
