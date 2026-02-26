"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/app/components/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = pathname === "/" && !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isTransparent
          ? "bg-transparent"
          : "bg-background/90 backdrop-blur-md border-b border-lavender-1/30"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center text-xl font-semibold tracking-tight text-ink hover:opacity-90 transition-opacity lowercase"
          aria-label="Accountup home"
        >
          <Image
            src="/assets/logos/AccountUp_Logo(1).png"
            alt="Accountup"
            width={120}
            height={32}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8" aria-label="Main">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              (href === "/" && pathname === "/") ||
              (href !== "/" && pathname.startsWith(href.split("#")[0]));
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-purple" : "text-charcoal hover:text-purple"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <Button href="/#contact" variant="primary">
            Get a Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
