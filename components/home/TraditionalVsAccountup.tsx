 "use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { DashboardVideo } from "@/components/ui/DashboardVideo";
import { videos } from "@/lib/assets";
import { TRADITIONAL_ITEMS, ACCOUNTUP_ITEMS } from "@/lib/constants";
import Image from "next/image";
import { fadeUp, useReducedMotionSafe } from "@/lib/animations";

export function TraditionalVsAccountup() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="py-20 md:py-28 px-6 compare-gradient"
      id="compare"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink text-center mb-4 flex flex-wrap items-center justify-center gap-2 font-display">
          Traditional Firms vs{" "}
          <Image
            src="/assets/logos/AccountUp_Logo(1).png"
            alt="Accountup"
            width={148}
            height={40}
            className="h-10 w-auto inline-block"
          />
        </h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-14">
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <Card variant="lavender" className="p-8 md:p-10">
              <h3 className="text-2xl font-semibold tracking-tight text-ink mb-2 font-display">
                Traditional Accounting
              </h3>
              <p className="text-base text-charcoal/90 leading-relaxed mb-6">
                Manual processes, delayed insights, reactive support.
              </p>
              <DashboardVideo
                src={videos.traditionalFirms}
                ariaHidden
                className="mb-6 aspect-[4/3]"
              />
              <ul className="space-y-3">
                {TRADITIONAL_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-ink/80">
                    <span className="text-charcoal/60 mt-0.5">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card variant="lavender" className="p-8 md:p-10">
              <div className="h-0.5 w-16 rounded-full bg-purple mb-4" />
              <h3 className="text-2xl font-semibold tracking-tight text-ink mb-2 font-display">
                Accountup System
              </h3>
              <p className="text-base text-charcoal/90 leading-relaxed mb-6">
                Real-time, systemized, investor-ready.
              </p>
              <DashboardVideo
                src={videos.heroStreamline}
                ariaHidden
                className="mb-6 aspect-[4/3]"
              />
              <ul className="space-y-3">
                {ACCOUNTUP_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-ink/80">
                    <span className="text-purple mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
