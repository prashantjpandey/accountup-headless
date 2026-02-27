"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
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
      className="py-20 md:py-28 px-6 bg-background-alt"
      id="contact"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="relative"
          variants={staggerContainer}
        >
          <div className="absolute -inset-4 glow-blob-orange opacity-40 pointer-events-none rounded-2xl" />
          <Card className="relative p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <motion.div variants={fadeUp}>
                <h2 className="text-3xl font-medium text-ink font-display">
                  Get in Touch
                </h2>
              </motion.div>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                variants={fadeUp}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-ink mb-1">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-lavender-2/60 bg-white px-4 py-3 text-ink placeholder:text-charcoal/50 focus:border-purple focus:ring-2 focus:ring-purple/20 focus:outline-none transition-[border-color,box-shadow,background-color] duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-ink mb-1">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-lavender-2/60 bg-white px-4 py-3 text-ink placeholder:text-charcoal/50 focus:border-purple focus:ring-2 focus:ring-purple/20 focus:outline-none transition-[border-color,box-shadow,background-color] duration-200"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-company" className="block text-sm font-semibold text-ink mb-1">
                      Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      className="w-full rounded-lg border border-lavender-2/60 bg-white px-4 py-3 text-ink placeholder:text-charcoal/50 focus:border-purple focus:ring-2 focus:ring-purple/20 focus:outline-none transition-[border-color,box-shadow,background-color] duration-200"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-semibold text-ink mb-1">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="w-full rounded-lg border border-lavender-2/60 bg-white px-4 py-3 text-ink placeholder:text-charcoal/50 focus:border-purple focus:ring-2 focus:ring-purple/20 focus:outline-none transition-[border-color,box-shadow,background-color] duration-200"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-ink mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className="w-full rounded-lg border border-lavender-2/60 bg-white px-4 py-3 text-ink placeholder:text-charcoal/50 focus:border-purple focus:ring-2 focus:ring-purple/20 focus:outline-none transition-[border-color,box-shadow,background-color] duration-200 resize-none"
                    placeholder="Tell us about your startup..."
                  />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <AnimatePresence initial={false}>
                    {showSuccess ? (
                      <motion.p
                        key="contact-success"
                        className="text-sm font-medium text-purple"
                        role="status"
                        aria-live="polite"
                        initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: 2 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      >
                        Thanks, we will be in touch shortly.
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                  <Button type="submit" variant="purple" size="lg">
                    Submit
                  </Button>
                </div>
              </motion.form>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
