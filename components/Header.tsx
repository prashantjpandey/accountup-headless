"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/app/components/Button";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`${isHome ? "fixed" : "sticky"} top-0 z-50 w-full px-4 pt-4 md:px-6 md:pt-5`}
    >
      <div className="w-full relative">
        <div className="mx-auto max-w-5xl">
          <nav
            className="flex h-14 items-center justify-between rounded-full border border-white/80 bg-white/80 px-5 backdrop-blur-md shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] md:h-[3.25rem] md:px-6"
            aria-label="Main"
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
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex md:items-center md:gap-7">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href !== "/" &&
                (pathname === href || pathname.startsWith(href.split("#")[0]));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? "text-purple" : "text-ink hover:text-purple"
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
          </nav>
        </div>
      </div>
    </header>
  );
}
