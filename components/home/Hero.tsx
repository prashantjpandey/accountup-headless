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
      className="relative overflow-hidden hero-gradient px-6 pt-24 pb-20 md:pt-32 md:pb-28"
      variants={staggerContainer}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] glow-blob-purple-strong" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] glow-blob-orange-strong" />
        {/* Soft bottom fade so gradient bleeds into TrustedBy with no hard line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[28%] min-h-[120px]"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, #f0d9c9 100%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="max-w-xl">
          <motion.h1
            className="text-4xl font-medium tracking-tight text-ink md:text-5xl lg:text-6xl leading-[1.1] font-display"
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
              className="text-sm font-semibold text-charcoal hover:text-purple transition-colors"
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
          <div className="absolute inset-0 w-full max-w-xl mx-auto h-[420px] md:h-[480px] glow-blob-purple opacity-40" />
          <motion.div
            className="relative w-full max-w-xl aspect-video flex justify-center"
          >
            <HeroVideo />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
