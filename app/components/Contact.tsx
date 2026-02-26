"use client";

import { motion } from "framer-motion";
import { sectionEntrance, fadeInUp } from "../lib/motion";

export function Contact() {
  return (
    <motion.section
      id="contact"
      className="section-secondary"
      variants={sectionEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="container-main max-w-xl">
        <motion.h2
          className="prose-h2 text-neutral-900 mb-6"
          variants={fadeInUp}
        >
          Contact
        </motion.h2>
        <motion.p
          className="prose-body mb-8"
          variants={fadeInUp}
        >
          Tell us about your company. We&apos;ll respond within 24 hours.
        </motion.p>
        <motion.form
          className="space-y-6"
          variants={fadeInUp}
        >
          <div>
            <label
              htmlFor="email"
              className="block prose-small mb-2 text-neutral-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400/50 transition-colors"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block prose-small mb-2 text-neutral-600"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400/50 transition-colors resize-none"
              placeholder="Brief description of your needs..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-white hover:bg-neutral-800 active:translate-y-px transition-all duration-200"
          >
            Send
          </button>
        </motion.form>
      </div>
    </motion.section>
  );
}
