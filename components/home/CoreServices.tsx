 "use client";

import { motion } from "framer-motion";
import { DashboardVideo } from "@/components/ui/DashboardVideo";
import { CORE_SERVICES } from "@/lib/constants";
import { videos } from "@/lib/assets";
import { fadeUp, softScaleIn, staggerContainer, subtleListStagger, useReducedMotionSafe } from "@/lib/animations";

export function CoreServices() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="relative overflow-hidden py-20 md:py-28 px-6 bg-background"
      id="services"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute top-0 right-0 w-[380px] h-[280px] glow-blob-purple opacity-20 pointer-events-none" />
      <div className="mx-auto max-w-7xl relative">
        <motion.h2
          className="text-3xl font-medium text-ink text-center mb-16 font-display"
          variants={fadeUp}
        >
          What We Do
        </motion.h2>
        <div className="space-y-16 md:space-y-20">
          {CORE_SERVICES.map((service) => (
            <motion.div
              key={service.id}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center rounded-2xl border border-white/40 bg-white/50 px-8 py-10 md:px-12 md:py-12 backdrop-blur-md shadow-sm"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <h3 className="text-2xl font-medium text-ink font-display">
                  {service.title}
                </h3>
                <p className="text-base text-purple font-medium mt-0.5">
                  {service.subtitle}
                </p>
                <p className="mt-4 text-base text-charcoal leading-relaxed">
                  {service.description}
                </p>
                <motion.ul
                  className="mt-6 space-y-2"
                  variants={subtleListStagger}
                >
                  {service.bullets.map((bullet) => (
                    <motion.li
                      key={bullet}
                      className="text-sm md:text-base text-charcoal flex items-start gap-2"
                      variants={fadeUp}
                    >
                      <span className="text-purple shrink-0">✓</span>
                      {bullet}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div
                className="relative"
                variants={softScaleIn}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 w-full h-full glow-blob-purple opacity-20 pointer-events-none" />
                <DashboardVideo
                  src={
                    service.id === "daily-ops"
                      ? videos.bookkeepingPayroll
                      : service.id === "compliance"
                      ? videos.complianceFilings
                      : videos.reportingInsights
                  }
                  ariaHidden
                  className="w-full aspect-video md:rounded-2xl"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
