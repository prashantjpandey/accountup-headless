"use client";

import { useEffect, useState } from "react";
import { Variants, useReducedMotion } from "framer-motion";

const calmEase = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: calmEase,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
};

export const softScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.992, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: calmEase,
    },
  },
};

export const subtleListStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
};

export function useReducedMotionSafe() {
  const prefersReduced = useReducedMotion();
  return !!prefersReduced;
}

export function useCompactViewport(maxWidth = 767) {
  const [isCompactViewport, setIsCompactViewport] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const syncViewport = () => setIsCompactViewport(mediaQuery.matches);

    syncViewport();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncViewport);
      return () => mediaQuery.removeEventListener("change", syncViewport);
    }

    mediaQuery.addListener(syncViewport);
    return () => mediaQuery.removeListener(syncViewport);
  }, [maxWidth]);

  return isCompactViewport;
}
