"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer, useReducedMotionSafe } from "@/lib/animations";

export function ContactSection() {
  const reduceMotion = useReducedMotionSafe();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!showSuccess) return undefined;
    const timeout = window.setTimeout(() => {
      setShowSuccess(false);
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [showSuccess]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    console.log("Contact form (v1):", Object.fromEntries(data));
    form.reset();
    setShowSuccess(true);
  }

  return (
    <motion.section
      className="surface-muted page-shell section-space-md"
      id="contact"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="page-container">
        <motion.div className="relative overflow-hidden rounded-3xl" variants={staggerContainer}>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-white/58 to-lavender-1/28" />
          <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-warm-peach/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-36 w-36 rounded-full bg-lavender-2/30 blur-3xl" />

          <div className="relative grid gap-8 border border-white/55 bg-white/40 px-6 py-8 backdrop-blur-xl lg:grid-cols-[0.95fr_1.1fr] lg:gap-10 lg:px-9 lg:py-9">
            <motion.div variants={fadeUp}>
              <p className="eyebrow-chip">
                Intro Call
              </p>
              <h2 className="mt-4 max-w-md font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Talk to a finance partner, not a ticket system.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal md:text-lg">
                We work with founders building serious companies. Tell us where
                you are, we will outline the right finance stack.
              </p>
              <ul className="mt-6 space-y-3.5">
                <li className="flex items-center gap-3 text-[0.95rem] text-ink/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple/70" aria-hidden="true" />
                  No obligation intro call
                </li>
                <li className="flex items-center gap-3 text-[0.95rem] text-ink/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple/70" aria-hidden="true" />
                  Clear next steps
                </li>
                <li className="flex items-center gap-3 text-[0.95rem] text-ink/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple/70" aria-hidden="true" />
                  Response within 24 hours
                </li>
              </ul>
            </motion.div>

            <motion.form onSubmit={handleSubmit} className="space-y-4" variants={fadeUp}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-sm font-semibold text-ink">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="h-12 w-full rounded-xl border border-black/12 bg-white/88 px-3 text-sm text-ink placeholder:text-charcoal/55 outline-none transition-colors focus:border-neutral-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-sm font-semibold text-ink">
                    Work email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="h-12 w-full rounded-xl border border-black/12 bg-white/88 px-3 text-sm text-ink placeholder:text-charcoal/55 outline-none transition-colors focus:border-neutral-400"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-company" className="mb-1 block text-sm font-semibold text-ink">
                    Company
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    required
                    className="h-12 w-full rounded-xl border border-black/12 bg-white/88 px-3 text-sm text-ink placeholder:text-charcoal/55 outline-none transition-colors focus:border-neutral-400"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-expenses" className="mb-1 block text-sm font-semibold text-ink">
                    Monthly expenses range
                  </label>
                  <select
                    id="contact-expenses"
                    name="monthlyExpensesRange"
                    required
                    defaultValue=""
                    className="h-12 w-full rounded-xl border border-black/12 bg-white/88 px-3 text-sm text-ink outline-none transition-colors focus:border-neutral-400"
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    <option value="under-20k">Under GBP 20k</option>
                    <option value="20k-50k">GBP 20k - GBP 50k</option>
                    <option value="50k-100k">GBP 50k - GBP 100k</option>
                    <option value="100k-250k">GBP 100k - GBP 250k</option>
                    <option value="250k-plus">GBP 250k+</option>
                  </select>
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="contact-team-size" className="mb-1 block text-sm font-semibold text-ink">
                    Team size range
                  </label>
                  <select
                    id="contact-team-size"
                    name="teamSizeRange"
                    required
                    defaultValue=""
                    className="h-12 w-full rounded-xl border border-black/12 bg-white/88 px-3 text-sm text-ink outline-none transition-colors focus:border-neutral-400"
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    <option value="1-5">1 - 5</option>
                    <option value="6-15">6 - 15</option>
                    <option value="16-30">16 - 30</option>
                    <option value="31-60">31 - 60</option>
                    <option value="61-plus">61+</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="contact-message" className="mb-1 block text-sm font-semibold text-ink">
                    Short message (optional)
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    className="w-full rounded-xl border border-black/12 bg-white/88 px-3 py-2.5 text-sm text-ink placeholder:text-charcoal/55 outline-none transition-colors focus:border-neutral-400 resize-none"
                    placeholder="Current stage, priorities, or timing"
                  />
                </div>
              </div>

              <div className="pt-1">
                <Button type="submit" variant="purple" size="lg" className="w-full sm:w-auto">
                  Start conversation
                </Button>
                <p className="mt-2 text-xs text-charcoal">We reply within 24 hours.</p>
                {showSuccess ? (
                  <p className="mt-2 text-sm font-medium text-purple" role="status" aria-live="polite">
                    Thanks, we will be in touch shortly.
                  </p>
                ) : null}
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
