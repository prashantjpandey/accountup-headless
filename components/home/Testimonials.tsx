"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
      className="surface-muted page-shell relative overflow-hidden section-space-lg"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute -top-8 -left-14 h-[260px] w-[340px] glow-blob-purple opacity-15 pointer-events-none" />
      <div className="absolute -bottom-6 -right-10 h-[240px] w-[320px] glow-blob-orange opacity-20 pointer-events-none" />

      <div className="relative page-container">
        <motion.div className="mx-auto max-w-4xl text-center" variants={fadeUp}>
          <p className="eyebrow-chip">
            Case Studies
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Trusted by founders
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-charcoal md:text-lg">
            Growing companies rely on Accountup to keep their finances clear,
            compliant, and investor-ready.
          </p>
        </motion.div>

        <motion.div className="mt-12 md:mt-14" variants={staggerContainer}>
          <div className="grid gap-6 md:grid-cols-2">
            {CASE_STUDIES.map((study, index) => (
              <Card
                key={study.company}
                variant="lavender"
                interactive={false}
                className="relative h-full overflow-hidden px-6 py-7 md:px-7 md:py-8"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${caseStudyGradients[index % caseStudyGradients.length]}`}
                />
                <motion.article variants={fadeUp} className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="relative font-display text-2xl font-semibold leading-tight tracking-tight text-ink">
                      {study.company}
                    </h3>
                    <div className="relative shrink-0 rounded-2xl border border-white/55 bg-white/45 px-3 py-2 backdrop-blur-sm">
                      <Image
                        src={study.logoSrc}
                        alt={study.logoAlt}
                        width={160}
                        height={64}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  </div>

                  <p className="relative mt-6 text-base leading-relaxed text-charcoal">
                    {study.summary}
                  </p>

                  <div className="relative mt-8">
                    <Button asChild variant="secondary" size="md">
                      <Link href={study.href}>Read case study</Link>
                    </Button>
                  </div>
                </motion.article>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
