"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

type FinstackProsConsDisclosureProps = {
  pros: string[];
  cons: string[];
};

export function FinstackProsConsDisclosure({
  pros,
  cons,
}: FinstackProsConsDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();
  const hasPros = pros.length > 0;
  const hasCons = cons.length > 0;

  if (!hasPros && !hasCons) {
    return null;
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple focus:outline-none focus:ring-2 focus:ring-purple/30 focus:ring-offset-0"
      >
        <span>{isOpen ? "Hide pros & cons" : "Show pros & cons"}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`text-charcoal transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <div id={contentId} className="mt-4 grid gap-4 md:grid-cols-2">
          {hasPros ? (
            <section className="rounded-2xl border border-purple/12 bg-purple/6 px-4 py-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-purple">
                Pros
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-charcoal">
                {pros.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-purple">
                      +
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {hasCons ? (
            <section className="rounded-2xl border border-primary/12 bg-primary/6 px-4 py-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Cons
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-charcoal">
                {cons.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-primary">
                      -
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
