"use client";

import { motion, type Variants } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { DashboardVideo } from "@/components/ui/DashboardVideo";
import { CORE_SERVICES } from "@/lib/constants";
import { videos } from "@/lib/assets";
import {
  fadeUp,
  softScaleIn,
  staggerContainer,
  subtleListStagger,
  useReducedMotionSafe,
} from "@/lib/animations";

const moduleStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export function CoreServices() {
  const reduceMotion = useReducedMotionSafe();
  const panelGradients: Record<string, string> = {
    "daily-ops": "from-primary/15 via-warm-peach/10 to-transparent",
    compliance: "from-purple/15 via-lavender-1/10 to-transparent",
    reporting: "from-primary/12 via-purple/12 to-transparent",
  };

  return (
    <motion.section
      className="surface-default page-shell relative overflow-hidden section-space-lg"
      id="services"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute top-0 right-0 w-[420px] h-[320px] glow-blob-purple opacity-25 pointer-events-none" />
      <div className="absolute -bottom-8 -left-14 w-[360px] h-[260px] glow-blob-orange opacity-20 pointer-events-none" />
      <div className="page-container relative">
        <motion.div className="mx-auto mb-14 max-w-3xl text-center md:mb-16" variants={staggerContainer}>
          <motion.p
            className="eyebrow-chip"
            variants={fadeUp}
          >
            What We Do
          </motion.p>
          <motion.h2
            className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl"
            variants={fadeUp}
          >
            Finance ops that scale with your startup
          </motion.h2>
          <motion.p
            className="mt-5 text-base leading-relaxed text-charcoal md:text-lg"
            variants={fadeUp}
          >
            Three connected modules covering daily operations, compliance, and
            investor-ready reporting.
          </motion.p>
        </motion.div>
        <div className="mx-auto max-w-[68rem] space-y-8 md:space-y-10">
          {CORE_SERVICES.map((service) => (
            <Card
              key={service.id}
              variant="lavender"
              interactive={false}
              className="relative overflow-hidden px-6 py-7 md:px-8 md:py-8 lg:px-9 lg:py-9"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${panelGradients[service.id] ?? "from-purple/12 via-primary/10 to-transparent"}`}
              />
              <motion.div
                className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
                variants={moduleStagger}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div className="relative lg:col-span-4" variants={fadeUp}>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-purple md:text-base">
                    {service.subtitle}
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-charcoal md:text-lg">
                    {service.description}
                  </p>
                  <motion.ul
                    className="mt-7 space-y-3"
                    variants={subtleListStagger}
                  >
                    {service.bullets.map((bullet) => (
                      <motion.li
                        key={bullet}
                        className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink/80 md:text-base"
                        variants={fadeUp}
                      >
                        <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                        {bullet}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                <motion.div
                  className="relative min-w-0 lg:col-span-8 lg:border-l lg:border-white/45"
                  variants={softScaleIn}
                  transition={{ duration: 0.55, delay: 0.08 }}
                >
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <DashboardVideo
                      src={
                        service.id === "daily-ops"
                          ? videos.bookkeepingPayroll
                          : service.id === "compliance"
                          ? videos.complianceFilings
                          : videos.reportingInsights
                      }
                      ariaHidden
                      loopStartSeconds={4}
                      loopEndSeconds={8}
                      className="w-full [&_video]:block [&_video]:h-auto [&_video]:w-full [&_video]:object-contain"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
