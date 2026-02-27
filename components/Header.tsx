"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`${isHome ? "fixed" : "sticky"} top-0 z-50 w-full transition-[padding-top] duration-300 ${isScrolled ? "pt-3 md:pt-4" : "pt-4 md:pt-5"}`}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="page-shell relative w-full">
        <div className="page-container">
          <motion.nav
            className="flex h-14 items-center justify-between rounded-full border border-white/85 bg-white/82 px-4 backdrop-blur-md shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] sm:px-5 md:h-[3.25rem] md:px-6"
            aria-label="Main"
            animate={
              reduceMotion
                ? undefined
                : {
                    backgroundColor: isScrolled
                      ? "rgba(255,255,255,0.92)"
                      : "rgba(255,255,255,0.8)",
                    borderColor: isScrolled
                      ? "rgba(255,255,255,0.96)"
                      : "rgba(255,255,255,0.8)",
                    boxShadow: isScrolled
                      ? "0 8px 24px -14px rgba(0,0,0,0.2)"
                      : "0 2px 16px -4px rgba(0,0,0,0.08)",
                  }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-0.5 text-xl font-semibold tracking-tight lowercase"
              aria-label="Accountup home"
            >
              <Image
                src="/assets/logos/AccountUp_Logo(1).png"
                alt="Accountup"
                width={150}
                height={40}
                className="h-8 w-auto md:h-9"
                priority
              />
            </Link>
            <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex md:items-center md:gap-6 lg:gap-7">
              {NAV_LINKS.map(({ href, label }) => {
                const [pathOnly] = href.split("#");
                const isHashLink = href.includes("#");
                const isActive = isHashLink
                  ? pathname === pathOnly
                  : pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={`${href}-${label}`}
                    href={href}
                    className={`relative text-sm font-semibold transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-out ${
                      isActive
                        ? "text-purple after:scale-x-100"
                        : "text-ink hover:text-purple hover:after:scale-x-100"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center">
              <Button href="/#contact" variant="primary">
                Contact Us
              </Button>
            </div>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
}
