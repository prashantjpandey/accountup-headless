import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, FOOTER_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="surface-default border-t border-lavender-1/40">
      <div className="page-shell py-16 md:py-20">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/62 px-6 py-8 shadow-[0_20px_54px_-42px_rgba(15,23,42,0.35)] backdrop-blur-xl md:px-8 md:py-10 lg:px-10">
            <div className="pointer-events-none absolute -right-16 -top-14 h-56 w-56 rounded-full bg-lavender-1/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-14 h-56 w-56 rounded-full bg-warm-peach/30 blur-3xl" />
            <div className="relative grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))] lg:gap-10">
              <div className="max-w-xs md:max-w-sm">
                <Link
                  href="/"
                  className="inline-flex items-center"
                  aria-label="Accountup home"
                >
                  <Image
                    src="/assets/logos/AccountUp_Logo(1).png"
                    alt="Accountup"
                    width={160}
                    height={42}
                    className="h-9 w-auto"
                  />
                </Link>
                <p className="mt-4 text-sm leading-relaxed text-charcoal">
                  {FOOTER_TAGLINE}
                </p>
                <Link
                  href="/#contact"
                  className="mt-5 inline-flex items-center rounded-full border border-purple/30 bg-white/80 px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple"
                >
                  Talk to an Expert
                </Link>
              </div>
              {Object.entries(FOOTER_COLUMNS).map(([title, links]) => (
                <div key={title}>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/80">
                    {title}
                  </h3>
                  <ul className="space-y-3">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="text-sm text-charcoal transition-colors duration-200 hover:text-purple"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="relative mt-10 border-t border-lavender-1/45 pt-6 text-sm text-charcoal md:mt-12">
              <Link
                href="/#services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple"
              >
                Explore Services
              </Link>
              <p className="mt-3">
                &copy; {new Date().getFullYear()} Accountup. All rights reserved.
              </p>
              <div className="mt-2 text-xs uppercase tracking-[0.12em] text-charcoal/70">
                Built for startup finance teams
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
