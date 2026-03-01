"use client";

import { motion, type Variants } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { BookkeepingPayrollEngine } from "@/components/home/BookkeepingPayrollEngine";
import { ComplianceFilingsEngine } from "@/components/home/ComplianceFilingsEngine";
import { ReportingInsightsEngine } from "@/components/home/ReportingInsightsEngine";
import { DashboardVideo } from "@/components/ui/DashboardVideo";
import { CORE_SERVICES } from "@/lib/constants";
import { videos } from "@/lib/assets";
import {
  fadeUp,
  softScaleIn,
  staggerContainer,
  subtleListStagger,
  useCompactViewport,
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
  const isCompactViewport = useCompactViewport();
  const shouldAnimateInView = !reduceMotion && !isCompactViewport;
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
      initial={false}
      whileInView={shouldAnimateInView ? "visible" : undefined}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="pointer-events-none absolute top-0 right-0 hidden h-[320px] w-[420px] glow-blob-purple opacity-25 sm:block" />
      <div className="pointer-events-none absolute -bottom-8 -left-14 hidden h-[260px] w-[360px] glow-blob-orange opacity-20 sm:block" />
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
                className="core-service-layout relative z-10 grid gap-8 lg:gap-10 xl:grid-cols-12 xl:gap-12"
                variants={moduleStagger}
                initial={false}
                whileInView={shouldAnimateInView ? "visible" : undefined}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div className="core-service-copy relative xl:col-span-5" variants={fadeUp}>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-purple md:text-base">
                    {service.subtitle}
                  </p>
                  <p className="core-service-description mt-5 text-base leading-relaxed text-charcoal md:text-lg">
                    {service.description}
                  </p>
                  <motion.ul
                    className="core-service-bullets mt-7 grid gap-3"
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
                  className="core-service-visual relative min-w-0 xl:col-span-7"
                  variants={softScaleIn}
                  transition={{ duration: 0.55, delay: 0.08 }}
                >
                  <motion.div
                    className="core-service-visual-frame overflow-hidden rounded-2xl transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none xl:hover:-translate-y-0.5"
                  >
                    {service.id === "daily-ops" ? (
                      <BookkeepingPayrollEngine lite={isCompactViewport} />
                    ) : service.id === "compliance" ? (
                      <ComplianceFilingsEngine lite={isCompactViewport} />
                    ) : service.id === "reporting" ? (
                      <ReportingInsightsEngine lite={isCompactViewport} />
                    ) : (
                      <DashboardVideo
                        src={videos.reportingInsights}
                        ariaHidden
                        loopStartSeconds={4}
                        loopEndSeconds={8}
                        className="w-full [&_video]:block [&_video]:h-auto [&_video]:w-full [&_video]:object-contain"
                      />
                    )}
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
