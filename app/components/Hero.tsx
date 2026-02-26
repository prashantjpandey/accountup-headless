"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { sectionEntrance, staggerChildren, fadeInUp } from "../lib/motion";

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section-primary overflow-hidden">
      <div className="container-main grid gap-12 md:grid-cols-12 md:gap-16 md:items-center">
        <motion.div
          className="md:col-span-6"
          variants={staggerChildren(0.1)}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? false : "visible"}
        >
          <motion.h1
            className="prose-h1 text-neutral-900 max-w-xl"
            variants={fadeInUp}
          >
            Finance infrastructure for founders
          </motion.h1>
          <motion.p
            className="prose-body mt-6 max-w-xl"
            variants={fadeInUp}
          >
            Real-time ledger sync, automated workflows, board packs always ready.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            variants={fadeInUp}
          >
            <Button href="#contact">Install your finance system</Button>
            <Button variant="secondary" href="#pricing">
              See tiers
            </Button>
          </motion.div>
          <motion.div
            className="mt-6 flex items-center gap-2"
            variants={fadeInUp}
          >
            <span className="prose-small inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Updated in real time
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:col-span-6 md:-mb-24"
          variants={sectionEntrance}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? false : "visible"}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="relative w-[115%] max-w-none md:w-[130%] md:ml-4 rounded-2xl border border-neutral-200/80 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
            initial={reduceMotion ? false : { scale: 0.99, opacity: 0.95 }}
            animate={
              reduceMotion
                ? { scale: 1, opacity: 1 }
                : {
                    scale: 1,
                    opacity: 1,
                    boxShadow: [
                      "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                      "0 10px 15px -3px rgb(0 0 0 / 0.08)",
                    ],
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={reduceMotion ? undefined : { y: -2, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
          >
            <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex h-12 w-24 rounded-lg bg-neutral-200/80 mb-4" />
                <p className="prose-small text-neutral-500">
                  Dashboard preview
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
