"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { DashboardVideo } from "@/components/ui/DashboardVideo";
import { videos } from "@/lib/assets";
import { TRADITIONAL_ITEMS, ACCOUNTUP_ITEMS } from "@/lib/constants";
import {
  fadeUp,
  subtleListStagger,
  useReducedMotionSafe,
} from "@/lib/animations";

export function TraditionalVsAccountup() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="compare-gradient page-shell py-20 md:py-24 lg:py-28"
      id="compare"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="page-container">
        <motion.h2
          className="mx-auto mb-4 flex max-w-4xl flex-wrap items-center justify-center gap-2 text-center font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl"
          variants={fadeUp}
        >
          Traditional Firms vs{" "}
          <Image
            src="/assets/logos/AccountUp_Logo(1).png"
            alt="Accountup"
            width={148}
            height={40}
            className="h-10 w-auto inline-block"
          />
        </motion.h2>
        <div className="mx-auto mt-10 grid max-w-[68rem] items-stretch gap-6 md:mt-12 md:gap-8 lg:grid-cols-2">
          <motion.div
            className="mx-auto h-full w-full max-w-[44rem] lg:max-w-none"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <Card variant="lavender" interactive={false} className="h-full p-6 md:p-7 lg:p-8">
              <h3 className="mb-2 font-display text-2xl font-semibold tracking-tight text-ink">
                Traditional Accounting
              </h3>
              <p className="mb-5 text-base leading-relaxed text-charcoal/90">
                Manual processes, delayed insights, reactive support.
              </p>
              <DashboardVideo
                src={videos.traditionalFirms}
                ariaHidden
                className="mb-5 aspect-[16/10] w-full md:max-w-[34rem] lg:max-w-none"
              />
              <motion.ul className="space-y-3" variants={subtleListStagger}>
                {TRADITIONAL_ITEMS.map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink/80 md:text-base"
                    variants={fadeUp}
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/12 text-xs font-semibold text-charcoal/70">
                      x
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </Card>
          </motion.div>
          <motion.div
            className="mx-auto h-full w-full max-w-[44rem] lg:max-w-none"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <Card
              variant="lavender"
              interactive={false}
              className={`h-full p-6 transition-[transform,box-shadow] duration-200 ease-out md:p-7 lg:p-8 ${reduceMotion ? "" : "hover:-translate-y-0.5 hover:shadow-[0_30px_62px_-36px_rgba(20,24,50,0.45)]"}`}
            >
              <div className="mb-3 h-0.5 w-16 rounded-full bg-purple" />
              <h3 className="mb-2 font-display text-2xl font-semibold tracking-tight text-ink">
                Accountup System
              </h3>
              <p className="mb-5 text-base leading-relaxed text-charcoal/90">
                Real-time, systemized, investor-ready.
              </p>
              <DashboardVideo
                src={videos.heroStreamline}
                ariaHidden
                className="mb-5 aspect-[16/10] w-full md:max-w-[34rem] lg:max-w-none"
              />
              <motion.ul className="space-y-3" variants={subtleListStagger}>
                {ACCOUNTUP_ITEMS.map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink/80 md:text-base"
                    variants={fadeUp}
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-purple/30 bg-purple/10 text-xs font-semibold text-purple">
                      +
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
