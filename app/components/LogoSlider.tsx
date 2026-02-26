"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sectionEntrance } from "../lib/motion";

const LOGOS = [
  "Company A",
  "Company B",
  "Company C",
  "Company D",
  "Company E",
  "Company F",
  "Company G",
  "Company H",
];

export function LogoSlider() {
  const reduceMotion = useReducedMotion();
  const duplicated = [...LOGOS, ...LOGOS];

  return (
    <motion.section
      className="section-secondary overflow-hidden"
      variants={sectionEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <p className="prose-small text-center text-neutral-500 mb-10">
        Trusted by founders
      </p>
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <motion.div
          className="flex gap-16 items-center will-change-transform"
          animate={
            reduceMotion
              ? false
              : { x: [0, "-50%"] }
          }
          transition={
            reduceMotion
              ? {}
              : {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }
          }
        >
          {duplicated.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 w-28 h-12 flex items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 text-sm font-medium hover:opacity-80 transition-opacity"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
