 "use client";

import { motion } from "framer-motion";
import { DashboardVideo } from "@/components/ui/DashboardVideo";
import { CORE_SERVICES } from "@/lib/constants";
import { videos } from "@/lib/assets";
import { fadeUp, softScaleIn, staggerContainer, subtleListStagger, useReducedMotionSafe } from "@/lib/animations";

export function CoreServices() {
  const reduceMotion = useReducedMotionSafe();
  const accentStyles: Record<string, string> = {
    "daily-ops": "from-primary/90 to-primary/20",
    compliance: "from-purple/90 to-purple/20",
    reporting: "from-primary/70 via-purple/70 to-purple/20",
  };

  return (
    <motion.section
      className="relative overflow-hidden py-24 md:py-32 px-6 bg-background"
      id="services"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute top-0 right-0 w-[420px] h-[320px] glow-blob-purple opacity-25 pointer-events-none" />
      <div className="absolute -bottom-8 -left-14 w-[360px] h-[260px] glow-blob-orange opacity-20 pointer-events-none" />
      <div className="mx-auto max-w-7xl relative">
        <motion.div className="mx-auto max-w-3xl text-center mb-16 md:mb-20" variants={fadeUp}>
          <p className="inline-flex items-center rounded-full border border-purple/25 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-purple">
            What We Do
          </p>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-ink font-display">
            Finance ops that scale with your startup
          </h2>
          <p className="mt-5 text-base md:text-lg text-charcoal leading-relaxed">
            Three connected modules covering daily operations, compliance, and
            investor-ready reporting.
          </p>
        </motion.div>
        <div className="space-y-16 md:space-y-20">
          {CORE_SERVICES.map((service) => (
            <motion.div
              key={service.id}
              className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center rounded-3xl border border-lavender-2/50 bg-white/70 px-8 py-10 md:px-12 md:py-12 backdrop-blur-md shadow-[0_18px_50px_-28px_rgba(17,17,19,0.35)]"
              variants={staggerContainer}
            >
              <div className={`absolute left-8 right-8 top-0 h-1 rounded-full bg-gradient-to-r ${accentStyles[service.id] ?? "from-purple/80 to-primary/20"}`} />
              <motion.div variants={fadeUp}>
                <h3 className="text-3xl font-semibold tracking-tight text-ink font-display">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-purple font-semibold uppercase tracking-[0.08em] mt-1">
                  {service.subtitle}
                </p>
                <p className="mt-5 text-base md:text-lg text-charcoal leading-relaxed">
                  {service.description}
                </p>
                <motion.ul
                  className="mt-7 space-y-3"
                  variants={subtleListStagger}
                >
                  {service.bullets.map((bullet) => (
                    <motion.li
                      key={bullet}
                      className="text-base text-ink/80 flex items-start gap-3 leading-relaxed"
                      variants={fadeUp}
                    >
                      <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-purple shrink-0" />
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
                  className="w-full aspect-video rounded-2xl border border-white/70 shadow-[0_16px_30px_-20px_rgba(17,17,19,0.4)]"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
