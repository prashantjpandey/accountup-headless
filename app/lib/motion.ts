"use client";

import { Variants } from "framer-motion";

export const sectionEntrance: Variants = {
  hidden: { opacity: 0.92, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerChildren = (delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren,
    },
  },
});

export const fadeInUp: Variants = {
  hidden: { opacity: 0.92, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const dashboardPanelHover = {
  rest: { y: 0, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" },
  hover: {
    y: -2,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.08)",
    transition: { duration: 0.2 },
  },
};

export const buttonHover = {
  rest: { y: 0 },
  hover: { y: -1 },
  tap: { y: 1 },
};
