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
      className="py-20 md:py-28 px-6 bg-background"
      id="services"
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
          What We Do
        </motion.h2>
        <div className="space-y-16 md:space-y-20">
          {CORE_SERVICES.map((service) => (
            <motion.div
              key={service.id}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center rounded-2xl border border-white/40 bg-white/50 px-6 py-8 md:px-10 md:py-10 backdrop-blur-md shadow-sm"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <h3 className="text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="text-sm text-purple font-medium mt-0.5">
                  {service.subtitle}
                </p>
                <p className="mt-4 text-sm text-charcoal leading-relaxed">
                  {service.description}
                </p>
                <motion.ul
                  className="mt-6 space-y-2"
                  variants={subtleListStagger}
                >
                  {service.bullets.map((bullet) => (
                    <motion.li
                      key={bullet}
                      className="text-sm text-charcoal flex items-start gap-2"
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
