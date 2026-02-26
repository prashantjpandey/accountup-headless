"use client";

import { motion } from "framer-motion";
import { sectionEntrance, fadeInUp } from "../lib/motion";
import { Button } from "./Button";

export function CTA() {
  return (
    <motion.section
      className="section-primary"
      variants={sectionEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="container-main text-center">
        <motion.h2
          className="prose-h2 text-neutral-900 max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          Install your finance system
        </motion.h2>
        <motion.p
          className="prose-body mt-6 max-w-xl mx-auto"
          variants={fadeInUp}
        >
          Minimal intake. We&apos;ll get back within 24 hours.
        </motion.p>
        <motion.div className="mt-10" variants={fadeInUp}>
          <Button href="#contact">Start intake</Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
