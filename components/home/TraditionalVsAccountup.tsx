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
      className="py-14 md:py-18 px-6 compare-gradient"
      id="compare"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="text-4xl md:text-5xl font-semibold tracking-tight text-ink text-center mb-4 flex flex-wrap items-center justify-center gap-2 font-display"
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
        <div className="grid md:grid-cols-2 items-stretch gap-5 md:gap-6 mt-10 md:mt-12">
          <motion.div
            className="h-full"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <Card variant="lavender" interactive={false} className="h-full p-6 md:p-7">
              <h3 className="text-2xl font-semibold tracking-tight text-ink mb-2 font-display">
                Traditional Accounting
              </h3>
              <p className="text-base text-charcoal/90 leading-relaxed mb-4">
                Manual processes, delayed insights, reactive support.
              </p>
              <DashboardVideo
                src={videos.traditionalFirms}
                ariaHidden
                className="mb-4 aspect-[16/10]"
              />
              <motion.ul className="space-y-2.5" variants={subtleListStagger}>
                {TRADITIONAL_ITEMS.map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-base leading-relaxed text-ink/80"
                    variants={fadeUp}
                  >
                    <span className="text-charcoal/60 mt-0.5">x</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </Card>
          </motion.div>
          <motion.div
            className="h-full"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <Card
              variant="lavender"
              interactive={false}
              className={`h-full p-6 md:p-7 transition-[transform,box-shadow] duration-200 ease-out ${reduceMotion ? "" : "hover:-translate-y-0.5 hover:shadow-md"}`}
            >
              <div className="h-0.5 w-16 rounded-full bg-purple mb-3" />
              <h3 className="text-2xl font-semibold tracking-tight text-ink mb-2 font-display">
                Accountup System
              </h3>
              <p className="text-base text-charcoal/90 leading-relaxed mb-4">
                Real-time, systemized, investor-ready.
              </p>
              <DashboardVideo
                src={videos.heroStreamline}
                ariaHidden
                className="mb-4 aspect-[16/10]"
              />
              <motion.ul className="space-y-2.5" variants={subtleListStagger}>
                {ACCOUNTUP_ITEMS.map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-base leading-relaxed text-ink/80"
                    variants={fadeUp}
                  >
                    <span className="text-purple mt-0.5">+</span>
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
