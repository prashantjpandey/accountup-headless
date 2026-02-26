 "use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PRICING_TIERS } from "@/lib/constants";
import { fadeUp, staggerContainer, useReducedMotionSafe } from "@/lib/animations";

export function PricingTeaser() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      className="py-20 md:py-28 px-6 bg-background-alt"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl font-medium text-ink text-center mb-4 font-display"
          variants={fadeUp}
        >
          Simple pricing
        </motion.h2>
        <motion.p
          className="text-charcoal text-center max-w-xl mx-auto mb-16"
          variants={fadeUp}
        >
          Clear packages. No hidden fees. Built for scaling startups.
        </motion.p>
        <motion.div
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={staggerContainer}
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div key={tier.id} variants={fadeUp}>
              <Card
                variant={tier.emphasized ? "emphasized" : "default"}
                className={`p-6 md:p-8 flex flex-col ${tier.recommended ? "ring-1 ring-purple/30" : ""}`}
              >
                {tier.recommended && (
                  <span className="text-xs font-semibold text-purple uppercase tracking-wider mb-4">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-semibold text-ink font-display">{tier.name}</h3>
                <p className="text-sm text-charcoal mt-1">{tier.description}</p>
                <p className="mt-4 text-2xl font-medium text-ink">
                  {tier.price}
                  <span className="text-base font-normal text-charcoal">
                    {tier.period}
                  </span>
                </p>
                <ul className="mt-6 space-y-2 flex-1">
                  {tier.bullets.map((b) => (
                    <li key={b} className="text-sm text-charcoal flex gap-2">
                      <span className="text-purple shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={tier.emphasized ? "primary" : "secondary"} size="md" className="mt-8 w-full">
                  <Link href="/pricing">{tier.cta}</Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
