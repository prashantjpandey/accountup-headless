"use client";

import { useEffect, useRef, useState, type FocusEvent as ReactFocusEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  NAV_LINKS,
  RESOURCE_NAV_GROUPS,
  type NavLink,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";

function isResourceRoute(pathname: string) {
  return (
    pathname === "/resources" ||
    pathname.startsWith("/resources/") ||
    pathname === "/finstack" ||
    pathname.startsWith("/finstack/") ||
    pathname === "/insights" ||
    pathname.startsWith("/insights/")
  );
}

function isNavLinkActive(pathname: string, href: string) {
  const [pathOnly] = href.split("#");
  const isHashLink = href.includes("#");

  if (isHashLink) {
    return pathname === pathOnly;
  }

  if (href === "/resources") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClassName(isActive: boolean) {
  return `relative text-sm font-semibold transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-out ${
    isActive
      ? "text-purple after:scale-x-100"
      : "text-ink hover:text-purple hover:after:scale-x-100"
  }`;
}

function desktopDropdownLinkClassName(isActive: boolean) {
  return `block rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 ${
    isActive
      ? "bg-purple/8 text-purple"
      : "text-charcoal hover:bg-black/4 hover:text-ink"
  }`;
}

function mobileLinkClassName(isActive: boolean) {
  return `block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
    isActive
      ? "bg-purple/8 text-purple"
      : "text-ink hover:bg-black/4 hover:text-purple"
  }`;
}

function renderChevron(isOpen: boolean) {
  return (
    <span
      className={`inline-flex shrink-0 text-charcoal transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <ChevronDownIcon />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const navShellRef = useRef<HTMLDivElement>(null);
  const resourcesMenuRef = useRef<HTMLDivElement>(null);
  const desktopResourcesId = "desktop-resources-menu";
  const mobileResourcesId = "mobile-resources-menu";
  const resourcesActive = isResourceRoute(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsResourcesOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        isResourcesOpen &&
        resourcesMenuRef.current &&
        !resourcesMenuRef.current.contains(target)
      ) {
        setIsResourcesOpen(false);
      }

      if (isMobileMenuOpen && navShellRef.current && !navShellRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
        setIsMobileResourcesOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      setIsResourcesOpen(false);
      setIsMobileMenuOpen(false);
      setIsMobileResourcesOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen, isResourcesOpen]);

  function closeMobileNavigation() {
    setIsMobileMenuOpen(false);
    setIsMobileResourcesOpen(false);
  }

  function handleDesktopResourcesBlur(event: ReactFocusEvent<HTMLDivElement>) {
    const nextFocused = event.relatedTarget as Node | null;

    if (!nextFocused || !event.currentTarget.contains(nextFocused)) {
      setIsResourcesOpen(false);
    }
  }

  return (
    <motion.header
      className={`${isHome ? "fixed" : "sticky"} top-0 z-50 w-full transition-[padding-top] duration-300 ${isScrolled ? "pt-3 md:pt-4" : "pt-4 md:pt-5"}`}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="page-shell relative w-full">
        <div ref={navShellRef} className="page-container">
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
              {NAV_LINKS.map((item) =>
                item.kind === "resources" ? (
                  <div
                    key={item.label}
                    ref={resourcesMenuRef}
                    className="relative"
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                    onFocusCapture={() => setIsResourcesOpen(true)}
                    onBlurCapture={handleDesktopResourcesBlur}
                  >
                    <button
                      type="button"
                      className={`${navLinkClassName(resourcesActive)} inline-flex items-center gap-1.5 bg-transparent after:bottom-0`}
                      aria-expanded={isResourcesOpen}
                      aria-controls={desktopResourcesId}
                      onClick={() => setIsResourcesOpen((current) => !current)}
                    >
                      <span>{item.label}</span>
                      {renderChevron(isResourcesOpen)}
                    </button>
                    <AnimatePresence>
                      {isResourcesOpen ? (
                        <motion.div
                          id={desktopResourcesId}
                          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          exit={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-[calc(100%+1rem)] z-50 w-[18rem] -translate-x-1/2 rounded-[1.4rem] border border-white/85 bg-white/94 p-4 shadow-[0_22px_48px_-28px_rgba(15,23,42,0.3)] backdrop-blur-xl"
                        >
                          <div className="space-y-3">
                            {RESOURCE_NAV_GROUPS.map((group) => (
                              <div key={group.title}>
                                <p className="px-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-charcoal/72">
                                  {group.title}
                                </p>
                                <div className="mt-1.5 space-y-1">
                                  {group.links.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      className={desktopDropdownLinkClassName(
                                        isNavLinkActive(pathname, link.href),
                                      )}
                                    >
                                      {link.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <DesktopNavLink key={item.href} item={item} pathname={pathname} />
                ),
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex">
                <Button href="/#contact" variant="primary">
                  Contact Us
                </Button>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/78 text-ink transition-colors duration-200 hover:text-purple focus:outline-none focus:ring-2 focus:ring-purple/35 md:hidden"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-panel"
                onClick={() => setIsMobileMenuOpen((current) => !current)}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </motion.nav>

          <AnimatePresence>
            {isMobileMenuOpen ? (
              <motion.div
                id="mobile-navigation-panel"
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 rounded-[1.6rem] border border-white/85 bg-white/94 p-4 shadow-[0_22px_48px_-28px_rgba(15,23,42,0.3)] backdrop-blur-xl md:hidden"
              >
                <div className="space-y-2">
                  {NAV_LINKS.map((item) =>
                    item.kind === "resources" ? (
                      <div key={item.label} className="rounded-2xl border border-black/6 bg-black/[0.02] px-2 py-2">
                        <button
                          type="button"
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors duration-200 ${
                            resourcesActive ? "text-purple" : "text-ink hover:text-purple"
                          }`}
                          aria-expanded={isMobileResourcesOpen}
                          aria-controls={mobileResourcesId}
                          onClick={() => setIsMobileResourcesOpen((current) => !current)}
                        >
                          <span>{item.label}</span>
                          {renderChevron(isMobileResourcesOpen)}
                        </button>
                        <div
                          id={mobileResourcesId}
                          hidden={!isMobileResourcesOpen}
                          className={isMobileResourcesOpen ? "block" : "hidden"}
                        >
                          <div className="mt-1 space-y-3 px-3 pb-2 pt-1">
                            {RESOURCE_NAV_GROUPS.map((group) => (
                              <div key={group.title}>
                                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-charcoal/72">
                                  {group.title}
                                </p>
                                <div className="mt-1.5 space-y-1">
                                  {group.links.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      className={mobileLinkClassName(
                                        isNavLinkActive(pathname, link.href),
                                      )}
                                      onClick={closeMobileNavigation}
                                    >
                                      {link.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <MobileNavLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        onNavigate={closeMobileNavigation}
                      />
                    ),
                  )}
                  <div className="pt-2">
                    <Button href="/#contact" variant="primary" className="w-full" onClick={closeMobileNavigation}>
                      Contact Us
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}

function DesktopNavLink({ item, pathname }: { item: Extract<NavLink, { kind: "link" }>; pathname: string }) {
  return (
    <Link
      href={item.href}
      className={navLinkClassName(isNavLinkActive(pathname, item.href))}
    >
      {item.label}
    </Link>
  );
}

function MobileNavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: Extract<NavLink, { kind: "link" }>;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      className={mobileLinkClassName(isNavLinkActive(pathname, item.href))}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.75 5.75H16.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.75 10H16.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.75 14.25H16.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5.75 5.75L14.25 14.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.25 5.75L5.75 14.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
