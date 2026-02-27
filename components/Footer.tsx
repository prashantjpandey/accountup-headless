import Link from "next/link";
import { FOOTER_COLUMNS, FOOTER_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-lavender-1/40 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-5">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-ink hover:text-purple transition-colors duration-200 lowercase block font-display"
            >
              accountup
            </Link>
            <p className="mt-4 max-w-xs text-sm text-charcoal">
              {FOOTER_TAGLINE}
            </p>
          </div>
          {Object.entries(FOOTER_COLUMNS).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-charcoal hover:text-purple transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-lavender-1/30 pt-8 text-sm text-charcoal">
          &copy; {new Date().getFullYear()} Accountup. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
