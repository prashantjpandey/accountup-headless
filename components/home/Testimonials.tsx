"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/constants";
import { fadeUp, staggerContainer, useReducedMotionSafe } from "@/lib/animations";

export function Testimonials() {
  const reduceMotion = useReducedMotionSafe();
  const caseStudyGradients = [
    "from-primary/15 via-warm-peach/10 to-transparent",
    "from-purple/15 via-lavender-1/10 to-transparent",
    "from-primary/12 via-purple/12 to-transparent",
    "from-purple/12 via-warm-peach/10 to-transparent",
  ] as const;

  return (
    <motion.section
      className="relative overflow-hidden py-24 md:py-32 px-6 bg-background-alt"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute -top-8 -left-14 h-[260px] w-[340px] glow-blob-purple opacity-15 pointer-events-none" />
      <div className="absolute -bottom-6 -right-10 h-[240px] w-[320px] glow-blob-orange opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div className="mx-auto max-w-4xl text-center" variants={fadeUp}>
          <p className="inline-flex items-center rounded-full border border-purple/25 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-purple">
            Case Studies
          </p>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-ink font-display">
            Trusted by founders
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-charcoal">
            Growing companies rely on Accountup to keep their finances clear,
            compliant, and investor-ready.
          </p>
        </motion.div>

        <motion.div className="mt-14" variants={staggerContainer}>
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {CASE_STUDIES.map((study, index) => (
              <motion.article
                key={study.company}
                variants={fadeUp}
                className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/55 bg-white/45 px-6 py-7 md:px-7 md:py-8 backdrop-blur-xl shadow-[0_22px_52px_-36px_rgba(17,17,19,0.45)]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${caseStudyGradients[index % caseStudyGradients.length]} pointer-events-none`}
                />
                <div className="flex items-start justify-between gap-4">
                  <h3 className="relative text-2xl font-semibold tracking-tight text-ink font-display leading-tight">
                    {study.company}
                  </h3>
                  <div className="relative shrink-0 rounded-xl border border-white/55 bg-white/45 px-3 py-2 backdrop-blur-sm">
                    <Image
                      src={study.logoSrc}
                      alt={study.logoAlt}
                      width={160}
                      height={64}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                </div>

                <p className="relative mt-7 text-base leading-relaxed text-charcoal">
                  {study.summary}
                </p>

                <div className="relative mt-8">
                  <Link
                    href={study.href}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-6 text-base font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-neutral-800 hover:shadow-md active:translate-y-0 active:shadow-sm"
                  >
                    Read case study
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
